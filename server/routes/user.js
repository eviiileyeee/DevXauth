const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { 
    register,
    login,
    deleteAllUsers,
    getAllUsers,
    getMe,
    uploadDetails,
    controllVerify
} = require('../controllers/authController');

const router = express.Router();



router.post('/register', register);
router.post('/login', login);
//router.get('/get-all-users', getAllUsers);
router.put("/uploadDetails/:id", upload.single("profileImage"), protect, uploadDetails);
router.get("/:id/verify/:token", controllVerify);
router.get('/me', protect, getMe);

module.exports = router;
