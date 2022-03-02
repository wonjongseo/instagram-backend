import {gql} from "apollo-server-express";

export default gql`
    type SearchPhotosResult {
        photos: [Photo]
        ok: Boolean!
        error: String
    }
    type Query {
        searchPhotos(keyword: String!): SearchPhotosResult!
    }
`;
