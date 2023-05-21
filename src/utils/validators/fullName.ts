export const fullName = (v) => {
  const errorMessage = "Укажите фамилию и имя";
  const chunks = (v || "").split(" ");

  return chunks.length < 2 ? errorMessage : true;
};
