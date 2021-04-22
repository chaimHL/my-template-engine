import Scanner from './Scanner.js'
import nestTokens from './nestTokens'

// 函数 parseTemplateToTokens
export default templateStr => {
	const tokens = []
	const scanner = new Scanner(templateStr)
	let word
	while (!scanner.eos()) {
		word = scanner.scanUntil('{{')
		word && tokens.push(['text', word])
		scanner.scan('{{')
		word = scanner.scanUntil('}}')
		/**
		 * 
		 */
		word && (word[0] === '#' ? tokens.push(['#', word.substr(1)]) : 
			word[0] === '/' ? tokens.push(['/', word]) : tokens.push(['name', word]))
		scanner.scan('}}')
	}
	return nestTokens(tokens)
}
