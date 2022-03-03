import client from "../../client";

export default {
    Query: {
        seePhotoLikes: async (_, {id}) => {
            try {
                const likes = await client.like.findMany({
                    where: {photoId: id},
                    select: {user: true},
                });
                const users = likes.map((like) => like.user);

                return {
                    ok: true,
                    users,
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
