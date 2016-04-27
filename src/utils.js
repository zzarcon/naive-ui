export const $ = (selector, element) => {
  return (element || document).querySelector(selector);
}

export const cloneDeep = (obj) => {
  let result = {};

  Object.keys(obj).forEach(k => {
    let value = obj[k];

    if (value.toString === '[object Object]') {
      result[k] = cloneDeep(value);
    } else {
      result[k] = value;
    }
  });

  return result;
}