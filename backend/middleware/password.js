const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(6) // Minimum length 6
  .is()
  .max(20) // Maximum length 20
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 1 digit
  .has()
  .not()
  .spaces(); // Should not have spaces

module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    return res.status(400).json({
      error: `Password is not strong enough to be valid : ${passwordSchema.validate(
        "req.body.password",
        { list: true }
      )}`,
    });
  }
};
