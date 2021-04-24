<template>
  <div class="songplaylist">
    <div class="header">
      <div class="choice">
        <h2>{{curCat}}</h2>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-submenu index="1">
    <template #title>选择分类</template>
    <el-menu-item index="0" @click="menuClick(0)" >全部</el-menu-item>
    <el-menu-item index="1" @click="menuClick(1)" >华语</el-menu-item>
    <el-menu-item index="2" @click="menuClick(2)">欧美</el-menu-item>
    <el-menu-item index="3" @click="menuClick(3)">粤语</el-menu-item>
  </el-submenu>
</el-menu>
      </div>
      <div class="toChange">
        <button @click.prevent="changeOrder">{{order}}</button>
      </div>

    </div>

    <div class="body">
      <div class="songlists" v-show="listShow">
        <div class="listItem" v-for="item in getList">
          <img :src="item.coverImgUrl" @click.prevent="goToListDetail(item.id)"   />
          <a href="#" @click.prevent="goToListDetail(item.id)" >{{item.name}}</a>
        </div>
      </div>

      <div class="page">
        <el-pagination
    background
    layout="prev, pager, next"
    page-size="35"
    @current-change="pageChange"
    :current-page="curPage"
    :total="350">
  </el-pagination>



      </div>
    </div>

  </div>
</template>

<script>
import {ref,onMounted,computed} from 'vue'
import {getSongPlayList} from '@/network/songlist/songlists.js'
import {useRouter} from 'vue-router'


export default {
  name:'Playlist',
  setup(){

        let listArray=ref([])
        let listShow=ref(true)
        let order=ref('最新')
        let useForOrder=ref('hot')

        let curCat=ref('全部')

        let curPage=ref('1')

        const router=useRouter()


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
         router.push({path:'/songlistdetail',query:{listid:id}})
       }

       let pageChange=(index)=>{
         listShow.value=false
         getSongPlayList(useForOrder.value,35,index-1,curCat.value).then(res=>{

           listArray.value=res.data.playlists;
           listShow.value=true
           curPage.value=index
         })
       }

       let changeOrder=()=>{
         if(order.value=='最新') {
             listShow.value=false
             useForOrder.value='new'
             pageChange(1)
             order.value='最热'
         }
         else{
           listShow.value=false
           useForOrder.value='hot'
           // getSongPlayList(useForOrder.value,35).then(res=>{
           //
           //   listArray.value=res.data.playlists;
           //   console.log(res.data.playlists);
           //   listShow.value=true
           //   order.value='最新'
           // })
           pageChange(1)
           order.value='最新'
         }

       }

       let menuClick=(index)=>{
         let arr=['全部','华语','欧美','粤语']
         listShow.value=false
         curCat.value=arr[index]
         pageChange(1)

       }


       return {
         listArray,
         getList,
         goToListDetail,
         pageChange,
         listShow,
         order,
         changeOrder,
         menuClick,
         curCat,
         curPage
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
