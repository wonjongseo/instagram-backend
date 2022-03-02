import "dotenv/config";
import schema from "./schema";
import {ApolloServer} from "apollo-server";
import {getUser, protectResolver} from "./users/users.utils";

const PORT = process.env.PORT | 4000;

const server = new ApolloServer({
    schema,
    context: async ({req}) => {
        return {
            loggedInUser: await getUser(req.headers.authorization),
            protectResolver,
        };
    },
});

server
    .listen(PORT)
    .then(() => console.log(`Server is running on http://localhost:${PORT}/`));
