<template>
    <div class="temp1">
        <div v-if="showStepOne">
       
        Step 1: 上傳檔案
            <div class="main_step1">
                <font-awesome-icon icon="upload" class="upload"  />
                <div class="upText">
                    <p>Drop your  File here!</p>
                    <p>Up to 1 File, max 2 MB each</p>
                   
                </div>
                <input type="file"   accept=".pdf"  @change="getFile" />
            </div>
        </div>
        <canvas ref="canvans" width={{canvasSize}} height={{canvasSize}} class="pdfCanvans"></canvas>
    </div>
</template>
<script setup lang="ts">
import jsPDF from 'jspdf';
import { onMounted, ref } from 'vue';
import common from '../stores/common';
import { storeToRefs } from "pinia";
import * as PDFJS from 'pdfjs-dist'
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.js`;
const canvans = ref<HTMLCanvasElement>()
const showStepOne = ref(true)
const commonStore = common();
    
const getFile = (event:Event) =>{
    const ctx = canvans.value?.getContext("2d");
    const { files } = event.target as HTMLInputElement;
    if (!files) return;
    const file = files[0]
    commonStore.updPDF(file)
    const { PDFFFile } = storeToRefs(commonStore);

    console.log("type", PDFFFile);
   
    if(file.type == "application/pdf"){
        
        let reader  = new FileReader();
    
        reader.onload = (e) =>{
            if(e.target){
                let pdfData = new Uint8Array(e.target.result as ArrayBuffer);
                const loadingTask = PDFJS.getDocument({ data: pdfData });
                loadingTask.promise.then((pdf)=>{
                    const pageNumber = 1
                    showStepOne.value = false
                    pdf.getPage(pageNumber).then((page)=>{
                        const scale = 1.5;
                        const viewport = page.getViewport({ scale: scale });

                        if(canvans.value){
                            canvans.value.height = viewport.height;
                            canvans.value.width = viewport.width;
                        }

                        const renderContext = {
                                canvasContext: ctx!,
                                viewport: viewport
                        };

                        const renderTask = page.render(renderContext);
                        // const renderTask = page.render(renderContext);
                        renderTask.promise.then(()=>{
                           
                        })
                    })
                })

            }

        }
        reader.readAsArrayBuffer(file);
    }
   
   
}





</script>
<style scoped>
.temp1{
    @apply
    max-w-[400px]
    m-auto
    mt-20
}

.pdfCanvans{
    @apply
    absolute
    top-30
    left-0
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
    w-full
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