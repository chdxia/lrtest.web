<template>
  <div class="school">
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'

export default {
  name: "AdminSchool",
  props:['getSchoolName'],
  data() {
    return {
      name: "重庆理工大学",
      address: "重庆花溪",
    };
  },
  methods: {
    demo(msgName,data){
      console.log('有人发布了hello消息，hello消息的回执执行了',data,this)
    }
  },
  mounted(){
    this.pubId = pubsub.subscribe('hello',this.demo)
  },
  beforeDestroy(){
    pubsub.unsubscribe(this.pubId)
  }
};
</script>

<style scoped>
.school{
  background-color: skyblue;
  padding: 5px;
}
</style>