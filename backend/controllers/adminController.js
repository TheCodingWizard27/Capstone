const { db, bucket } = require("../firebase/firebase");
const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

// Render admin dashboard
exports.renderDashboard = async (req, res) => {
    try {
        // Get counts from Firestore
        const usersSnapshot = await db.collection("users").get();
        const listingsSnapshot = await db.collection("listings").get();
        const activeListingsSnapshot = await db
            .collection("listings")
            .where("status", "==", "active")
            .get();

        // You can add more stats as needed
        const stats = {
            totalUsers: usersSnapshot.size,
            totalListings: listingsSnapshot.size,
            activeListings: activeListingsSnapshot.size,
        };

        res.render('admin/dashboard', {
            title: 'Admin Dashboard',
            stats,
            user: req.user || { name: 'Admin' } // Fallback if no user in request
        });
    } catch (error) {
        console.error('Error rendering admin dashboard:', error);
        res.status(500).render('admin/error', {
            title: 'Error',
            message: 'Failed to load dashboard'
        });
    }
};

// Render users management page
exports.renderUsersManagement = async (req, res) => {
    try {
        // Fetch users from Firestore
        const usersSnapshot = await db.collection("users").get();
        const users = usersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : new Date()
        }));

        res.render('admin/users', {
            title: 'User Management',
            users,
            user: req.user || { name: 'Admin' }
        });
    } catch (error) {
        console.error('Error rendering users management:', error);
        res.status(500).render('admin/error', {
            title: 'Error',
            message: 'Failed to load users'
        });
    }
};

// Render listings management page
exports.renderListingsManagement = async (req, res) => {
    try {
        // Fetch listings from Firestore
        const listingsSnapshot = await db.collection("listings").get();
        const listings = listingsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : new Date(),
            price: doc.data().price || 0,
            status: doc.data().status || 'active'
        }));

        // Fetch categories for the filter dropdown
        const categories = [
            "Furniture",
            "Books",
            "Electronics",
            "Clothing",
            "Kitchen",
            "Miscellaneous",
        ];

        res.render('admin/listings', {
            title: 'Listings Management',
            listings,
            categories,
            user: req.user || { name: 'Admin' }
        });
    } catch (error) {
        console.error('Error rendering listings management:', error);
        res.status(500).render('admin/error', {
            title: 'Error',
            message: 'Failed to load listings'
        });
    }
};

// Render categories management page
exports.renderCategoriesManagement = async (req, res) => {
    try {
        // Fetch categories
        const categories = [
            "Furniture",
            "Books",
            "Electronics",
            "Clothing",
            "Kitchen",
            "Miscellaneous",
        ];

        res.render('admin/categories', {
            title: 'Categories Management',
            categories,
            user: req.user || { name: 'Admin' }
        });
    } catch (error) {
        console.error('Error rendering categories management:', error);
        res.status(500).render('admin/error', {
            title: 'Error',
            message: 'Failed to load categories'
        });
    }
};

// API endpoints for admin actions

// Add a new user (from your existing code)
exports.addUser = async (req, res) => {
    const { user_id, email } = req.body;

    try {
        // Check if the user already exists in Firestore
        const userSnapshot = await db.collection("users").doc(user_id).get();

        if (userSnapshot.exists) {
            return res.status(409).send("User already exists in Firestore");
        }

        // Add user to Firestore using the uid as the document ID
        await db
            .collection("users")
            .doc(user_id)
            .set({
                uid: user_id,
                email: email,
                userName: email.split("@")[0], // Derive the username from the email
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
            });

        res.status(201).send("User added successfully");
    } catch (error) {
        if (error.code === "auth/user-not-found") {
            res.status(404).send("User not found in Firebase Authentication");
        } else {
            res.status(500).send(`Error: ${error.message}`);
        }
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Check if user exists
        const userRef = db.collection("users").doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete user's listings
        const listingsSnapshot = await db
            .collection("listings")
            .where("user", "==", userId)
            .get();

        // Batch delete listings
        const batch = db.batch();
        listingsSnapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();

        // Delete user from Firestore
        await userRef.delete();

        // Optionally delete user from Firebase Auth
        // await admin.auth().deleteUser(userId);

        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            // If AJAX request, return JSON
            return res.status(200).json({ message: "User deleted successfully" });
        } else {
            // If regular form submit, redirect
            return res.redirect('/admin/users');
        }
    } catch (error) {
        console.error("Error deleting user:", error);

        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.status(500).json({ message: "Error deleting user", error: error.message });
        } else {
            return res.status(500).render('admin/error', {
                title: 'Error',
                message: `Error deleting user: ${error.message}`
            });
        }
    }
};

