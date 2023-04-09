/* GlobalState */
export interface GlobalState {
	token: string;
	assemblySize: AssemblySizeType;
	language: string;
	themeConfig: ThemeConfigProps;
}

/* ThemeConfig */
export interface ThemeConfigProps {
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

export type AssemblySizeType = "small" | "middle" | "large";
export type LayoutType = "vertical" | "classic" | "transverse" | "columns";
export type StyleType = "light" | "dark" | "realDark";

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
}

/* keepAliveState */
export interface keepAliveState {
	keepAliveName: string[];
}
