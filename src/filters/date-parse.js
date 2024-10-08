var version = "1.1.3";

var parse = function (input, format, key) {
    var index = format.indexOf(key);
    return input.slice(index, index + key.length);
};
var dateParse = function (input, format, _a) {
    if (format === void 0) { format = 'YYYY-MM-DD HH.mm.ss'; }
    var _b = (_a === void 0 ? {} : _a).epoch, epoch = _b === void 0 ? 2000 : _b;
    var year = 2000;
    if (format.includes('YYYY')) {
        year = parseInt(parse(input, format, 'YYYY'), 10);
    }
    else if (input.includes('YY')) {
        year = parseInt(parse(input, format, 'YY'), 10) + epoch;
    }
    var month = 0;
    if (format.includes('MM')) {
        month = parseInt(parse(input, format, 'MM'), 10) - 1;
    }
    var date = 1;
    if (format.includes('DD')) {
        date = parseInt(parse(input, format, 'DD'), 10);
    }
    var hours = 0;
    if (format.includes('HH')) {
        hours = parseInt(parse(input, format, 'HH'), 10);
    }
    var minutes = 0;
    if (format.includes('mm')) {
        minutes = parseInt(parse(input, format, 'mm'), 10);
    }
    var seconds = 0;
    if (format.includes('ss')) {
        seconds = parseInt(parse(input, format, 'ss'), 10);
    }
    return new Date(year, month, date, hours, minutes, seconds);
};

var main = {
    install: function (Vue) {
        Vue.filter('dateParse', dateParse);
    },
    version: version
};

export default main;
export { dateParse };
