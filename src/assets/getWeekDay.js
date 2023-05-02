export function getCurrentWeek() {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  var days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

  var weekNumber = Math.ceil(days / 7);
  return weekNumber;
}

export function getDayOfWeek(week) {
  const currentDate = new Date();
  const d = new Date(currentDate.getFullYear(), 0, 1);
  d.setDate(d.getDate() + 1 + (week - 1) * 7);
  const startWeekDay = dateToString(d);
  d.setDate(d.getDate() + 4);
  const endWeekDay = dateToString(d);

  return startWeekDay.toString() + " đến " + endWeekDay.toString();
}

function dateToString(date) {
  const y = date.getFullYear();
  const m =
    date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  const d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

  return `${d}/${m}/${y}`;
}

export function getWeekDayList(week) {
  var weekDay = [0, 1, 2, 3, 4];
  const currentDate = new Date();
  const d = new Date(currentDate.getFullYear(), 0, 1);
  d.setDate(d.getDate() + (week - 1) * 7);
  weekDay = weekDay.map((day) => d.setDate(d.getDate() + 1));
  weekDay = weekDay.map((day) => dateToId(day));
  return weekDay;
}

function dateToId(date) {
  date = new Date(date);
  const y = date.getFullYear();
  const m =
    date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  const d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

  return `${y}${m}${d}`;
}
