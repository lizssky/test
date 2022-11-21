import { defineStore } from "pinia";
interface CommonStore {
    PDFFFile: File | null;
}
export default defineStore("commonStore", {
    state: (): CommonStore => {
        return {
            PDFFFile: null,
        }
    },
    getters:{

    },
    actions:{
        updPDF(val: File){
            this.PDFFFile = val;
        }
    },
})