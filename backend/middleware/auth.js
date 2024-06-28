const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

const authMiddleware = (req) => {
    console.log(req.headers);
    const authHeader = req.headers.authorization;
    const result = { data: null, error: null }
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (token) {
            try {
                console.log("Token : ", token);
                const data = jwt.verify(token, process.env.JWT_SECRET);
                result.data = data;
            } catch (e) {
                result.error = 'Invalid/Expired token';
            }
        } else {
            result.error = 'Authentication token must be \'Bearer';
        }
    } else {
        result.error = 'Authorization header must be provided';
    }
    console.log(result);
    return result;
};

module.exports = authMiddleware;
