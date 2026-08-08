<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card class="pa-2">
                    <v-card-title>
                        <h2 class="text-center">รายงานผู้รับการประเมินผล</h2>
                    </v-card-title>
                   
                    <v-table>
                        <thead>
                            <tr>
                                <th class="border text-center">ลำดับ</th>
                                <th class="border text-center">ชื่อ-สกุล</th>
                                <th class="border text-center">อีเมล</th>
                                <th class="border text-center">ชื่อผู้ใช้งาน</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_member">
                                <td class="border text-center">{{ index+1 }}</td>
                                <td class="border text-center">{{ items.first_name }} {{ items.last_name }}</td>
                                <td class="border text-center">{{ items.email }}</td>
                                <td class="border text-center">{{ items.username }}</td>
                            </tr>
                            <tr>
                                <td class="text-center text-red" colspan="10" v-if="result.length === 0">ไม่พบข้อมูล</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
            </v-col>
            <br>
            <center><v-btn @click="print()" prepend-icon="mdi-printer" class="text-center no-p" color="warning">พิมพ์</v-btn></center>
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


const fetch = async()=>{

    try {
        
        const res = await axios.get(`${staff}/member/showE`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data

    } catch (error) {
        console.error("Error fetch Member Eva",error)
    }

}

const print =()=>{
    window.print()
}

onMounted(fetch)
</script>

<style scoped>
@media print{
    .v-app-bar,.v-btn,.no-p{
        display: none !important;
        margin: 0 !important;
        margin-top: 0 !important;
        padding: 0 !important;
        width: 100 !important;
    }
    td,th{
        border: 1px solid black !important;
        color: black !important;
    }
    h1,h2,h3,h4,h5,h6{
        color: black !important;
    }
}
</style>