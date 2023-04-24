export type AssemblySizeType = "small" | "middle" | "large";
export type LayoutType = "vertical" | "classic" | "transverse" | "columns";
export type StyleType = "light" | "dark" | "realDark";

/* GlobalState */
export interface GlobalState {
	refreshPage: boolean;
	routeName: string;
	loading: boolean;
	assemblySize: AssemblySizeType;
	language: string;
	maximize: boolean;
	layout: LayoutType;
	primary: string;
	styleSetting: StyleType;
	isGrey: boolean;
	isWeak: boolean;
	isCollapse: boolean;
	breadcrumb: boolean;
	breadcrumbIcon: boolean;
	tabs: boolean;
	tabsIcon: boolean;
	footer: boolean;
}

/* tabsMenuProps */
export interface TabsMenuProps {
	icon: string;
	title: string;
	path: string;
	name: string;
	close: boolean;
}

/* TabsState */
export interface TabsState {
	tabsMenuList: TabsMenuProps[];
}

/* AuthState */
export interface AuthState {
	routeName: string;
	authMenuList: Menu.MenuOptions[];
	authButtonList: {
		[key: string]: string[];
	};
}

/* keepAliveState */
export interface keepAliveState {
	keepAliveName: string[];
}

/* UserState */
export interface UserState {
	token: string;
	userInfo: { name: string };
}
