<template>
  <div class="song">
    <div class="sidebar">
      <div class="sidebarItem">
        <div class="sidebarItemHeader">
          <h4>云音乐特色榜</h4>
          <div class="sidebarItemBody">
            <div class="listItem">
                <div class="rankItem" v-for="(item,index) in getRankLists">
                  <a href="#" @click="itemClick(index)">
                    <div class="rankHeader">
                      <img :src="item.coverImgUrl">
                        <h5>{{item.name}}</h5>
                    </div>
                  </a>
                </div>


            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mainSong">
      <div class="header">
        <div class="headerImg">
          <img :src="objlist.coverImgUrl" >
        </div>
        <div class="headerFunction">
          <h3>{{objlist.name}}</h3>
          <button>播放</button>
          <button>下载</button>
          <button>收藏</button>
          <button>评论</button>
        </div>
      </div>
      <div class="body">
        <div class="bodyHeader">
          <h3>歌曲列表</h3>
          <h5>{{objlist.trackCount}}首歌</h5>
        </div>
        <div class="tracks">
          <table>
            <tr>
              <th></th>
              <th>
                <div>标题
                </div>
              </th>
              <th>
                <div>时长
                </div>
              </th>
              <th>
                <div>歌手
                </div>
              </th>
            </tr>
            <tr v-for="(item,index) in objlist.tracks">
              <td>{{index+1}}</td>
              <td>
                <img :src="item.al.picUrl" v-if="index<3" class="songCover">
                <div class="playsong">
                  <img src="~@/assets/images/play.png" @click.prevent="toplaysong(item)" >
                  <a href="#" @click.prevent="goToSongDetail(item)" >{{item.name}}</a>
                </div>
              </td>
              <td>{{parseInt(item.dt/1000/60).toString().padStart(2,'0')}}:{{parseInt(item.dt/1000%60).toString().padStart(2,'0')}}</td>
              <td>{{item.ar[0].name}}</td>
            </tr>
          </table>
        </div>
      </div>

    </div>


<Songplay :songid="playsongID"  v-show="isPlaySong" :songcover="playsongCover" :singer="playsongSinger" :songname="playsongName" @closeplayer="closeMusicPlayer" ></Songplay>

  </div>


</template>

<script>
import {onMounted,ref,computed,reactive,toRefs} from 'vue';
import {getList} from '@/network/list.js';
import Songplay from '@/views/Songplay.vue';

import {useRouter} from 'vue-router'

export default {
  name:'Songlist',
  components:{
    Songplay
  },
  setup(){
   let RankListsArray=ref([])
   let choice=ref(0)
   let obj=reactive({
     objlist:{}
   })

   let isPlaySong=ref(false)
   let playsongID=ref(0)

   let playsongCover=ref('')
   let playsongSinger=ref('')
   let playsongName=ref('')

   const router=useRouter()

   onMounted(()=>{

       getList(19723756).then(res=>{RankListsArray.value[0]=res.data.playlist;obj.objlist=res.data.playlist})
       getList(3779629).then(res=>{RankListsArray.value[1]=res.data.playlist})
       getList(2884035).then(res=>{RankListsArray.value[2]=res.data.playlist})

   })

   let getRankLists=computed(()=>{
     return RankListsArray.value
   })

   let itemClick=(index)=>{
       choice.value=index
       obj.objlist=RankListsArray.value[choice.value]
       console.log(obj.objlist);
   }

   let getTime=(time)=>{

     console.log(time);
   }

   let toplaysong=(item)=>{
     isPlaySong.value=true
     playsongID.value=item.id
     playsongCover.value=item.al.picUrl
     playsongSinger.value=item.ar[0].name
     playsongName.value=item.name
   }

   let closeMusicPlayer=()=>{
     isPlaySong.value=false
   }

   let goToSongDetail=(item)=>{
       router.push({path:'/song',query:{songid:item.id}})
   }


   return{
     getRankLists,
     itemClick,
     ...toRefs(obj),
     getTime,
     isPlaySong,
     toplaysong,
     playsongID,
     playsongCover,
     playsongSinger,
     playsongName,
     closeMusicPlayer,
     goToSongDetail
   }


  }

}
</script>

<style scoped>
.song{
  width:1000px;
  margin: 0 auto;
  display: flex;
  padding: 20px 0 80px 0;
}
.song .sidebar{
  width: 240px;
}
.song .mainSong{
  width: 760px;
}
.sidebarItem .sidebarItemHeader h4{

  font-weight:normal;
  margin-bottom: 10px;
  padding-left: 10px;
}
.rankHeader{
  display: flex;
  height: 60px;
  line-height: 60px;
  align-items: center;
}
.rankHeader img{
  width: 40px;
  height:40px;
}
.rankHeader h5{
  font-size: 10px;
}
.rankItem a{
  display: inline-block;
  width: 100%;
}
.rankItem a:hover{
  background-color: #eee;
}

.song .mainSong img{
  width: 150px;
  height: 150px;
}
.song .mainSong .header{
  display: flex;
  height: 200px;
  /* align-items: center; */
}
.song .mainSong .header .headerImg{
  height: 200px;
  line-height: 200px;
}
.mainSong .header .headerFunction{
  padding-top: 30px;
  margin-left: 30px;
}
.mainSong .header .headerFunction button:nth-of-type(1)
{
  background-color: rgba(34, 115, 194);
}
.mainSong .header .headerFunction button{
  width: 80px;
  height: 27px;
  margin-top: 30px;
  margin-right: 20px;
  border-radius:5px;
  outline: none;
}
.mainSong .body .bodyHeader
{
  display:flex;
  height:25px;
}
.mainSong .body .bodyHeader h5{
  font-size: 10px;
  color: rgba(102, 102, 102);
  margin-top: 8px;
  margin-left: 15px;
}
.mainSong .body .tracks table td{
  text-align: left;
  padding-left: 2px;
}
.mainSong .body .tracks table td:nth-child(1)
{
  width: 77px;
}
.mainSong .body .tracks table td:nth-child(2)
{
  width: 307px;
}
.mainSong .body .tracks table td:nth-child(3)
{
  width: 90px;
}
.mainSong .body .tracks table td:nth-child(4)
{
  width: 173px;
}
.mainSong .body .tracks th{
  text-align: left;
}
.mainSong .body .tracks tr:nth-of-type(1)
{
  margin-bottom: 10px;
}
.mainSong .body .tracks tr:nth-of-type(2n)
{
  background-color: rgba(247, 247, 247);
}
.mainSong .body .tracks tr{
  height: 30px;
  line-height: 30px;
}

.mainSong .body .tracks tr:nth-of-type(-n+4){
  height: 60px;
  line-height: 60px;
}
.mainSong .body .tracks tr img{
  width:60px;
  height: 60px;
  float: left;
}


.mainSong .body .tracks a:hover{
  text-decoration: underline;
}
.mainSong .body .tracks .playsong
{
  /* height: 60px; */
  /* line-height: 60px; */
  display: flex;
  align-items: center;
}
.mainSong .body .tracks .playsong img{
  width: 20px;
  height:20px;
  margin-right: 5px;
}
.tracks .songCover{
  margin-right: 10px;
}

</style>
