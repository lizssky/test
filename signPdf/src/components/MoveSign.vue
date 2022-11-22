<template>
  <div class="moveSign">
    <canvas  id="canvas"></canvas>
  </div>
 
    
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { fabric } from 'fabric';
import common from '../stores/common';
import { storeToRefs } from "pinia";
const commonStore = common();

const props = defineProps({
  wC:Number,
  HC:Number,
})


onMounted(()=>{
  nextTick(()=>{
   
        const card = new fabric.Canvas('canvas',{
          width:screen.width,
          height:props.HC,
        }) 
  

    

      const { singImg } = commonStore;
     
      
      if(singImg){
        fabric.Image.fromURL(singImg, oImg => {
      // 将图片对象添加到 canvas 中
        card.add(oImg)
      })


      }

    

      card.add(circle)
      
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
