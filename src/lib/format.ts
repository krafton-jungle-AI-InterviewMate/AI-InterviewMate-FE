export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const time = date.toLocaleTimeString("ko-KR", timeOptions);
  return `${date.toLocaleDateString("ko-KR", dateOptions)} ${time}`;
};

