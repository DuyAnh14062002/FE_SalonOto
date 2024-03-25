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
