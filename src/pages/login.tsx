import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { LoginDocument } from "../gql/graphql";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { useNavigate } from "react-router";
import { Footer } from "../components/footer";
import { useT } from "../hooks/useTranslation";
import { UserService } from "../services/userService";
import { ApolloService } from "../services/apolloService";

export const Login = () => {
	const [showValidation, setShowValidation] = useState(false);
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [loginMutation, { loading, data, error, client }] = useMutation(LoginDocument);
	const [t] = useT();
	const navigate = useNavigate();

	const isLoading = Boolean(loading || data);

	const tryLogin = () => {
		if (isLoading) {
			return;
		}
		if (getFormErrorMessage()) {
			setShowValidation(true);
			return;
		}
		const doLogin = async () => {
			const res = await loginMutation({ variables: { input: { identifier: email!, password: password! } } });
			if (res.data && !res.error) {
				UserService.signIn(res.data.login.jwt);
				ApolloService.updateAuthorization(client);
				navigate("/account");
			}
		};
		doLogin();
	};

	const getFormErrorMessage = () => {
		if (!email?.length || !password?.length) {
			return t("You must enter an email and password");
		}
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		if (!emailRegex.test(email)) {
			return t("You must enter a valid email");
		}
	};

	const getErrorMessage = () => {
		if (showValidation) {
			const errorMessage = getFormErrorMessage();
			if (errorMessage) {
				return errorMessage;
			}
		}
		if (error) {
			if (CombinedGraphQLErrors.is(error) && error.errors.some(x => x.message == "Bad Request")) {
				return t("Incorrect email or password");
			}
			return t("The service is currently unavailable. Please try again later.");
		}
	};

	const displayMessage = !isLoading && getErrorMessage();
	return <>
		<h1>
			{t("Sign in")}
		</h1>
		<form>
			<label htmlFor="email">{t("Email")}:</label>
			<input type="text" id="email" placeholder="jdoe@company.com" onChange={e => setEmail(e.target.value)} ></input>
			<label htmlFor="password">{t("Password")}:</label>
			<input type="password" id="password" onChange={e => setPassword(e.target.value)} ></input>
			<br />
			{displayMessage &&
				<div className="alert">
					{displayMessage}
				</div>
			}
			<button type="button" disabled={isLoading} onClick={tryLogin}>{t("Sign in")} {isLoading && <span className="spinner"></span>}</button>
		</form >
		<Footer />
	</>;
};
