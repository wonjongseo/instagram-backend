import {gql} from "apollo-server";

export default gql`
    type LoginResult {
        token: String
        error: String
        ok: Boolean!
    }

    type Mutation {
        login(username: String!, password: String!): LoginResult
    }
`;
