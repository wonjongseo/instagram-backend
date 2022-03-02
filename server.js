import "dotenv/config";
import {typeDefs, resolvers} from "./schema";
import {ApolloServer} from "apollo-server";
import {getUser} from "./users/users.utils";

const PORT = process.env.PORT | 4000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        return {
            loggedInUser: await getUser(req.headers.authorization),
        };
    },
});

server
    .listen(PORT)
    .then(() => console.log(`Server is running on http://localhost:${PORT}/`));
