import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { ErrorBoundaryWithMessage } from "../src/components/errorBoundaryWithMessage";
import { describe } from "vitest";

describe("Error boundary", () => {
	test("shows message when broken", async () => {
		const BrokenComponent = () => {
			const brokenFunc = () => { throw new Error("Error"); };
			brokenFunc();
			return <div>ok</div>;
		};
		const { container } = render(
			<ErrorBoundaryWithMessage>
				<BrokenComponent />
			</ErrorBoundaryWithMessage>);
		const alerts = container.getElementsByClassName("alert");
		expect(alerts.length).toBe(1);
		const alert = alerts[0];
		expect(alert).toHaveTextContent("An unknown error occurred");
	});

	test("shows children when ok", async () => {
		const OkComponent = () => <div></div>;
		const { container } = render(
			<ErrorBoundaryWithMessage>
				<OkComponent />
			</ErrorBoundaryWithMessage>
		);
		const alerts = container.getElementsByClassName("alert");
		expect(alerts.length).toBe(0);
	});
});