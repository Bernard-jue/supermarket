export function debounce(func, delay) {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function formatDate(time, fmt) {
  // 替换月份yyyy.test(fmt)
  if (/(y+)/.test(fmt)) {
    // RegExp.$1 (匹配到的第一个string)
    // 将年份加进来
    // fmt = 2018-MM-dd
    // 当年丰为999时，截取掉第一个y只剩三个被替代掉的y
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds(),
  }

  for (let k in o) {
    // 匹配以k结尾的string
    if (new RegExp(`(${k})`).test(fmt)) {
      // 使数字变成str类型
      let str = o[k] + '';
      // 逐步替换fmt 先是MM然后是dd
      // M输出8
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }

  return fmt;
}

function padLeftZero(str) {
  // MM输出08
  return ('00' + str).substr(str.length);
}
