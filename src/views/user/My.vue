<template>
  <div class="my">
    <div class="sideBar">
      <el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item :title="createTitle" name="1">
    <div class="create">
      <ul>
        <li v-for="item in getCreateList" :key="item"  @click.prevent="changeList(item.id)">
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
        <li v-for="item in getCollectList" :key="item" @click.prevent="changeList(item.id)">
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
      <div class="header">
        <div class="cover">
          <img :src="objlist.coverImgUrl" />
        </div>
        <div class="tagsAndDesc">
          <div class="tag">
            <i class="tag">歌单</i>
            <h4>{{objlist.name}}</h4>
          </div>
          <div class="creator">
            <img :src="getCreImg" >
            <a href="#">{{getCreNickName}}</a>创建
          </div>
          <div class="fn">
            <button>播放</button>
            <button>下载</button>
            <button>收藏</button>
            <button>评论</button>
          </div>
          <div class="tags" v-show="objlist.tags">
            <div>
              标签:
            </div>
            <button v-for="item in objlist.tags">{{item}}</button>
          </div>
          <div class="desc">
            介绍:  {{objlist.description}}
          </div>
        </div>

      </div>

      <div class="listbody">
        <div class="header">
          <h3>歌曲列表</h3>
          <h5>{{songCount}}首歌</h5>
        </div>
        <div class="body">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>歌曲列表</th>
                <th>时长</th>
                <th>歌手</th>
                <th>专辑</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in objlist.tracks" :key="item">
                <td class="firstTD">
                  <div class="tdIndex">
                    {{index+1}}
                  </div>
                  <i @click.prevent="toplaysong(item)" ></i>
                </td>
                <td> <a href="#" @click="goToSongDetail(item.id)">{{item.name}}</a> </td>
                <td>{{parseInt(item.dt/1000/60).toString().padStart(2,'0')}}:{{parseInt(item.dt/1000%60).toString().padStart(2,'0')}}</td>
                <td> <a href="#" @click.prevent="goToSingerDetail(item.ar[0].id)">{{item.ar[0].name}}</a> </td>
                <td> <a href="#">{{item.al.name}}</a> </td>
              </tr>
            </tbody>
          </table>

          <div class="comment">
            <div class="commentHeader">
              <h3>评论</h3>
            </div>
            <div class="commentBody">
              <ul>
                <li v-for="item in comments" >
                 <img :src="item.user.avatarUrl" ><a href="#">{{item.user.nickname}}</a>:
                 {{item.content}}
                </li>
              </ul>
            </div>

            <div class="page">
              <el-pagination
          background
          layout="prev, pager, next"
          page-size="20"
          @current-change="pageChange"
          :current-page="curPage"
          :total="totalComments">
        </el-pagination>
            </div>
          </div>

          <Songplay :songid="playsongID"  v-show="isPlaySong" :songcover="playsongCover" :singer="playsongSinger" :songname="playsongName" @closeplayer="closeMusicPlayer" ></Songplay>

        </div>
      </div>


    </div>
  </div>

</template>

<script>
import {getUserCount,getAccountSonglist} from '@/network/user/user.js'
import {ref,onMounted,computed,reactive,toRefs} from 'vue'
import {useStore} from 'vuex'
import {getList,getListComment} from '@/network/list.js'
import {useRouter} from 'vue-router'
import Songplay from '@/views/Songplay.vue'


