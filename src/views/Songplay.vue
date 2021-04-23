<template>
  <div class="songplayer">
    <audio :src="songURL" id="musicMp3"  ref="player"   @timeupdate="durationUpdate"  @canplay="getDuration"></audio>
    <div class="btn">
      <i v-if="!isPlaying" class="start" @click.prevent="StartOrPause" ></i>
      <i v-else class="stop" @click.prevent="StartOrPause" ></i>
    </div>
    <div class="cover">
      <img :src="songcover" >
      <a href="#">{{songname}}</a>
      <a href="#">{{singer}}</a>
    </div>
     <el-slider v-model="musicDuration" :max="musicAllDuration" :show-tooltip="false" @change="changeMusicDuration" class="slider" @mousedown.native="mouseD" @mouseup.native="mouseU"></el-slider>
     <div>
       {{parseInt(musicDuration/60).toString().padStart(2,'0')}}:{{parseInt(musicDuration%60).toString().padStart(2,'0')}}/{{parseInt(musicAllDuration/60).toString().padStart(2,'0')}}:{{parseInt(musicAllDuration%60).toString().padStart(2,'0')}}
     </div>
     <div class="volumeControler">
       <el-slider
      vertical
      height="30px" max="100" v-model="musicVolume" @change="changeMusicVolume" >
    </el-slider>
     </div>
     <div class="close" >
       <i @click="toClosePlayer"></i>
     </div>
  </div>
</template>


<script>
import {ref,onMounted,computed,watch} from 'vue'
import {getSongURl} from '@/network/songdetail.js'


export default {
     name:'Songplay',
     props:{
       songid:{
         type:Number
       },
       songcover:{
         type:String
       },
       singer:{
         type:String
       },
       songname:{
         type:String
       }
     },
     setup(props,{emit}){


         let songURL=ref('https://music.163.com/song/media/outer/url?id=33894312.mp3')
         let songCover=ref('')
         let songSinger=ref('')

         watch(()=>{
             getSongURl(props.songid).then(res=>{
               songURL.value=res.data.data[0].url
               console.log(res);
             })

         })

         let isPlaying=ref(false)
         const player=ref(null)
         let musicDuration=ref(0)
         let musicAllDuration=ref(0)
         let isChange=ref(false)
         let musicVolume=ref(100)

        let getDuration=()=>{
          console.log(player.value.duration);
          musicAllDuration.value=player.value.duration
        }

        let durationUpdate=()=>{
          if(isChange.value) return
          musicDuration.value=player.value.currentTime
        }

        let changeMusicDuration=()=>{
          player.value.currentTime=musicDuration.value
          isChange.value=false
        }

        let mouseD=()=>{
          isChange.value=true
        }

        let mouseU=()=>{
          isChange.value=false
        }

        let StartOrPause=()=>{
         isPlaying.value=!isPlaying.value
         if(isPlaying.value)
         {
           player.value.play()
         }
         else{
           player.value.pause()
         }

        }

        let changeMusicVolume=()=>{
          player.value.volume=musicVolume.value/100
        }

        let toClosePlayer=()=>{

             isPlaying.value=false
             player.value.pause()
          emit('closeplayer')

        }

        return {
          changeMusicDuration,
          player,
          musicDuration,
          musicAllDuration,
          durationUpdate,
          changeMusicDuration,
          getDuration,
          StartOrPause,
          isPlaying,
          mouseD,
          mouseU,
          musicVolume,
          changeMusicVolume,
          songURL,
          toClosePlayer
        }


     }

}



</script>

<style scoped>

.songplayer{
display: flex;
align-items: center;
position:fixed;
bottom: 5px;

background-color: #eee;
}
.songplayer div{
  margin: 20px 30px;
}
.songplayer .volumeControler{
  margin: 0 30px;
}
.slider{
  width:200px;
}
.start{
  width: 20px;
  height:20px;
  display: inline-block;
  background: url('~@/assets/images/start.png') no-repeat;
  background-size: 20px 20px;
}
.stop{
  width: 20px;
  height:20px;
  display: inline-block;
  background: url('~@/assets/images/stop.png') no-repeat;
  background-size: 20px 20px;
}
.cover img{
  width:40px;
  height:40px;
  vertical-align: middle;
  margin-right: 5px;
}
.cover a:hover{
  text-decoration: underline;
}
.cover a:first-of-type{
  font-size: 18px;
}
.cover a{
  margin-right: 10px;
  font-size:14px;
}
.close i{
  display: inline-block;
  width: 20px;
  height:20px;
  background: url('~@/assets/images/close.png') no-repeat;
  background-size:20px 20px;
}
</style>
