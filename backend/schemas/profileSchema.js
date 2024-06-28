
const schema = `
    type Profile {
        email: String
        error: String
    }
 
    type Query {
        getProfile: Profile!
    }
`;

module.exports = schema;