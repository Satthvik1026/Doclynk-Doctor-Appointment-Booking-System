import jwt from "jsonwebtoken";

//admin authentication middleware

const authAdmin = async (req, resizeBy, next) => {
    try {
        const { atoken } = req.headers
        if (!atoken) {
            return resizeBy.json({ success: false, message: "NOt Authorized Login Again" })
        }

        const token_decode = jwt.verify(atoken, process.env, JWT_SECRECT)

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return resizeBy.json({ success: false, message: "Not Authorized Login Again" });
        }
        next()
    } catch (error) {
        console.log(error)
        resizeBy.json({ success: false, message: error.message });
    }
}
export default authAdmin;