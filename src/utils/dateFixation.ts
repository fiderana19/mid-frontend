export const formatDateForPdf = (date: Date) => {
  let yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // JS months are 0 indexed, 0 = January, 11 = December
  let dd = date.getDate();

  let hh = date.getHours();
  let min = date.getMinutes();
  let ss = date.getSeconds();

  return dd + '-' + mm + '-' + yyyy;
};

export const formatDateForPlaceholder = (datee: any) => {
  const date = new Date(datee);
  let yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // JS months are 0 indexed, 0 = January, 11 = December
  let dd = date.getDate();

  let hh = date.getHours();
  let min = date.getMinutes();
  let ss = date.getSeconds();

  return dd + '-' + mm + '-' + yyyy;
};