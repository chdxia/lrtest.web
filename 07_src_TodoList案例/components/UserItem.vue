<template>
  <li>
      <label>
          <input type="checkbox" :checked="todo.done" @click="handleCheck"/>
          <span>{{todo.title}}</span>
      </label>
      <button class="btn btn-danger">删除</button>
  </li>
</template>

<script>
export default {
    name:'UserItem',
    props:['todo', 'checkTodo'],
    methods: {
        //勾选or取消勾选
        handleCheck(id){
            //通知app组件将对应的todo对象的done值取反
            this.checkTodo(id)
        },
        //删除
        handleDelete(id){
            if(confirm('确定删除？')){
                console.log(id)
            }
        }
    },
}
</script>

<style scoped>
    li{
        list-style: none;
        height: 36px;
        line-height: 36px;
        padding: 0 5px;
        border-bottom: 1px solid #ddd;
    }

    li label{
        float: left;
        cursor: pointer;
    }

    li lable li input{
        vertical-align: middle;
        margin-right: 6px;
        position: relative;
        top: -1px;
    }

    li button{
        float: right;
        display: none;
        margin-top: 3px;
    }

    li:before{
        content: initial;
    }

    li:last-child{
        border-bottom: none;
    }
    /*
    li:hover{
        background: #ddd;
    }

    li:hover{
        display: block;
    }*/
</style>