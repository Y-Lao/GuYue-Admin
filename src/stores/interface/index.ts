// GlobalState
export interface GlobalState {
	token: string;
}

/* AuthState */
export interface AuthState {
	routeName: string;
	authMenuList: Menu.MenuOptions[];
}
