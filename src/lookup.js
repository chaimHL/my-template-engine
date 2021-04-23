/**
 * 因为 js 无法通过 data[a.b.c] 这样的形式取值，所以本函数的作用就是
 * 保证即使是 a.b.c 这种形式的 key 值也能成功从 data 获取到 value
 */

export default (data, key) => {
  if (key.indexOf('.') !== -1 ) {
    const keys = key.split('.')
    return keys.reduce((acc, cur) => {
      return acc[cur]
    }, data)
  }
  return data[key]
}
