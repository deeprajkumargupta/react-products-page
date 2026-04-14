import { Router } from 'express'
import { loginUser, registerUser } from '../controllers/auth.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(verifyJWT, (req, res) => {
    res.status(200).json({
        message: "User profile fetched successfully",
        user: req.user
    });
});

export default router;