import {gql} from "apollo-server-express";

export default gql`
    # real time
    # roomUpdate 를 요청하면 메시지를 받음
    type Subscription {
        roomUpdates(id: Int!): Message
    }
`;
