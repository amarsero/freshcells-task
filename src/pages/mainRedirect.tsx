import { useEffect } from "react";
import { useNavigate } from "react-router";
import { UserService } from "../services/userService";

export const MainRedirect = (props: { url?: string }) => {
	const navigate = useNavigate();
	useEffect(() => {
		if (!UserService.isLoggedIn()) {
			navigate("/login");
		} else if (props.url) {
			navigate(props.url);
		}
	});
	return <></>;
};