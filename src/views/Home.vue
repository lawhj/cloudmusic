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
            <a href="#">歌单</a>
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

    <!-- <div class="banner">
      <div class="block">
  <el-carousel trigger="click" height="300px">
    <el-carousel-item v-for="item in bannerList" :key="item">
      <img :src="item.imageUrl" >
    </el-carousel-item>
  </el-carousel>
     </div>
     <div class="downloadApp">
       <img src="~@/assets/images/download.png" class="down">
     </div>
    </div> -->
    <!-- <div class="mainbody">
      <div class="hotListRecommend">
        <div class="hotlists">
          <div class="headers">
            <h3 class="title">热门推荐</h3>
            <ul>
              <li>
                <a href="#">华语</a>
              </li>
              <li>
                <a href="#">流行</a>
              </li>
              <li>
                <a href="#">摇滚</a>
              </li>
              <li>
                <a href="#">民谣</a>
              </li>
              <li>
                <a href="#">电子</a>
              </li>
            </ul>
            <a href="#" class="right">更多</a>
          </div>
          <div class="listDetail">
            <div class="listItem" v-for="item in getHotLists">
              <img :src="item.coverImgUrl" />
              <a href="#">{{item.name}}</a>
            </div>
          </div>
        </div>

        <div class="newlists">
          <div class="headers">
            <h3 class="title">新碟上架</h3>
            <a href="#" class="right">更多</a>
          </div>
          <div class="listDetail">
            <div class="block">
        <el-carousel trigger="click" height="200px">
          <el-carousel-item>
            <div class="newsong" v-for="item in getNewLists.slice(0,6)" :key="item">
              <img :src="item.picUrl" >
              <a href="#">{{item.name}}</a>
              <a href="#">{{item.artist.name}}</a>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="newsong" v-for="item in getNewLists.slice(6)" :key="item">
              <img :src="item.picUrl" >
              <a href="#">{{item.name}}</a>
              <a href="#">{{item.artist.name}}</a>
            </div>
          </el-carousel-item>
        </el-carousel>
           </div>
          </div>
        </div>

        <div class="rankLists">
          <div class="headers">
            <h3 class="title">榜单</h3>
            <a href="#" class="right">更多</a>
          </div>
          <div class="rankBody">
            <div class="rankItem" v-for="item in getRankLists">
              <div class="rankHeader">
                <img :src="item.coverImgUrl">
                <a href="#">{{item.name}}</a>
              </div>
              <ol>
                <li v-for="song in item.tracks.slice(0,10)"> <a href="#">{{song.name}}</a> </li>
                <li class="checkall"> <a href="#">查看全部></a>  </li>
              </ol>
            </div>
        </div>

      </div>



      </div>

      <div class="musicianAndKol">
        <div class="userlogin">
          <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
          <button>用户登录</button>
        </div>
        <div class="singers">
          <div class="singerHeader">
            <h4>入驻歌手</h4>
            <a href="#">查看全部></a>
          </div>
          <div class="singerBody">
            <div class="eachSinger">

            </div>
          </div>
        </div>
      </div>


    </div> -->


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
