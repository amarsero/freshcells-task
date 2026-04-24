import type { CodegenConfig } from "@graphql-codegen/cli";
import { API_ENDPOINT } from "./config";

const config: CodegenConfig = {
	schema: API_ENDPOINT,
	documents: ["src/**/*.tsx"],
	generates: {
		"./src/gql/": {
			preset: "client",
		},
		"./schema.graphql": {
			plugins: ["schema-ast"],
			config: {
				includeDirectives: true
			}
		}
	}
};
export default config;