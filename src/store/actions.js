import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context, payload) {
    return  new Promise((resolve, reject) => {
      // 查找之前的数组中是否存在该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct);
        resolve('该商品数量已加1');
      } else {
        payload.count = 1;
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('该商品已经加入到购物车');
      }
    })
  }
}
