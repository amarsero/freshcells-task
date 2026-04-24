import { BrowserRouter, Routes, Route } from "react-router";
import { NotFound404 } from "./pages/notFound404.tsx";
import { Login } from "./pages/login.tsx";
import { Account } from "./pages/account.tsx";
import { MainLayout } from "./pages/mainLayout.tsx";
import { MainRedirect } from "./pages/mainRedirect.tsx";


export const AppRoutes = () =>
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<MainRedirect url="/account" />} />
			<Route path="/login" element={<Login />} />
			<Route element={<MainLayout />}>
				<Route path="/account" element={<Account />} />
				<Route path="*" element={<NotFound404 />} />
			</Route>
		</Routes>
	</BrowserRouter>;