// Add a new listing (admin version)
exports.adminAddListing = async (req, res) => {
    try {
        const { title, brand, category, description, price, userId } = req.body;

        let picUrls = [];

        // Upload each file to Firebase Storage and get its URL
        if (req.files && req.files.length) {
            const uploadPromises = req.files.map(async (file) => {
                const uniqueFileName = `uploads/${userId}/${uuidv4()}_${file.originalname}`;
                const fileUpload = bucket.file(uniqueFileName);

                await fileUpload.save(file.buffer, {
                    contentType: file.mimetype,
                });

                // Get the URL of the uploaded file
                const url = await fileUpload.getSignedUrl({
                    action: "read",
                    expires: "03-01-2500", // Set a far expiration date
                });

                return url[0]; // URL is returned as an array
            });

            picUrls = await Promise.all(uploadPromises);
        }

        // Save listing data in Firestore
        const newListing = await db.collection("listings").add({
            title,
            brand,
            category,
            description,
            price: parseFloat(price),
            status: "active",
            user: userId,
            picUrls,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.status(201).json({
                message: "Listing added successfully",
                id: newListing.id
            });
        } else {
            return res.redirect('/admin/listings');
        }
    } catch (error) {
        console.error("Error adding listing:", error);

        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.status(500).json({
                message: "Error adding listing",
                error: error.message
            });
        } else {
            return res.status(500).render('admin/error', {
                title: 'Error',
                message: `Error adding listing: ${error.message}`
            });
        }
    }
};

// Admin delete listing
exports.adminDeleteListing = async (req, res) => {
    try {
        const listingId = req.params.id;

        // Get the listing document
        const listingRef = db.collection("listings").doc(listingId);
        const listingDoc = await listingRef.get();

        // Check if listing exists
        if (!listingDoc.exists) {
            return res.status(404).json({ message: "Listing not found" });
        }

        const listingData = listingDoc.data();

        // Delete images from Firebase Storage if they exist
        if (listingData.picUrls && listingData.picUrls.length > 0) {
            try {
                const deletePromises = listingData.picUrls.map(async (url) => {
                    // Extract the file path from the URL
                    const urlObj = new URL(url);
                    const pathWithoutBucket = urlObj.pathname
                        .split("/")
                        .slice(2)
                        .join("/");

                    // Delete the file
                    const file = bucket.file(decodeURIComponent(pathWithoutBucket));
                    await file.delete().catch((err) => {
                        console.warn(`Failed to delete file ${pathWithoutBucket}:`, err);
                    });
                });

                await Promise.all(deletePromises);
            } catch (error) {
                console.error("Error deleting files from storage:", error);
            }
        }

        // Delete the listing document from Firestore
        await listingRef.delete();

        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.status(200).json({ message: "Listing deleted successfully" });
        } else {
            return res.redirect('/admin/listings');
        }
    } catch (error) {
        console.error("Error deleting listing:", error);

        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.status(500).json({
                message: "Error deleting listing",
                error: error.message
            });
        } else {
            return res.status(500).render('admin/error', {
                title: 'Error',
                message: `Error deleting listing: ${error.message}`
            });
        }
    }
};

// Admin update listing status
exports.adminUpdateListingStatus = async (req, res) => {
    try {
        const listingId = req.params.id;
        const { status } = req.body;

        // Validate status
        if (!status || (status !== "active" && status !== "inactive")) {
            return res.status(400).json({
                message: "Invalid status. Must be 'active' or 'inactive'."
            });
        }

        const listingRef = db.collection("listings").doc(listingId);
        const listingDoc = await listingRef.get();

        // Check if listing exists
        if (!listingDoc.exists) {
            return res.status(404).json({ message: "Listing not found" });
        }

        // Update only the status field
        await listingRef.update({
            status: status,
            modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.status(200).json({
                message: `Listing status updated to ${status} successfully`,
                id: listingId,
            });
        } else {
            return res.redirect('/admin/listings');
        }
    } catch (error) {
        console.error("Error updating listing status:", error);

        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.status(500).json({
                message: "Error updating listing status",
                error: error.message,
            });
        } else {
            return res.status(500).render('admin/error', {
                title: 'Error',
                message: `Error updating listing status: ${error.message}`
            });
        }
    }
};

// const { db, bucket } = require("../firebase/firebase");
// const admin = require("firebase-admin");

