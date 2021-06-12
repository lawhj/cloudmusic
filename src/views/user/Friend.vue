<template>
  <div class="friend">
    <div class="header">
      <h3>动态</h3>
    </div>
    <div class="body">

    </div>
  </div>
</template>

<script>
import {ref,onMounted} from 'vue'
import {getFriend} from '@/network/user/friend.js'

export default {
  name:'Friend',
  setup(){

     onMounted(()=>{
       getFriend().then(res=>{
         console.log('朋友动态',res);
       })
     })

  }
}
</script>

<style scoped>
.friend{
  width:1000px;
  margin:0 auto;
}
</style>
