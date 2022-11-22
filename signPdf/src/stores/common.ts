import { defineStore } from "pinia";
interface CommonStore {
    PDFFFile: File | null;
    singImg: string;
}
export default defineStore("commonStore", {
    state: (): CommonStore => {
        return {
            PDFFFile: null,
            singImg:'',
        }
    },
    getters:{

    },
    actions:{
        updPDF(val: File){
            this.PDFFFile = val;
        },
        updSingImg(val:string){
            this.singImg = val
        }
    },
})