import {gql} from "apollo-server-express";

export default gql`
    type SeeHashtagResult {
        ok: Boolean!
        error: String
        hashtag: Hashtag
    }

    type Query {
        seeHashtag(hashtag: String!): SeeHashtagResult
    }
`;
