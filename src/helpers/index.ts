export const changeToddmmyyyy = (date: string) => {
  let newDate = "";
  const dateAr = date.split("-");
  newDate = dateAr[2] + "-" + dateAr[1] + "-" + dateAr[0];
  return newDate;
};

export const convertArrayToList = (arr: any[]) => {
  let result = "";
  for (let i = 0; i < arr.length; i++) {
    if (containsComman(arr[i])) arr[i] = `"${arr[i]}"`;
    if (i > 0) result = result + "," + arr[i];
    else result += arr[i];
  }
  return result;
};

export const containsComman = (s: string) => {
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ",") return true;
  }
  return false;
};
