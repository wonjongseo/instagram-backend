import client from "../../client";

export default {
    Query: {
        seeHashtag: async (_, {hashtag}) => {
            try {
                const hashtag = await client.hashtag.findUnique({
                    where: {hashtag},
                });

                return {
                    hashtag,
                    ok: true,
                };
            } catch (error) {
                return {
                    error,
                    ok: true,
                };
            }
        },
    },
};
