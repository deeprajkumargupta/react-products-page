import { Router } from 'express'
import { loginUser, registerUser } from '../controllers/auth.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(verifyJWT, (req, res) => {
    res.status(200).json(
        new ApiResponse(200, { user: req.user }, "User profile fetched successfully")
    );
});

export default router;