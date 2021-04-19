export default class Scanner {
	constructor(templateStr) {
		this.templateStr = templateStr
		// 指针
		this.pos = 0
		// 尾巴
		this.tail = templateStr
		
	}
	scan(stopTag) {
		this.pos +=  stopTag.length
		this.tail = this.templateStr.substring(this.pos)
	}
	scanUntil(stopTag) {
		const pos_backup = this.pos
		while (!this.eos() && this.tail.indexOf(stopTag) !== 0){
			this.pos++
			this.tail = this.templateStr.substring(this.pos)
		}
		return this.templateStr.substring(pos_backup, this.pos)
	}
	eos() {
		return this.pos >= this.templateStr.length
	}
}