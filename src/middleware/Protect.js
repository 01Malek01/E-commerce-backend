import User from "../models/UserModel.js";
import Session from "supertokens-node";

const protect = async (req, res, next) => {
  try {
    const sessionId = req.session.getUserId();
    const user = await User.findOne({ superTokenId: sessionId });
    if (!user) {
      req.session.destroy();
      await Session.revokeSession(req.session.getHandle());
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
export default protect;
