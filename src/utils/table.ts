/**
 * 获取第一个表格的可视化高度
 * @param {number} extraHeight 额外的高度(表格底部的内容高度 Number类型,默认为74)
 * @param {reactRef} ref Table所在的组件的ref
 */
export function getTableScroll({ extraHeight, ref }: any = {}) {
	if (typeof extraHeight == "undefined") {
		//  默认底部分页64 + 边距10
		extraHeight = 74;
	}
	let tHeader = null;
	if (ref && ref.current) {
		tHeader = ref.current.getElementsByClassName("ant-table-thead")[0];
	} else {
		tHeader = document.getElementsByClassName("ant-table-thead")[0];
	}
	//表格内容距离顶部的距离
	let tHeaderBottom = 0;
	if (tHeader) {
		tHeaderBottom = tHeader.getBoundingClientRect().bottom;
	}
	// 窗体高度-表格内容顶部的高度-表格内容底部的高度
	// let height = document.body.clientHeight - tHeaderBottom - extraHeight
	let height = `calc(100vh - ${tHeaderBottom + extraHeight + 50}px)`;
	// 空数据的时候表格高度保持不变,暂无数据提示文本图片居中
	if (ref && ref.current) {
		let placeholder = ref.current.getElementsByClassName("ant-table-placeholder")[0];
		if (placeholder) {
			placeholder.style.height = height;
			placeholder.style.display = "flex";
			placeholder.style.alignItems = "center";
			placeholder.style.justifyContent = "center";
		}
	}
	return height;
}
