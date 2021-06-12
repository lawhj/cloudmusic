<template>
<div class="singer">
  <div class="leftside">
    <ul>
      <h3>华语</h3>
      <li>
        <a href="#" @click="aclick($event)" class="selected" >华语男歌手</a>
      </li>
      <li>
        <a href="#" @click="aclick($event)">华语女歌手</a>
      </li>
      <li>
        <a href="#" @click="aclick($event)">华语组合</a>
      </li>
    </ul>
    <ul>
      <h3>欧美</h3>
      <li>
        <a href="#" @click="aclick($event)">欧美男歌手</a>
      </li>
      <li>
        <a href="#" @click="aclick($event)">欧美女歌手</a>
      </li>
      <li>
        <a href="#" @click="aclick($event)">欧美组合</a>
      </li>
    </ul>
    <ul>
      <h3>日本</h3>
      <li>
        <a href="#" @click="aclick($event)">日本男歌手</a>
      </li>
      <li>
        <a href="#" @click="aclick($event)">日本女歌手</a>
      </li>
      <li>
        <a href="#" @click="aclick($event)">日本组合</a>
      </li>
    </ul>
  </div>
  <div class="mainbody">
    <h4>{{mainheader}}</h4>
    <div class="sortForName" @click="sortClick($event)">
      <a href="#" class="sortSelected" >热门</a>
      <a href="#">A</a>
      <a href="#">B</a>
      <a href="#">C</a>
      <a href="#">D</a>
      <a href="#">E</a>
      <a href="#">F</a>
      <a href="#">G</a>
      <a href="#">H</a>
      <a href="#">I</a>
      <a href="#">J</a>
      <a href="#">K</a>
      <a href="#">L</a>
      <a href="#">M</a>
      <a href="#">N</a>
      <a href="#">O</a>
      <a href="#">P</a>
      <a href="#">Q</a>
      <a href="#">R</a>
      <a href="#">S</a>
      <a href="#">T</a>
      <a href="#">U</a>
      <a href="#">V</a>
      <a href="#">W</a>
      <a href="#">X</a>
      <a href="#">Y</a>
      <a href="#">Z</a>
      <a href="#">其他</a>
    </div>
    <ul>
      <li v-for="item in artists.slice(0,10)" :key="item" >
        <img :src="item.picUrl"  @click="goToSingerDetail(item.id)" >
        <div class="name">
          <a href="#" @click="goToSingerDetail(item.id)" >{{item.name}}</a>
          <i></i>
        </div>
      </li>
    </ul>
    <ol>
      <li v-for="item in artists.slice(10,30)" :key="item" >
        <div class="name">
          <a href="#"  @click="goToSingerDetail(item.id)" >{{item.name}}</a>
          <i></i>
        </div>
      </li>
    </ol>
  </div>
</div>
</template>

<script>
import {getArtist} from  '@/network/singer/singerList.js'


