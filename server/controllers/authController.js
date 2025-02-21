const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');
const Token = require('../models/token');
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto")

// Generate JWT Token
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register user
exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const profileImage = "https://tse3.mm.bing.net/th?id=OIP.JttmcrrQ9_XqrY60bFEfgQHaHa&pid=Api&P=0&h=180";

    // Check for missing fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email or username already exists'
      });
    }

    // Create new user (password will be hashed by pre-save middleware)
    const newUser = new User({
      username,
      password,
      email,
      profileImage
    });
    const NewUser = await newUser.save();


    const token = new Token({
      userId: NewUser._id,
      token: crypto.randomBytes(32).toString('hex'),
    });
    await token.save();

    const verificationLink = `${process.env.CLIENT_URL}/verify/${token.token}`;
    await sendEmail(
      NewUserUser.email,
      'Email Verification',
      `Click the link to verify your email: ${verificationLink}`,
      `<p>Click the link to verify your email: <a href="${verificationLink}">Verify Email</a></p>`
    );

    res.status(201).json({ message: 'User registered successfully , check mail for validation' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      message: 'Server error during registration',
      error: error.message
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide email and password.'
      });
    }

    // Find user by email and explicitly select password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password using the method from User model
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Remove password from response
    user.password = undefined;

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        notification:
        {
          id: uuidv4(),
          type: 'security',
          title: 'New login detected',
          message: 'A new login was detected from Chrome on Windows.',
          timestamp: new Date().toISOString(),
          read: false,
          icon: 1
        }
      },
      token,
    });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      message: 'Server error during login',
      error: error.message
    });
  }
};





exports.uploadDetails = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  let session;

  console.log("🔹 Received user data:", userData);
  console.log("🔹 Uploaded file:", req.file?.originalname ?? "No file uploaded");

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findById(id).session(session);
    if (!user) {
      throw new Error("User not found");
    }

    let imageUrl = user.profileImage || null;

    if (req.file) {
      try {
        // Delete old image if it exists and is a valid URL
        if (imageUrl && typeof imageUrl === 'string' && imageUrl.includes('cloudinary')) {
          const oldImageId = imageUrl.split("/").pop().split(".")[0];
          await deleteFromCloudinary(oldImageId);
        }

        // Upload new image
        const result = await uploadToCloudinary(req.file.path);
        if (!result?.url) {
          throw new Error("Cloudinary upload failed");
        }
        imageUrl = result.url;
        console.log("✅ New image uploaded:", imageUrl);
      } catch (uploadError) {
        console.error("❌ Cloudinary upload error:", uploadError);
        throw new Error(`Image upload failed: ${uploadError.message}`);
      } finally {
        // Clean up uploaded file
        if (req.file.path && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        ...user.toObject(),
        ...userData,
        profileImage: imageUrl
      },
      { new: true, session }
    );

    await session.commitTransaction();
    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error("❌ Error:", error);
    await session?.abortTransaction();

    if (error.message === "User not found") {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(500).json({
        message: "Update failed",
        error: error.message
      });
    }

  } finally {
    await session?.endSession();
  }
};



exports.getMe = async (req, res) => {
  try {
    console.log("inside getMe");
    console.log(req.user)
    // Find the user by ID, which is available in req.userId from the middleware
    const user = await User.findById(req.user._id).select('-password'); // Exclude the password from the response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user); // Send the user data
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.controllVerify = async (req, res) => {
  try {
    const { id, token } = req.params;

    // Find user
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Find token
    const tokenRecord = await Token.findOne({ userId: id, token });
    if (!tokenRecord) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Verify user
    user.verified = true;
    await user.save();

    // Remove token after verification
    await Token.findByIdAndDelete(tokenRecord._id);

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};