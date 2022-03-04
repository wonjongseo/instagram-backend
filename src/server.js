import "dotenv/config";
import express from "express";
import http from "http";
import {typeDefs, resolvers} from "./schema";
import {ApolloServer} from "apollo-server-express";
import {getUser} from "./users/users.utils";
import pubsub from "./pubsub";

const PORT = process.env.PORT | 4000;

// Upload 타입을 쓰기 위해선
// apollo server 가 스키마를 만들어야함.
const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    context: async (ctx) => {
        if (ctx.req) {
            return {
                loggedInUser: await getUser(ctx.req.headers.token),
            };
        } else {
            return {
                loggedInUser: ctx.connection.context.loggedInUser,
            };
        }
    },
    subscriptions: {
        onConnect: async (connectionParams, webSocket) => {
            // connectionParams of ws == headers of http

            if (!connectionParams.token) {
                throw new Error("You cannot listen.");
            }
            const loggedInUser = await getUser(connectionParams.token);
            //onConnect 에서 리턴한 값은 context 로 감
            return {
                loggedInUser,
            };
        },
    },
});

const app = express();

apollo.applyMiddleware({app});
app.use("/static", express.static("uploads"));
// ws 프트로콜을 사용할 수 있는 준비.
const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
    console.log(`🚀Server is running on http://localhost:${PORT}/graphql ✅`);
});
