<template>
  <div class="songdetail">
    this is song detail
    <ul>
      <li v-for="item in lyric">{{item}}</li>
    </ul>
  </div>
</template>

<script>
import {getSongLyric} from '@/network/lyric.js'
import {ref,onMounted} from 'vue'

export default {
  name:'Song',
  setup(){

    let lyric=ref([])

     onMounted(()=>{
       getSongLyric().then(res=>{
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
     })

  return{
    lyric
  }

  }

}
</script>

<style scoped>
</style>
