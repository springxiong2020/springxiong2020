export const formatDate = (dateStr) => {
  if (!dateStr) return "";

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatTime = (dateStr) => {
  if (!dateStr) return "";

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

export const formatDateTime = (dateStr) => {
  return `${formatDate(dateStr)} ${formatTime(dateStr)}`;
};

export const formatWithoutSeconds = (dateStr) => {
  return formatDateTime(dateStr).replace(/:\d{2}$/, "");
};
