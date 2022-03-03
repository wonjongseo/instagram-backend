import client from "../../client";
import {protectResolver} from "../../users/users.utils";

export default {
    Query: {
        seeFeed: protectResolver(async (_, __, {loggedInUser}) => {
            try {
                const feeds = await client.photo.findMany({
                    where: {
                        OR: [
                            {
                                user: {
                                    followers: {
                                        some: {
                                            id: loggedInUser.id,
                                        },
                                    },
                                },
                            },
                            {
                                userId: loggedInUser.id,
                            },
                        ],
                    },
                    orderBy: {
                        createAt: "desc",
                    },
                });

                return {
                    ok: true,
                    feeds,
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
