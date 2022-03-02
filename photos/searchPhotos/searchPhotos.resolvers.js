import client from "../../client";

export default {
    Query: {
        searchPhotos: async (_, {keyword}) => {
            try {
                const photos = await client.photo.findMany({
                    where: {
                        caption: {
                            startsWith: keyword,
                        },
                    },
                });

                return {
                    photos,
                    ok: true,
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
