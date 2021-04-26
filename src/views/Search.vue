<template>
  <div class="wholesearch">
    <div class="search">
      <input type="search" ><button> <i></i> </button>
    </div>
    <div class="tabs">
      <el-tabs type="border-card" stretch=true v-model="curIndex" @tab-click="changeTab">
  <el-tab-pane label="单曲" name="1">
    <div class="singleSong">
      <ul>
        <li v-for="item in getResult">
          <div class="songname">
            {{item.name}}
          </div>
          <div class="singer">
           {{item.ar[0].name}}
          </div>
          <div class="album">
            {{item.al.name}}
          </div>
          <div class="time">
            {{parseInt(item.dt/1000/60).toString().padStart(2,'0')}}:{{parseInt(item.dt/1000%60).toString().padStart(2,'0')}}
          </div>
        </li>
      </ul>
    </div>
  </el-tab-pane>
  <el-tab-pane label="歌手" name="2">
    <ul class="singer">
      <li v-for="item in singers">
        <img :src="item.picUrl" >
        <a href="#">{{item.name}}</a>
      </li>
    </ul>
  </el-tab-pane>
  <el-tab-pane label="专辑" name="3">
    <ul class="singer">
      <li v-for="item in albums">
        <img :src="item.picUrl" >
        <a href="#">{{item.name}}</a>
        <a href="#">{{item.artist.name}}</a>
      </li>
    </ul>
  </el-tab-pane>
  <el-tab-pane label="歌单" name="4">
    <div class="songlists">
      <ul>
        <li v-for="item in songlist">
          <div class="img">
            <img :src="item.coverImgUrl" >
          </div>
          <div class="name">
           {{item.name}}
          </div>
          <div class="count">
            {{item.trackCount}}
          </div>
          <div class="creator">
            by{{item.creator.nickname}}
          </div>
          <div class="collect">
            {{item.bookCount}}
          </div>
          <div class="listen">
            {{item.playCount}}
          </div>
        </li>
      </ul>
    </div>
  </el-tab-pane>
</el-tabs>

<div class="page">
  <el-pagination
background
layout="prev, pager, next"
page-size="30"
@current-change="pageChange"
:current-page="curPage"
:total="getCount" >
</el-pagination>



</div>


    </div>
  </div>
</template>

<script>
import {getSearch} from '@/network/search.js'
import {ref,onMounted,computed,watch} from 'vue'
import {useRoute} from 'vue-router'


export default {
  name:'Search',
  setup(){

        let curIndex=ref('1')
        let result=ref([])
        let singers=ref([])
        let albums=ref([])
        let songlist=ref([])
        let counts=ref([])
        let count=ref(300)

        let curPage=ref(1)
        let keywords=ref('毛不易')
        let type=ref([1,100,10,1000])

        let route=useRoute()

        let init=(key)=>{

          if(parseInt(curIndex.value)==1)
          {
            getSearch(key,30,1,curPage.value-1).then(res=>{
              // result.value=res.data.result.songs
              result.value=res.data.result.songs
              counts.value[0]=(res.data.result.songCount)
              console.log('请求的是1的',curPage.value);
            })
          }

          else if(parseInt(curIndex.value)==2)
          {
            getSearch(key,30,100,curPage.value-1).then(res=>{
              // result.value=res.data.result.songs
              singers.value=res.data.result.artists
              counts.value[1]=(res.data.result.artistCount)
              console.log('请求的是2');
            })
          }

          else if(parseInt(curIndex.value)==3)
          {
            getSearch(key,30,10,curPage.value-1).then(res=>{
               albums.value=res.data.result.albums
               counts.value[2]=(res.data.result.albumCount)
               console.log('请求的是3');
            })
          }

          else {
            getSearch(key,30,1000,curPage.value-1).then(res=>{
               songlist.value=res.data.result.playlists
               counts.value[3]=(res.data.result.playlistCount)
               console.log('请求的是4');
            })
          }

        }



         onMounted(()=>{

              init(keywords.value)
         })

        let getResult=computed(()=>{
          return result.value
        })

        let getCount=computed(()=>{
              let c=parseInt(curIndex.value-1)
              return counts.value[c]
        })

        let changeTab=(index)=>{
          curPage.value=1
          init(keywords.value)
        }

        let pageChange=(index)=>{
          console.log('点击了分页');
          // init(keywords.value)
          curPage.value=index
          init(keywords.value)
        }

        watch(()=>{
            if(route.query.keyword)
            {
              if(route.query.keyword!=keywords.value)
              {

                    init(route.query.keyword)

                   keywords.value=route.query.keyword
              }

            }
        })


         return{
           curIndex,
           getResult,
           singers,
           albums,
           songlist,
           count,
           getCount,
           changeTab,
           curPage,
           pageChange
         }

  }
}
</script>

<style scoped>

.wholesearch
{
  width: 1000px;
  margin: auto;
}
.search{
  width:370px;
  /* margin: auto; */
  margin: 30px auto;
  display: flex;
}
 .search input{
  height: 35px;
    /* border-radius: 30px; */
    outline: none;
    width: 320px;
    padding-left: 15px;
    /* border-right: none; */
}

.search button{
   width:50px;
   height:35px;
   display: flex;
   align-items: center;
   justify-content: center;
}
.search button i{
  display: inline-block;
  width:30px;
  height:30px;
  background:url('~@/assets/images/search.png') no-repeat;
  background-size: 30px 30px;
}
.singleSong ul li{
  height: 40px;
  display:flex;
  align-items: center;
}
.singleSong ul li div:nth-of-type(1)
{
  width:370px;

}
.singleSong ul li div:nth-of-type(2)
{
  width:130px;

}
.singleSong ul li div:nth-of-type(3)
{
  width:130px;
  margin-right: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.singleSong ul li div:nth-of-type(4)
{
  width:30px;

}
.singleSong ul li:nth-child(2n)
{
  background-color: #eee;
}
.singer  {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
}

.singer  li {
  width:130px;
  height:180px;
  margin: 0 30px;
}
.singer img{
  width:130px;
  height:130px;
  /* display: block; */
}
.singer a{
  display: block;
  font-size: 12px;
  width: 130px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.songlists{
  display: flex;
}
.songlists ul li{
  height: 50px;
  display: flex;
  line-height: 50px;
  margin: 5px 0;
}
.songlists img{
  width:50px;
  height: 50px;
}
.songlists ul li div{
  margin-right: 10px;
  font-size: 14px;
}

.songlists ul li div:nth-of-type(1)
{
  width:50px;
}
.songlists ul li div:nth-of-type(2)
{
  width:350px;
}
.songlists ul li div:nth-of-type(3)
{
  width:60px;
}
.songlists ul li div:nth-of-type(4)
{
  width:180px;
}
.songlists ul li div:nth-of-type(5)
{
  width:100px;
}
.songlists ul li div:nth-of-type(6)
{
  width:100px;
}
.page{
  margin: 20px 0;
  width: 1000px;
  text-align: center;
}
</style>
