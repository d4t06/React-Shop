export const sleep = (time) =>
  new Promise((rs) => {
    setTimeout(() => {
      rs();
    }, time);
  });

export const moneyFormat = (string) => {
  const formatter = new Intl.NumberFormat("en-US");
  return formatter.format(string);
};
