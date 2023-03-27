/* GlobalState */
export interface GlobalState {
	token: string;
	themeConfig: ThemeConfigProps;
}

/* ThemeConfig */
export interface ThemeConfigProps {
	layout: LayoutType;
	isCollapse: boolean;
	breadcrumb: boolean;
	breadcrumbIcon: boolean;
	footer: boolean;
}

export type LayoutType = "vertical" | "classic" | "transverse" | "columns";

/* AuthState */
export interface AuthState {
	routeName: string;
	authMenuList: Menu.MenuOptions[];
}

/* keepAliveState */
export interface keepAliveState {
	keepAliveName: string[];
}
