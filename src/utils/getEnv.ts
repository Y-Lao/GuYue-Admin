import fs from "fs";
import path from "path";
import dotenv from "dotenv";

export function isProdEnv(): boolean {
	return import.meta.env.PROD;
}

export function isDevEnv(): boolean {
	return import.meta.env.DEV;
}

export function isDevFn(mode: string): boolean {
	return mode === "development";
}

export function isProdFn(mode: string): boolean {
	return mode === "production";
}

/**
 * Whether to generate package preview
 */
export function isReportMode(): boolean {
	return process.env.VITE_REPORT === "true";
}

/**
 * @description 读取所有环境变量配置文件到process.env
 * @param envConf
 * */
export function wrapperEnv(envConf: Recordable): ViteEnv {
	const ret: any = {};

	for (const envName of Object.keys(envConf)) {
		let realName = envConf[envName].replace(/\\n/g, "\n");
		realName = realName === "true" ? true : realName === "false" ? false : realName;

		if (envName === "VITE_PORT") {
			realName = Number(realName);
		}
		if (envName === "VITE_PROXY") {
			try {
				realName = JSON.parse(realName);
			} catch (error) {}
		}
		ret[envName] = realName;
		process.env[envName] = realName;
	}
	return ret;
}

/**
 * Get the environment variables starting with the specified prefix
 * @param match prefix
 * @param confFiles ext
 */
export function getEnvConfig(match = "VITE_GLOB_", confFiles = [".env", ".env.production"]) {
	let envConfig = {};
	confFiles.forEach(item => {
		try {
			const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)));
			envConfig = { ...envConfig, ...env };
		} catch (error) {
			console.error(`Error in parsing ${item}`, error);
		}
	});

	Object.keys(envConfig).forEach(key => {
		const reg = new RegExp(`^(${match})`);
		if (!reg.test(key)) {
			Reflect.deleteProperty(envConfig, key);
		}
	});
	return envConfig;
}

/**
 * Get user root directory
 * @param dir file path
 */
export function getRootPath(...dir: string[]) {
	return path.resolve(process.cwd(), ...dir);
}
