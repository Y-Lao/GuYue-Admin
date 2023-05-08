import { defineStore } from "pinia";
import { UserState } from "@/stores/interface";
import piniaPersistConfig from "@/config/piniaPersist";

export const useUserStore = defineStore({
	id: "guyue-user",
	state: (): UserState => ({
		token: "",
		userInfo: { name: "GuYue" }
	}),
	getters: {},
	actions: {
		// Set Token
		setToken(token: string) {
			this.token = token;
		},
		// Set setUserInfo
		setUserInfo(userInfo: UserState["userInfo"]) {
			this.userInfo = userInfo;
		}
	},
	persist: piniaPersistConfig("guyue-user")
});
