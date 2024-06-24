export const formatCurrency = (number) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

export const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + month : month
  }/${year}`;

  return formattedDate;
};
export const formatTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
  return formattedTime;
};
export function formatTimeDifference(timestamp) {
  const now = new Date();
  const then = new Date(timestamp);

  let diff = now.getTime() + 7 * 60 * 60 * 1000 - then.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years === 1 ? "1 năm trước" : `${years} năm trước`;
  } else if (months > 0) {
    return months === 1 ? "1 tháng trước" : `${months} tháng trước`;
  } else if (days > 0) {
    return days === 1 ? "1 ngày trước" : `${days} ngày trước`;
  } else if (hours > 0) {
    return hours === 1 ? "1 giờ trước" : `${hours} giờ trước`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 phút trước" : `${minutes} phút trước`;
  } else {
    return seconds === 1 ? "1 giây trước" : `${seconds} giây trước`;
  }
}
export function timeDifferenceFromNow(datetimeString) {
  const now = new Date();
  const dateTimeParts = datetimeString?.split(" ");
  const dateParts = dateTimeParts[0]?.split("-");
  const timeParts = dateTimeParts[1]?.split(":");

  const date = new Date(
    parseInt(dateParts[2]), // year
    parseInt(dateParts[1]) - 1, // month (0-based)
    parseInt(dateParts[0]), // day
    parseInt(timeParts[0]), // hour
    parseInt(timeParts[1]), // minute
    parseInt(timeParts[2]) // second
  );

  const timeDiff = now - date;

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return `${seconds} giây`;
  } else if (minutes < 60) {
    return `${minutes} phút`;
  } else if (hours < 24) {
    return `${hours} giờ`;
  } else if (days < 30) {
    return `${days} ngày`;
  } else if (months < 12) {
    return `${months} tháng`;
  } else {
    return `${years} năm`;
  }
}
export function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}
export const formatDateOfBirth = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  return `${day}/${month}/${year}`;
};
