import moment from "moment";

//日期类型
export const DATE_CATEGORY = {
	today: "today",
	yesterday: "yesterday",
	week: "week",
	lastWeek: "lastWeek",
	month: "month",
	lastMonth: "lastMonth"
};

//开始时间
let start = "";
//结束时间
let end = "";

export let handleDateType = {
	//今日
	today: (() => {
		start = moment().format("YYYY-MM-DD");
		end = moment().format("YYYY-MM-DD");
		return { start, end };
	})(),
	//昨日
	yesterday: (() => {
		start = moment().subtract(1, "days").format("YYYY-MM-DD");
		end = moment().subtract(1, "days").format("YYYY-MM-DD");
		return { start, end };
	})(),
	//这周
	week: (() => {
		start = moment().week(moment().week()).startOf("week").format("YYYY-MM-DD");
		end = moment().week(moment().week()).endOf("week").format("YYYY-MM-DD");
		return { start, end };
	})(),
	//上周
	lastWeek: (() => {
		let weekOfday = parseInt(moment().format("d"));
		start = moment()
			.subtract(weekOfday + 7, "days")
			.format("YYYY-MM-DD");
		end = moment()
			.subtract(weekOfday + 1, "days")
			.format("YYYY-MM-DD");
		return { start, end };
	})(),
	//本月
	month: (() => {
		start = moment().startOf("month").format("YYYY-MM-DD");
		end = moment().endOf("month").format("YYYY-MM-DD");
		return { start, end };
	})(),
	//上月
	lastMonth: (() => {
		start = moment().subtract(1, "month").startOf("month").format("YYYY-MM-DD");
		end = moment().subtract(1, "month").endOf("month").format("YYYY-MM-DD");
		return { start, end };
	})()
};

/**
 * 得到开始和结束日期，得到中间所有天返回数组
 * @param {String} string 开始日期'2021-7-1'
 * @param {String} String 结束日期'2021-8-1'
 * @return {Array} ['2021-07-01', '2021-07-01'...., '2021-08-01']
 */
export function getDayArr(startDay: string, endDay: string): Array<string> {
	let startVal = moment(new Date(startDay)).format("YYYY-MM-DD");
	let dayArr = [];
	while (moment(startVal).isBefore(endDay)) {
		dayArr.push(moment(new Date(startVal)).format("DD"));
		// 自增
		startVal = moment(new Date(startVal)).add(1, "day").format("YYYY-MM-DD");
	}
	// 将结束日期的天放进数组
	dayArr.push(moment(new Date(endDay)).format("DD"));
	return dayArr;
}
