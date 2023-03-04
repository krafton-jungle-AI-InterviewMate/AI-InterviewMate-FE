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

export const formatVideoFileName = (roomIdx: number) => {
  const date = new Date().toISOString().split("T")[0].replace(/-/g, "").slice(2,8);

  return `${roomIdx}_${date}.webm`;
};
