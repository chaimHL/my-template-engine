import lookup from './lookup.js'

export default (tokens, data) => {
  let domString = ''
  tokens.forEach(token => {
    console.log(token);
    switch (token[0]) {
      case 'text':
        domString += token[1]
        break
      case 'name':
        domString += lookup(data, token[1])
        break
      default:
        break
    }
  })
  console.log(domString)
}