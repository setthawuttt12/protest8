<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title>
                        <h2 class="text-center">เอกสารและคู่มือการประเมิน</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="saveMember">
                            <br>
                            <v-row>
                                <v-col md="6" cols="12">
                                    <v-file-input label="เอกสาร" v-model="file" accept=".pdf" hint="รองรับเฉพาะไฟล์ PDF ขนาดไม่เกิน 10MB" persistent-hint prepend-inner-icon="mdi-file"></v-file-input>
                                </v-col>
                                <v-col md="6" cols="12">
                                    <v-text-field label="ชื่อเอกสาร" v-model="name_doc" :error-messages="error.name_doc"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <center>
                                        <v-btn class="text-center ma-3" type="submit" color="primary">ยืนยัน</v-btn>
                                        <v-btn class="text-center ma-3" type="reset" color="error">ยกเลิก</v-btn>
                                    </center>
                                </v-col>
                            </v-row>
                        </v-form>
                        <v-text-field v-model="search" class="mt-3" prepend-inner-icon="mdi-magnify"></v-text-field>
                        <v-table class="mt-3">
                            <thead>
                                <tr>
                                    <td class="border text-center">ลำดับ</td>
                                    <td class="border text-center">ชื่อเอกสาร</td>
                                    <td class="border text-center">วันที่ออกเอกสาร</td>
                                    <td class="border text-center">เปิดดู</td>
                                    <td class="border text-center">จัดการ</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(items,index) in result" :key="items.id_doc">
                                    <td class="border text-center">{{ index+1 }}</td>
                                    <td class="border text-center">{{ items.name_doc }}</td>
                                    <td class="border text-center">{{ items.day_doc }}</td>
                                    <td class="border text-center">
                                        <center>
                                            <v-btn size="small" color="warning" prepend-icon="mdi-eye" class="text-center text-white ma-2" @click="view(items.file)">เปิดดู</v-btn>
                                        </center>
                                    </td>
                                    <td class="border text-center">
                                        <center>
                                            <v-btn size="small" color="error" class="text-center text-white ma-2" @click="del(items.id_doc)">ลบ</v-btn>
                                        </center>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="border text-center text-red" colspan="10" v-if="result.length ===0">ไม่พบข้อมูล</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { api, staff } from '~/API/base';

const typeR = ['ฝ่ายบุคลากร','ผู้รับการประเมินผล','กรรมการประเมิน']
const error = ref<Record<string,string>>({})
const file = ref<File | null>(null)
const name_doc = ref('')
const search = ref('')
const dataResult = ref([])
const token = import.meta.client ? localStorage.getItem('token'):null

const emailRegex = /^[^\s]+@[^\s]+\.[^\s]{2,}$/i


const saveMember = async()=>{

    if(!name_doc.value || !file.value)return alert('กรุณาเลือกไฟล์เอกสาร')
    const maxSize = 10*1024*1024
    if(file.value.size > maxSize){
        return alert('ไฟล์มีขนาดใหญ่เกิน 10 MB')
    }
    const formData = new FormData
    formData.append('name_doc',name_doc.value)
    formData.append('file',file.value!)
    try {
        
        await axios.post(`${staff}/doc/save`,formData,{headers:{Authorization:`Bearer ${token}`}})
        await fetch()
        name_doc.value = ''
        file.value = null
        alert('ทำรายการสำเร็จ')

    } catch (error) {
        console.error("Erorr doc",error)
    }

}

const view = (filename:string)=>{
    const url = new URL(`/uploads/document/${filename}`,api).href
    window.open(url,'_blank')
}

const fetch = async()=>{

    try {
        
        const res = await axios.get(`${staff}/doc/show`,{headers:{Authorization:`Bearer ${token}`}})
        dataResult.value = res.data

    } catch (error) {
        console.error("Error fetch eva",error)
    }

}

const result = computed(()=>{
    if(!search.value)return dataResult.value
    const s = search.value.toLowerCase()
    return dataResult.value.filter((item:any)=>{
        return(
            item.name_doc?.toLowerCase().includes(s) 
        )
    })
})

const del = async(id_doc:number)=>{

    if(!confirm('ต้องการลบข้อมูลชุดนี้ใช่หรือไม่'))return
    try {
        
        await axios.delete(`${staff}/doc/delete/${id_doc}`,{headers:{Authorization:`Bearer ${token}`}})
        await fetch()

    } catch (error) {
        console.error("Erorr del doc",error)
    }

}

onMounted(fetch) 

</script>

<style scoped>

</style>