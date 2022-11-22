

<template>
<div class="absolute  left-0 h-full w-full z-10">

<div class="mainCanvas ">
    <div class="max-w-lg m-auto ">
        Step 2:填上簽名擋
       
        <div class="flex items-center">
            請選擇筆芯大小,及顏色
            <button @click="addPen" class="p-2 bg-gray-300 max-h-6 flex items-center"> + </button>
            <p class="w-10 flex items-center justify-center"> {{penSize}} </p>
            <button @click="cutPen" class="p-2 bg-gray-300 max-h-6 flex items-center"> - </button>
            <input type="color" @change="chgPenColor" class="max-w-8 ml-5"/>
            
        </div>
        <div class="flex items-center">
        <p class="text-blue-400 cursor-pointer" @click="clearCanvans" > 重新繪製</p>
            <p class="text-blue-400 cursor-pointer  ml-5" @click="doneImg" > 完成簽名檔</p>
            <p class="text-blue-400 cursor-pointer  ml-5" @click="props.donePDF" > 下載PDF</p>
        </div>
    </div>
  <canvas class="bg-white" ref="canvans" height="100" width="300" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp"></canvas>
  <img :src=imgSrc  class=" bg-white w-[300px] h-[100px] border-dotted m-auto mt-5" >
</div>
</div>
</template>

<script setup lang="ts">
import { ref,onMounted } from "vue";
import common from '../stores/common';
import { jsPDF } from "jspdf";
const props = defineProps({
    donePDF:Function,
    showSing:Function,
})
const commonStore = common();


const canvans = ref<HTMLCanvasElement>()
let isMouseClick = false
const penSize = ref(3)
let color = "#000"
let x1 = 0
let y1 = 0
let imgSrc=ref("")

const DrawCirCle = (x1:number, y1:number,x2:number , y2:number)=>{
    let ctx = canvans.value?.getContext("2d");
    
        if(ctx){
        ctx.beginPath();
        ctx.moveTo(x1,y1)
        ctx.lineTo(x2,y2)
        ctx.lineWidth = penSize.value
        ctx.strokeStyle =color
        ctx.shadowBlur = 1;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.stroke();
  };
}

const doneImg = () =>{
    const dataURI = canvans.value?.toDataURL()
    if(dataURI){
        imgSrc.value = dataURI
        commonStore.updSingImg(imgSrc.value)
        props?.showSing?.();
    }
}

const clearCanvans = () =>{
    let ctx = canvans.value?.getContext("2d");
    if(ctx&&canvans.value){
        ctx.fillStyle = "#fff"
        ctx.fillRect(0,0,canvans.value.width,canvans.value.height)
    }

    if(imgSrc.value){
        imgSrc.value =""
    }
}

const addPen=()=>{
    penSize.value +=3
    if(penSize.value >12){
        penSize.value=12
    }
}

const chgPenColor =( e:Event)=>{
    let pColor =  e.target as HTMLInputElement
    color=pColor.value
}

const cutPen=()=>{
    penSize.value -=3
    if(penSize.value <3){
        penSize.value=3
    }
}

const mouseMove = (e:MouseEvent)=>{
    if(isMouseClick){
        let x2 = e.offsetX
        let y2 =e.offsetY
        DrawCirCle(x1,y1,x2,y2)

        x1 = x2
        y1 = y2
    }
}

const mouseDown = (e:MouseEvent )=>{
    isMouseClick =true
    x1 = e.offsetX
    y1 = e.offsetY
}

const mouseUp = ()=>{
    x1 =0
    y1=1
    isMouseClick =false
}

onMounted(()=>{
    // DrawCirCle(10,50);
})



</script>



<style scoped>

.mainCanvas{
    @apply
    absolute 
    right-9 
    max-w-[400px]
    bg-gray-100
    p-10
    
    ;
}
canvas{
    @apply
    border-gray-500 
    border-solid 
    border-[1px]
    m-auto
    ;
}

</style>