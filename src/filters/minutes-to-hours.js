import Vue from 'vue'

var minutesToHours = Vue.filter('minutesToHours', function (value) {
    const hours = (value / 60);
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return rhours != 0 ? rhours + "h" + " " + rminutes + "m" : rminutes + "m";
});

export default minutesToHours;
