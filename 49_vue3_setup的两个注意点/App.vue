<template>
  <UserDemo @hello="showHelloMsg" msg="你好啊" school="重庆理工大学">
    <template v-slot:qwe>
      <span>学校名</span>
    </template>
    <template v-slot:asd>
      <span>学校名</span>
    </template>
  </UserDemo>
</template>

<script>
import UserDemo from "./components/Demo";

export default {
  name: "App",
  components: { UserDemo },
  setup() {
    function showHelloMsg(value) {
      alert(`你好啊，你出发了hello事件，我收到的参数是：${value}`);
    }

    return {
      showHelloMsg,
    };
  },
};
</script>

<style></style>
