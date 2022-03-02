import {ApolloServer, gql} from "apollo-server";

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => "bebe",
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server
    .listen()
    .then(() => console.log("Server is running on http://localhost:4000/"));

/*
    npm i apollo-server graphql
npm i nodemon --save-dev

in  babel.config.json

{
  "presets": ["@babel/preset-env"]
}
*/
