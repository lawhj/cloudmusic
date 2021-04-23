<template>
  <!-- <Topheader></Topheader> -->
  <div class="songdetail">
    <!-- <ul>
      <li v-for="item in lyric">{{item}}</li>
    </ul> -->
    <div class="songAndLyric" v-show="ready">
      <div class="header">
        <div class="cover">
          <img :src="coverUrl" >
        </div>
        <div class="lyric">
          <h3>{{songname}}</h3>
          <h5 v-show="alia" class="songAlia">{{alia}}</h5>
          <h5>歌手: <a href="#">{{singer}}</a> </h5>
          <div class="fn">
            <button @click.prevent="toplaysong(-1)">播放</button>
            <button>下载</button>
            <button>收藏</button>
            <button>评论</button>
          </div>
          <ul :class="{isHidden:unstretch}" >
            <li v-for="item in lyric">{{item}}</li>
          </ul>
          <div class="upAndDown">
            <a href="#" @click="stretch" v-show="unstretch">展开 <i></i> </a>
            <a href="#" @click="stretch" v-show="!unstretch">收起 <i></i> </a>
          </div>
        </div>
      </div>
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
      v-if="pageFirst"
      background
      layout="prev, pager, next"
      page-size="20"
      @current-change="pageChange"
      :total="200">
    </el-pagination>
        </div>
      </div>


    </div>
    <div class="likelySongs" v-show="ready">
      <div class="headers">
        <h4>相似歌曲</h4>
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

   <Songplay :songid="playsongID"  v-show="isPlaySong" :songcover="playsongCover" :singer="playsongSinger" :songname="playsongName" @closeplayer="closeMusicPlayer" ></Songplay>

  </div>
</template>

<script>
import {getSongLyric} from '@/network/lyric.js'
import {ref,onMounted,watch} from 'vue'
import Topheader from '@/views/Topheader.vue'
import {getSongdetail,getSongComment,getSimilarSong} from '@/network/songdetail.js'
import {useRoute} from 'vue-router'
import Songplay from '@/views/Songplay.vue'


export default {
  name:'Song',
  components:{
    Topheader,
    Songplay
  },
  setup(){

    let lyric=ref([])

    let coverUrl=ref('')
    let songname=ref('')
    let unstretch=ref(true)
    let alia=ref(null)

    let singer=ref('')
    const route=useRoute()

    let songID=ref(0)

    let ready=ref(false)

    let comments=ref([])
    let pageFirst=ref(true)
    let sid=ref(0)

    let similars=ref([])

    let isPlaySong=ref(false)
    let playsongID=ref(0)
    let playsongCover=ref('')
    let playsongSinger=ref('')
    let playsongName=ref('')

    let closeMusicPlayer=()=>{
      isPlaySong.value=false
    }

    let toplaysong=(id,item)=>{

        if(id==-1) {
           playsongID.value=sid.value
           playsongCover.value=coverUrl.value
           playsongSinger.value=singer.value
           playsongName.value=songname.value
           isPlaySong.value=true
        }
        else{
          playsongID.value=item.privilege.id
          playsongCover.value=item.album.picUrl
          playsongSinger.value=item.artists[0].name
          playsongName.value=item.name
          isPlaySong.value=true

        }

    }


    let init=(id)=>{
      getSongLyric(id).then(res=>{
        lyric.value=res.data.lrc.lyric
        var result=[]
        var lrcs = lyric.value.split('\n');//用回车拆分成数组
   for(var i in lrcs) {//遍历歌词数组
       lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
       var t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]"));//取[]间的内容
       var s = t.split(":");//分离:前后文字
       if(!isNaN(parseInt(s[0]))) { //是数值
           var arr = lrcs[i].match(/\[(\d+:.+?)\]/g);//提取时间字段，可能有多个
           var start = 0;
           for(var k in arr){
               start += arr[k].length; //计算歌词位置
           }
           var content = lrcs[i].substring(start);//获取歌词内容
           result.push(content);
       }
   }

       lyric.value=result


      })

      getSongdetail(id).then(res=>{
        console.log(res);
        coverUrl.value=res.data.songs[0].al.picUrl
        songname.value=res.data.songs[0].al.name
        alia.value=res.data.songs[0].alia[0]
        singer.value=res.data.songs[0].ar[0].name

           ready.value=true
      })

      getSongComment(id).then(res=>{
        comments.value=res.data.comments
        // console.log('评论',res);

        pageFirst.value=true

      })

      getSimilarSong(id).then(res=>{
          similars.value=res.data.songs
          console.log('similarsong is',res);
      })


    }


     onMounted(()=>{

           // init()
           // console.log(11111);
           // console.log('song加载了');

     })

     let stretch=()=>{
       unstretch.value=!unstretch.value
     }

     let pageChange=(index)=>{
       getSongComment(sid.value,20,index-1).then(res=>{
         comments.value=res.data.comments
         console.log('评论改变');

       })

     }

     watch(()=>{
         if(route.query.songid)
         {
           if(route.query.songid!=songID.value)
           {
                ready.value=false

                 init(route.query.songid)

                 sid.value=route.query.songid

                 pageFirst.value=false
           }

         }


     })




  return{
    lyric,
    coverUrl,
    songname,
    unstretch,
    stretch,
    alia,
    singer,
    ready,
    comments,
    pageFirst,
    pageChange,
    similars,
    playsongID,
    playsongCover,
    playsongSinger,
    playsongName,
    closeMusicPlayer,
    isPlaySong,
    toplaysong
  }

  }

}
</script>

