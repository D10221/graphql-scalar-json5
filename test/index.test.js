import {
  graphql,
  GraphQLObjectType,
  GraphQLSchema,
  Kind,
  GraphQLError,
} from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import JSON5 from "../";
import json5 from "json5";

const schema1 = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    scalar JSON5
    type Query {
      value(params: JSON5): JSON5
    }
  `,
  resolvers: {
    JSON5,
    Query: {
      value(parent, args, context, info) {
        return args.params;
      },
    },
  },
});
const schema2 = new GraphQLSchema({
  types: [JSON5],
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      value: {
        type: JSON5,
        args: {
          params: {
            type: JSON5,
          },
        },
        resolve(source, args, context, info) {
          return args.params;
        },
      },
    },
  }),
});

describe("JSON", () => {
  it("works #1", async () => {
    expect(
      await graphql(
        schema1,
        /* GraphQL */ `
          query {
            value(params: "{ x: 'y'}")
          }
        `,
      ),
    ).toMatchObject({
      data: { value: json5.stringify({ x: "y" }) },
    });
  });
  it("works #2", async () => {
    expect(
      await graphql(
        schema2,
        /* GraphQL */ `
          query {
            value(params: "{ x: 'y'}")
          }
        `,
      ),
    ).toMatchObject({
      data: { value: json5.stringify({ x: "y" }) },
    });
  });
  it("rejects what json5 can't parse", async () => {
    const { errors } = await graphql(
      schema1,
      /* GraphQL */ `
        query {
          value(params: {})
        }
      `,
    );
    expect(errors[0]).toBeInstanceOf(GraphQLError);
  });
});
