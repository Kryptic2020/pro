module.exports = (req, res, next) => {
  if (!req.user.isActive) {
    console.log('!isActive');
		res.send('!isActive');
	}
	next();
};