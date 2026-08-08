<template>
    <v-container>
        <v-sheet elevation="5" class="ma-3 pa-4">
            <h2 class="text-center text-h5">DashBoard-Staff</h2>
            <v-row>
                <v-col cols="12" md="4" v-for="b in box" :key="b">
                    <v-card class="pa-4">
                        <h3 class="text-center">{{ b.title }}</h3>
                        <h3 class="text-center">{{ b.value }}</h3>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4" v-for="b in box2" :key="b">
                    <v-card class="pa-4">
                        <h3 class="text-center">{{ b.title }}</h3>
                        <h3 class="text-center">{{ b.value }}</h3>
                    </v-card>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { api, staff } from '~/API/base';

const token = import.meta.client ? localStorage.getItem('token'):null
const box = ref([])
const box2 = ref([])

const fetch = async() => {

    try {
        
        const res = await axios.get(`${api}/dash/staff`,{headers:{Authorization:`Bearer ${token}`}})
        box.value = res.data.box
        box2.value = res.data.box2

    } catch (error) {
        console.error("Erorr get Box",error)
    }

}

onMounted(fetch)

</script>

<style scoped>

</style>