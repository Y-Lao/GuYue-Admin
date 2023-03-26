/* GlobalState */
export interface GlobalState {
	token: string;
	themeConfig: ThemeConfigProps;
}

/* ThemeConfig */
export interface ThemeConfigProps {
	layout: LayoutType;
	isCollapse: boolean;
}

export type LayoutType = "vertical" | "classic" | "transverse" | "columns";

/* AuthState */
export interface AuthState {
	routeName: string;
	authMenuList: Menu.MenuOptions[];
}
