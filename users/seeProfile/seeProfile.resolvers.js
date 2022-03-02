import client from "../../client";

export default {
    Query: {
        seeProfile: async (_, {username}) => {
            const user = await client.user.findFirst({where: {username}});
            return {
                user,
                ok: true,
            };
        },
    },
};
