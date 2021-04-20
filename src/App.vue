<template>
  <div class="topnav">
    <div class="nav clearfix">
      <nav class="w">
        <ul>
          <li>
            <h1>网易云音乐</h1>
          </li>
          <li>
            <router-link to="/" >发现音乐</router-link>
          </li>
          <li>
            <router-link to="/list"  >我的音乐</router-link>
          </li>
          <li>
            <router-link to="/list"  >朋友</router-link>
          </li>
          <li>
            <router-link to="/list"  >商城</router-link>
          </li>
          <li>
            <router-link to="/list"  >音乐人</router-link>
          </li>
          <li>
            <router-link to="/list"  >下载客户端</router-link>
          </li>
        </ul>
        <div class="search">
          <input type="search" placeholder="电台/视频/歌手" >
        </div>
        <button class="author">创作者中心</button>
        <a href="#" class="login">登录</a>
      </nav>
    </div>

    <router-view v-slot="{ Component }">
      <keep-alive>
        <component class="view" :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/* .topnav{
  height:60px;
  line-height:60px;
} */
.topnav ul li{
  float: left;
  height:60px;
}
.topnav ul li a{
  color: white;
  padding: 0 20px;
  height:60px;
}
.topnav ul li:hover{
  background-color: rgba(0,0,0);
}
.topnav ul li h1{
  text-indent: -9999px;
  height:60px;
  width: 150px;
  background: url('~@/assets/images/logo.png') no-repeat;
  background-size: 150px 60px;
}
.nav{
  background-color: rgba(36,36,36);
  height: 60px;
    line-height: 60px;
}
.nav ul{
  float: left;
}
.nav .search{
  float: left;
}
.nav .search{
  position: relative;
}
.nav .search input{
  height: 27px;
    border-radius: 30px;
    outline: none;
    width: 170px;
    padding-left: 30px;
}
.nav .search:before{
  content: '';
  position: absolute;
  width:20px;
  height: 20px;
  top:20px;
  left:7px;
  background: url('~@/assets/images/search.png') no-repeat;
  background-size:20px 20px;
}
.nav .author{
  width:100px;
  height:35px;
  border-radius:20px;
  color: #eee;
  background-color: rgba(36,36,36);
  border: 1px solid #eee;
  margin: 0 30px;
}
.nav .login{
  color: #eee;
  font-size:10px;
}

</style>
