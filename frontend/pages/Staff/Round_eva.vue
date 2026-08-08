<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card class="pa-2">
                    <v-card-title>
                        <h2 class="text-center">จัดการรอบการประเมิน</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="saveMember">
                            <br>
                            <v-row>
                                <v-col md="6" cols="12">
                                    <v-text-field label="วันที่เปิดการประเมิน" v-model="form.day_open" :error-messages="error.day_open" type="date"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="วันที่ปิดการประเมิน" v-model="form.day_out" :error-messages="error.day_out" type="date"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="รอบการประเมิน" v-model="form.round_sys" :error-messages="error.round_sys" type="number"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="ปีการประเมิน" v-model="form.year_sys" :error-messages="error.year_sys" type="number"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select label="สถานะรอบการประเมิน" v-model="form.status_sys" :error-messages="error.status_sys" :items="[{title:'เปิด',value:'y'},{title:'ปิด',value:'n'}]"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <center>
                                        <v-btn class="text-center ma-3" type="submit" color="primary">{{ form.id_sys ? 'อัปเดต':'บันทึก' }}</v-btn>
                                        <v-btn class="text-center ma-3" @click="reset()" color="error">ยกเลิก</v-btn>
                                    </center>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <br>
                    <v-table>
                        <thead>
                            <tr>
                                <th class="border text-center">ลำดับ</th>
                                <th class="border text-center">วันที่เปิดการประเมิน</th>
                                <th class="border text-center">วันที่ปิดการประเมิน</th>
                                <th class="border text-center">รอบการประเมิน</th>
                                <th class="border text-center">ปีการประเมิน</th>
                                <th class="border text-center">สถานะรอบการประเมิน</th>
                                <th class="border text-center">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_sys">
                                <td class="border text-center">{{ index+1 }}</td>
                                <td class="border text-center">{{ items.day_open }}</td>
                                <td class="border text-center">{{ items.day_out }}</td>
                                <td class="border text-center">{{ items.round_sys }}</td>
                                <td class="border text-center">{{ items.year_sys }}</td>
                                <td class="border text-center">{{ items.status_sys === 'y' ? 'เปิด' :'ปิด' }}</td>
                                <td class="border text-center">
                                    <center>
                                        <v-btn size="small" color="warning" class="text-center text-white ma-2" @click="edit(items)">แก้ไข</v-btn>
                                        <v-btn size="small" color="error" class="text-center text-white ma-2" @click="del(items.id_sys)">ลบ</v-btn>
                                    </center>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-center text-red" colspan="10" v-if="result.length === 0">ไม่พบข้อมูล</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { api, staff } from '~/API/base';


const typeR = ['ผู้รับการประเมินผล']
const error = ref<Record<string,string>>({})
const show = ref(false)
const showPw = ref(false)

const token = import.meta.client ? localStorage.getItem('token'):null
const search = ref('')
const result = ref([])

const form = ref(
    {
        id_sys:null,
        day_open:'',
        day_out:'',
        round_sys:'',
        year_sys:'',
        status_sys:''
    }
)

const reset = ()=>{
    form.value = {
        id_sys:null,
        day_open:'',
        day_out:'',
        round_sys:'',
        year_sys:'',
        status_sys:''
    }
}

const emailRegex = /^[^\s]+@[^\s]+\.[^\s]{2,}$/i

function validateForm(){

    const f = form.value
    error.value = {}

    if(!f.day_open)error.value.day_open = 'กรุณากรอกวันที่เปิดการประเมิน'
    if(!f.day_out)error.value.day_out = 'กรุณากรอกวันที่ปิดการประเมิน'
    if(!f.round_sys)error.value.round_sys = 'กรุณากรอกรอบการประเมิน'
    if(!f.year_sys)error.value.year_sys = 'กรุณากรอกปีการประเมิน'
    else if(f.year_sys.length < 4)error.value.year_sys = 'กรุณากรอกปีการประเมินให้ถูกต้อง'
    else if(f.year_sys.length > 4)error.value.year_sys = 'กรุณากรอกปีการประเมินให้ถูกต้อง'
    if(!f.status_sys)error.value.status_sys = 'กรุณาเลือกสถานะรอบการประเมิน'

    return Object.keys(error.value).length === 0

}

const saveMember = async()=>{

    if(!validateForm())return
    const f =form.value
    try {
        
        f.id_sys
        ? await axios.put(`${staff}/round/update/${f.id_sys}`,form.value,{headers:{Authorization:`Bearer ${token}`}})
        : await axios.post(`${staff}/round/save`,form.value,{headers:{Authorization:`Bearer ${token}`}})

        await reset()
        await fetch()
        alert('ทำรายการสำเร็จ')


    } catch (error) {
        console.error("Erorr add system",error)
    }

}

const edit = (items:any)=>{
    form.value = {...items}
}

const del = async(id_sys:number)=>{

    if(!confirm('ต้องการลบข้อมูลชุดนี้ใช่หรือไม่'))return
    try {
        
        await axios.delete(`${staff}/round/delete/${id_sys}`,{headers:{Authorization:`Bearer ${token}`}})
        await reset()
        await fetch()

    } catch (error) {
        console.error("Erorr del system",error)
    }

}

const fetch = async()=>{

    try {
        
        const res = await axios.get(`${staff}/round/show`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data

    } catch (error) {
        console.error("Error fetch round",error)
    }

}


onMounted(fetch)
</script>

<style scoped>

</style>