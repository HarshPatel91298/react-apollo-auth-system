const { getProfile } = require('../server/dbserver');


const resolver = {
    Query: {
        getProfile : async (_, __, context) => {
            console.log("Getting profile...");
            console.log(context);
            const authResult = context;
            const res = {email: null, error : null};
            console.log( "DDDD : ", authResult

                
            );
            if (authResult.error) {
                res.error = authResult.error;
                return res;
            }

            const input = {email: authResult.data.email};

            const result = await getProfile(input);
            res.email = result.email ? result.email : null;
            return res;
        }
    },
}

module.exports = resolver;

