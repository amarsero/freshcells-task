import { expect, test } from "vitest";
import { UserService } from "../src/services/userService";
import { describe } from "vitest";

describe("User service", () => {
	test("persist user preferences", async () => {
		const userPreferenceBefore = UserService.getUserPreferences().language;
		expect(userPreferenceBefore).toBeUndefined();

		const newUserPreference = "es";
		UserService.updateUserPreferences("language", newUserPreference);

		const userPreferenceAfter = UserService.getUserPreferences().language;
		expect(userPreferenceAfter).toBe(userPreferenceAfter);
	});

	test("should sign in and sign out", () => {
		expect(UserService.isLoggedIn()).toBe(false);
		const fakeToken = "token";

		UserService.signIn(fakeToken);		
		expect(UserService.isLoggedIn()).toBe(true);
		expect(UserService.getUserToken()).toBe(fakeToken);

		UserService.signOut();
		expect(UserService.isLoggedIn()).toBe(false);
		expect(UserService.getUserToken()).not.toBe(fakeToken);
	});
});