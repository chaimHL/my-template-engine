/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Scanner.js":
/*!************************!*\
  !*** ./src/Scanner.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Scanner)\n/* harmony export */ });\nclass Scanner {\r\n\tconstructor(templateStr) {\r\n\t\tthis.templateStr = templateStr\r\n\t\t// 指针\r\n\t\tthis.pos = 0\r\n\t\t// 尾巴\r\n\t\tthis.tail = templateStr\r\n\t\t\r\n\t}\r\n\tscan(stopTag) {\r\n\t\tthis.pos +=  stopTag.length\r\n\t\tthis.tail = this.templateStr.substring(this.pos)\r\n\t}\r\n\tscanUntil(stopTag) {\r\n\t\tconst pos_backup = this.pos\r\n\t\twhile (!this.eos() && this.tail.indexOf(stopTag) !== 0){\r\n\t\t\tthis.pos++\r\n\t\t\tthis.tail = this.templateStr.substring(this.pos)\r\n\t\t}\r\n\t\treturn this.templateStr.substring(pos_backup, this.pos)\r\n\t}\r\n\teos() {\r\n\t\treturn this.pos >= this.templateStr.length\r\n\t}\r\n}\n\n//# sourceURL=webpack://my-template-engine/./src/Scanner.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _parseTemplateToTokens_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parseTemplateToTokens.js */ \"./src/parseTemplateToTokens.js\");\n/* harmony import */ var _renderTemplate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderTemplate.js */ \"./src/renderTemplate.js\");\n\r\n\r\n\r\nwindow.My_TemplateEngine = {\r\n\trender(templateStr, data) {\r\n\t\tconst tokens = (0,_parseTemplateToTokens_js__WEBPACK_IMPORTED_MODULE_0__.default)(templateStr)\r\n\t\t// 把 tokens 解析为 dom 字符串\r\n\t\tconst domStr = (0,_renderTemplate_js__WEBPACK_IMPORTED_MODULE_1__.default)(tokens, data)\r\n\t\tconsole.log(domStr);\r\n\t}\r\n}\n\n//# sourceURL=webpack://my-template-engine/./src/index.js?");

/***/ }),

/***/ "./src/lookup.js":
/*!***********************!*\
  !*** ./src/lookup.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\r\n * 因为 js 无法通过 data[a.b.c] 这样的形式取值，所以本函数的作用就是\r\n * 保证即使是 a.b.c 这种形式的 key 值也能成功从 data 获取到 value\r\n */\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((data, key) => {\r\n  if (key.indexOf('.') !== -1 ) {\r\n    const keys = key.split('.')\r\n    return keys.reduce((acc, cur) => {\r\n      return acc[cur]\r\n    }, data)\r\n  }\r\n  return data[key]\r\n});\r\n\n\n//# sourceURL=webpack://my-template-engine/./src/lookup.js?");

/***/ }),

/***/ "./src/nestTokens.js":
/*!***************************!*\
  !*** ./src/nestTokens.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((tokens) => {\r\n  const nestTokens = []\r\n  const stack = []\r\n  let collector = nestTokens\r\n  tokens.forEach(token => {\r\n    switch (token[0]) {\r\n      case '#':\r\n        stack.push(token)\r\n        collector.push(token)\r\n        collector = token[2] = []\r\n        break\r\n      case '/':\r\n        stack.pop(token)\r\n        collector = stack.length > 0 ? stack[stack.length-1][2] : nestTokens\r\n        break;\r\n      default:\r\n        collector.push(token)\r\n        break\r\n    }\r\n  })\r\n  return nestTokens\r\n});\r\n\n\n//# sourceURL=webpack://my-template-engine/./src/nestTokens.js?");

/***/ }),

/***/ "./src/parseTemplateToTokens.js":
/*!**************************************!*\
  !*** ./src/parseTemplateToTokens.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Scanner_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Scanner.js */ \"./src/Scanner.js\");\n/* harmony import */ var _nestTokens__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nestTokens */ \"./src/nestTokens.js\");\n\r\n\r\n\r\n// 函数 parseTemplateToTokens\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (templateStr => {\r\n\tconst tokens = []\r\n\tconst scanner = new _Scanner_js__WEBPACK_IMPORTED_MODULE_0__.default(templateStr)\r\n\tlet word\r\n\twhile (!scanner.eos()) {\r\n\t\tword = scanner.scanUntil('{{')\r\n\t\tword && tokens.push(['text', word])\r\n\t\tscanner.scan('{{')\r\n\t\tword = scanner.scanUntil('}}')\r\n\t\t/**\r\n\t\t * \r\n\t\t */\r\n\t\tword && (word[0] === '#' ? tokens.push(['#', word.substr(1)]) : \r\n\t\t\tword[0] === '/' ? tokens.push(['/', word]) : tokens.push(['name', word]))\r\n\t\tscanner.scan('}}')\r\n\t}\r\n\treturn (0,_nestTokens__WEBPACK_IMPORTED_MODULE_1__.default)(tokens)\r\n});\r\n\n\n//# sourceURL=webpack://my-template-engine/./src/parseTemplateToTokens.js?");

/***/ }),

/***/ "./src/renderTemplate.js":
/*!*******************************!*\
  !*** ./src/renderTemplate.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lookup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lookup.js */ \"./src/lookup.js\");\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((tokens, data) => {\r\n  let domString = ''\r\n  tokens.forEach(token => {\r\n    console.log(token);\r\n    switch (token[0]) {\r\n      case 'text':\r\n        domString += token[1]\r\n        break\r\n      case 'name':\r\n        domString += (0,_lookup_js__WEBPACK_IMPORTED_MODULE_0__.default)(data, token[1])\r\n        break\r\n      default:\r\n        break\r\n    }\r\n  }) \r\n  return domString\r\n});\n\n//# sourceURL=webpack://my-template-engine/./src/renderTemplate.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;