<template>
  <h2>当前求和为：{{ sum }}</h2>
  <button @click="sum++">点我+1</button>
  <hr />
  <h2>当前点击时鼠标的坐标为：x:{{ point.x }}, y:{{ point.y }}</h2>
</template>
<script>
import { ref } from "vue";
import usePoint from '../hooks/usrPoint'

export default {
  name: "UserDemo",
  setup() {
    //数据
    let sum = ref(0);
    /* let point = reactive({
      x: 0,
      y: 0,
    });

    //方法
    function savePoint(event) {
      point.x = event.pageX;
      point.y = event.pageY;
      console.log(event.pageX, event.pageY);
    }
    onMounted(() => {
      window.addEventListener("click", savePoint);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("click", savePoint);
    }); */

    let point = usePoint()

    //返回一个对象（常用）
    return {
      sum,
      point
    };
  },
};
</script>

<style></style>
