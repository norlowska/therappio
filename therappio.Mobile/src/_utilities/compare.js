export const compareValues = (key, order = 'asc') => {
  console.log('compare', key);
  return function innerSort(a, b) {
    console.log('inner sort ', a, b);
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      console.log('nah');
      return 0;
    }
    console.log(a[key], b[key]);
    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }

    return order === 'desc' ? comparison * -1 : comparison;
  };
};
