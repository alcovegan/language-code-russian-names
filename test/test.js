var langs = require('../index');
var countries = require('./countries/countries.json');
var assert = require('chai').assert;
var _ = require('lodash');

suite('langs:', function () {

	var eng = {};
	var kor = {};
	var langObj = { "prs": "Dari", "pus": "Pashto", "tuk": "Turkmen" },
		langObj2 = {"grn": "Guaran\u00ed","spa": "Spanish"};

	var langObjOriginalString = "Dari, Pashto, Turkmen",
		langObj2OriginalString = "Guaran\u00ed, Spanish";


	setup(function () {
		data = require('../data/data');
		eng = data[16];
		kor = data[148];

	});

	test('`langs` is an object', function () {
		assert.isObject(langs);
	});

	test('contains all alpha3 codes as in meldoze/countries', function() {
		// собираем все уникальные коды языков, использованные в https://github.com/mledoze/countries/blob/master/countries.json
		// в нашем случае это data/countries.json
		let allCountriesLanguageCodes = _.uniq(_.flatten(countries.map(country => _.keys(country.languages))));

		// берем все коды языков из нашей библиотеки
		let allRussianLanguageCodes = langs.codes(3);

		// сравниваем, если получаем 0 - значит все коды есть и покрыты
		let difference = _.difference(allCountriesLanguageCodes, allRussianLanguageCodes).length;

		assert.equal(difference, 0);
	});

		suite('alpha1:', function () {

			test('`langs.alpha1` is a function', function () {
				assert.isFunction(langs.alpha1);
			});

			test('`langs.alpha1("ab").name` equal to "Абхазский"', function () {
				assert.strictEqual(langs.alpha1("ab").name, "Абхазский");
			});

			test('`langs.alpha1("be").name` equal to "Белорусский"', function () {
				assert.strictEqual(langs.alpha1("be").name, "Белорусский");
			});

			test('`langs.alpha1("kl").name` equal to "Гренландский"', function () {
				assert.strictEqual(langs.alpha1("kl").name, "Гренландский");
			});

			test('`langs.alpha1("yo").name` equal to "Йоруба"', function () {
				assert.strictEqual(langs.alpha1("yo").name, "Йоруба");
			});

			test('`langs.alpha1("kw").name` equal to "Корнский"', function () {
				assert.strictEqual(langs.alpha1("kw").name, "Корнский");
			});

		});

		suite('alpha2:', function () {

			test('`langs.alpha2` is a function', function () {
				assert.isFunction(langs.alpha2);
			});

			test('`langs.alpha2("ara").name` equal to "Арабский"', function () {
				assert.strictEqual(langs.alpha2("ara").name, "Арабский");
			});

			test('`langs.alpha2("aka").name` equal to "Акан"', function () {
				assert.strictEqual(langs.alpha2("aka").name, "Акан");
			});

			test('`langs.alpha2("rus").name` equal to "Русский"', function () {
				assert.strictEqual(langs.alpha2("rus").name, "Русский");
			});

			test('`langs.alpha2("ady").name` equal to "Адыгейский"', function () {
				assert.strictEqual(langs.alpha2("ady").name, "Адыгейский");
			});

			test('`langs.alpha2("aze").name` equal to "Азербайджанский"', function () {
				assert.strictEqual(langs.alpha2("aze").name, "Азербайджанский");
			});

		});

		suite('alpha3:', function () {

			test('`langs.alpha3` is a function', function () {
				assert.isFunction(langs.alpha3);
			});

			test('`langs.alpha3("ara").name` equal to "Арабский"', function () {
				assert.strictEqual(langs.alpha3("ara").name, "Арабский");
			});

			test('`langs.alpha3("hye").name` equal to "Армянский"', function () {
				assert.strictEqual(langs.alpha3("hye").name, "Армянский");
			});

			test('`langs.alpha3("rus").name` equal to "Русский"', function () {
				assert.strictEqual(langs.alpha3("rus").name, "Русский");
			});

			test('`langs.alpha3("ady").name` equal to "Адыгейский"', function () {
				assert.strictEqual(langs.alpha3("ady").name, "Адыгейский");
			});

			test('`langs.alpha3("aze").name` equal to "Азербайджанский"', function () {
				assert.strictEqual(langs.alpha3("aze").name, "Азербайджанский");
			});

			test('all of codes returned by `langs.codes(3)` have Russian names', function () {
				let allRussianLanguageCodes = langs.codes(3);

				let allNames = langs.all().map((lang) => {
					if(lang.name !== "") {
						return lang.name
					}
				});

				assert.strictEqual(allRussianLanguageCodes.length, allNames.length);
			});

		});

		suite('gost:', function () {

			test('`langs.gost` is a function', function () {
				assert.isFunction(langs.gost);
			});

			test('`langs.gost("анг").name` equal to "Английский"', function () {
				assert.strictEqual(langs.gost("анг").name, "Английский");
			});

			test('`langs.gost("ара").name` equal to "Арабский"', function () {
				assert.strictEqual(langs.gost("ара").name, "Арабский");
			});

			test('`langs.gost("арв").name` equal to "Аравакский"', function () {
				assert.strictEqual(langs.gost("арв").name, "Аравакский");
			});

			test('`langs.gost("гер").name` equal to "Гереро"', function () {
				assert.strictEqual(langs.gost("гер").name, "Гереро");
			});

			test('`langs.gost("гал").name` equal to "Галисийский"', function () {
				assert.strictEqual(langs.gost("гал").name, "Галисийский");
			});

		});

		suite('numeric:', function () {

			test('`langs.numeric` is a function', function () {
				assert.isFunction(langs.numeric);
			});

			test('`langs.numeric return correct result when passed number as string', function () {
				assert.strictEqual(langs.numeric("45").name, "Английский");
			});

			test('`langs.numeric(45).name` equal to "Английский"', function () {
				assert.strictEqual(langs.numeric(45).name, "Английский");
			});

			test('`langs.numeric(25).name` equal to "Азербайджанский"', function () {
				assert.strictEqual(langs.numeric(25).name, "Азербайджанский");
			});

			test('`langs.numeric(52).name` equal to "Арамейский"', function () {
				assert.strictEqual(langs.numeric(52).name, "Арамейский");
			});

			test('`langs.numeric(400).name` equal to "Литовский"', function () {
				assert.strictEqual(langs.numeric(400).name, "Литовский");
			});

			test('`langs.numeric(225).name` equal to "Исландский"', function () {
				assert.strictEqual(langs.numeric(225).name, "Исландский");
			});

		});

		suite('all:', function () {

			test('`langs.all` is a function', function () {
				assert.isFunction(langs.all);
			});

			test('`langs.all()` doesn\'t contain `{}`', function () {
				assert.equal(langs.all().indexOf({}), -1);
			});

			test('`langs.all()` contains `{"name":"Английский","1":"en","2":"eng","3":"eng","gost77597":"анг","numeric":45}`', function () {
				assert.notEqual(langs.all().indexOf(eng), -1);
			});

			test('`langs.all()` contains `{"name":"Корейский","1":"ko","2":"kor","3":"kor","gost77597":"коо","numeric":330}`', function () {
				assert.notEqual(langs.all().indexOf(kor), -1);
			});

		});

		suite('names:', function () {

			test('`langs.names` is a function', function () {
				assert.isFunction(langs.names);
			});

			test('`langs.names` returns an array', function () {
				assert.isArray(langs.names());
			});

			test('`langs.names` contains "Корейский"', function () {
				assert.notEqual(langs.names().indexOf("Корейский"), -1);
			});

			test('`langs.names` contains "Английский"', function () {
				assert.notEqual(langs.names().indexOf("Английский"), -1);
			});

		});

		suite('codes:', function () {

			test('`langs.codes` is a function', function () {
				assert.isFunction(langs.codes);
			});

			test('`langs.codes` returns array', function () {
				assert.isArray(langs.codes());
			});

			suite('lang.codes(1)', function() {

				test('`langs.codes(1)` returns array', function () {
					assert.isArray(langs.codes(1));
				});

				test('`langs.codes(1)` contains "ab"', function () {
					assert.notEqual(langs.codes(1).indexOf("ab"), -1);
				});

			})

			suite('lang.codes(2)', function() {

				test('`langs.codes(2)` returns array', function () {
					assert.isArray(langs.codes(2));
				});

				test('`langs.codes(2)` contains "ava"', function () {
					assert.notEqual(langs.codes(2).indexOf("ava"), -1);
				});

				test('`langs.codes(2)` contains "grb"', function () {
					assert.notEqual(langs.codes(2).indexOf("grb"), -1);
				});
			})

			suite('lang.codes(3)', function() {

				test('`langs.codes(3)` returns array', function () {
					assert.isArray(langs.codes(3));
				});

				test('`langs.codes(3)` contains "rus"', function () {
					assert.notEqual(langs.codes(3).indexOf("rus"), -1);
				});

				test('`langs.codes(3)` contains "ara"', function () {
					assert.notEqual(langs.codes(3).indexOf("ara"), -1);
				});

				test('`langs.codes(3)` doesn\'t contain "zzz"', function () {
					assert.equal(langs.codes(3).indexOf("zzz"), -1);
				});

				test('`langs.codes(3)` doesn\'t contain "ooo"', function () {
					assert.equal(langs.codes(3).indexOf("ooo"), -1);
				});
			})

			suite('lang.codes(gost77597)', function() {

				test('`langs.codes("gost77597")` returns array', function () {
					assert.isArray(langs.codes("gost77597"));
				});

				test('`langs.codes("gost77597")` contains "анг"', function () {
					assert.notEqual(langs.codes("gost77597").indexOf("анг"), -1);
				});

				test('`langs.codes("gost77597")` contains "рус"', function () {
					assert.notEqual(langs.codes("gost77597").indexOf("рус"), -1);
				});

				test('`langs.codes("gost77597")` doesn\'t contain "ззз"', function () {
					assert.equal(langs.codes("gost77597").indexOf("ззз"), -1);
				});

				test('`langs.codes("gost77597")` doesn\'t contain "ввв"', function () {
					assert.equal(langs.codes("gost77597").indexOf("ввв"), -1);
				});
			})

			suite('lang.codes("numeric")', function() {

				test('`langs.codes("numeric")` returns array', function () {
					assert.isArray(langs.codes("numeric"));
				});

				test('`langs.codes("numeric")` contains 400', function () {
					assert.notEqual(langs.codes("numeric").indexOf(400), -1);
				});

				test('`langs.codes("numeric")` contains 225', function () {
					assert.notEqual(langs.codes("numeric").indexOf(225), -1);
				});
			})

		});

		suite('ruNames', function() {

			test('ruNames is a function', function () {
				assert.isFunction(langs.ruNames);
			});

			suite('ruNames get russian language names #1:', function () {

				test('`{ "prs": "Dari", "pus": "Pashto", "tuk": "Turkmen" }` return `Дари, Пушту, Туркменский`', function () {
					assert.equal(langs.ruNames(langObj), "Дари, Пушту, Туркменский");
				});

			});

			suite('ruNames get russian language names #1 and is a string:', function () {

				test('`{ "prs": "Dari", "pus": "Pashto", "tuk": "Turkmen" }` return `Дари, Пушту, Туркменский`', function () {
					assert.isString(langs.ruNames(langObj), "Дари, Пушту, Туркменский");
				});

			});

			suite('ruNames get russian language names #2:', function () {

				test('`{"grn": "Guaran\u00ed","spa": "Spanish"}` return `Гуарани, Испанский`', function () {
					assert.equal(langs.ruNames(langObj2), "Гуарани, Испанский");
				});

			});

			suite('ruNames get russian language names #2 and is a string:', function () {

				test('`{"grn": "Guaran\u00ed","spa": "Spanish"}` return `Гуарани, Испанский`', function () {
					assert.isString(langs.ruNames(langObj2), "Гуарани, Испанский");
				});

			});

			suite('ruNames get russian language names #3:', function () {

				test('`{"cat":"Catalan","eus":"Basque","glg":"Galician","oci":"Occitan","spa":"Spanish"}` returns "Каталанский, Баскский, Галисийский, Окситанский, Испанский"', function () {
					assert.equal(langs.ruNames({"cat":"Catalan","eus":"Basque","glg":"Galician","oci":"Occitan","spa":"Spanish"}), "Каталанский, Баскский, Галисийский, Окситанский, Испанский");
				});

			});

			suite('ruNames get russian language names #3 and is a string:', function () {

				test('`{"cat":"Catalan","eus":"Basque","glg":"Galician","oci":"Occitan","spa":"Spanish"}` returns "Каталанский, Баскский, Галисийский, Окситанский, Испанский"', function () {
					assert.isString(langs.ruNames({"cat":"Catalan","eus":"Basque","glg":"Galician","oci":"Occitan","spa":"Spanish"}), "Каталанский, Баскский, Галисийский, Окситанский, Испанский");
				});

			});

			suite('ruNames with string returns string witn name #1:', function () {

				test('"ara" returns "Арабский"', function () {
					assert.strictEqual(langs.ruNames("ara"), "Арабский");
				});

			});

			suite('ruNames with string returns string witn name #2:', function () {

				test('"ara" returns "Арабский"', function () {
					assert.strictEqual(langs.ruNames("eng"), "Английский");
				});

			});

			suite('ruNames with empty string returns empty string:', function () {

				test('`""` returns empty string', function () {
					assert.strictEqual(langs.ruNames(""), "");
				});

			});

			suite('ruNames with empty object returns empty string:', function () {

				test('`{}` returns empty string', function () {
					assert.strictEqual(langs.ruNames({}), "");
				});

			});

		})


		suite('originalNames', function() {

			test('is a function', function () {
				assert.isFunction(langs.originalNames);
			});

			suite('returns empty string when passed empty:', function () {

				test('empty string', function () {
					assert.strictEqual(langs.originalNames(""), "");
				});

				test('empty object', function () {
					assert.strictEqual(langs.originalNames({}), "");
				});

			});

			suite(`with object returns string with original names`, function () {

				test(`${JSON.stringify(langObj)} returns ${langObjOriginalString}`, function () {
					assert.strictEqual(langs.originalNames(langObj), langObjOriginalString);
				});

				test(`${JSON.stringify(langObj2)} returns ${langObj2OriginalString}`, function () {
					assert.strictEqual(langs.originalNames(langObj2), langObj2OriginalString);
				});

			});

		})

});

