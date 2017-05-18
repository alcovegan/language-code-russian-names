I made this package for working with countries data by [meldoze](https://github.com/mledoze/countries). They are using languages object keyed by `ISO 639-3` three-letter codes and values with name of the language in English, like so:

```js
"languages": {
			"fra": "French",
			"mlg": "Malagasy"
}
```

For my own needs i want to get language name(s) by code on Russian, returned as strings. Codes and names taken from [Wikipedia](https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%B4%D1%8B_%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%B2).


## Notes
1. Language with code `mol` is Moldavian, but this code is [retired](http://www-01.sil.org/iso639-3/documentation.asp?id=mol) by [merge with Romanian](http://www-01.sil.org/iso639-3/documentation.asp?id=ron) language. So, if you using [meldoze](https://github.com/mledoze/countries) database and pass languages object of Moldova country (`{"ron": "Moldavian"}`) in `langs.ruNames`, you get string with two languages - `Молдавский, Румынский` (Moldavian, Romanian). For `{"ron": "Romanian"}` of Romania country you get just `Румынский` (Romanian). If you pass just a string `ron` you also get only `Румынский`.
2. `langs.originalNames` working properly only if you're using [meldoze](https://github.com/mledoze/countries) package or passing identical objects (see above). Doesn't work with strings.
3. Some russian names of rare languages taken from [here](https://en.wikipedia.org/wiki/ISO_639), some from their pages on Wikipedia.
4. Folder `test` contains folder with json dataset of [meldoze](https://github.com/mledoze/countries) countries and licence file. If you want to run tests on more fresh dataset - download it from [here](https://github.com/mledoze/countries/blob/master/countries.json) and replace `test/countries/countries.json` with new.
5. When `langs.alpha2` codes was multiple, i prefer `ISO-639-2/B`.

## Documentation
```js
var langs = require('lang-codes-ru-names');

langs.ruNames({"ara": "Arabic"});
// "Арабский"

langs.ruNames({"cat":"Catalan","eus":"Basque","glg":"Galician","oci":"Occitan","spa":"Spanish"});
// "Каталанский, Баскский, Галисийский, Окситанский, Испанский"

langs.ruNames("ara");
// "Арабский"

langs.originalNames({"cat":"Catalan","eus":"Basque","glg":"Galician","oci":"Occitan","spa":"Spanish"});
// "Catalan, Basque, Galician, Occitan, Spanish"

langs.all();
// [
//     {"name":"Английский","1":"en","2":"eng","3":"eng","gost77597":"анг","numeric":45},
//     {"name":"Корейский","1":"ko","2":"kor","3":"kor","gost77597":"коо","numeric":330},
//     ...
// ]

langs.names();
// [
//     "Английский",
//     "Корейский",
//     ...
// ]

langs.codes("1");
// [
//     "en",
//     "ko",
//     ...
// ]

langs.codes("2");
// [
//     "eng",
//     "kor",
//     ...
// ]


langs.codes("3");
// [
//     "eng",
//     "kor",
//     ...
// ]

langs.codes("gost77597");
// [
//     "анг",
//     "коо",
//     ...
// ]

langs.codes("numeric");
// [
//     45,
//     330,
//     ...
// ]

langs.alpha1("en");
// {
//  '1': 'en',
//  '2': 'eng',
//  '3': 'eng',
//  name: 'Английский',
//  gost77597: 'анг',
//  numeric: 45
// }

langs.alpha2("eng");
// {
//  '1': 'en',
//  '2': 'eng',
//  '3': 'eng',
//  name: 'Английский',
//  gost77597: 'анг',
//  numeric: 45
// }

langs.alpha3("eng");
// {
//  '1': 'en',
//  '2': 'eng',
//  '3': 'eng',
//  name: 'Английский',
//  gost77597: 'анг',
//  numeric: 45
// }

langs.gost77597("анг");
// {
//  '1': 'en',
//  '2': 'eng',
//  '3': 'eng',
//  name: 'Английский',
//  gost77597: 'анг',
//  numeric: 45
// }

langs.numeric("45");
// {
//  '1': 'en',
//  '2': 'eng',
//  '3': 'eng',
//  name: 'Английский',
//  gost77597: 'анг',
//  numeric: 45
// }

```

## Tests
`npm run test`

## Links
[currency-names](https://github.com/alcovegan/currency-names) - another library for working with [meldoze](https://github.com/mledoze/countries) database for getting currency names by currency code(s). Names available on Russian and English. 184 currency codes in total. 

## Todo
- [ ] Ability to pass an array of iso 639-3 codes and get string with russian names
- [ ] Ability to use in browser
- [ ] Add English names for every language
- [ ] Add `639-1` for languages that missing it (if code exists)
- [ ] Add `639-2B` for languages that missing it (if code exists)
- [x] ~~Reduce all `639-2` codes to one standard (`2B or 2T`)~~ (i took `2B`)
- [ ] Refactor code
- [ ] Refactor tests