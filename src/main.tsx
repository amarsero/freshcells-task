import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRoutes } from "./routes.tsx";
import { ErrorBoundaryWithMessage } from "./components/errorBoundaryWithMessage.tsx";
import { ApolloClientProvider } from "./providers/apolloProvider.tsx";
import "./providers/i18nProvider.tsx";
import "normalize.css";
import "sakura.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ErrorBoundaryWithMessage>
			<ApolloClientProvider>
				<AppRoutes />
			</ApolloClientProvider>
		</ErrorBoundaryWithMessage>
	</StrictMode>,
);
