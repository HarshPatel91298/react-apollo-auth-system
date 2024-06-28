const { doLoginDB, doRegisterDB } = require('../server/dbserver');


const resolver = {
    Query: {
        login : async (_, {input}) => {
            console.log("Logging in user");
            console.log(input);
            const result = await doLoginDB(input);
            return result;
        }
    },

    Mutation: {
        doRegister: async (_, {input}) => {
            console.log("Registering user");
            const result = await doRegisterDB(input);
            console.log("RES : ", result);
            return result;
        },
    }
}

module.exports = resolver;

