
const schema = `
    type AuthResponse {
        status: Boolean
        error: String
    }
 
    type Query {
        verifyToken: AuthResponse!
    }
`;

module.exports = schema;