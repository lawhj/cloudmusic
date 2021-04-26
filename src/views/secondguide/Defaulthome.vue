<template>
  <div class="home">

    <div class="banner">
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
    </div>
    <div class="mainbody">
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
            <div class="listItem" v-for="item in getHotLists" @click.prevent="goToListDetail(item.id)">
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
                <a href="#" >{{item.name}}</a>
              </div>
              <ol>
                <li v-for="song in item.tracks.slice(0,10)"> <a href="#" @click.prevent="goToSongDetail(song.id)">{{song.name}}</a> </li>
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


    </div>


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
  name: 'Defaulthome',
  setup(){

    let banners=ref([])
    let hotListsArray=ref([])
    let newListsArray=ref([])
    let RankListsArray=ref([])

    const router=useRouter()

     onMounted(()=>{
         getBannerList().then(res=>{banners.value=res.data.banners})
         getSongPlayList('hot',8).then(res=>{hotListsArray.value=res.data.playlists;})
         getNewAlbum().then(res=>{
           newListsArray.value=res.data.albums
         })
         getList(19723756).then(res=>{RankListsArray.value[0]=res.data.playlist})
         getList(3779629).then(res=>{RankListsArray.value[1]=res.data.playlist})
         getList(2884035).then(res=>{RankListsArray.value[2]=res.data.playlist})
         getSingerDesc(6452).then(res=>{console.log(res);})
     })

    let bannerList=computed(()=>{
      return banners.value;
    })

    let getHotLists=computed(()=>{
      return hotListsArray.value
    })
    let getNewLists=computed(()=>{
      return newListsArray.value
    })
    let getRankLists=computed(()=>{
      return RankListsArray.value
    })


    let goToListDetail=(id)=>{
       router.push({path:'/songlistdetail',query:{listid:id}})
    }

    let goToSongDetail=(id)=>{
         router.push({path:'/song',query:{songid:id}})
    }

   return {
     bannerList,
     getHotLists,
     getNewLists,
     getRankLists,
     goToListDetail,
     goToSongDetail
   }

  }
}
</script>
<style scoped>

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
.banner{
  width: 1000px;
  margin: 0 auto;
  display: flex;
  height: 300px;
}
.block{
  width:700px;
  height:100%;
}
.block img{
  width:700px;
  height:300px;
}
.downloadApp img{
  height:300px;
  width:250px;
}
.mainbody{
  display: flex;
  width: 1000px;
  margin: 10px auto;
}
.mainbody .hotListRecommend{
  width:700px;
  padding: 0 15px;
}
.mainbody .musicianAndKol{
  width:250px;

}
.mainbody .musicianAndKol .userlogin{
  height: 120px;
  background-color: rgba(237, 237, 237);
  text-align: center;
  font-size: 10px;
  padding-top: 10px;
}

.mainbody .musicianAndKol button{
  width: 100px;
  height: 30px;
  border-radius: 5px;
  color: white;
  outline: none;
  background-color: rgba(211, 17, 23);
}
.mainbody .musicianAndKol .singers{
  height:20px;
  line-height: 20px;
  font-size: 12px;
}
.mainbody .musicianAndKol .singerHeader h4{
  float: left;

}
.mainbody .musicianAndKol .singerHeader a{
  float: right;
}

.headers
{ width: 100%;
  height: 30px;
  line-height: 30px;
  border-bottom: 2px solid rgba(193, 13, 12);
}
.headers .title{
  position: relative;
  padding-left:30px;
}
.headers .title:before
{
  position: absolute;
  top:6px;
  left:5px;
  content: '';
  width:20px;
  height: 20px;
  background: url('~@/assets/images/round.png') no-repeat;
  background-size: 20px 20px;
}
.headers h3{
  float: left;
}
.headers ul{
  float: left;
  margin-left: 30px;
}
.headers ul li{
  float: left;
}
.headers ul li a{
  padding: 0 15px;
  font-size: 10px;
  color: rgba(206, 153, 102);
}
.headers .right{
  float:right;
  font-size: 10px;
  color: rgba(206, 153, 102);
}
.listDetail{
  width:100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.listDetail .listItem{
  width:22%;
}
.listDetail .listItem img{
  width:100%;
  height:auto;
}
.listDetail .listItem a{
  color: rgba(82, 0, 82);
}

.headers{
  margin: 10px 0;
}
.listDetail .block{
  width:700px;
  /* display: flex; */
}
.listDetail img{
  width:100%;
  height:auto;
}
.listDetail .block a{
  display: block;
}
.listDetail .block .newsong{
  width:80px;
  text-align: center;
  margin-top: 20px;
}
.listDetail .block .newsong a{
    width:100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
}
.listDetail .block .newsong a:hover{
  text-decoration: underline;
}

.listDetail .block .newsong a:nth-of-type(1){
  color: black;
  font-size:10px;
}
.listDetail .block .newsong a:nth-of-type(2){
  color: rgba(102, 102, 102);
  font-size:10px;
}
.el-carousel__item.is-animating {
    display: flex;
    justify-content: space-between;
}

.rankBody .rankItem .rankHeader img{
  width:80px;
  height:auto;
}
.rankBody{
  display: flex;
  justify-content: space-between;
  text-align:center;
  background-color: rgba(244, 244, 244);
}

.rankBody .rankItem{
  padding: 0 15px;
  width:230px;
}
.rankBody .rankHeader img{
  vertical-align: middle;
}
.rankBody .rankItem li
{
   width:100%;
   height:30px;
   line-height: 30px;
}
.rankBody .rankItem a{
  font-size: 10px;
  padding-right: 30px;
}
.rankBody .rankHeader a{
  font-size: 18px;
  margin-left:10px;

}
.rankBody .rankItem li:nth-child(2n-1){
  background-color: rgba(232, 232, 232);
}
.rankBody .rankItem a:hover{
  text-decoration: underline;
}

.rankBody .checkall{
  list-style: none;
}
.rankBody .checkall a{
  float:right;
}

.listItem:hover{
  cursor: pointer;
}
</style>
