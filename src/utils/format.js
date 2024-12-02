export const formatPrice = (price, sale = 0) => {
  const priceString = Math.round(price * (100 - sale) / 100);
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return formatter.format(priceString)
}

export const formatFilterPrice = (price) => {
  const filterPrice = price?.map((p) => formatPrice(p));
  return filterPrice?.join(" - ");
};

export const formatStar = (starNumber) => {
  return starNumber.toFixed(1);
};


export const formatSortSize = (sizes) => {
  if (sizes) {
    const getSizeOrder = (size) => {
      switch (size) {
        case "S":
          return 0;
        case "M":
          return 1;
        case "L":
          return 2;
        case "XL":
          return 3;
        case "XXL":
          return 4;
        case "XXXL":
          return 5;
        default:
          return -1;
      }
    };
    sizes.sort((a, b) => {
      const sizeA = getSizeOrder(a);
      const sizeB = getSizeOrder(b);
      return sizeA - sizeB;
    });
  }
  return sizes;
};

export const fortmatFullDate = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  return formattedDate
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate
}