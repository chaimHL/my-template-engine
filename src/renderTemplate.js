import lookup from './lookup.js'
import parseArray from './parseArray.js'

export default (tokens, data) => {
  let domString = ''
  tokens.forEach(token => {  
    switch (token[0]) {
      case 'text':
        domString += token[1]
        break
      case 'name':
        domString += lookup(data, token[1])
        break
      case '#':
        domString += parseArray(token[2], data[token[1]])
        break
      default:
        break
    }
  }) 
  return domString
}