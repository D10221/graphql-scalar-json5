# GraphQL JSON5 scalar type

![Node.js Package](https://github.com/D10221/graphql-scalar-json5/workflows/Node.js%20Package/badge.svg)

## Install

```bash
yarn add @d10221/graphql-type-json5
yarn add graphql    # peer dependency
yarn add json5      # peer dependency
```

... or ...

```bash
npm i @d10221/graphql-type-json5
npm i graphql   # peer dependency
npm i json5     # peer dependency
```

### Usage

```javascript
import JSON5 from "../";
import { makeExecutableSchema } from "graphql-tools";
const schema = makeExecutableSchema({
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
```

See [tests](test/index.test.js)

### Why Consume JSON5 ?

```js
/* GraphQL */ `
# no quote scaping :)
query findStuff {  
  things(filter: "{$and:[{code:{$regex:'xxx'}},{name:{$eq:'Bob'}}]}") {
    ... on Stuff {
      _id
      name
    }
  }
}`;
```
