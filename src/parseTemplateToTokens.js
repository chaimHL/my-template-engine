import Scanner from './Scanner.js'
import nestTokens from './nestTokens'

// 去除掉 word 中的无效空格（比如 {{ name }}, 如果不去除空格会得不到正确的 name)
function trimWord(word) {
	let _word = ''
	let isNeed = false
	for (let chart of word) {
		switch (chart) {
			case '<':
				isNeed = true
				break
			case '>':
				isNeed = false
				break
			default:
				break
		}
		if (isNeed) {
			_word += chart 
		} else {
			_word += chart.replace(/\s/, '')
		}
	}
 	return _word
}
// 函数 parseTemplateToTokens
export default templateStr => {
	const tokens = []
	const scanner = new Scanner(templateStr)
	let word
	while (!scanner.eos()) {
		word = scanner.scanUntil('{{')
		word && tokens.push(['text', trimWord(word)])
		scanner.scan('{{')
		word = scanner.scanUntil('}}')
		/** 
     *  判断从 {{ 和 }} 之间收集到的 word 的开头是不是特殊字符 # 或 /, 
     *  如果是则这个 token 的第一个元素相应的为 # 或 /, 否则为 name
     */
		word && (word[0] === '#' ? tokens.push(['#', word.substr(1)]) : 
			word[0] === '/' ? tokens.push(['/', word]) : tokens.push(['name', trimWord(word)]))
		scanner.scan('}}')
	}
	return nestTokens(tokens)
}
