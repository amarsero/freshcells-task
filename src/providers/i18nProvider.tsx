import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "../../translations.json";
import { UserService } from "../services/userService";

export type ResourcesKeys = keyof typeof translations["en"]["translation"];

export const t = (translationKey: ResourcesKeys) => i18n.t(translationKey);

i18n
	.use(initReactI18next)
	.init({
		resources: translations,
		lng: UserService.getUserPreferences().language ?? "es",
		interpolation: {
			escapeValue: false // react already safes from xss
		}
	});

export default i18n;