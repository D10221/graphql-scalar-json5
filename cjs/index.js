"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const language_1 = require("graphql/language");
const json5_1 = __importDefault(require("json5"));
/** */
exports.default = new graphql_1.GraphQLScalarType({
    name: "JSON5",
    description: "`JSON5` scalar type, see [JSON5](https://spec.json5.org).",
    serialize: json5_1.default.stringify,
    parseValue: json5_1.default.parse,
    /**
     * @param {import("graphql").ASTNode | any} ast
     */
    parseLiteral: (ast, variables) => {
        switch (ast.kind) {
            case language_1.Kind.VARIABLE:
                return ((variables && json5_1.default.parse(variables[ast.name.value])) || undefined);
            default: {
                return json5_1.default.parse(ast.value);
            }
        }
    },
});
