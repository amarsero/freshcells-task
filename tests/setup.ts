import { afterEach,  } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import i18n from "../src/providers/i18nProvider";

i18n.setDefaultNamespace("translation");
i18n.changeLanguage("en");

afterEach(() => {
	cleanup();
	i18n.changeLanguage("en");
});