<style scoped>

.songdetail{
   width:1000px;
   margin: auto;
   display: flex;
   padding-top: 10px;

   padding-bottom: 80px;
}
.songAndLyric{
  width:700px;
}
.likelySongs{
  width:300px;
}

.songAndLyric .header{
  display:flex;
}
.songAndLyric .header img{
  width:205px;
  height: 205px;
}
.songAndLyric .header .lyric ul{
  font-size: 14px;
}
.isHidden{
  overflow: hidden;
  height:400px;
}
.lyric{
  position: relative;
  padding-left: 20px;
}
.lyric h3{
  font-weight:normal;
  font-size: 22px;
}
.lyric h5 a{
  color:rgba(12, 115, 194);
  font-size: 12px;
}
.lyric .songAlia{
  color: rgba(201, 186, 186);
}
.lyric .fn
{
   margin-top:10px;

}


.lyric .fn button:nth-of-type(1)
{
  background-color: rgba(34, 115, 194);
}

.lyric .fn button{
  width: 80px;
  height: 27px;
  margin-right: 20px;
  border-radius:5px;
  outline: none;
}


.lyric .upAndDown a{
  position: absolute;
  bottom: -25px;
  color:rgba(12, 115, 194);
}
.lyric .upAndDown a:nth-of-type(1) i
{
    display: inline-block;
    width: 10px;
    height:10px;
    background: url('~@/assets/images/down.png') no-repeat;
    background-size:10px 10px;
}
.lyric .upAndDown a:nth-of-type(2) i
{
    display: inline-block;
    width: 10px;
    height:10px;
    background: url('~@/assets/images/up.png') no-repeat;
    background-size:10px 10px;
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
.likelySongs .headers{
  width:100%;
  border-bottom: 2px solid #eee;
}
.likelySongs .headers h4{
  padding: 5px 0;
  font-size: 14px;
  font-weight: normal;
}
.likelySongs .likelyBody ul li{
  height: 45px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
}
.likelySongs .likelyBody ul li a{
  display: block;
  font-size: 14px;
}
.likelySongs .likelyBody ul li a:hover{
  text-decoration: underline;
}
.likelySongs .likelyBody ul li a:nth-of-type(2)
{
  color: rgba(201, 186, 186);
}
.likelySongs .likelyBody ul li i{
  display: block;
  height: 20px;
  width: 20px;
  background: url('~@/assets/images/play.png') no-repeat;
  background-size: 20px 20px;
}

</style>
