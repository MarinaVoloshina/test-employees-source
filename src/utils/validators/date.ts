export const date = (v: string) => {
  const errorMessage = "Укажите дату в формате ГГГГ-ММ-ДД";

  const date = new Date(Date.parse(v));
  const year = date.getFullYear();

  let month = String(date.getMonth() + 1);
  if (month.length < 2) month = "0" + month;

  let day = String(date.getDate());
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-") === v || errorMessage;
};
