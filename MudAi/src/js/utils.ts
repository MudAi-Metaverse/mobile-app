// オブジェクトの配列から要素を検索する
export const findItemFromArr = (arr, key, value) => {
  const filteredArr = arr.filter(item => item[key] === value);

  if (filteredArr.length > 0) {
    return filteredArr[0];
  } else {
    return null;
  }
};
