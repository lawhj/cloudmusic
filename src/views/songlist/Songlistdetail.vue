<template>
  <div>
    <Secondheader></Secondheader>
    <div class="songlistd">

      <div class="listdetail">

       <div class="detail">
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
                 <tr v-for="(item,index) in objlist.tracks">
                   <td class="firstTD">
                     <div class="tdIndex">
                       {{index+1}}
                     </div>
                     <i @click.prevent="toplaysong(item)" ></i>
                   </td>
                   <td> <a href="#">{{item.name}}</a> </td>
                   <td>{{parseInt(item.dt/1000/60).toString().padStart(2,'0')}}:{{parseInt(item.dt/1000%60).toString().padStart(2,'0')}}</td>
                   <td> <a href="#">{{item.ar[0].name}}</a> </td>
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
                   <li v-for="item in comments">
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


      <div class="likelyList">
        <div class="headers">
          <h4>相关推荐</h4>
        </div>
        <div class="likelyBody">
          <ul>
            <li v-for="item in similars">
              <div>
                <a href="#">{{item.name}}</a>
                <a href="#">{{item.artists[0].name}}</a>
              </div>
              <i @click.prevent="toplaysong(0,item)" ></i>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {useRoute} from 'vue-router'
import {ref,onMounted,watch,reactive,toRefs,computed} from 'vue'
import Secondheader from '@/views/Secondheader.vue'
import {getList,getListComment,getSimilarList} from '@/network/list.js'

import Songplay from '@/views/Songplay.vue'

export default {
  name:'Songlistdetail',
  components:{
    Secondheader,
    Songplay
  },
  setup(){

   let listId=ref(5451679698)
   let ready=ref(false)
   let list=reactive({
     objlist:{}
   })
   const route=useRoute()

   let comments=ref([])
   let totalComments=ref(0)

   let creator=ref({})

   let songCount=ref(0)

   let curPage=ref(1)
   let similars=ref([])

   let init=(id)=>{

     getList(id).then(res=>{
       list.objlist=res.data.playlist
       creator.value=res.data.playlist.creator
       songCount.value=res.data.playlist.trackIds.length
       curPage.value=1
     })

     getListComment(id).then(res=>{
       comments.value=res.data.comments
       // console.log(res);
       totalComments.value=res.data.total

     })

    getSimilarList(id).then(res=>{
      console.log('相似歌单',res);
    })

   }

   onMounted(()=>{

     // init(5451679698)
   })

   watch(()=>{
       if(route.query.listid)
       {
         if(route.query.listid!=listId.value)
         {
              ready.value=false

               init(route.query.listid)

              listId.value=route.query.listid
         }

       }
   })

   let getCreImg=computed(()=>{
     return creator.value.avatarUrl
   })

   let getCreNickName=computed(()=>{
     return creator.value.nickname
   })

   let pageChange=(index)=>{
     getListComment(listId.value,20,index-1).then(res=>{

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


   return{
      ...toRefs(list),
      songCount,
      getCreImg,
      getCreNickName,
      comments,
      totalComments,
      pageChange,
      curPage,
      similars,
      playsongID,
      playsongName,
      playsongCover,
      playsongSinger,
      isPlaySong,
      toplaysong,
      closeMusicPlayer
   }

  }


}
</script>

<style scoped>
.songlistd{
  width: 1000px;
  margin: 0 auto;
  display: flex;

  padding-bottom: 100px;
}
.songlistd .listdetail{
width: 700px;
padding: 15px 15px;
}
.songlistd .likelyList{
  width:300px;
}

.listdetail .detail .header{
display: flex;
}
.listdetail .detail .header .cover img{
width: 206px;
height: 206px;
padding: 2px;
border: 2px solid #eee;
margin-right: 30px;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;


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
  width: 240px;
}
.listbody table td:nth-of-type(3)
{
  width: 110px;
}
.listbody table td:nth-of-type(4)
{
  width: 88px;
}
.listbody table td:nth-of-type(1)
{
  width: 127px;
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
