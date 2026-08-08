<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card class="pa-2">
                    <v-card-title>
                        <h2 class="text-center">จัดการแบบประเมิน</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="saveMember">
                            <br>
                            <v-row>
                                <v-col md="6" cols="12">
                                    <v-select label="ผู้รับการประเมินผล" v-model="form.id_member" :error-messages="error.id_member" :items="eva.map((t)=>({title:`${t.first_name} ${t.last_name}`,value:t.id_member}))"></v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select label="รอบการประเมิน" v-model="form.id_sys" :error-messages="error.id_sys" :items="round.map((t)=>({title:`รอบการประเมินที่:${t.round_sys} ปี:${t.last_name}`,value:t.id_sys}))"></v-select>
                                </v-col>
                                <v-col md="12" cols="12">
                                    <v-text-field label="วันที่ออกแบบประเมิน" v-model="form.day_eva" :error-messages="error.day_eva" type="date"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <center>
                                        <v-btn class="text-center ma-3" type="submit" color="primary">{{ form.id_eva ? 'อัปเดต':'บันทึก' }}</v-btn>
                                        <v-btn class="text-center ma-3" @click="reset()" color="error">ยกเลิก</v-btn>
                                    </center>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <br>
                    <v-text-field v-model="search" prepend-inner-icon="mdi-magnify"></v-text-field>
                    <br>
                    <v-table>
                        <thead>
                            <tr>
                                <th class="border text-center">ลำดับ</th>
                                <th class="border text-center">ผู้รับการประเมินผล</th>
                                <th class="border text-center">รอบการประเมิน</th>
                                <th class="border text-center">วันที่ออกแบบประเมิน</th>
                                <th class="border text-center">เพิ่มกรรมการ</th>
                                <th class="border text-center">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_eva">
                                <td class="border text-center">{{ index+1 }}</td>
                                <td class="border text-center">{{ items.first_name }} {{ items.last_name }}</td>
                                <td class="border text-center">รอบการประเมินที่: {{ items.round_sys }} ปี: {{ items.year_sys }}</td>
                                <td class="border text-center">{{ items.day_eva }}</td>
                                <td class="border text-center">
                                    <v-btn size="small" color="success" class="text-center text-white ma-2" @click="go(items.id_eva)">เพิ่มกรรมการ</v-btn>
                                </td>
                                <td class="border text-center">
                                    <center>
                                        <v-btn size="small" color="warning" class="text-center text-white ma-2" @click="edit(items)">แก้ไข</v-btn>
                                        <v-btn size="small" color="error" class="text-center text-white ma-2" @click="del(items.id_eva)">ลบ</v-btn>
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
const dataResult = ref([])
const eva = ref([])
const round = ref([])

const form = ref(
    {
        id_eva:null,
        id_member:'',
        id_sys:'',
        day_eva:''
    }
)

const reset = ()=>{
    form.value = {
        id_eva:null,
        id_member:'',
        id_sys:'',
        day_eva:''
    }
}

const emailRegex = /^[^\s]+@[^\s]+\.[^\s]{2,}$/i

function validateForm(){

    const f = form.value
    error.value = {}

    if(!f.id_member)error.value.id_member = 'กรุณาเลิอกผู้รับการประเมินผล'
    if(!f.id_sys)error.value.id_sys = 'กรุณาเลิอกรอบการประเมิน'
    if(!f.day_eva)error.value.day_eva = 'กรุณาเลือกวันที่ออกแบบประเมิน'

    return Object.keys(error.value).length === 0

}

const saveMember = async()=>{

    if(!validateForm())return
    const f =form.value
    try {
        
        f.id_eva
        ? await axios.put(`${staff}/eva/update/${f.id_eva}`,form.value,{headers:{Authorization:`Bearer ${token}`}})
        : await axios.post(`${staff}/eva/save`,form.value,{headers:{Authorization:`Bearer ${token}`}})

        await reset()
        await fetch()
        alert('ทำรายการสำเร็จ')


    } catch (error) {
        console.error("Erorr add eva",error)
    }

}

const edit = (items:any)=>{
    form.value = {...items}
}

const del = async(id_eva:number)=>{

    if(!confirm('ต้องการลบข้อมูลชุดนี้ใช่หรือไม่'))return
    try {
        
        await axios.delete(`${staff}/eva/delete/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        await reset()
        await fetch()

    } catch (error) {
        console.error("Erorr del eva",error)
    }

}

const fetch = async()=>{

    try {
        
        const res = await axios.get(`${staff}/eva/show`,{headers:{Authorization:`Bearer ${token}`}})
        dataResult.value = res.data
        const res2 = await axios.get(`${staff}/member/showE`,{headers:{Authorization:`Bearer ${token}`}})
        eva.value = res2.data
        const res3 = await axios.get(`${staff}/round/show`,{headers:{Authorization:`Bearer ${token}`}})
        round.value = res3.data

    } catch (error) {
        console.error("Error fetch eva",error)
    }

}

const result = computed(()=>{
    if(!search.value)return dataResult.value
    const s = search.value.toLowerCase()
    return dataResult.value.filter((item:any)=>{
        return(
            item.first_name?.toLowerCase().includes(s) || 
            item.last_name?.toLowerCase().includes(s) 
        )
    })
})

const go = (id_eva:number)=>{

    navigateTo({path:`/Staff/commit-eva-${id_eva}`})

}

onMounted(fetch)
</script>

<style scoped>

</style>