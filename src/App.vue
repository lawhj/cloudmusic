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
            <router-link to="/about"  >朋友</router-link>
          </li>
          <li>
            <router-link to="/song"  >商城</router-link>
          </li>
          <li>
            <router-link to="/list"  >音乐人</router-link>
          </li>
          <li>
            <router-link to="/dialog"  >下载客户端</router-link>
          </li>
        </ul>
        <div class="search">
          <input type="search" placeholder="电台/视频/歌手" >
        </div>
        <button class="author">创作者中心</button>
        <a href="#" class="login" @click.prevent="toLogin" v-show="!islogin">登录</a>
        <div class="userinfo" v-show="islogin">
          <img :src="$store.state.user.avatarUrl" />
          <a href="#" class="login" @click.prevent="toLogout" >退出</a>

        </div>

      </nav>
    </div>

    <router-view v-slot="{ Component }">
      <keep-alive>
        <component class="view" :is="Component" />
      </keep-alive>
    </router-view>


    <div class="dialog">
      <el-dialog
    title="登录页面"
    v-model="dialogVisible"
    width="30%"
    @close="toCloseLogin"
    :before-close="handleClose">
    <img :src="imageSrc" alt="二维码过期" >
    <span>请用APP扫码登录</span>
    <template #footer>
      <span class="dialog-footer">
      </span>
    </template>
  </el-dialog>
    </div>


  </div>
</template>

<script>
import {ref} from 'vue'
import {checkStatus,getStatus,getKey,getImg,logout} from '@/network/login.js'


export default {
  name: 'App',
  data(){
   return {
     dialogVisible:false,
     imgSrc:'',
     islogin:false
   }

 },
  methods:{
    handleClose(){
      this.dialogVisible=false;
    },
    toLogin(){
      this.dialogVisible=true;
      this.login()
      // let obj={avatarUrl:'https://p1.music.126.net/FfCRss9kp-nnG6xslggmeQ==/109951165613691674.jpg'}
      // this.$store.commit('setUser',obj)
      // this.islogin=true
    },
    toCloseLogin(){
          this.dialogVisible=false
    },
    async checkStatus(key) {
        const res = await checkStatus(key)
        console.log('检查状态',res);
        return res.data
      },
      async  getLoginStatus() {
           const res = getStatus()
           // console.log('得到登录状态',res);
           return res
         },
      async  login() {
           let timer
           let timestamp = Date.now()
           this.getLoginStatus()
           const res = await getKey()
           const key = res.data.data.unikey
           const res2 = await getImg(key)
           this.imgSrc=res2.data.data.qrimg

           console.log('被调用了login');

           timer = setInterval(async () => {
             const statusRes = await this.checkStatus(key)
             if (statusRes.code === 800) {
               alert('二维码已过期,请重新获取')
               this.imgSrc=''
               clearInterval(timer)
             }
             if (statusRes.code === 803) {
               // 这一步会返回cookie
               clearInterval(timer)
               alert('授权登录成功')
               this.islogin=true
               this.$store.commit('setLogin',true)
               console.log(this.$store.state.isLogin);
               this.toCloseLogin()
              let obj=await this.getLoginStatus()
              this.$store.commit('setUser',obj.data.data.profile)
              console.log(obj);
             }

             if(!this.dialogVisible){
               clearInterval(timer)
             }

           }, 3000)
         },
         toLogout(){
           // console.log(this.$store.state.isLogin);
           logout().then(res=>{
             console.log(res);
           })
           this.islogin=false
           this.$store.commit('setLogin',false)
           this.$store.commit('setUser',{})
           console.log('isL ',this.$store.state.isLogin);
           console.log('user is',this.$store.state.user);
           // window.localStorage.setItem('log','')
           // console.log(this.$store.state.isLogin);
         }

  },
    computed:{
          imageSrc(){
            return this.imgSrc
          },

     },
     mounted(){
         // this.islogin=true
         // console.log(this.islogin);
     }

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
  margin: 0 10px;
  margin-top: 13px;
  float: left;
}
.nav .login{
  color: #eee;
  font-size:10px;
}

 .userinfo{
  float: left;
  /* width: 30px; */
  height:60px;
  display: flex;
  align-items: center;
}
.nav .userinfo a{
  display:block;
  height: auto;
}
.userinfo img{
  width:35px;
  height: 35px;
  border-radius: 17px;
  /* vertical-align: middle; */
}


.dialog img{
  position: absolute;
  width:130px;
  height:130px;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.dialog{
  position: relative;
}

.dialog span{
  position: absolute;
  bottom: 2px;
  left: 50%;
  font-size: 12px;
  transform: translateX(-50%);
}


</style>
