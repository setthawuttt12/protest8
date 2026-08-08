<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card class="pa-2">
                    <v-card-title>
                        <h2 class="text-center">จัดการผู้รับการประเมินผล</h2>
                    </v-card-title>
                    <v-table class="mt-3">
                        <thead>
                            <tr>
                                <th class="border text-center">ลำดับ</th>
                                <th class="border text-center">รายชื่อผู้รับการประเมินผล</th>

                                <th class="border text-center">รายละเอียด</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="border text-center">1</td>
                                <td class="border text-center">รายชื่อผู้รับการประเมินผล</td>
                                <td class="border text-center">
                                    <center>
                                        <nuxt-link to="/Staff/Re_eva"><v-btn size="small" color="info" class="text-center text-white ma-2">รายละเอียด</v-btn></nuxt-link>
                                    </center>
                                </td>
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


const fetch = async()=>{

    try {
        
        const res = await axios.get(`${staff}/member/showE`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data

    } catch (error) {
        console.error("Error fetch Member Eva",error)
    }

}



onMounted(fetch)
</script>

<style scoped>

</style>