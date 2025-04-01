const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const reportController = require("../controllers/adminController"); // <-- This should match your controller file
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  const isUserAdmin = true; // Replace with actual authentication check

  if (isUserAdmin) {
    return next();
  }

  return res.status(403).render("admin/error", {
    title: "Access Denied",
    message: "You do not have permission to access this page",
  });
};

// Apply admin check middleware to all admin routes
router.use(isAdmin);

//Login Management
router.post("/login", adminController.adminLogin);

// Admin dashboard
router.get("/", adminController.renderDashboard);
router.get("/dashboard", adminController.renderDashboard);

// Users management
router.get("/users", adminController.renderUsersManagement);
router.post("/users", adminController.addUser);
router.delete("/users/:id", adminController.deleteUser);
router.get("/users/delete/:id", adminController.deleteUser);

// Listings management
router.get("/listings", adminController.renderListingsManagement);
router.post(
  "/listings",
  upload.array("images", 5),
  adminController.adminAddListing
);
router.delete("/listings/:id", adminController.adminDeleteListing);
router.get("/listings/delete/:id", adminController.adminDeleteListing);
router.put("/listings/:id/status", adminController.adminUpdateListingStatus);
router.post("/listings/:id/status", adminController.adminUpdateListingStatus);

// Categories management
router.get("/categories", adminController.renderCategoriesManagement);
router.post("/addCategory", adminController.addCategory);

//  **Report Management Routes**
router.get("/reports", reportController.viewReportedListings);
router.delete("/reports/:id", reportController.dismissReport); //not yet implemented
router.delete("/reports/listing/:id", reportController.removeReportedListing);
router.get("/reports/counts", reportController.getReportCounts);

module.exports = router;
