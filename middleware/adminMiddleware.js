
export const isAdmin = async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // user is admin
    } else {
        res.status(403).json({ message: "Access denied. Admin only." });
    }
}