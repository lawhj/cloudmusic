<template>
  <div class="my">
    <div class="sideBar">
      <el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item :title="createTitle" name="1">
    <div class="create">
      <ul>
        <li v-for="item in getCreateList" :key="item" >
          <img :src="item.coverImgUrl" >
          <div class="desc">
            <h5>{{item.name}}</h5>
            <h5>{{item.trackCount}}首</h5>
          </div>
        </li>
      </ul>
    </div>
  </el-collapse-item>
  <el-collapse-item :title="collectTitle" name="2">
    <div class="collect">
      <ul>
        <li v-for="item in getCollectList" :key="item" >
          <img :src="item.coverImgUrl" >
          <div class="desc">
            <h5>{{item.name}}</h5>
            <h5>{{item.trackCount}}首</h5>
          </div>
        </li>
      </ul>
    </div>
  </el-collapse-item>
</el-collapse>
    </div>
    <div class="main">

    </div>
  </div>

</template>

<script>
import {getUserCount,getAccountSonglist} from '@/network/user/user.js'
import {ref,onMounted,computed} from 'vue'
import {useStore} from 'vuex'

export default {
  name:'My',
  setup(){

   const store=useStore()
   let CreateListCount=ref(0)
   let activeNames=ref('1')
   let createList=ref([])
   let collectList=ref([])
   let createTitle=ref('')
   let collectTitle=ref('')

   onMounted(()=>{
     getUserCount().then(res=>{
       CreateListCount.value=res.data.createdPlaylistCount
       // console.log(res);
       createTitle.value=`创建的歌单(${CreateListCount.value})`
       collectTitle.value=`收藏的歌单(${res.data.subPlaylistCount})`
     })

    getAccountSonglist(store.state.user.userId).then(res=>{
      createList.value=res.data.playlist.slice(0,CreateListCount.value)
      collectList.value=res.data.playlist.slice(CreateListCount.value)
      console.log(res);
    })

   })

   let handleChange=()=>{
     console.log('改变了');
   }

   let getCreateList=computed(()=>{
     return createList.value
   })

   let getCollectList=computed(()=>{
     return collectList.value
   })

   return{
     CreateListCount,
     handleChange,
     activeNames,
     createList,
     collectTitle,
     createTitle,
     getCreateList,
     getCollectList
   }


  }
}
</script>

<style scoped>
.my{
 width:1000px;
 margin:0 auto;
  display: flex;
}
.sideBar{
  width:300px;
}
.main{
  width:700px;
}
.sideBar ul li img{
  width:40px;
  height:40px;
  margin-right: 10px;
}
.sideBar ul li{
  display: flex;
  height:50px;
  margin:10px 0;
  align-items: center;
}
.sideBar ul li:hover{
  background-color: rgba(240,240,240);
  cursor: pointer;
}

.desc h5{
  font-weight: normal;

}
</style>
