export const maxLength = (v) => {
  return !v || v.length <= 100 || `Максимум 100 символов`;
};
