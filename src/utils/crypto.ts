// https://juejin.cn/post/7133405853746462734  或 https://code.google.com/archive/p/crypto-js/
/* 引入加密模块 */
import AES from "crypto-js/aes";
import CORE from "crypto-js/core";
import MD5 from "crypto-js/md5";
import { isObject, isString } from "./is";

/* 定义密钥 */
const SECRET_KEY = "GuYue1314520";
/* 加密函数 */
const encryption = (word: any): string => {
	// 将密钥转换为Utf8格式
	const key = CORE.enc.Utf8.parse(SECRET_KEY);
	// 初始化向量
	const iv = key;
	let enc: any = "";
	// 判断word的类型
	if (isString(word)) {
		// 对字符串进行加密
		enc = AES.encrypt(word, key, {
			iv,
			mode: CORE.mode.CBC,
			padding: CORE.pad.Pkcs7
		});
	} else if (isObject(word)) {
		// 对对象进行加密
		let data = JSON.stringify(word);
		enc = AES.encrypt(data, key, {
			iv,
			mode: CORE.mode.CBC,
			padding: CORE.pad.Pkcs7
		});
	}
	// 将加密结果转换为字符串
	let encResult = enc.toString();
	return encResult;
};
/* 解密函数 */
const decryption = (word: any): string => {
	// 将密钥转换为Utf8格式
	const key = CORE.enc.Utf8.parse(SECRET_KEY);
	// 初始化向量
	const iv = key;
	// 对密文进行解密
	let dec = AES.decrypt(word, key, {
		iv,
		mode: CORE.mode.CBC,
		padding: CORE.pad.Pkcs7
	});
	// 将解密结果转换为字符串
	let decData = dec.toString(CORE.enc.Utf8);
	return decData;
};
/* MD5加密函数 */
function md5Encryption(word: string) {
	// 对word进行MD5加密
	return MD5(word).toString();
}

/* 导出加密、解密、MD5加密函数 */
export { decryption, encryption, md5Encryption };
