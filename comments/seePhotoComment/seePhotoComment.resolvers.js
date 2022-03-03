import client from "../../client";

export default {
    Query: {
        seePhotoComment: async (_, {photoId}) => {
            try {
                const comments = await client.comment.findMany({
                    where: {photoId},
                    orderBy: {
                        createAt: "asc",
                    },
                });

                console.log(comments);

                return {
                    ok: true,
                    comments,
                };
            } catch (error) {
                return {
                    error,
                    ok: false,
                };
            }
        },
    },
};
