import {request} from './request'

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export class Goods {
  constructor(itemInfo, columns, service) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.price = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.discountBgColor = itemInfo.discountBgColor;
    this.columns = columns;
    this.services = service;
  }
}

export class ParamsInfo {
  constructor(info, rule) {
    // 有些商品是没有这些图片的
    this.image = info.images ? Info.images[0] : '';
    this.info = info.set;
    this.size = rule.tables;
  }
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}
