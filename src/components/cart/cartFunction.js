const calcTotalPriceOffer = (cart) => {
  let [tPrice, tOffer] = [0, 0];
  cart?.forEach(({ quantity = 0, price = 0, offer = 0 }) => {
    tPrice += price * quantity;
    tOffer += (offer || price) * quantity;
  });
  return [tPrice.fix(), tOffer.fix()];
};

const cartBySellerFunc = (cart, sellersCarts = {}) => {
  cart?.forEach((product) => {
    if (!sellersCarts[product?.user])
      sellersCarts[product?.user] = [];

    sellersCarts[product?.user].push(product);
  });

  return sellersCarts;
};

export { calcTotalPriceOffer, cartBySellerFunc };
