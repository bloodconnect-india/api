"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containsComman = exports.convertArrayToList = exports.changeToddmmyyyy = void 0;
exports.changeToddmmyyyy = (date) => {
    let newDate = "";
    const dateAr = date.split("-");
    newDate = dateAr[2] + "-" + dateAr[1] + "-" + dateAr[0];
    return newDate;
};
exports.convertArrayToList = (arr) => {
    let result = "";
    for (let i = 0; i < arr.length; i++) {
        if (exports.containsComman(arr[i]))
            arr[i] = `"${arr[i]}"`;
        if (i > 0)
            result = result + "," + arr[i];
        else
            result += arr[i];
    }
    return result;
};
exports.containsComman = (s) => {
    for (let i = 0; i < s.length; i++) {
        if (s[i] === ",")
            return true;
    }
    return false;
};
//# sourceMappingURL=index.js.map