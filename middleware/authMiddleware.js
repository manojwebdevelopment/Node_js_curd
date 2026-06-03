const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    try {
         const token = req.header('Authorization');
          console.log(token);

            if(!token){
                return res.status(401).json({message: "No Token", success: false});
            }

        const tokenValue = token.startsWith("Bearer ")
        ? token.split(" ")[1]
        : token;

        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        
        req.user = decoded;

        next();
    } catch(error) {
        res.status(401).json({message: "token error", success: false});
    }
};


module.exports = {authMiddleware};