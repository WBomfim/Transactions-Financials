export const formatDate = (date: string): string => {
  const [day, month, year] = date.split('-');
  if (day.length === 4) return date

  if (year === undefined) {
    const [day, month, year] = date.split('/');
    if (day.length === 4) return date
    return `${year}-${month}-${day}`;
  }

  return `${year}-${month}-${day}`;
}
