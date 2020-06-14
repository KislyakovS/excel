export const capitalLetter = (str) => {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const range = (start, end) => {
  if (start > end) [end, start] = [start, end];

  return new Array(end - start + 1).fill("").map((_, i) => i + start);
};

export const storage = (key, data = null) => {
  if (data) {
    localStorage.setItem(key, JSON.stringify(data))
  } else {
    return localStorage.getItem(key)
  }
}