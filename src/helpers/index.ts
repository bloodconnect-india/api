export const changeToddmmyyyy = (date:string) => {
    let newDate = ''
    let dateAr = date.split('-')
    newDate = dateAr[2] + "-" + dateAr[1] + "-" + dateAr[0]
    return newDate
}


export const convertArrayToList = (arr:Array<any>) => {
    let result = ""
    for (let i = 0; i < arr.length; i++) {
        if (containsComman(arr[i]))
            arr[i] = `"${arr[i]}"`
        if (i > 0)
            result = result + ',' + arr[i]
        else
            result += arr[i]
    }
    console.log(result)
    return result
}


export const containsComman = (s:string) => {
    for (let i = 0; i < s.length; i++) {
        if (s[i] == ',')
            return true
    }
    return false
}