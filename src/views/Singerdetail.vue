<template>
  <Secondheader></Secondheader>
  <div class="singer">
    <div class="singerIntro">
      <div class="header">
        <h3>{{artistName}}</h3>
        <img :src="artistCover" >
        <div class="tabs">
          <el-tabs type="border-card" stretch=true v-model="curIndex" @tab-click="changeTab">
    <el-tab-pane label="热门歌曲" name="1" class="hot">
      <ul>
        <li v-for="(item,index) in hotSongs">
          <div class="index">
            {{index+1}}
          </div>
          <div class="name">
            <a href="#">{{item.name}}</a>
          </div>
          <div class="time">
{{parseInt(item.dt/1000/60).toString().padStart(2,'0')}}:{{parseInt(item.dt/1000%60).toString().padStart(2,'0')}}
          </div>
          <div class="album">
            <a href="#">{{item.al.name}}</a>
          </div>
        </li>
      </ul>
    </el-tab-pane>
    <el-tab-pane label="所有专辑" name="2" >
      <div class="allAlbums">
        <ul class="album">
          <li v-for="item in albums">
            <img :src="item.picUrl" :title="item.name" >
            <a href="#">{{item.name}}</a>
            <a href="#">{{item.artist.name}}</a>
          </li>
        </ul>
      </div>
    </el-tab-pane>
    <el-tab-pane label="相关MV" name="3" >
      <div class="allAlbums">
        <ul class="album">
          <li v-for="item in mvs">
            <img :src="item.imgurl" :title="item.name" >
            <a href="#">{{item.name}}</a>
          </li>
        </ul>
      </div>
    </el-tab-pane>
    <el-tab-pane label="艺人介绍" name="4" >
      <div class="intro">
        <div class="header">
          <h3>{{artistName}}简介</h3>
          <p>{{desc}}</p>
        </div>
        <div class="body">
          <div v-for="item in introduction">
            <h4>{{item.ti}}</h4>
            <p  v-html="item.txt"></p>
          </div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
        </div>
      </div>

      <div class="page">
        <el-pagination
      background
      layout="prev, pager, next"
      page-size="12"
      @current-change="pageChange"
      :current-page="curPage"
      :total="getCount" >
      </el-pagination>



      </div>

    </div>
    <div class="likelySinger">

    </div>
  </div>
</template>

<script>
import Secondheader from '@/views/Secondheader.vue'
import {ref,onMounted,watch,computed} from 'vue'
import {getSingerDetail,getSingerHotSong,getSingerAlbum,getSingerMV,getSingerDesc} from '@/network/singer/singers.js'
import {useRouter,useRoute} from 'vue-router'

export default {
  name:'Singerdetail',
  components:{
    Secondheader
  },
  setup(){

    let artistName=ref('')
    let artistCover=ref('')
    let curIndex=ref('1')
    let hotSongs=ref([])
    let singerId=ref(12138269)
    let albums=ref([])
    let mvs=ref([])
    let curPage=ref(1)
    let desc=ref('')
    let introduction=ref([])

    const route=useRoute()
    const router=useRouter()

    let counts=ref([])

    let init=(id)=>{

      getSingerDetail(id).then(res=>{
        artistName.value=res.data.data.artist.name
        artistCover.value=res.data.data.artist.cover
      })

      if(curIndex.value==1)
      {
        getSingerHotSong(id).then(res=>{
          hotSongs.value=res.data.songs

        })
      }

      else if(curIndex.value==2)
      {
        getSingerAlbum(id,12,curPage.value-1).then(res=>{
            albums.value=res.data.hotAlbums
            counts.value[0]=hotSongs.value.length
            console.log('点击了2的分页',res);
        })

      }

      else if(curIndex.value==3)
      {
        getSingerMV(id).then(res=>{
          mvs.value=res.data.mvs
          counts.value[1]=mvs.value.length
          // console.log(res);
        })
      }

      else {
        getSingerDesc(id).then(res=>{
          desc.value=res.data.briefDesc
          introduction.value=res.data.introduction
          // console.log(res);
        })
      }

    }

     onMounted(()=>{

       init(singerId.value)
     })

     let isShow=()=>{

       if(curIndex.value=='2'|| curIndex.value=='3')
       {
         return true
       }

      else {return false}
     }

     let getCount=computed(()=>{


      if(curIndex.value==2 || curIndex.value==3)
      {
        return counts.value[parseInt(curIndex.value-2)]
      }

      else {return 0}
     })

     let pageChange=(index)=>{
       curPage.value=index
       init(singerId.value)
     }

     let changeTab=(index)=>{
       curPage.value=1
       init(singerId.value)
     }


     watch(()=>{
         if(route.query.artistid)
         {
           if(route.query.artistid!=singerId.value)
           {

                 init(route.query.artistid)

                singerId.value=route.query.artistid

           }

         }
     })


   return{
     artistName,
     artistCover,
     curIndex,
     hotSongs,
     albums,
     isShow,
     getCount,
     curPage,
     mvs,
     desc,
     introduction,
     pageChange,
     changeTab
   }

  }

}
</script>


<style scoped>
a:hover
{
  text-decoration: underline;
}

.singer{
  width: 1000px;
  margin:0 auto;
  display: flex;
  padding-top: 10px;
}
.singerIntro{
  width:700px;
  padding: 0 30px;
}
.singerIntro .header img{
  width:630px;
  height:370px;
  margin-top: 10px;
}


.likelySinger{
  width:300px;
}

.tabs{
  margin-top: -40px;
  width:630px;
}
.tabs .hot ul li{
  display: flex;
  height: 25px;
  align-items: center;
}
.tabs .hot ul li:hover{
  height: 35px;
}

.tabs .hot ul li:nth-of-type(2n-1)
{
  background-color: rgba(247, 247, 247);
}

.tabs .hot li div
{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
}

.tabs .hot li div:nth-of-type(1)
{
  width:73px;
}
.tabs .hot  li div:nth-of-type(2)
{
  width:300px;
}
.tabs .hot  li div:nth-of-type(3)
{
  width:90px;
}
.tabs .hot  li div:nth-of-type(4)
{

  width:108px;


}
.tabs .hot  li div:nth-of-type(4) a
{

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

}

.album{
  width:630px;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
}
.singerIntro .album li{
  width: 130px;
  height:170px;
  margin: 0 10px;
}
.singerIntro .album li img{
  width: 130px;
  height:120px;
}
.singerIntro .album li a{
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.allAlbums{
  padding: 15px 0;
}
.page{
  margin-top: 20px;
  width:630px;
  text-align: center;
}


.intro{
  font-size: 14px;
  position: relative;
}
.intro .header:before{
  content: '';
  width: 4px;
  height:18px;
  position: absolute;
  top:3px;
  left:-7px;
  background-color:red;
}

p{
  text-indent: 2em;
}

.intro .body div{
  margin: 15px 0;
}


</style>
