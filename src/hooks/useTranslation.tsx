import { useTranslation } from "react-i18next";
import { ResourcesKeys } from "../providers/i18nProvider";

export const useT = () => {
	const [t, i18n] = useTranslation();
	return [t as (translationKey: ResourcesKeys) => string, i18n] as const;
};