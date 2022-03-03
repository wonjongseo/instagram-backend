import client from "../../client";
import {protectResolver} from "../../users/users.utils";

export default {
    Mutation: {
        deletePhoto: protectResolver(async (_, {photoId}, {loggedInUser}) => {
            const photo = await client.photo.findFirst({
                where: {
                    id: photoId,
                },
                select: {userId: true},
            });
            try {
                if (!photo) {
                    return {
                        ok: false,
                        error: "Photo not found.",
                    };
                } else if (photo.userId !== loggedInUser.id) {
                    return {
                        ok: false,
                        error: "Not authorized",
                    };
                } else {
                    await client.photo.delete({
                        where: {id: photoId},
                    });
                }

                return {
                    ok: true,
                };
            } catch (error) {
                return {
                    error,
                    ok: false,
                };
            }
        }),
    },
};
