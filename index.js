import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import JSON5 from "json5";
/** */
export default new GraphQLScalarType({
  name: "JSON5",
  description: "`JSON5` scalar type, see [JSON5](https://spec.json5.org).",
  serialize: JSON5.stringify,
  parseValue: JSON5.parse,
  /**
   * @param {import("graphql").ASTNode | any} ast
   */
  parseLiteral: (ast, variables) => {
    switch (ast.kind) {
      case Kind.VARIABLE:
        return (
          (variables && JSON5.parse(variables[ast.name.value])) || undefined
        );
      default: {
        return JSON5.parse(ast.value);
      }
    }
  },
});