export default {
  name:'My',
  components:{
    Songplay
  },
  setup(){

   const store=useStore()
   let CreateListCount=ref(0)
   let activeNames=ref('1')
   let createList=ref([])
   let collectList=ref([])
   let createTitle=ref('')
   let collectTitle=ref('')

   let curListId=ref(0)
   const playlist=reactive({
     objlist:{}
   })

   let creator=ref({})
   const router=useRouter()


   let init=()=>{
     getList(curListId.value).then(res=>{
       playlist.objlist=res.data.playlist
       songCount.value=res.data.playlist.trackIds.length
       creator.value=res.data.playlist.creator
     })
     getListComment(curListId.value).then(res=>{
       comments.value=res.data.comments
       // console.log(res);
       totalComments.value=res.data.total

     })
   }

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
      curListId.value=createList.value[0].id
      init()

      // getList(curListId.value).then(res=>{
      //   playlist.objlist=res.data.playlist
      //   creator.value=res.data.playlist.creator
      // })
      // getListComment(curListId.value).then(res=>{
      //   comments.value=res.data.comments
      //   // console.log(res);
      //   totalComments.value=res.data.total
      //
      // })


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

   let getCreImg=computed(()=>{
     return creator.value.avatarUrl
   })

   let getCreNickName=computed(()=>{
     return creator.value.nickname
   })


   let songCount=ref(0)
   let curPage=ref(1)
   let comments=ref([])
   let totalComments=ref(0)

   let pageChange=(index)=>{
     getListComment(curListId.value,20,index-1).then(res=>{

       comments.value=res.data.comments

     })
   }

   let playsongID=ref(0)

   let playsongCover=ref('')
   let playsongSinger=ref('')
   let playsongName=ref('')
   let isPlaySong=ref(false)

   let toplaysong=(item)=>{
     console.log('item is',item);
     isPlaySong.value=true
     playsongID.value=item.id
     playsongCover.value=item.al.picUrl
     playsongSinger.value=item.ar[0].name
     playsongName.value=item.name
   }

   let closeMusicPlayer=()=>{
     isPlaySong.value=false
   }


   let goToSongDetail=(id)=>{
       router.push({path:'/song',query:{songid:id}})
   }


   let goToSingerDetail=(id)=>{
     router.push({path:'/singer',query:{artistid:id}})
   }


   let changeList=(id)=>{
     curListId.value=id
     init()
   }


   return{
     CreateListCount,
     handleChange,
     activeNames,
     createList,
     collectTitle,
     createTitle,
     getCreateList,
     getCollectList,
     ...toRefs(playlist),
     creator,
     getCreImg,
     getCreNickName,
     comments,
     totalComments,
     pageChange,
     curPage,
     playsongID,
     playsongName,
     playsongCover,
     playsongSinger,
     isPlaySong,
     toplaysong,
     closeMusicPlayer,
     goToSongDetail,
     goToSingerDetail,
     changeList,
     songCount
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

.main .header{
  padding-top:20px;
  display: flex;
}

.main .header img{
  width:200px;
  height:200px;
  margin-right: 20px;
}


.tagsAndDesc .tag{
  display:flex;
  align-items: center;
  height: 50px;
}
.tagsAndDesc .tag i{
  font-style: normal;
  display: inline-block;
  text-indent: 8px;
  width:65px;
  height:50px;
  line-height: 50px;
  background: url('~@/assets/images/tag.png') no-repeat;
  background-size: 65px 50px;
  margin-right: 10px;
}
.tagsAndDesc .creator{
  height:50px;
  display: flex;
  align-items: center;
  color:#666;
  font-size: 12px;
}
.tagsAndDesc .creator img{
  height: 30px;
  width:30px;
  margin-right: 15px;
}
.tagsAndDesc .creator a{
color: rgba(90, 115, 206);
margin-right: 8px;
font-size: 16px;
}

.tagsAndDesc .fn button:nth-of-type(1)
{
  background-color: rgba(34, 115, 194);
}
.tagsAndDesc .fn button{
  width: 80px;
  height: 27px;
  margin-top: 10px;
  margin-right: 20px;
  border-radius:5px;
  outline: none;
}
.tagsAndDesc .tags{
  display: flex;
  margin-top: 20px;
  margin-bottom: 10px;
  align-items: center;
}
.tagsAndDesc .tags button{
  width:50px;
  height:25px;
  border-radius: 10px;
  margin: 0 15px;
}


.listbody .header
{
  height: auto;
}

.listbody .header{
  display: flex;
  align-items: baseline;
  border-bottom: 3px solid rgba(194, 12, 12);
  margin-bottom: 5px;
}
.listbody .header h3{
  margin-right: 10px;
}
.listbody table th{
  text-align: left;
}
.listbody table td{

  font-size: 12px;
  height: 30px;
  text-align: left;
  /* line-height: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis; */


}
.listbody table{
  border-collapse:collapse
}
.listbody table td:nth-of-type(1)
{
  width: 74px;
}
.listbody table td:nth-of-type(2)
{
  width: 220px;
}
.listbody table td:nth-of-type(2) a
{
  display: block;
  width:180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.listbody table td:nth-of-type(3)
{
  width: 100px;
}
.listbody table td:nth-of-type(4)
{
  width: 95px;
}
.listbody table td:nth-of-type(4) a
{
  display: block;
  width:85px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.listbody table td:nth-of-type(5)
{
  width: 127px;
}
.listbody table td:nth-of-type(5) a
{
  display: block;
  width:120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


.listbody table td a:hover{
  text-decoration: underline;
}



.listbody table tr:nth-of-type(2n)
{
  background-color: #eee;
}
.listbody table td i{
  display: inline-block;
  width:20px;
  height: 20px;
  background: url('~@/assets/images/play.png') no-repeat;
  background-size: 20px 20px;

}
.listbody table .firstTD{
  display: flex;
  align-items: center;
}
.listbody table .tdIndex{
  width:20px;
  margin-right: 5px;
}





.commentHeader{
  margin-top: 20px;
  border-bottom:1px solid rgba(194, 12, 12);
  width:100%;
}
.commentBody ul li{
  height:80px;
  /* line-height: 70px; */
  margin: 15px 0;
  font-size: 13px;
  width: 100%;
  border-bottom: 3px dotted #eee;

}
.commentBody ul li img{
  width:30px;
  height: 30px;
  vertical-align: text-top;
  margin-right: 10px;
}

.commentBody ul li a{
  font-size: 12px;
  color: rgba(12, 162, 222);
  margin-right: 7px;
  margin-top: 10px;
}
.commentBody .page{
  width: 700px;

}
.el-pagination {

    text-align: center;
}






</style>
