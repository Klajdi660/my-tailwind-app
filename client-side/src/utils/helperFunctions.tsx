import dayjs from "dayjs";

export const getToken = async (type = "l", authorise = 0) => {};

export const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(" ");
};

export const getTimeOfDay = () => {
    const currentTime = dayjs();
    const formattedTime = currentTime.format('HH:mm');
  
    if (formattedTime >= '05:00' && formattedTime < '12:00') {
      return "Good Morning";
    } else if (formattedTime >= '12:00' && formattedTime < '18:00') {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
};
