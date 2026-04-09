import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const verifyJWT = async (req, res, next) => {
    try {
        // 1. Get token
        const token = req.headers.authorization.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        // 2. Verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        // 3. Get user from DB
        const user = await User.findById(decodedToken?.id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }

        // 4. Attach user to request
        req.user = user;

        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access Token")
    }
}