import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { DEBUG_BUILD } from "../../config";
import { useT } from "../hooks/useTranslation";
import { FC, PropsWithChildren } from "react";

export const ErrorBoundaryWithMessage: FC<PropsWithChildren> = ({ children }) =>
	<ErrorBoundary FallbackComponent={UnknownError}>
		{children}
	</ErrorBoundary>;

export const UnknownError = ({ error }: FallbackProps) => {
	const [t] = useT();
	const isDebug = DEBUG_BUILD;
	return <>
		<div className="alert">
			{t("An unknown error occurred. Please reload the webpage.")}
		</div>
		<button type="button" onClick={() => window.location.reload()}>{t("Refresh")}</button>
		{isDebug && <details>
			<summary>{t("Error")}</summary>
			<pre>{JSON.stringify(error, Object.getOwnPropertyNames(error), 4)}</pre>
		</details>}
	</>;
};