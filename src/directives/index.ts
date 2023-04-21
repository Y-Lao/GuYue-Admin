import { App, Directive } from "vue";
import auth from "./modules/auth";
import copy from "./modules/copy";
import debounce from "./modules/debounce";
import longpress from "./modules/longpress";

const directivesList: { [key: string]: Directive } = {
	auth,
	copy,
	debounce,
	longpress
};

const directives = {
	install: function (app: App<Element>) {
		Object.keys(directivesList).forEach(key => {
			app.directive(key, directivesList[key]);
		});
	}
};

export default directives;
