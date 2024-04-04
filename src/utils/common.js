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
export function formatTimeDifference(timeDifference) {
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days + " ngày trước";
  } else if (hours > 0) {
    return hours + " giờ trước";
  } else if (minutes > 0) {
    return minutes + " phút trước";
  } else {
    return seconds + " giây trước";
  }
}
