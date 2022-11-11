

<template>
    
<div class="mainCanvas">
   
    <div class=" max-w-lg m-auto ">
        請選擇筆芯大小
        <div class="flex items-center">
            <button class="p-2 bg-gray-300 max-h-6 flex items-center"> + </button>
            <p class="w-10 flex items-center justify-center"> 5 </p>
            <button class="p-2 bg-gray-300 max-h-6 flex items-center"> - </button>
        </div>
    </div>
    

  <canvas ref="canvans" height="300" width="300" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp"></canvas>
</div>
</template>

<script setup lang="ts">
import { ref,onMounted } from "vue";
const canvans = ref<HTMLCanvasElement>()
let isMouseClick = false
const penSize = ref(5)

const DrawCirCle = (x:number, y:number)=>{
    let ctx = canvans.value?.getContext("2d");
    if(ctx){
        ctx.beginPath();
        ctx.arc(x,y,5,0,2*Math.PI)
        ctx.fill();
    }
}



const mouseMove = (e:MouseEvent)=>{
    if(isMouseClick){
        let x = e.offsetX
        let y =e.offsetY
        DrawCirCle(x,y)
    }
}

const mouseDown = ()=>{
    isMouseClick =true
}

const mouseUp = ()=>{
    isMouseClick =false
}

onMounted(()=>{
    // DrawCirCle(10,50);
})

</script>



<style scoped>
canvas{
    @apply
    border-gray-500 
    border-solid 
    border-[1px]
    m-auto
    ;
}

</style>