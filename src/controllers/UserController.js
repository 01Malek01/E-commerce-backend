import User from "../models/UserModel.js";
export const getProfile = async (req, res) => {
  try {
    const sessionId = req.session.userId;
    const user = await User.findOne({ superTokenId: sessionId }).select(
      "-password -cart -email -superTokenId"
    );
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const updateProfile = async (req, res) => {
  try {
    const sessionId = req.session.userId;
    const user = await User.findOne({ superTokenId: sessionId });
    if (user) {
      user.name = req.body.name;
      user.address = req.body.address;
      user.city = req.body.city;
      user.country = req.body.country;
      const updatedUser = await user.save();
      res.json(updatedUser);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
