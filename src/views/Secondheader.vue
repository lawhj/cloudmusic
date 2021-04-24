<template>
  <div class="home">
    <div class="recommendContainer">
      <div class="recommendlist w clearfix">
        <ul>
          <li>
            <a href="#">推荐</a>
          </li>
          <li>
            <a href="#">排行榜</a>
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
  </div>
</template>

<script>
export default {
  name:'Secondheader'
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
