export class UserService {
	static signIn(jwt: string) {
		// This should be stored in a httpOnly cookie, not here.
		localStorage.setItem("user_token", jwt);
	}
	static getUserToken() {
		return localStorage.getItem("user_token");
	}
	static signOut() {
		localStorage.removeItem("user_token");
	}
	static isLoggedIn() {
		return UserService.getUserToken() != null;
	}
	static getUserPreferences() {
		const stored = localStorage.getItem("user_preferences");
		return JSON.parse(stored ?? "{}") as UserPreferences;
	}
	static updateUserPreferences<T extends keyof UserPreferences>(key: T, value: UserPreferences[T]) {
		const prefs = this.getUserPreferences();
		prefs[key] = value;
		localStorage.setItem("user_preferences", JSON.stringify(prefs));
	}
}

export type UserPreferences = Partial<{
	language: string,
}>;