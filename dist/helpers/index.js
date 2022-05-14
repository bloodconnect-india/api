"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processRaktKoshEntry = exports.containsComman = exports.convertArrayToList = exports.changeToddmmyyyy = void 0;
exports.changeToddmmyyyy = (date) => {
    let newDate = '';
    const dateAr = date.split('-');
    newDate = dateAr[2] + '-' + dateAr[1] + '-' + dateAr[0];
    return newDate;
};
exports.convertArrayToList = (arr) => {
    let result = '';
    for (let i = 0; i < arr.length; i++) {
        if (exports.containsComman(arr[i]))
            arr[i] = `"${arr[i]}"`;
        if (i > 0)
            result = result + ',' + arr[i];
        else
            result += arr[i];
    }
    return result;
};
exports.containsComman = (s) => {
    for (let i = 0; i < s.length; i++) {
        if (s[i] === ',')
            return true;
    }
    return false;
};
exports.processRaktKoshEntry = (entry, cityName) => {
    const details = entry[1].split('<br/>');
    const Blood_Bank_Name = details[0];
    const Address = details[1];
    var Phone = '-', Email = '-';
    if (details[2] != null) {
        var s1 = details[2].replace('Phone: ', '?');
        var s2 = s1.replace(',Fax: ', '?');
        var s3 = s2.replace('Email: ', '?');
        Phone = s3.split('?')[1];
        Email = s3.split('?')[3];
    }
    var Availability = entry[3];
    if (Availability.includes('Not')) {
        Availability = 'NA';
    }
    else {
        Availability = Availability.replace("<p class='text-success'>Available, ", ' ');
        Availability = Availability.replace('</p>', ' ');
    }
    const today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var d = dd + '', m = mm + '';
    if (dd < 10) {
        d = '0' + dd;
    }
    if (mm < 10) {
        m = '0' + mm;
    }
    var tod = d + '-' + m + '-' + yyyy;
    return {
        Blood_Bank_Name: Blood_Bank_Name,
        Region: cityName,
        Address: Address,
        Email: Email,
        Phone_Number: getPhoneNumber(Phone),
        Availability: Availability,
        Date_field: tod,
    };
};
const getPhoneNumber = (phone) => {
    phone = phone.trim();
    if (phone.includes(',')) {
        phone = phone.split(',')[0];
    }
    const zerosRequired = 10 - phone.length;
    if (zerosRequired > 0) {
        for (let i = 0; i < zerosRequired; i++) {
            phone = '0' + phone;
        }
    }
    else {
        phone = '0000000000';
    }
    return '+91' + phone;
};
//# sourceMappingURL=index.js.map