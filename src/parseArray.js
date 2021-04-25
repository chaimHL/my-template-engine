import renderTemplate from './renderTemplate.js'
export default (tokens, data) => {
  let domString = ''
  data.forEach(itemData => {
    domString += renderTemplate(tokens, {
      ...itemData,
      '.': itemData // 针对简单数组的情况，即模板字符串里的 {{.}} 
    })
  })
  return domString
}