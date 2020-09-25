import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { UserResolver } from "./resolvers/UserResolver";
import { buildSchema } from "type-graphql";

async function main() {
  const connection = await createConnection()
  const schema = await buildSchema({
    resolvers: [UserResolver]
  })
  const server = new ApolloServer({ schema })
  await server.listen(4000)
  console.log("Server has started!")
}

main();
