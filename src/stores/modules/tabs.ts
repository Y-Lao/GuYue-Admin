import { defineStore } from "pinia";
import { TabsState, TabsMenuProps } from "@/stores/interface";
import piniaPersistConfig from "@/config/piniaPersist";
import router from "@/routers/index";

export const TabsStore = defineStore({
	id: "TabsState",
	state: (): TabsState => ({
		tabsMenuList: []
	}),
	actions: {
		// 增加 tabs
		async addTabs(tabItem: TabsMenuProps) {
			// 是否已存在tabs
			if (this.tabsMenuList.every(t => t.path !== tabItem.path)) {
				this.tabsMenuList.push(tabItem);
			}
		},
		// 移除 tabs
		async removeTabs(tabPath: string, isCurrent: boolean = true) {
			const tabsMenuList = this.tabsMenuList;
			// 点击是否当前路由tabs
			if (isCurrent) {
				tabsMenuList.forEach((item, index) => {
					if (item.path !== tabPath) return;
					const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1];
					if (!nextTab) return;
					router.push(nextTab.path);
				});
			}
			this.tabsMenuList = tabsMenuList.filter(tab => tab.path !== tabPath);
		},
		// Close MultipleTab(关闭其他)
		async closeMultipleTab(tabsMenuValue?: string) {
			this.tabsMenuList = this.tabsMenuList.filter(tab => {
				return tab.path === tabsMenuValue || !tab.close;
			});
		},
		// Set Tabs
		async setTabs(tabsMenuList: TabsMenuProps[]) {
			this.tabsMenuList = tabsMenuList;
		},
		// Set Tabs Title
		async setTabsTitle(tabsMenuTitle: string) {
			const nowFullPath = location.hash.substring(1);
			this.tabsMenuList.forEach(item => {
				if (item.path == nowFullPath) item.title = tabsMenuTitle;
			});
		}
	},
	persist: piniaPersistConfig("TabsState")
});
