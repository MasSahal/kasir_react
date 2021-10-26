//arrow function

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const cutText = (x) => {
  if (x.strlenght >= 12) {
    return x.substr(0, 12) + "...";
  } else {
    return x.substr(0, 12);
  }
};