export default {
  name:'Singer',
  data(){
    return {
     mainheader:'华语男歌手',
     artists:[],
     as:[],
     type:1,
     area:7,
     initial:-1,
     sorts:[]
    }
  },
  mounted(){
     getArtist().then(res=>{
       console.log(res);
       this.artists=res.data.artists
       console.log(this.artists);
     })

     var aaas=document.querySelectorAll('.leftside a')
     this.as=aaas

     var sorts=document.querySelectorAll('.sortForName a')
     this.sorts=sorts

  },
  methods:{
    aclick(e){
       if(e.target.text)
       {this.mainheader=e.target.text}
       for(let i in this.as)
       {if(i<9)
        {
          this.as[i].className=''
        }
       }
       var arr=[...this.as]
       console.log('arr',arr);
       for(let i in arr)
       {
         if(arr[i].text==e.target.text)
         {
           this.as[i].className='selected'
           var index=i-'0'+1
           console.log('此时index是',index);
           var area
           var type
           if(index<=3)
           {
            area=7
            type=index
           }
           else if(index<=6)
           {
             area=96
             type=index-3
           }
           else{
             area=8
             type=index-6
           }
           this.$router.push({path:'artist',query:{area:area,type:type,initial:this.initial}})

         }

       }
    },
    sortClick(e)
    {
      if(e.target.tagName=='A')
      {
        var sort=[...this.sorts]
        for(let i in this.sorts)
        {
          if(i<28)
          {
            this.sorts[i].className='';
           console.log(i,this.sorts[i]);
          }
        }
       console.log(this.sorts[0]);


           for(let i in sort)
           {


             if(sort[i].text==e.target.text)
             {
               if(i==0)
               {
                 getArtist(this.type,this.area,"-1").then(res=>{
                   this.artists=res.data.artists
                 })
               }
               else if(i==27)
               {
                 getArtist(this.type,this.area,"0").then(res=>{
                   this.artists=res.data.artists
                 })
               }
               else{
                 getArtist(this.type,this.area,e.target.text).then(res=>{
                   this.artists=res.data.artists
                 })
               }
               this.sorts[i].className='sortSelected'

             }
           }
      }
    },
    goToSingerDetail(id){
      this.$router.push({path:'/singer',query:{artistid:id}})
    },
    startInitial(type,area)
    {
      getArtist(type,area).then(res=>{
        this.artists=res.data.artists
        console.log(this.artists);
      })
    }



  },
  watch:{
    $route(){
　　　　if(this.$route.query.area&&this.$route.query.type)
       {
         if( this.type!==this.$route.query.type || this.area!==this.$route.query.area)
         {this.type=this.$route.query.type
         this.area=this.$route.query.area
         this.startInitial(this.type,this.area)
           var arrSorts=[...this.sorts]
           for(let i in arrSorts)
           {
             arrSorts[i].className=''
           }
           arrSorts[0].className='sortSelected'
         }
       }
　　}
  }


}
</script>

<style scoped>
.singer{
  width:1000px;
  margin:0 auto;
  clear: both;
}
.singer .leftside{
  float: left;
  width:180px;
  border-left: 2px solid #eee;
  border-right: 2px solid #eee;
  padding: 0 5px;
  padding-top: 20px;
}
.singer .leftside ul{
  border-bottom: 2px solid #eee;
  margin-bottom:10px;
}

.singer .leftside ul li a{
  width:130px;
  padding-left: 15px;
  display: block;
  height:30px;
  line-height: 30px;
}
.singer .mainbody{
  float: left;
  width:700px;
  padding: 0 10px;
  padding-top: 20px;
}
.mainbody h4{
  border-bottom: 3px solid rgba(194, 12, 12);
  font-size: 20px;
  font-weight: normal;
  margin-bottom: 10px;
}
.mainbody ul{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.mainbody ul li{
 width:130px;
 margin-bottom: 25px;
}
.mainbody ul li img{
  width:130px;
  height:130px;
  cursor: pointer;
}
 .name{
  height:15px;
  width: 100%;
  line-height: 15px;
}
.name a{
  float: left;
  font-size: 15px;
  display: block;
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
width: 100px;
}
.name i{
  float: right;
  display: inline-block;
  width:15px;
  height: 15px;
  background: url('~@/assets/images/singerhead.png') no-repeat;
  background-size: 15px 15px;
}
ol{
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
ol li
{
  width:130px;
  height:20px;
  margin:2px 0;
}
ol li .name{
  width:130px;
}

.selected{
  border: 1px solid #eee;
  color: rgba(194, 12, 12);
}

.sortForName{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin:20px 0px 15px 0px;
}
.sortForName a{
  display: block;
  /* flex: 1; */
  text-align: center;
  padding: 0 5px;
}
.sortForName a:first-child,.sortForName a:last-child
{
  width: 30px;
  font-size:12px;
  padding: 0;
}

.sortSelected{
  background-color: rgba(194,12,12);
  color: white;
}
</style>
