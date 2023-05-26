<template>
	<a-modal v-model:visible="visible" :title="`批量添加${parameter.title}`" :footer="null" width="580px">
		<a-form>
			<!-- 模板下载 -->
			<a-form-item label="模板下载 :">
				<a-button type="primary" @click="downloadTemp">
					<template #icon>
						<DownloadOutlined />
					</template>
					点击下载
				</a-button>
			</a-form-item>
			<!-- 文件上传 -->
			<a-form-item label="文件上传 :">
				<a-upload-dragger
					name="file"
					:multiple="true"
					class="upload"
					:maxCount="excelLimit"
					@change="handleChange"
					:showUploadList="false"
					:customRequest="uploadExcel"
					:beforeUpload="beforeExcelUpload"
					:accept="parameter.fileType!.join(',')"
				>
					<p class="ant-upload-drag-icon">
						<cloud-upload-outlined />
					</p>
					<p class="ant-upload-text">将文件拖到此处，或<em>点击上传</em></p>
				</a-upload-dragger>
				<div class="a-upload__tip">请上传 .xls , .xlsx 标准格式文件，文件最大为 {{ parameter.fileSize }}M</div>
			</a-form-item>
			<!-- 数据覆盖 -->
			<a-form-item label="数据覆盖 :">
				<a-switch v-model:checked="isCover" />
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script setup lang="ts" name="importExcel">
import { ref } from "vue";
import { useDownload } from "@/hooks/useDownload";
import { UploadChangeParam, notification } from "ant-design-vue";

/* 接口 */
export interface ExcelParameterProps {
	title: string; // 标题
	fileSize?: number; // 上传文件的大小
	fileType?: File.ExcelMimeType[]; // 上传文件的类型
	tempApi?: (params: any) => Promise<any>; // 下载模板的Api
	importApi?: (params: any) => Promise<any>; // 批量导入的Api
	getTableList?: () => void; // 获取表格数据的Api
}
/* 是否覆盖数据 */
const isCover = ref(false);
/* 最大文件上传数 */
const excelLimit = ref(1);
/* 弹窗状态 */
const visible = ref(false);
/* 限制弹框 M4-38464 */
let limitMessage: boolean = true;
/* 父组件传过来的参数 */
const parameter = ref<ExcelParameterProps>({
	title: "",
	fileSize: 5,
	fileType: ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
});
/* 接受父组件参数 */
const acceptParams = (params: ExcelParameterProps) => {
	parameter.value = { ...parameter.value, ...params };
	visible.value = true;
};
/* Excel 导入模板下载 */
const downloadTemp = () => {
	if (!parameter.value.tempApi) return;
	useDownload(parameter.value.tempApi, `${parameter.value.title}模板`);
};
/* 文件上传 */
const uploadExcel = async (e: any) => {
	try {
		let excelFormData = new FormData();
		excelFormData.append("file", e.file);
		excelFormData.append("isCover", isCover.value as unknown as Blob);
		let res = await parameter.value.importApi!(excelFormData);
		// 调用实例的成功方法通知组件该文件上传成功
		e.onSuccess(res.data, e);
		// 重新刷新表格
		parameter.value.getTableList && parameter.value.getTableList();
		visible.value = false;
	} catch (error) {
		// 调用实例的失败方法通知组件该文件上传失败
		e.onError(error);
	}
};
/**
 * @description 文件上传之前判断
 * @param file 上传的文件
 */
const beforeExcelUpload = async (file: any, fileList: any) => {
	const isExcel = parameter.value.fileType!.includes(file.type as File.ExcelMimeType);
	const fileSize = file.size / 1024 / 1024 < parameter.value.fileSize!;
	const fileAmount = fileList.length >= 2 ? false : true;
	if (!isExcel) {
		notification["warning"]({
			message: "温馨提示",
			description: "上传文件只能是 xls / xlsx 格式！",
			style: { borderRadius: "8px" },
			duration: 3
		});
	}
	if (!fileSize) {
		setTimeout(() => {
			notification["warning"]({
				message: "温馨提示",
				description: `上传文件大小不能超过 ${parameter.value.fileSize}MB！`,
				style: { borderRadius: "8px" },
				duration: 3
			});
		}, 0);
	}
	if (!fileAmount) {
		if (limitMessage) {
			notification["warning"]({
				message: "温馨提示",
				description: "最多只能上传一个文件！",
				style: { borderRadius: "8px" },
				duration: 3
			});
			limitMessage = false;
			setTimeout(() => {
				limitMessage = true;
			}, 1000);
		}
	}
	return isExcel && fileSize && fileAmount;
};
/* 上传文件改变时的状态 */
const handleChange = (info: UploadChangeParam) => {
	const { status } = info.file;
	if (status === "done") {
		excelUploadSuccess();
	} else if (status === "error") {
		excelUploadError();
	}
};
/* 上传错误提示 */
const excelUploadError = (): void => {
	notification["error"]({
		message: "温馨提示",
		description: `批量添加${parameter.value.title}失败，请您重新上传！`
	});
};
/* 上传成功提示 */
const excelUploadSuccess = (): void => {
	notification["success"]({
		message: "温馨提示",
		description: `批量添加${parameter.value.title}成功！`
	});
};

defineExpose({
	acceptParams
});
</script>

<style scoped lang="less">
@import url("./index.less");
</style>