// View reported listings
exports.viewReportedListings = async (req, res) => {
    try {
        const reportsSnapshot = await db.collection("reports").get();
        const reports = reportsSnapshot.docs.map(doc => doc.data());

        // Fetch related listings and user details
        const listingsMap = new Map();
        const usersMap = new Map();
        for (const report of reports) {
            if (!listingsMap.has(report.listingId)) {
                const listingDoc = await db.collection("listings").doc(report.listingId).get();
                if (listingDoc.exists) listingsMap.set(report.listingId, { id: report.listingId, ...listingDoc.data() });
            }
            if (!usersMap.has(report.reportedUserId)) {
                const userDoc = await db.collection("users").doc(report.reportedUserId).get();
                if (userDoc.exists) usersMap.set(report.reportedUserId, { id: report.reportedUserId, ...userDoc.data() });
            }
        }

        res.render('admin/reports', {
            title: 'Reported Listings',
            reports,
            listings: Object.fromEntries(listingsMap),
            users: Object.fromEntries(usersMap),
            user: req.user || { name: 'Admin' }
        });
    } catch (error) {
        console.error("Error fetching reported listings:", error);
        res.status(500).render('admin/error', {
            title: 'Error',
            message: 'Failed to load reported listings'
        });
    }
};

// Dismiss a report
exports.dismissReport = async (req, res) => {
    try {
        const reportId = req.params.id;
        await db.collection("reports").doc(reportId).delete();
        res.status(200).json({ message: "Report dismissed successfully" });
    } catch (error) {
        console.error("Error dismissing report:", error);
        res.status(500).json({ message: "Error dismissing report", error: error.message });
    }
};

// Remove a reported listing
exports.removeReportedListing = async (req, res) => {
    try {
        const listingId = req.params.id;
        const listingRef = db.collection("listings").doc(listingId);
        const listingDoc = await listingRef.get();

        if (!listingDoc.exists) {
            return res.status(404).json({ message: "Listing not found" });
        }

        const listingData = listingDoc.data();
        await listingRef.delete();

        // Delete reports associated with the listing
        const reportsSnapshot = await db.collection("reports").where("listingId", "==", listingId).get();
        const batch = db.batch();
        reportsSnapshot.forEach(doc => batch.delete(doc.ref));
        await batch.commit();

        res.status(200).json({ message: "Listing and related reports removed successfully" });
    } catch (error) {
        console.error("Error removing reported listing:", error);
        res.status(500).json({ message: "Error removing listing", error: error.message });
    }
};

// Fetch total report counts for users and listings
exports.getReportCounts = async (req, res) => {
    try {
        const reportsSnapshot = await db.collection("reports").get();
        let userReportCounts = {};
        let listingReportCounts = {};

        reportsSnapshot.forEach(doc => {
            const { listingId, reportedUserId } = doc.data();
            listingReportCounts[listingId] = (listingReportCounts[listingId] || 0) + 1;
            userReportCounts[reportedUserId] = (userReportCounts[reportedUserId] || 0) + 1;
        });

        res.status(200).json({
            userReportCounts,
            listingReportCounts
        });
    } catch (error) {
        console.error("Error fetching report counts:", error);
        res.status(500).json({ message: "Error fetching report counts", error: error.message });
    }
};
// View reported listings
exports.viewReportedListings = async (req, res) => {
    try {
        const reportsSnapshot = await db.collection("reports").get();
        const reports = reportsSnapshot.docs.map(doc => doc.data());

        // Fetch related listings and user details
        const listingsMap = new Map();
        const usersMap = new Map();
        let listingReportCounts = {};
        let userReportCounts = {};

        for (const report of reports) {
            if (!listingsMap.has(report.listingId)) {
                const listingDoc = await db.collection("listings").doc(report.listingId).get();
                if (listingDoc.exists) listingsMap.set(report.listingId, { id: report.listingId, ...listingDoc.data() });
            }
            if (!usersMap.has(report.reportedUserId)) {
                const userDoc = await db.collection("users").doc(report.reportedUserId).get();
                if (userDoc.exists) usersMap.set(report.reportedUserId, { id: report.reportedUserId, ...userDoc.data() });
            }

            // Update report counts
            listingReportCounts[report.listingId] = (listingReportCounts[report.listingId] || 0) + 1;
            userReportCounts[report.reportedUserId] = (userReportCounts[report.reportedUserId] || 0) + 1;
        }

        res.render('admin/reports', {
            title: 'Reported Listings',
            reports,
            listings: Object.fromEntries(listingsMap),
            users: Object.fromEntries(usersMap),
            userReportCounts, // Pass userReportCounts
            listingReportCounts, // Pass listingReportCounts
            user: req.user || { name: 'Admin' }
        });
    } catch (error) {
        console.error("Error fetching reported listings:", error);
        res.status(500).render('admin/error', {
            title: 'Error',
            message: 'Failed to load reported listings'
        });
    }
};
