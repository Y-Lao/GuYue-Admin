import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode } from "vue";
import { Modal, message } from "ant-design-vue";

/**
 * @description 操作单条数据信息，二次确认操作 ---> 删除、禁用、启用、重置密码
 * @param {Function} api 操作数据接口的api方法 ---> 必传
 * @param {Object} params 携带的操作数据参数 {id,params} ---> 必传
 * @param {String} msg 提示信息 ---> 必传
 * @returns {Promise}
 */
export const useHandleData = (api: (params: any) => Promise<any>, params: any = {}, msg: string) => {
	return new Promise((resolve, reject) => {
		Modal.confirm({
			title: "温馨提示",
			icon: createVNode(ExclamationCircleOutlined),
			content: `是否${msg}?`,
			onOk: async () => {
				const res = await api(params);
				if (!res) return reject(false);
				message.success(`${msg}成功!`);
				resolve(true);
			},
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			onCancel() {}
		});
	});
};
