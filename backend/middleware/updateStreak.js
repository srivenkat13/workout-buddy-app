const User = require("../models/userModel");

const updateStreak = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const today = new Date().setHours(0, 0, 0, 0);
    const lastLogin = new Date(user.lastLogin).setHours(0, 0, 0, 0);

    if (today !== lastLogin) {
      if (today - lastLogin === 86400000) {
        user.streak += 1;
      } else {
        user.streak = 1;
      }
      user.lastLogin = new Date();
      user.loginDates.push(new Date())
      await user.save();
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Cannot Update  Streak" });
  }
};

module.exports = updateStreak;
