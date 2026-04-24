import { expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Footer } from "../src/components/footer";
import translations from "../translations.json";
import { describe } from "vitest";

describe("Footer", () => {
	test("render footer correctly", async () => {
		render(<Footer />);
		const em = screen.getByRole("emphasis");
		expect(em).toHaveTextContent("Freshcells");
	});

	test("changes language ok", async () => {
		const { container } = render(<Footer />);
		const select = container.querySelector("select") as HTMLSelectElement;
		expect(select).toBeTruthy();

		const options = [...select.children] as HTMLOptionElement[];
		expect(options.length).toBeGreaterThanOrEqual(2);
		const spanishOption = options.find(x => x.value == "es")!;
		expect(spanishOption).toBeTruthy();

		const em = screen.getByRole("emphasis");
		const translationKey = "From Agustín Marsero to Freshcells";
		expect(em).toHaveTextContent(translations.en.translation[translationKey]);

		userEvent.selectOptions(select, spanishOption);

		await waitFor(() => {
			expect(spanishOption.selected).toBeTruthy();
			expect(em).toHaveTextContent(translations.es.translation[translationKey]);
			expect(select.value).toBe("es");
		});
	});
});