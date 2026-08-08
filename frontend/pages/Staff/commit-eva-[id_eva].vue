<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card class="pa-2 mb-2">
                    <v-card-title class="text-center text-h5"><h2>ผู้รับการประเมินผล</h2></v-card-title>
                    <v-card-text>
                        <p>ชื่อ-สกุล: {{ header.first_name }} {{ header.last_name }}</p>
                        <p>รอบการประเมินที่: {{ header.round_sys }} ปี:{{ header.year_sys }}</p>
                    </v-card-text>
                </v-card>
                <v-card class="pa-2">
                    <v-card-title>
                        <h2 class="text-center">เพิ่มกรรมการ</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="saveMember">
                            <br>
                            <v-row v-for="(c,index) in List" :key="index">
                                <v-col md="6" cols="12">
                                    <v-select :label="`กรรมการประเมินคนที่ ${index+1}`" v-model="c.id_member" :items="MEMBER(index).map((t)=>({title:`${t.fullname_commit}`,value:t.id_member}))"></v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select :label="`ตำแหน่งกรรมการคนที่ ${index+1}`" v-model="c.role" :items="ROLE(index)"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <center>
                                        <v-btn class="text-center ma-3" type="submit" color="primary">บันทึก</v-btn>
                                        <v-btn class="text-center ma-3" type="reset" color="error">ยกเลิก</v-btn>
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
                                <th class="border text-center">กรรมการประเมิน</th>
                                <th class="border text-center">ตำแหน่ง</th>
                                <th class="border text-center">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in List" :key="items.id_commit">
                                <td class="border text-center">{{ index+1 }}</td>
                                <td class="border text-center">{{ nameOf(items.id_member) }}</td>
                                <td class="border text-center">{{ items.role }}</td>
                                <td class="border text-center">
                                    <center>
                                        <v-btn size="small" color="error" class="text-center text-white ma-2" @click="del(items.id_commit)">ลบ</v-btn>
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


const role = ['ประธาน','กรรมการ','เลขา']
const error = ref<Record<string,string>>({})
const show = ref(false)
const showPw = ref(false)

const token = import.meta.client ? localStorage.getItem('token'):null
const id_eva = useRoute().params.id_eva
const search = ref('')
const List = ref([
    {id_commit:null,id_member:'',role:''},
    {id_commit:null,id_member:'',role:''},
    {id_commit:null,id_member:'',role:''}
])
const people = ref([])
const header = ref([])



const saveMember = async()=>{

    try {
        await axios.post(`${staff}/commit/save/${id_eva}`,List.value,{headers:{Authorization:`Bearer ${token}`}})
        await fetch()
        alert('ทำรายการสำเร็จ')


    } catch (error) {
        console.error("Erorr add commit",error)
    }

}

const del = async(id_commit:number)=>{

    if(!confirm('ต้องการลบข้อมูลชุดนี้ใช่หรือไม่'))return
    try {
        
        await axios.delete(`${staff}/commit/delete/${id_commit}`,{headers:{Authorization:`Bearer ${token}`}})
        await fetch()

    } catch (error) {
        console.error("Erorr del commit",error)
    }

}

const fetch = async()=>{

    try {
        
        const res = await axios.get(`${staff}/commit/header/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        header.value = res.data
        const res2 = await axios.get(`${staff}/commit/member/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        people.value = res2.data.pick
        const useData = res2.data.picked
        if(useData.length === 0){
            List.value = [
                {id_commit:null,id_member:'',role:''},
                {id_commit:null,id_member:'',role:''},
                {id_commit:null,id_member:'',role:''}

            ]
        }else{

            List.value = useData.map((c)=>(
                {id_commit:c.id_commit,id_member:c.id_member,role:c.role}
            ))

            while(List.value.length < 3){
                List.value.push({id_commit:null,id_member:'',role:''})
            }
        }

    } catch (error) {
        console.error("Error fetch commit",error)
    }

}

const nameMap = computed(()=> Object.fromEntries(people.value.map((p)=>[p.id_member,p.fullname_commit])))
const nameOf = (id:number)=> nameMap.value[id]

const MEMBER = (idx:number)=>{

    const picked = List.value.map((c,i)=>(i !== idx ? c.id_member : null))
    return people.value.filter((p)=> !picked.includes(p.id_member))

}

const ROLE = (idx:number)=>{

    const picked = List.value.map((c,i)=>(i !== idx ? c.role : null))
    return role.filter((p)=> !picked.includes(p))

}

const go = (id_eva:number)=>{

    navigateTo({path:`/Staff/commit-eva-${id_eva}`})

}

onMounted(fetch)
</script>

<style scoped>

</style>