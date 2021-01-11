module.exports = (req, res, next) => {
  if (!req.user.email) {
    return res.send('There is no email registered, please register and confirm your email to continue');
	}
	next();
};