const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({message: "No Token", success: false});
    }

    try {
        const decoded = jwt.varify(token, process.env.JWT_SECRET);
        
        req.user = decoded;

        next();
    } catch(error) {
        res.status(401).json({message: "token error", success: false});
    }
};