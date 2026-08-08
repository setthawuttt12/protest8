<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title>
                        <h2 class="text-center">เอกสารและคู่มือการประเมิน</h2>
                    </v-card-title>
                    <v-card-text>
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






const view = (filename:string)=>{
    const url = new URL(`/uploads/document/${filename}`,api).href
    window.open(url,'_blank')
}

const fetch = async()=>{
 const token = localStorage.getItem('token')
    try {
        
        const res = await axios.get(`${api}/docnoe`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data

    } catch (error) {
        console.error("Error fetch eva",error)
    }

}

const result = ref({})



onMounted(fetch) 

</script>

<style scoped>

</style>