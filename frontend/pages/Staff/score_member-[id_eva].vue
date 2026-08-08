<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-form v-if="user.status_eva === 2 || user.status_eva ===3">
                    <v-card class="pa-2 mb-2">
                        <v-card-title class="text-center text-h5"><h2>ผู้รับการประเมินผล</h2></v-card-title>
                        <v-card-text>
                            <p>ชื่อ-สกุล: {{ user.first_name }} {{ user.last_name }}</p>
                            <p>รอบการประเมินที่: {{ user.round_sys }} ปี:{{ user.year_sys }}</p>
                        </v-card-text>
                    </v-card>
                    <br>
                    <v-card>
                        <v-card-title><h2 class="text-center">ผลสรุปการประเมินของผู้รับการประเมินผล</h2></v-card-title>
                        <v-card-text>
                            <v-row v-for="(t,index) in topics" :key="t.id_topic">
                                <v-col cols="12" md="12">
                                    <h3>{{ index+1 }}.{{ t.name_topic }}</h3>
                                    <v-table>
                                        <thead>
                                            <tr>
                                                <th class="border text-center">ตัวชี้วัด</th>
                                                <th class="border text-center">รายละเอียดตัวชี้วัด</th>
                                                <th class="border text-center">น้ำหนักคะแนน</th>
                                                <th class="border text-center">คะแนนเต็ม</th>
                                                <th class="border text-center">รายละเอียดการประเมิน</th>
                                                <th class="border text-center">ไฟล์เอกสาร</th>
                                                <th class="border text-center">คะแนนที่ได้</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for=" items in topics.indicate" :key="items.id_indicate">
                                                <td class="border text-center">{{ items.name_indicate }}</td>
                                                <td class="border text-center">{{ items.detail_indicate }}</td>
                                                <td class="border text-center">{{ items.point_indicate }}</td>
                                                <td class="border text-center">{{ items.point_indicate*4 }}</td>
                                                <td class="border text-center">
                                                    {{ items.detail_eva || '-' }}
                                                </td>
                                                <td class="border text-center">
                                                    <center>
                                                        <v-btn size="small" color="warning" prepend-icon="mdi-eye" class="text-center text-white ma-2" @click="view(items.file_eva)">เปิดดู</v-btn>
                                                    </center>
                                                </td>
                                                <td class="border text-center">{{ items.score_member*items.point_indicate }}</td>
                                            </tr>
                                        </tbody>
                                    </v-table>
                                </v-col>
                            </v-row>
                            
                        </v-card-text>
                    </v-card>
                    <div>
                        <v-card color="success" class="mt-3">
                            <p class="text-white text-end">คะแนนสุทธิ: {{ user.total_eva }} คะแนน</p>
                        </v-card>
                    </div>
                </v-form>
                <v-alert v-else-if="user.status_eva === 1" color="warning">รอการประเมิน</v-alert>
                <v-alert v-else color="error">ไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { api, staff } from '~/API/base';


const typeR = ['ผู้รับการประเมินผล']
const user = ref<any>({})
const topics = ref<any>([])

const id_eva = useRoute().params.id_eva
const token = import.meta.client ? localStorage.getItem('token'):null

const fetchUser = async()=>{

    try {
        
        const res = await axios.get(`${staff}/score_member/user/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        user.value = res.data

    } catch (error) {
        console.error("Error fetch user",error)
    }

}

const fetchTopic = async()=>{

    try {
        
        const res = await axios.get(`${staff}/score_member/topics/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        topics.value = res.data

    } catch (error) {
        console.error("Error fetch topics",error)
    }

}

const view = (filename:string)=>{

    const url = `http://localhost:3001/uploads/evadetail/${filename}`
    window.open(url,'_blank')

}


const go = (id_eva:number)=>{

    navigateTo({path:`/Staff/score_member-${id_eva}`})

}

onMounted(async()=>{
    await Promise.all([fetchUser(),fetchTopic()])
})
</script>

<style scoped>

</style>