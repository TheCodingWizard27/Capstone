const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const verifyAdmin = require("../middlewares/adminMiddleware");

//Login Management
router.post("/login", adminController.adminLogin);

// Admin dashboard
router.get("/", verifyAdmin, adminController.renderDashboard);
router.get("/dashboard", verifyAdmin, adminController.renderDashboard);

// Users management
router.get("/users", verifyAdmin, adminController.renderUsersManagement);
router.post("/users", verifyAdmin, adminController.addUser);
router.delete("/users/:id", verifyAdmin, adminController.deleteUser);
router.get("/users/delete/:id", verifyAdmin, adminController.deleteUser);

// Listings management
router.get("/listings", verifyAdmin, adminController.renderListingsManagement);
router.post(
  "/listings",
  verifyAdmin,
  upload.array("images", 5),
  adminController.adminAddListing
);
router.delete("/listings/:id", verifyAdmin, adminController.adminDeleteListing);
router.get(
  "/listings/delete/:id",
  verifyAdmin,
  adminController.adminDeleteListing
);
router.put(
  "/listings/:id/status",
  verifyAdmin,
  adminController.adminUpdateListingStatus
);
router.post(
  "/listings/:id/status",
  verifyAdmin,
  adminController.adminUpdateListingStatus
);

// Categories management
router.get(
  "/categories",
  verifyAdmin,
  adminController.renderCategoriesManagement
);
router.post("/addCategory", verifyAdmin, adminController.addCategory);

//  **Report Management Routes**
router.get("/reports", verifyAdmin, adminController.viewReportedListings);
router.delete("/reports/:id", verifyAdmin, adminController.dismissReport); //not yet implemented
router.delete(
  "/reports/listing/:id",
  verifyAdmin,
  adminController.removeReportedListing
);
router.get("/reports/counts", verifyAdmin, adminController.getReportCounts);

module.exports = router;
