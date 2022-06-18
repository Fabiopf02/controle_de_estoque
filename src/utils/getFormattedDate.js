function getFormattedDate(date, format = 'dd/mm/aaaa') {
  const values = {
    dd: date.getDate() > 9 ? String(date.getDate()) : '0' + date.getDate(),
    mm:
      date.getMonth() + 1 > 9
        ? String(date.getMonth() + 1)
        : '0' + (date.getMonth() + 1),
    aa: date.getFullYear().toString().substr(2, 2),
    aaaa: String(date.getFullYear()),
  };
  const st = format.split('/');
  let newDate = format;
  st.map(i => {
    newDate = newDate.replace(i, values[i]);
  });
  return newDate;
}

export default getFormattedDate;
