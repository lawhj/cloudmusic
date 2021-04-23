<template>
  <div class="home">
    <div class="recommendContainer">
      <div class="recommendlist w clearfix">
        <ul>
          <li>
            <router-link to='/'>推荐</router-link>
          </li>
          <li>
            <router-link to='/toplist'>排行榜</router-link>
          </li>
          <li>
            <router-link to='/playlist'>歌单</router-link>
          </li>
          <li>
            <a href="#">主播电台</a>
          </li>
          <li>
            <a href="#">歌手</a>
          </li>
          <li>
            <a href="#">新碟上架</a>
          </li>
        </ul>
      </div>
    </div>

    <router-view v-slot="{ Component }">
      <keep-alive>
        <component class="view" :is="Component" />
      </keep-alive>
    </router-view>




  </div>
</template>

<script>
// @ is an alias to /src
import  {useRouter} from 'vue-router'
import {onMounted,ref,computed} from 'vue'
import {getBannerList} from '@/network/banner.js'
import {getSongPlayList,getNewAlbum} from '@/network/songlist/songlists.js'
import {getList} from '@/network/list.js'
import {getSingerDesc} from '@/network/singer/singers.js'

export default {
  name: 'Home',
  setup(){

   //  let banners=ref([])
   //  let hotListsArray=ref([])
   //  let newListsArray=ref([])
   //  let RankListsArray=ref([])
   //
   //   onMounted(()=>{
   //       getBannerList().then(res=>{banners.value=res.data.banners})
   //       getSongPlayList('hot',8).then(res=>{hotListsArray.value=res.data.playlists;})
   //       getNewAlbum().then(res=>{
   //         newListsArray.value=res.data.albums
   //       })
   //       getList(19723756).then(res=>{RankListsArray.value[0]=res.data.playlist})
   //       getList(3779629).then(res=>{RankListsArray.value[1]=res.data.playlist})
   //       getList(2884035).then(res=>{RankListsArray.value[2]=res.data.playlist})
   //       getSingerDesc(6452).then(res=>{console.log(res);})
   //   })
   //
   //  let bannerList=computed(()=>{
   //    return banners.value;
   //  })
   //
   //  let getHotLists=computed(()=>{
   //    return hotListsArray.value
   //  })
   //  let getNewLists=computed(()=>{
   //    return newListsArray.value
   //  })
   //  let getRankLists=computed(()=>{
   //    return RankListsArray.value
   //  })
   //
   //
   // return {
   //   bannerList,
   //   getHotLists,
   //   getNewLists,
   //   getRankLists
   // }

  }
}
</script>
<style scoped>
/* .home{
  /* background-color: rgba(194, 12, 12); */
  /* height: 35px;
  line-height: 35px; */

.home .recommendContainer{
  height: 35px;
  line-height: 35px;
  background-color: rgba(194, 12, 12);
}
.home .recommendlist ul{
  margin-left: 200px;
}
.home .recommendlist ul li{
  float: left;
}
.home .recommendlist ul li a{
  color: white;
  font-size: 10px;
  padding: 0 20px;
  border-radius:15px;
}
.home .recommendlist ul li a:hover{
  background-color: rgba(155, 9, 9);
}
.home .recommendlist{
  margin: 0 auto;
}

</style>
