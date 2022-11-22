<template>
  <div class="moveSign">
    <canvas  id="canvas"></canvas>
  </div>
 
    
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { fabric } from 'fabric';
import common from '../stores/common';
import { storeToRefs } from "pinia";
import { computed } from '@vue/reactivity';
const commonStore = common();

const props = defineProps({
  wC:Number,
  HC:Number,
})
const { singImg } = storeToRefs(commonStore);


watch(()=>singImg.value,()=>{
  getImg();
})


const getImg = ()=>{
  const card = new fabric.Canvas('canvas',{
          width:props.wC,
          height:props.HC,
        }) 

     
      if(singImg){
        fabric.Image.fromURL(singImg.value, oImg => {
      // 将图片对象添加到 canvas 中
        card.add(oImg)
      })

      }
  
}



onMounted(()=>{
  nextTick(()=>{
    getImg();
  })
  
})
</script>



<style scoped>
.moveSign {
  color: #888;
  @apply
  absolute
  left-0
  top-10
  z-30
  ;
}
</style>
