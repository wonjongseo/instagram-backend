import "dotenv/config";
import schema from "./schema";
import {ApolloServer, gql} from "apollo-server";

const PORT = process.env.PORT | 4000;

const server = new ApolloServer({
    schema,
});

server
    .listen(PORT)
    .then(() => console.log(`Server is running on http://localhost:${PORT}/`));
