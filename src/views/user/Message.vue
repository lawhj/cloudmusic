<template>
<div class="message">
  <div class="leftSide">

  </div>
  <div class="mainBody">

  </div>
</div>
</template>

<script>
import {getAt,getComment,getNotify} from '@/network/message.js'


export default {
  name:'Message',
  data(){
  return {

   }

 },
 mounted(){
    getComment(this.$store.state.user.userId).then(res=>{
      console.log(res);
    })
 }


}

</script>

<style scoped>
.message{
  width:1000px;
  margin: 0 auto;
  display: flex;
}
</style>
