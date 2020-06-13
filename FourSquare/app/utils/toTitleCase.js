export const convertToTitleCase = (text, delimeter) => {
  return text
    .toLowerCase()
    .split(delimeter || ' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
};

export const capitalizeFirstWord = (text) => {
  return text.charAt(0).toUpperCase() + text.substring(1);
};
