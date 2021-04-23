import parseTemplateToTokens from './parseTemplateToTokens.js'
import renderTemplate from './renderTemplate.js'

window.My_TemplateEngine = {
	render(templateStr, data) {
		const tokens = parseTemplateToTokens(templateStr)
		// 把 tokens 解析为 dom 字符串
		renderTemplate(tokens, data)
	}
}