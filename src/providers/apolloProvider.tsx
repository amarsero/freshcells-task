import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import type { PropsWithChildren } from "react";
import { ApolloService } from "../services/apolloService";

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: ApolloService.createApolloLink(),
});

export const ApolloClientProvider = ({ children }: PropsWithChildren) =>
	<ApolloProvider client={client}>
		{children}
	</ApolloProvider>;
