const retriveCart = () => {
  const cart = localStorage.getItem("cart");

  if (!cart) {
    return [];
  }

  return JSON.parse(cart);
};
