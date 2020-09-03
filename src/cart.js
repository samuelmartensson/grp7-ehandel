export default class CartKit {
  constructor() {}

  calculateTotalPrice(arr) {
    let totalPrice = arr.reduce(
      (acc, curr) => acc + curr.item.price * curr.quantity,
      0
    );
    return totalPrice;
  }
  handleIncrement(value, direction, amount = 1) {
    if (direction === 'up') {
      return (value += amount);
    }
    if (direction === 'down' && value >= 1) {
      return (value -= amount);
    }
    return value;
  }
}
