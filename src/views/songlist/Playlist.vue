<template>
  <div class="songplaylist">
    <div class="header">
      <div class="choice">
        <h2>全部</h2>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-submenu index="1">
    <template #title>选择分类</template>
    <el-menu-item index="1-1">华语</el-menu-item>
    <el-menu-item index="1-2">欧美</el-menu-item>
    <el-menu-item index="1-2">粤语</el-menu-item>
  </el-submenu>
</el-menu>
      </div>
      <div class="toChange">
        <button>热门</button>
      </div>

    </div>

    <div class="body">
      <div class="songlists" v-show="listShow">
        <div class="listItem" v-for="item in getList">
          <img :src="item.coverImgUrl" @click.prevent="goToListDetail(item.id)"   />
          <a href="#">{{item.name}}</a>
        </div>
      </div>

      <div class="page">
        <el-pagination
    background
    layout="prev, pager, next"
    page-size="35"
    @current-change="pageChange"
    :total="350">
  </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import {ref,onMounted,computed} from 'vue'
import {getSongPlayList} from '@/network/songlist/songlists.js'

export default {
  name:'Playlist',
  setup(){

        let listArray=ref([])
        let listShow=ref(true)

       onMounted(()=>{
          getSongPlayList('hot',35).then(res=>{

            listArray.value=res.data.playlists;
            console.log(res.data.playlists);
          })
       })

       let getList=computed(()=>{
         return listArray.value
       })

       let goToListDetail=(id)=>
       {
         console.log(id);
       }

       let pageChange=(index)=>{
         if(index==1) return
         listShow.value=false
         getSongPlayList('hot',35,index-1).then(res=>{

           listArray.value=res.data.playlists;
           listShow.value=true
         })
       }

       return {
         listArray,
         getList,
         goToListDetail,
         pageChange,
         listShow
       }
  }
}
</script>

<style scoped>
.songplaylist{
  width: 1000px;
  margin: auto;
  padding: 20px 20px;
}
.songplaylist .header{
  height: 80px;
  line-height: 80px;
  border-bottom: 1px solid rgba(194, 12, 12);
}
.songplaylist .header .choice{
  float: left;
  display: flex;
  align-items: center;

}
.songplaylist .header .choice h2{
  font-weight: normal;
}
.songplaylist .header .toChange{
  float: right;
}
.songplaylist .header .toChange button{
  width:46px;
  height: 30px;
  background-color: rgba(168, 9, 9);
  color: white;
  outline: none;
  border-radius: 3px;
}

.songplaylist .body .songlists{
  display: flex;
  flex-wrap: wrap;
  width: 1000px;
  justify-content: space-around;
}
.songplaylist .body .songlists .listItem
{
   width:140px;
   padding: 15px 0;
   margin: 0 20px;

   /* overflow: hidden;
   text-overflow:ellipsis;
   white-space: nowrap; */
}
.songplaylist .listItem img{
  height: 140px;
  width: 140px;
}
.songplaylist .listItem img:hover{
  cursor:pointer;
}

.songplaylist .listItem a{
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
display: block;
}
.songplaylist .listItem a:hover{
  text-decoration: underline;
  overflow: visible;
  position: absolute;
  background-color: #eee;
  font-size: 20px;
}
.page{
  width: 1000px;
  text-align: center;
  margin-top: 20px;
}
</style>
