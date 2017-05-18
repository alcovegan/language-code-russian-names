const data = require('./data/data.json');

var langs = {
	alpha1: russianNameByCode1,
	alpha2: russianNameByCode2,
	alpha3: russianNameByCode3,
	gost: russianNameByGostCode,
	numeric: russianNameByNumericCode,
	all: getAllLanguages,
	names: getAllLanguageNames,
	codes: getAllCodes,
	ruNames: getRuNames,
	originalNames: getOriginalNames
}

module.exports = langs;

function russianNameByCode3(code) {
	return data.find((lang) => lang["3"] === code.toLowerCase())
}

function russianNameByCode2(code) {
	return data.find((lang) => lang["2"] === code.toLowerCase())
}

function russianNameByCode1(code) {
	return data.find((lang) => lang["1"] === code.toLowerCase())
}

function russianNameByGostCode(code) {
	return data.find((lang) => lang.gost77597 === code.toLowerCase())
}

function russianNameByNumericCode(code) {
	code = Number(code);
	return data.find((lang) => lang.numeric === code)
}

function getAllLanguages() {
	return data
}

function getAllCodes(byCode) {
	byCode = String(byCode);
	return data.map((lang) => lang[byCode]);
}

function getAllLanguageNames() {
	return data.map(lang => lang.name)
}

function getRuNames(obj) {

	if(Object.keys(obj).length === 0) {
		return ""
	}

	if(typeof obj === 'string' && obj === "") {
		return ""
	}

	// todo: refactor
	if(typeof obj === 'string') {

		let langObject = data.find((lang) => {
			let toFind = obj.toUpperCase();
			let currLang = lang["3"];
			let upCurrLang = currLang.toUpperCase();

			let finded = upCurrLang === toFind

			return finded
		});

		return langObject.name
	}

	let codes = Object.keys(obj);
	let names = [];

	codes.map(code => {

		if(obj[code] === 'Moldavian') {
			names.push('Молдавский')
		}

		let findedCode = data.find((lang) => {
			return lang["3"] === code
		});

		names.push(findedCode.name)

	})

	let joined = names.join(", ");

	return joined
}

function getOriginalNames(obj) {
	if(typeof obj === 'string' && obj === "") {
		return ""
	}

	if(Object.keys(obj).length === 0) {
		return ""
	}

	let codes = Object.keys(obj);
	let names = [];

	codes.map(code => {

		names.push(obj[code])

	})

	let joined = names.join(", ");

	return joined
}