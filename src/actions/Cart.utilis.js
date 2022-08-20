export const existingCartItem = ({ prevCartItems, nextCartItem }) => {
  return prevCartItems.find((item) => item.id === nextCartItem.id);
};

export const handleAddToCart = ({ prevCartItems, nextCartItem }) => {
  const quantityIncrement = 1;
  const cartItemExists = existingCartItem({ prevCartItems, nextCartItem });
  if (cartItemExists) {
    return prevCartItems.map((item) =>
      item.id === nextCartItem.id
        ? {
            ...item,
            quantity: item.quantity + quantityIncrement,
          }
        : item
    );
  }
  return [
    ...prevCartItems,
    {
      ...nextCartItem,
      quantity: quantityIncrement,
      
    },
  ];
};

export const handleRemoveCartItem = ({ prevCartItems, cartItemToRemove }) => {
  return prevCartItems.filter((item) => item.id !== cartItemToRemove.id);
};

export const handleReduceCartItem = ({ prevCartItems, cartItemToReduce }) => {
  const existingCartItem = prevCartItems.find(
    (item) => item.id === cartItemToReduce.id
  );
  if (existingCartItem.quantity === 1) {
    return prevCartItems.filter((item) => item.id !== existingCartItem.id);
  }

  return prevCartItems.map((item) =>
    item.id === existingCartItem.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};
