import parseTemplateToTokens from './parseTemplateToTokens.js'

window.My_TemplateEngine = {
	render(templateStr, data) {
		const tokens = parseTemplateToTokens(templateStr)
		console.log(tokens)
	}
}