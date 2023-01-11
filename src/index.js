const deepClone = (source, cache = new Map()) => {
  // 缓存不能全局，最好临时创建并递归传递
  // 将 cache 当做参数传入，那么递归就只会生成一个 map
  if (source instanceof Object) {
    let result
    if (cache.get(source)) { return cache.get(source) }
    if (source instanceof Function) {
      if (source.prototype) { // 有 prototype 就是普通函数
        result = function () { return source.apply(this, arguments) }
      } else {
        result = (...args) => source.call(this, ...args)
      }
    } else if (source instanceof RegExp) {
      result = new RegExp(source.source, source.flags)
    } else if (source instanceof Date) {
      result = new Date(source - 0)
    } else if (source instanceof Array) {
      result = []
    } else {
      result = {}
    }
    cache.set(source, result)
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        result[key] = deepClone(source[key], cache)
      }
    }
    return result
  } else {
    return source
  }
}

module.exports = deepClone