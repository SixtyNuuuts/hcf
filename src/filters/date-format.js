var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var version = "1.3.1";

var padZeros = function (input, maxLength) {
    if (maxLength === void 0) { maxLength = 0; }
    return ("0000" + input).slice(-maxLength);
};
var defaultConfig = {
    dayOfWeekNames: [
        'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
    ],
    dayOfWeekNamesShort: [
    'dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'
    ],
    monthNames: [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ],
    monthNamesShort: [
    'Jan', 'Fev', 'Mars', 'Avr', 'Mai', 'Juin',
    'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
};
var dateFormat = function (input, format, config) {
    if (format === void 0) { format = 'YYYY.MM.DD HH:mm:ss'; }
    if (config === void 0) { config = {}; }
    config = __assign(__assign({}, defaultConfig), config);
    var year = input.getFullYear();
    var month = input.getMonth() + 1;
    var date = input.getDate();
    var hours24 = input.getHours();
    var hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
    var minutes = input.getMinutes();
    var seconds = input.getSeconds();
    var weekday = input.getDay();
    return format
        // Normalize tokens
        .replace('YYYY', '%01%')
        .replace('YY', '%02%')
        .replace('MMMM', '%03%')
        .replace('MMM', '%04%')
        .replace('MM', '%05%')
        .replace('M', '%06%')
        .replace('DD', '%07%')
        .replace('D', '%08%')
        .replace('HH', '%09%')
        .replace('H', '%10%')
        .replace('hh', '%11%')
        .replace('h', '%12%')
        .replace('mm', '%13%')
        .replace('m', '%14%')
        .replace('ss', '%15%')
        .replace('s', '%16%')
        .replace('A', '%17%')
        .replace('a', '%18%')
        .replace('dddd', '%19%')
        .replace('dd', '%20%')
        .replace('d', '%21%')
        // Insert values
        .replace('%01%', padZeros(year, 4))
        .replace('%02%', padZeros(year % 100, 2))
        .replace('%03%', config.monthNames[month - 1])
        .replace('%04%', config.monthNamesShort[month - 1])
        .replace('%05%', padZeros(month, 2))
        .replace('%06%', "" + month)
        .replace('%07%', padZeros(date, 2))
        .replace('%08%', "" + date)
        .replace('%09%', padZeros(hours24, 2))
        .replace('%10%', "" + hours24)
        .replace('%11%', padZeros(hours12, 2))
        .replace('%12%', "" + hours12)
        .replace('%13%', padZeros(minutes, 2))
        .replace('%14%', "" + minutes)
        .replace('%15%', padZeros(seconds, 2))
        .replace('%16%', "" + seconds)
        .replace('%17%', hours24 < 12 ? 'AM' : 'PM')
        .replace('%18%', hours24 < 12 ? 'am' : 'pm')
        .replace('%19%', config.dayOfWeekNames[weekday])
        .replace('%20%', config.dayOfWeekNamesShort[weekday])
        .replace('%21%', "" + weekday);
};

var main = {
    install: function (Vue, baseConfig) {
        Vue.filter('dateFormat', function (date, format, config) {
            if (config === void 0) { config = {}; }
            return dateFormat(date, format, __assign(__assign({}, baseConfig), config));
        });
    },
    version: version
};

export default main;
export { dateFormat };
