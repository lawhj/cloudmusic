<template>
  <div class="home">
    <div class="recommendContainer">
      <div class="recommendlist w clearfix">
        <ul>
          <li>
            <a href="#" @click.prevent="goToGuide(0)" >推荐</a>
          </li>
          <li>
            <a href="#" @click.prevent="goToGuide(1)">排行榜</a>
          </li>
          <li>
            <a href="#" @click.prevent="goToGuide(2)">歌单</a>
          </li>
          <li>
            <a href="#">主播电台</a>
          </li>
          <li>
            <a href="#" @click.prevent="goToGuide(3)">歌手</a>
          </li>
          <li>
            <a href="#">新碟上架</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'

export default {
  name:'Secondheader',
  setup(){
    const router=useRouter()

    let goToGuide=(type)=>{
      let arr=['/','/toplist','/playlist','/artist']
      router.push({path:arr[type]})
    }

   return{
     goToGuide
   }

  }

}
</script>

<style scoped>
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
