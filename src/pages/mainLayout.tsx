import { Outlet } from "react-router";
import { Footer } from "../components/footer";
import { MainRedirect } from "./mainRedirect";

export const MainLayout = () => <>
	<MainRedirect />
	<Outlet />
	<Footer />
</>;