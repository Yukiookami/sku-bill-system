/*
 * @Author: zxy
 * @Date: 2022-01-04 20:42:27
 * @LastEditTime: 2022-01-04 23:44:35
 * @FilePath: /sku-bill-system/src/until/time.js
 */
/**
 * @description: 根据日期获得这是当年第几周
 * @param {*}
 * @return {*}
 */
const getWeekByDay = (dt) => {
  let d1 = new Date(dt) 
  let d2 = new Date(dt)

  d2.setMonth(0)
  d2.setDate(1)

  let rq = d1 - d2
  let days = Math.ceil(rq / (24 * 60 * 60 * 1000))
  let num = Math.ceil(days / 7)

  return num
}


//日期加减法  date参数为计算开始的日期，days为需要加的天数   
//格式:addDate('2017-1-11',20) 
const addDate = (date, days) => {
  let d = new Date(date);
  d.setDate(d.getDate() + days);
  let m = d.getMonth() + 1;
  return d.getFullYear() + '-' + (m > 9 ? m : '0' + m) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate());
}

/**
 * @description: 根据当前为第几周，获得首尾日期
 * @param {*}
 * @return {*}
 */
const getStartAndEndDayByWeek = (weekstr) => {
  let year = weekstr.split("-")[0]
  let weekNo = weekstr.split("-")[1]
  // 此年1号是星期几
  let oneday = new Date(year + '-01-01').getDay() //0-6
  // 方便计算，当为星期天时为7
  if (oneday == 0) {
    oneday = 7
  }

  let one_fistday;
  let one_lastday;
  // 如果1号刚好是星期一
  if (oneday == 1) {
    one_fistday = year + '-01-01'
    one_lastday = year + '-01-07'
  } else {
    let jj = 8 - oneday
    one_fistday = (year - 1) + '-12-' + (31 - oneday + 2 > 9 ? 31 - oneday + 2 : '0' + (31 - oneday + 2))
    one_lastday = year + '-01-' + (jj > 9 ? jj : '0' + jj)
  }

  let fistday;
  let lastday;
  // 如果刚好是第一周
  if (weekNo == 1) {
    fistday = one_fistday
    lastday = one_lastday
  } else {
    fistday = addDate(one_lastday, (weekNo - 2) * 7 + 1)
    lastday = addDate(one_lastday, (weekNo - 1) * 7)
  }
  return [fistday, lastday]
}

/**
 * @description: 输入某一天日期。获得之后连续7天的日期
 * @param {*}
 * @return {*}
 */
const getDateByDayFor7 = (date) => {
  let base = new Date(date).getTime()
  let oneDay = 24 * 3600 * 1000;
  let dateList = [];
  let data = [Math.random() * 300];
  let time = new Date(base);


  let month = time.getMonth()
  let day = time.getDate()

  if (month.length !== 2) {
    month = 0 + (month + 1).toString()
  }

  if (day.length !== 2) {
    day = 0 + day.toString()
  }

  dateList.push([time.getFullYear(), month, day].join('-'));
  for (let i = 1; i <7; i++) {
    let now = new Date(base += oneDay);

    let month = now.getMonth()
    let day = now.getDate()

    if (month.length !== 2) {
      month = 0 + (month + 1).toString()
    }

    if (day.length !== 2) {
      day = 0 + day.toString()
    }

    dateList.push([now.getFullYear(), month, day].join('-'));
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
  }
  let newdate = dateList

  return newdate;
}

/**
 * @description: 根据yyyy-mm-dd 获得该周的第一天（date为date对象，周天为第一天）
 * @param {*} date
 * @return {*}
 */
function getCurrentWeekFirstDay(date) {
  let weekFirstDay = new Date(date - (date.getDay()) * 86400000)
  let firstMonth = Number(weekFirstDay.getMonth()) + 1

  if (firstMonth < 10) {
    firstMonth = '0' + firstMonth
  }
  let weekFirstDays = weekFirstDay.getDate();
  if (weekFirstDays < 10) {
    weekFirstDays = '0' + weekFirstDays;
  }
  return weekFirstDay.getFullYear() + '-' + firstMonth + '-' + weekFirstDays;
}

/**
 * @description: 根据yyyy-mm-dd 获得该周的最后一天（date为date对象,周天为第一天）
 * @param {*} date
 * @return {*}
 */
function getCurrentWeekLastDay(date) {
  let weekFirstDay = new Date(date - (date.getDay()) * 86400000)
  let weekLastDay = new Date((weekFirstDay / 1000 + 6 * 86400) * 1000)
  let lastMonth = Number(weekLastDay.getMonth()) + 1
  if (lastMonth < 10) {
    lastMonth = '0' + lastMonth
  }
  let weekLastDays = weekLastDay.getDate();
  if (weekLastDays < 10) {
    weekLastDays = '0' + weekLastDays;
  }

  return weekLastDay.getFullYear() + '-' + lastMonth + '-' + weekLastDays;
}
/**
 * @description: 获得每周的开头和结束（date为date对象）
 * @param {*}
 * @return {*}
 */
const getFirstAndLastDayByWeek = (date) => {
  let startDay = getCurrentWeekFirstDay(date)
  let lastDay = getCurrentWeekLastDay(date)

  return {
    startDay,
    lastDay
  }
} 

/**
 * @description: 获得当前年月日 格式为yyyy-mm-dd
 * @param {*}
 * @return {*}
 */
 const getNowDate = () => {
  const date = new Date()
  let month = (date.getMonth() + 1).toString()
  let day = date.getDate().toString()

  if (month.length !== 2) {
    month = 0 + month
  }

  if (day.length !== 2) {
    day = 0 + day
  }

  return `${date.getFullYear()}-${month}-${day}`
}

/**
 * @description: 根据日期获得星期 格式为yyyy-mm-dd
 * @param {*}
 * @return {*}
 */
const getDateByDayInWeek = (date) => {
  const dateObj = new Date(date)
  const weekArr = ["日", "月", "火", "水", "木", "金", "土"]

  return weekArr[dateObj.getDay()]
}

export {
  getWeekByDay,
  getStartAndEndDayByWeek,
  getCurrentWeekFirstDay,
  getCurrentWeekLastDay,
  getNowDate,
  getFirstAndLastDayByWeek,
  getDateByDayFor7,
  getDateByDayInWeek
}