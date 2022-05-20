<template>
    <div>
        <h1>{{msg}}</h1>
        <h2>学生姓名：{{name}}</h2>
        <h2>学生性别：{{sex}}</h2>
        <h2>学生年龄：{{age+1}}</h2>
    </div>
</template>

<script>
export default {
    name:'myStudent',
    data(){
        return{
            msg: '我是一个好人!!!',
        }
    },
    props:{
        name: {type:String, required:true},
        sex: String,
        age: {type:Number, defult:99
        }
    }
}
</script>