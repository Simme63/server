const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    console.log(`Token: ${token}`, authHeader);

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.log("AUTH ERROR");
        next();
    }
}
