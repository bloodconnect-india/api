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
    const Address1 = Address.split(',');
    const District = Address1[Address1.length - 2].trim();
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
        Availability = "NA";
    }
    else {
        Availability = Availability.replace("<p class='text-success'>Available, ", " ");
        Availability = Availability.replace("</p>", " ");
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
    var live = "Yes";
    var date_time_updated = entry[4];
    var hr = today.getHours();
    var mn = today.getMinutes();
    var sc = today.getSeconds();
    var h = hr + "", m = mn + "", s = sc + "";
    if (hr < 10) {
        h = "0" + hr;
    }
    if (mn < 10) {
        m = "0" + mn;
    }
    if (sc < 10) {
        s = "0" + sc;
    }
    let curr_time = h + ":" + m + ":" + s;
    var date_updated = tod;
    var time_updated = curr_time;
    if (!date_time_updated.includes("live")) {
        var date_and_time = date_time_updated.split(" ");
        date_updated = date_and_time[0].split("-");
        date_updated = date_updated[2] + "-" + date_updated[1] + "-" + date_updated[0];
        time_updated = date_and_time[1];
        live = "No";
    }
    return {
        Blood_Bank_Name: Blood_Bank_Name,
        Region: cityName,
        Address: Address,
        Email: Email,
        Phone_Number: getPhoneNumber(Phone),
        Availability: Availability,
        Date_field: tod,
        Last_Updated_Date: date_updated,
        Last_Updated_Time: time_updated,
        Status_Live: live,
        District: District
    };
};
const getPhoneNumber = (phone) => {
    phone = phone.trim();
    if (phone.includes(',')) {
        phone = phone.split(',')[0];
    }
    if (phone.includes('-')) {
        return phone;
    }
    const zerosRequired = 10 - phone.length;
    if (zerosRequired >= 0) {
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