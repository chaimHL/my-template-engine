export default (tokens) => {
  const nestTokens = []
  const stack = []
  let collector = nestTokens
  tokens.forEach(token => {
    switch (token[0]) {
      case '#':
        stack.push(token)
        collector.push(token)
        collector = token[2] = []
        break
      case '/':
        stack.pop(token)
        collector = stack.length > 0 ? stack[stack.length-1][2] : nestTokens
        break;
      default:
        collector.push(token)
        break
    }
  })
  return nestTokens
}
