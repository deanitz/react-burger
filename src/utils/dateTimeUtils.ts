export const getDateDescription = (dateTimeString: string): string => {
  const today = new Date();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const dayBeforeYesterday = new Date();
  dayBeforeYesterday.setDate(today.getDate() - 2);

  const loc = "ru-RU";
  const date = new Date(dateTimeString);
  const dateString = date.toLocaleDateString(loc);
  const timeString = date.toLocaleTimeString(loc);

  if (dateString === today.toLocaleDateString(loc)) {
    return `Сегодня, ${timeString}`;
  } else if (dateString === yesterday.toLocaleDateString(loc)) {
    return `Вчера, ${timeString}`;
  } else if (dateString === dayBeforeYesterday.toLocaleDateString(loc)) {
    return `2 дня назад, ${timeString}`;
  }
  return `${dateString} ${timeString}`;
};
