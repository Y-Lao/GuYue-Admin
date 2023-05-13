import { isDevEnv } from "../getEnv";
import { isObject, isNullOrUnDef } from "../is";
import dayjs from "dayjs";
import type { Cache } from "./type";
import { StorageType } from "@/enums/cache";
import { decryption, encryption } from "../crypto";

const lsMap = new Map();
const ssMap = new Map();
/* 定义了一个 WebStorage 类，用于操作 localStorage 和 sessionStorage */
class WebStorage {
	private storage: Storage;
	private hasEncrypt: boolean;
	private KEY: string;
	private expire: null | number;

	constructor({
		storage = sessionStorage,
		hasEncrypt = true,
		key = "",
		expire
	}: {
		storage?: Storage;
		hasEncrypt?: boolean;
		key?: string;
		expire?: number | null;
	}) {
		this.storage = storage;
		this.hasEncrypt = isDevEnv() ? false : hasEncrypt;
		this.KEY = key;
		this.expire = expire || null;
	}

	// 获取存储在 storage 中的值
	get(key?: any) {
		// 获取存储的值
		const val = this.storage.getItem(this.KEY);
		// 如果值不存在，返回 null
		if (!val) return null;
		// 解密存储的值
		const desVal = this.hasEncrypt ? decryption(val) : val;
		// 将解密后的值转换为对象
		const data = JSON.parse(desVal);
		// 获取 value 和 expire 属性
		const { value, expire } = data;
		// 如果 expire 不存在或者大于等于当前时间，返回 value
		if (isNullOrUnDef(expire) || expire >= dayjs().valueOf()) {
			// 如果 value 是对象并且 key 存在，返回 value[`cacheKey-${key}`]
			if (isObject(value) && !isNullOrUnDef(key)) return value[`cacheKey-${key}`];
			// 否则返回 value
			else return value;
		}
		// 如果 expire 存在且小于当前时间，移除存储的值
		this.remove();
	}

	set(value: string | number | object | [] | null, objectKey?: any) {
		let cacheValue;
		// 如果 objectKey 存在，将 value 存储到对象中
		if (!isNullOrUnDef(objectKey)) {
			const tempCache = isObject(this.get()) ? this.get() : {};
			tempCache[`cacheKey-${objectKey}`] = value;
			cacheValue = tempCache;
		} else {
			cacheValue = value;
		}
		// 将 value 和 expire 存储到对象中
		const data = JSON.stringify({
			value: cacheValue,
			expire: !isNullOrUnDef(this.expire) ? dayjs().valueOf() + this.expire * 1000 : null
		});
		// 加密存储的值
		const encData = this.hasEncrypt ? encryption(data) : data;
		// 将加密后的值存储到 storage 中
		this.storage.setItem(this.KEY, encData);
	}

	// 从 storage 中移除值
	remove() {
		this.storage.removeItem(this.KEY);
	}
}
/* 根据传入的 Cache 配置创建 WebStorage 实例 */
export function createCacheStorage(cacheConfig: Cache): WebStorage {
	// 如果 type 为 LOCAL，创建 localStorage 的 WebStorage 实例
	if (cacheConfig.type === StorageType.LOCAL) {
		return createLocalStorage(cacheConfig);
	}
	// 如果 type 为 SESSION，创建 sessionStorage 的 WebStorage 实例
	else if (cacheConfig.type === StorageType.SESSION) {
		return createSessionStorage(cacheConfig);
	}
	// 如果 type 既不是 LOCAL 也不是 SESSION，抛出错误
	else {
		throw new Error("Invalid storage type");
	}
}
/* 创建 localStorage 的 WebStorage 实例 */
const createLocalStorage = ({ hasEncrypt = true, key, expire = null }: Cache): WebStorage => {
	// 如果 key 不存在，抛出错误
	if (!key) throw new Error("please enter the Key");

	// 如果已经存在相同 key 的 WebStorage 实例，返回该实例
	if (lsMap.get(key)) return lsMap.get(key)!;
	// 否则创建新的 WebStorage 实例并返回
	else {
		const newLs = new WebStorage({
			storage: localStorage,
			hasEncrypt,
			key,
			expire
		});
		lsMap.set(key, newLs);
		return newLs;
	}
};
/* 创建 sessionStorage 的 WebStorage 实例 */
const createSessionStorage = ({ hasEncrypt = true, key, expire = null }: Cache): WebStorage => {
	// 如果 key 不存在，抛出错误
	if (!key) throw new Error("please enter the Key");

	// 如果已经存在相同 key 的 WebStorage 实例，返回该实例
	if (ssMap.get(key)) return ssMap.get(key)!;
	// 否则创建新的 WebStorage 实例并返回
	else {
		const newSs = new WebStorage({
			storage: sessionStorage,
			hasEncrypt,
			key,
			expire
		});
		ssMap.set(key, newSs);
		return newSs;
	}
};
/* 清空 localStorage 中的所有值 */
export const clearAllLocalStorage = () => {
	window.localStorage.clear();
	lsMap.clear();
};
/* 清空 sessionStorage 中的所有值 */
export const clearAllSessionStorage = () => {
	window.sessionStorage.clear();
	ssMap.clear();
};
/* 清空 localStorage 和 sessionStorage 中的所有值 */
export const clearStorage = () => {
	clearAllLocalStorage();
	clearAllSessionStorage();
};
