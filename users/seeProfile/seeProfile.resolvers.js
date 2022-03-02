import client from "../../client";

export default {
    Query: {
        seeProfile: async (_, {username}) => {
            const user = await client.user.findFirst({
                where: {username},
                include: {
                    followers: true,
                    following: true,
                },
            });
            return {
                user,
                ok: true,
            };
        },
    },
};
