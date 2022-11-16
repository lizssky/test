<template>
    
<div class="main">
    <ul>
        <li>
            Step 1: 上傳檔案
            <div class="main_step1">
                <font-awesome-icon icon="upload" class="upload"  />
                <div class="upText">
                    <p>Drop your  File here!</p>
                    <p>Up to 1 File, max 2 MB each</p>
                </div>
                <input type="file"  @change="upPdfImg" />
            </div>
        </li>
        <li >Step 2: 新增線上簽名
            <div class="bg-gray-100 p-5 text-[36px] flex justify-around text-gray-600">
                <font-awesome-icon icon="file-signature" />
                <div class="bg-white w-9/12 h-10 text-sm p-5 relative cursor-pointer">
                    <p class="text-blue-600 absolute right-2">完成</p>
                </div>
            </div>
            <ul  class="bg-gray-100 p-5 border-t  text-gray-600 cursor-pointer">
                <li class="bg-white w-[95%] h-24"></li>
                <p class="text-blue-600 text-sm">清除全部</p>
            </ul>
        </li>
        <li>Step 3: 下載文件
            <p class="text-blue-600 text-sm cursor-pointer">點我下載</p>
        </li>
    </ul>
</div>
</template>

<script setup lang="ts">
import { jsPDF } from "jspdf";



const upPdfImg = () =>{

}
</script>

<style  scoped>
.main{
    @apply
    flex
    items-center
    justify-center
    ;
}

.main li{
    @apply
     mb-5
    ;
}
.main_step1{
    @apply
     bg-gray-100
     m-auto
     h-24
     rounded-lg
     relative
    ;
}

input[type=file]{
    @apply
    opacity-0
    h-full
    cursor-pointer
    ;
}
.upload{
    @apply
    w-full
    absolute
    left-0
    top-5
    text-[36px]
    text-gray-600
    ;
}

.upText{
    @apply
    w-full
    absolute
    left-0
    bottom-1
    text-xs
    text-gray-500
    ;
}

.upText p{
    @apply
        block
        w-full
        text-center
    ;
}

</style>