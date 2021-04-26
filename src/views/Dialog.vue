<template>
  <div>
    <el-dialog
  title="登录页面"
  v-model="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <img src="~@/assets/images/play.png" >
  <span>请用APP扫码登录</span>
  <template #footer>
    <span class="dialog-footer">
    </span>
  </template>
</el-dialog>
   132123131
  </div>
</template>

<script>
import {ref,onMounted} from 'vue'

export default {
  name:'dialog',
  setup(){
    let dialogVisible=ref(true)


    let handleClose=(done)=>{
       dialogVisible.value=false
   }

    return{
      dialogVisible,
      handleClose
    }

  }
}
</script>

<style scoped>
</style>
