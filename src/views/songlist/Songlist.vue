<template>
  <div class="song">
    this is song list
    <ul>
      <li v-for="item in getsonglist">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
import {onMounted,ref,computed} from 'vue'
import {getList} from '@/network/list.js'

export default {
  name:'Songlist',
  setup(){
    let songlists=ref([])

   onMounted(()=>{

      getList().then(res=>{
            songlists.value=res.data.playlist
            console.log(res);
      })
   })

    let getsonglist=computed(()=>{
      return songlists.value
    })

       return{
         songlists,
         getsonglist
       }
  }

}
</script>

<style scoped>
</style>
