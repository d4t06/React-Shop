export const sleep = (time) =>
   new Promise((rs) => {
      setTimeout(() => {
         rs();
      }, time);
   });
