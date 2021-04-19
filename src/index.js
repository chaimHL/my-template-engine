import Scanner from './Scanner.js'
// <h1>杰伦{{month}}月份发专辑，不发是{{animal}}</h1>
window.My_TemplateEngine = {
	render(templateStr, data) {
		const scanner = new Scanner(templateStr)
		let word
		while (!scanner.eos()){
			word = scanner.scanUntil('{{')
			console.log(word)
			scanner.scan('{{')
			word = scanner.scanUntil('}}')
			console.log(word)
			scanner.scan('}}')
		}
	}
}