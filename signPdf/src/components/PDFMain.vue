<template>
    <div class="pdf-container">
      <canvas ref="pdf-canvas"></canvas>
    </div>
  </template>
  <script lang="ts">
 
  import * as PdfJs from 'pdfjs-dist/legacy/build/pdf.js'
  import Pdf from '@/assets/js.pdf'
    import { ref,onMounted } from 'vue'
  
    onMounted(()=>{
        loadFile("file:///C:/Users/User/Downloads/a%20(1).pdf")
    })
 
    let pdfDoc: any = '' // 保存加载的pdf文件流
    let pdfPages = 0
    let pdfScale = 1.0

  
   const  loadFile =  (url: string) => {
      PdfJs.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry')
      const loadingTask = PdfJs.getDocument(url)
      loadingTask.promise.then((pdf) => {
        pdfDoc = pdf
        pdfPages = pdfDoc.numPages
        renderPage(1) // 表示渲染第 1 页
      })
    }
  
    const renderPage =  (num: any) => {
      pdfDoc.getPage(num).then((page: any) => {
        const canvas: any = ref('pdf-canvas')
        const ctx: any = canvas.getContext('2d')
        const dpr = window.devicePixelRatio || 1
        const bsr = ctx.webkitBackingStorePixelRatio ||
                    ctx.mozBackingStorePixelRatio ||
                    ctx.msBackingStorePixelRatio ||
                    ctx.oBackingStorePixelRatio ||
                    ctx.backingStorePixelRatio ||
                    1
        const ratio = dpr / bsr
        const viewport = page.getViewport({ scale: pdfScale })
        canvas.width = viewport.width * ratio
        canvas.height = viewport.height * ratio
        canvas.style.width = viewport.width + 'px'
        canvas.style.height = viewport.height + 'px'
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
        const renderContext = {
          canvasContext: ctx,
          viewport: viewport
        }
        page.render(renderContext)
      })
    }

  </script>