import { useQuery } from "@apollo/client/react";
import { GetMeDocument, GetUserDocument } from "../gql/graphql";
import { useT } from "../hooks/useTranslation";
import { UserService } from "../services/userService";
import { useNavigate } from "react-router";
import { ApolloService } from "../services/apolloService";

export const Account = () => {
	const [t] = useT();
	const navigate = useNavigate();
	const { loading: loadingMe, error: errorMe, data: meData, client } = useQuery(GetMeDocument);
	const { loading: loadingData, error: errorData, data: userData } = useQuery(
		GetUserDocument,
		{
			skip: meData?.me?.id === undefined,
			variables: { id: meData?.me?.id.toString() ?? "" },
		});

	const handleLogout = () => {
		UserService.signOut();
		ApolloService.updateAuthorization(client);
		navigate("/login");
	};

	const isLoading = loadingData || loadingMe;
	const isError = Boolean(errorData || errorMe);

	return <>
		<h1>
			{t("Account Info")}
		</h1>
		{isLoading && <div className="spinner big-font"></div>}
		{isError &&
			<div className="alert">{t("There was an error loading the page. Please try again later.")}</div>}
		{!isLoading && !isError &&
			<>
				<label>{t("First name")}</label>
				<input disabled value={userData?.user?.firstName ?? ""} />
				<label>{t("Last name")}</label>
				<input disabled value={userData?.user?.lastName ?? ""} />
				<br />
			</>
		}
		{!isLoading &&
			<button type="button" onClick={handleLogout}>{t("Sing out")}</button>
		}
	</>;
};