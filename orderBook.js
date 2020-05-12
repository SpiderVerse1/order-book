const reconcileOrder = (existingBook, incomingOrder)=> {
  let updateBlock = []
  
  while(existingBook.length && incomingOrder.quantity > 0) {
    const currentOrder = existingBook.shift()

    if(currentOrder.type !== incomingOrder.type && currentOrder.price === incomingOrder.price)  {
      if(incomingOrder.quantity === currentOrder.quantity) {
        incomingOrder.quantity = 0
      } else if (incomingOrder.quantity> currentOrder.quantity) {
        incomingOrder.quantity = incomingOrder.quantity - currentOrder.quantity
      } else {
        incomingOrder = {
          type: currentOrder.type,
          price: currentOrder.price,
          quantity: currentOrder.quantity - incomingOrder.quantity
        }
      }
    } else {
      updateBlock.push(currentOrder)
    }
  }

  if(existingBook.length){
    updateBlock = updateBlock.concat(existingBook)
  }

  if(incomingOrder.quantity > 0) {
    updateBlock.push(incomingOrder)
  }

  return updateBlock
}

module.exports = reconcileOrder