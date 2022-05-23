<template>
  <div class="category">
      <h3>{{title}}分类</h3>
      <slot name="center">我是一个默认值，当使用者没有传递具体结构时，我会出现1</slot>
      <slot name="footer">我是一个默认值，当使用者没有传递具体结构时，我会出现2</slot>
  </div>
</template>

<script>
export default {
    name: 'AdminCategory',
    props: ['title']
}
</script>

<style>
.category{
    background-color: skyblue;
    width: 200px;
    height: 300px;
}

h3{
    text-align: center;
    background: orange;
}
</style>