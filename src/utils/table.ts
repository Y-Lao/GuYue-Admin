/**
 * 获取第一个表格的可视化高度
 * @param {number} extraHeight 额外的高度(表格底部的内容高度 Number类型,默认为54)
 * @param {reactRef} ref Table所在的组件的ref
 */
export function getTableScroll({ extraHeight, ref, isSummary = false }: any = {}) {
	if (typeof extraHeight == "undefined") {
		//  默认底部分页32 + 边距20 + (52 会有滚动条，54 刚好，未清楚原因) + 总结栏(默认48)
		if (isSummary) {
			extraHeight = 54 + 48;
		} else {
			extraHeight = 54;
		}
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

/* 自定义列表获取相同项 */
export const getJsonArrEqual = (arr1: any, arr2: any) => {
	let newArr: any[] = [],
		kvIndex: any = {};
	for (let i = 0; i < arr1.length; i++) {
		for (let j = 0; j < arr2.length; j++) {
			if (arr1[i].title == arr2[j].title) {
				let item: any;
				if (kvIndex[arr1[i].title] == undefined) {
					kvIndex[arr1[i].title] = newArr.length;
					item = {};
					for (let attr in arr1[i]) item[attr] = arr1[i][attr];
					newArr[kvIndex[arr1[i].title]] = item;
				} else {
					item = newArr[kvIndex[arr1[i].title]];
					for (let attr in arr2[j]) item[attr] = arr2[j][attr];
				}
			}
		}
	}
	return newArr;
};
