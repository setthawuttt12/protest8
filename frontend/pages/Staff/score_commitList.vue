<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card class="pa-2">
                    <v-card-title>
                        <h2 class="text-center">ผลสรุปการประเมินของกรรมการประเมิน</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-table>
                                <thead>
                                    <tr>
                                        <th class="border text-center">ลำดับ</th>
                                        <th class="border text-center">ผู้รับการประเมินผล</th>
                                        <th class="border text-center">รอบการประเมิน</th>
                                        <th class="border text-center">วันที่ออกแบบประเมิน</th>
                                        <th class="border text-center">คะแนน</th>
                                        <th class="border text-center">รายละเอียด</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(items,index) in result" :key="items.id_eva">
                                        <td class="border text-center">{{ index+1 }}</td>
                                        <td class="border text-center">{{ items.first_name }} {{ items.last_name }}</td>
                                        <td class="border text-center">รอบการประเมินที่: {{ items.round_sys }} ปี: {{ items.year_sys }}</td>
                                        <td class="border text-center">{{ items.day_eva }}</td>
                                        <td class="border text-center">
                                            {{ items.total_commit === null ? '-' : items.total_commit }} คะแนน
                                        </td>
                                        <td class="border text-center">
                                            <center>
                                                <v-btn size="small" color="info" class="text-center text-white ma-2" @click="go(items.id_eva)">รายละเอียด</v-btn>
                                            </center>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center text-red" colspan="10" v-if="result.length === 0">ไม่พบข้อมูล</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-form>
                    </v-card-text>
                    
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
const result = ref([])

const token = import.meta.client ? localStorage.getItem('token'):null

const fetch = async()=>{

    try {
        
        const res = await axios.get(`${staff}/eva/show`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data

    } catch (error) {
        console.error("Error fetch eva",error)
    }

}


const go = (id_eva:number)=>{

    navigateTo({path:`/Staff/score_commit-${id_eva}`})

}

onMounted(fetch)
</script>

<style scoped>

</style>