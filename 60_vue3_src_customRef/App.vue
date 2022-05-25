<template>
  <input type="text" v-model="keyWord" />
  <h3>{{ keyWord }}</h3>
</template>

<script>
import { customRef } from "vue";

export default {
  name: "App",
  setup() {
    //自定义一个ref，名为：myRef
    function myRef(value, delay) {
      let timer;
      return customRef((track, trigger) => {
        return {
          get() {
            console.log(`有人从myRef这个容器中读取数据了，我把${value}给他了`);
            track(); //通知Vue追踪value的变化（提前）
            return value;
          },
          set(newValue) {
            console.log(`有人把myRef这个容器中的数据改为了：${newValue}`);
            clearTimeout(timer);
            setTimeout(() => {
              value = newValue;
              trigger(); //通知Vue去重新解析模板
            }, delay);
          },
        };
      });
    }

    // let keyWord = ref('hello') //使用Vue提供的ref
    let keyWord = myRef("hello", 1000); //使用程序员自定义的ref
    return { keyWord };
  },
};
</script>

<style></style>
