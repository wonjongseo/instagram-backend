import {gql} from "apollo-server-express";

export default gql`
    type Photo {
        id: Int!
        user: User!
        file: String!
        caption: String
        likes: Int!
        hashtags: [Hashtag]
        commentNumber: Int!
        comments: [Comment]
        createAt: String!
        updateAt: String!
        isMine: Boolean!
        isLiked: Boolean!
    }
    type Hashtag {
        id: Int!
        hashtag: String!
        photos(page: Int!): [Photo]
        totalPhotos: Int!
        createAt: String!
        updateAt: String!
    }
    type Like {
        id: Int!
        createAt: String!
        updateAt: String!
        photo: Photo
    }
`;
