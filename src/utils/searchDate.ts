function formatDate() {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${year}.${month + 1}.${day}`;
}

export default formatDate;
