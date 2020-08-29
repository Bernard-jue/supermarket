import Toast from './Toast';

const obj = {};

obj.install = function (Vue) {
  // 1.创建组建的构造器
  const toastConstructor = Vue.extend(Toast);

  // 2.new的方式，按照组件构造器，创建一个组件对象
  const toast = new toastConstructor();

  // 3.将组对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'));

  // toast.$el对应的就是div
  document.body.appendChild(toast.$el);

  Vue.prototype.$toast = toast;
}

export default obj
