import client from "../client";
import {protectResolver} from "../users/users.utils";

export default {
    Photo: {
        user: ({userid}) => client.user.findUnique({where: {id: userid}}),
        hashtags: ({id}) =>
            client.hashtag.findMany({where: {photos: {some: {id}}}}),
        likes: ({id}) => client.like.count({where: {photoId: id}}),
    },
    Hashtag: {
        photos: protectResolver(({id}, {page}, {loggedInUser}) => {
            return client.hashtag.findUnique({where: {id}}).photos();
        }),
        totalPhotos: ({id}) =>
            client.photo.count({where: {hashtags: {some: {id}}}}),
    },
};
