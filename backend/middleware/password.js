const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();

passwordSchema.is().min(6).is().max(20).has().uppercase().has().lowercase().has().digits(1).has().not().spaces();

module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    return res.status(400).json({
      error: `Password is not strong enough to be valid : ${passwordSchema.validate("req.body.password", { list: true })}`,
    });
  }
};
