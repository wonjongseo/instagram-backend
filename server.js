import "dotenv/config";
import express from "express";
import logger from "morgan";

import {typeDefs, resolvers} from "./schema";
import {ApolloServer} from "apollo-server-express";
import {getUser} from "./users/users.utils";

const PORT = process.env.PORT | 4000;

// Upload 타입을 쓰기 위해선
// apollo server 가 스키마를 만들어야함.
const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        return {
            loggedInUser: await getUser(req.headers.authorization),
        };
    },
});

const app = express();

app.use(logger("dev"));
apollo.applyMiddleware({app});
app.use("/static", express.static("uploads"));
app.listen({port: PORT}, () => {
    console.log(`🚀Server is running on http://localhost:${PORT}/graphql ✅`);
});
