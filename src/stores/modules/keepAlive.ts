import { defineStore } from "pinia";
import { keepAliveState } from "@/stores/interface";

export const KeepAliveStore = defineStore({
	id: "keepAliveStore",
	state: (): keepAliveState => ({
		keepAliveName: []
	}),
	actions: {}
});
