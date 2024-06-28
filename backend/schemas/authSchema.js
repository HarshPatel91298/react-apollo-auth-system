
const schema = `
    type Login {
        email: String!
        password: String!
    }

    input Login {
        email: String!
        password: String!
    }
   
    type Auth {
        token: String
        status: Boolean
        emailError: String
        passwordError: String
    }
        
    type Query {
        login(input: Login!): Auth!
    }

    input Register {
        email: String!
        password: String!
    }

    type RegisterResponse {
       status: Boolean!
       Error: String!
    }

    type Mutation {
        doRegister(input: Register!): RegisterResponse!
    }
`;


module.exports = schema;