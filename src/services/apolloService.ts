import { ApolloClient, HttpLink } from "@apollo/client";
import { API_ENDPOINT } from "../../config";
import { UserService } from "./userService";

export class ApolloService {
	static createApolloLink = () => {
		const token = UserService.getUserToken();
		const headers: Record<string, string> = {};
		if (token?.length) {
			headers["Authorization"] = "Bearer " + token;
		}
		return new HttpLink({
			uri: API_ENDPOINT,
			headers,
		});
	};
	static updateAuthorization = (client: ApolloClient) => {		
		client.setLink(ApolloService.createApolloLink());
	};
}