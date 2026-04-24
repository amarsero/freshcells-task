import { useT } from "../hooks/useTranslation";
import { UserService } from "../services/userService";

export const Footer = () => {
	const [t, i18n] = useT();
	const handleLanguageSelect = async (lang: string) => {
		await i18n.changeLanguage(lang);
		UserService.updateUserPreferences("language", lang);
	};
	return <div className="footer">
		<em><small>{t("From Agustín Marsero to Freshcells")}</small></em>
		<select onChange={e => handleLanguageSelect(e.target.value)} value={i18n.language}>
			<option value="es">Español&nbsp;&nbsp;🇦🇷</option>
			<option value="en">English&nbsp;&nbsp;&nbsp;🇬🇧</option>
		</select>
	</div>;
};