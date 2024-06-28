const resolver = {
    Query: {
        verifyToken : async (_, __, context) => {
            console.log("Verifying token...");
            console.log(context);
            const authResult = context;
            const res = {status: false, error : null};
            console.log( "DDDD : ", authResult);
            if (authResult.error) {
                res.error = authResult.error;
                return res;
            }
            res.status = true;
            return res;
        }
    },
}

module.exports = resolver;

