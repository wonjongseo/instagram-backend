import {gql} from "apollo-server-express";

export default gql`
    type SeePhotoCommentResult {
        ok: Boolean!
        error: String
        comments: [Comment]
    }

    type Query {
        seePhotoComment(photoId: Int!): SeePhotoCommentResult!
    }
`;
