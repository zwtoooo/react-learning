
const addFoodToCart = (food) => {
  return {
    type: 'ADD_FOOD',
    name: food.name,
    price: food.price,
    original_price: food.original_price,
    count: food.count,
    addtional: food.addtional,
    image_hash: food.image_hash,
    id: food.id,
    pid: food.pid
  }
}

const reduceFoodFromCart = (food) => {
  return {
    type: 'REDUCE_COUNT',
    name: food.name,
    addtional: food.addtional,
    count: food.action || 1,
    id: food.id,
    pid: food.pid
  }
}

const removeAllFoodsFromCart = (pid) => {
  return {
    type: 'REMOVE_ALL',
    pid: pid
  }
}

export {
  addFoodToCart,
  reduceFoodFromCart,
  removeAllFoodsFromCart
}