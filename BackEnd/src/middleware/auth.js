const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	if (!authHeader) {
		return res.status(401).json({ message: "Bạn chưa đăng nhập" });
	}
	const token = authHeader.split(" ")[1];
	if (!token) {
		return res.status(403).json({ message: "Token không hợp lệ" });
	}
	jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
		if (err) {
			return res.status(401).json({
				status: 401,
				message: "Token hết hạn hoặc không hợp lệ",
			});
		}
		req.user = decoded;
		next();
	});
};

module.exports = {
	verifyToken,
};
