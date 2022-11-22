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
        <MainCanvas v-if="!showStepOne"  :donePDF="donePDF" :showSing="showSing"/>
        <canvas ref="canvans" width={{canvasSize}} height={{canvasSize}} class="pdfCanvans"></canvas>
        <MoveSign  v-if="showSign" :wC="wC" :HC="HC" />
    </div>
</template>
<script setup lang="ts">
import jsPDF from 'jspdf';
import { onMounted, ref } from 'vue';
import common from '../stores/common';
import { storeToRefs } from "pinia";
import * as PDFJS from 'pdfjs-dist'
import MoveSign from '../components/MoveSign.vue';

import MainCanvas from '../components/MainCanvas.vue';
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.js`;
const canvans = ref<HTMLCanvasElement>()
const showStepOne = ref(true)
const showSign = ref(false)
const commonStore = common();

const wC = ref(0)
const HC = ref(0)


const donePDF = () =>{
    let doc = new jsPDF();
    const dataURI = canvans.value?.toDataURL()
    if(dataURI&&canvans.value){
        doc.addImage(dataURI,'JPEG', 0, 0, canvans.value.width, canvans.value.height);
        doc.save('helloworld.pdf');
    }
}

const showSing = () =>{
    showSign.value =true
}
    
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
                            wC.value=viewport.width;
                            HC.value=viewport.height;
                         

                            console.log("viewport.height", viewport.width,viewport.height);
                            
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