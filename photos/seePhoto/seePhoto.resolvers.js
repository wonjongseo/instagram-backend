import client from "../../client";

export default {
    Query: {
        seePhoto: async (_, {id}) => {
            const photo = await client.photo.findUnique({where: {id}});
            return {
                ok: true,
                photo,
            };
        },
    },
};
