import {hash} from "bcrypt";
import client from "../../client";
import {protectResolver} from "../../users/users.utils";

export default {
    Mutation: {
        uploadPhoto: protectResolver(
            async (_, {file, caption}, {loggedInUser}) => {
                let hashtagObj = [];
                if (caption) {
                    const hashtags = caption.match(/#[\w]+/g);
                    hashtagObj = hashtags.map((hashtag) => ({
                        where: {hashtag: hashtag},
                        create: {hashtag: hashtag},
                    }));
                }

                return await client.photo.create({
                    data: {
                        file,
                        caption,
                        user: {
                            connect: {
                                id: loggedInUser.id,
                            },
                        },
                        ...(hashtagObj?.length > 0 && {
                            hashtags: {
                                connectOrCreate: hashtagObj,
                            },
                        }),
                    },
                });
            }
        ),
    },
};
