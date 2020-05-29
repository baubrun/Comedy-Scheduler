export const orderNumber = () => {
  return "CB3" + Math.floor(Math.random() * 1000);
};


export const compareDates = (a, b) => {
    let dateA = new Date(a.startDate);
    let dateB = new Date(b.startDate);
    return dateA - dateB;
};


export const formattedAmount = (amount) => {
  const [wholeNum, decimal] = amount.split(".");
  return wholeNum + decimal;
};


export const minutesToTenDigits = (min) => {
  if (min >= 0 && min < 10) {
    return `0${min}`;
  }
};


export const timeToNumber = (time) => {
    const h = parseInt(time.split(":")[0]);
    const m = parseInt(time.split(":")[1]);
    return [h, m];
  };
  
  
export const timeFixed15 = (givenTime) => {
    console.log("givenTime :", givenTime);
    const [givenHour, givenMinute] = timeToNumber(givenTime);
    let hour = givenHour;
    let minute = 0;
    let time = [];
    if (givenMinute % 15 === 0) {
      time[0] = givenHour;
      const mins = minutesToTenDigits(givenMinute);
      time[1] = givenMinute === 0 ? mins : givenMinute;
      return time.join(":");
    }
    if (givenMinute > 0 && givenMinute < 15) {
      minute = 15;
    }
    if (givenMinute > 15 && givenMinute < 30) {
      minute = 30;
    }
    if (givenMinute > 30 && givenMinute < 45) {
      minute = 45;
    }
    if (givenMinute > 45) {
      minute = 0;
      hour += 1;
    }
    time[0] = hour;
    const mins = minutesToTenDigits(minute);
    time[1] = mins ? mins : minute;
    return time.join(":");
  };

  export const validTimeFormat = (start, end) => {
    const regex = RegExp(/([0-1]?\d|2[0-3]):[0-5]\d$/);
    const startFormat = regex.test(start);
    const endFormat = regex.test(end);
    return startFormat && endFormat ? true : false;
  };
