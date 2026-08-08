<template>
 <v-container>
    <v-row>
        <v-col cols="12">
            <h1 class="text-h5 font-weight-bold">ตรวจสอบการประเมินผล</h1>
            <v-card class="pa-2 mt-3">
                <nuxt-link to="/Evaluatee/Score_member"><v-btn color="blue">ตรวจสอบผลการประเมินตนเอง</v-btn></nuxt-link>
                <nuxt-link to="/Evaluatee/Score_commit"><v-btn color="green">ตรวจสอบผลการประเมินกรรมการ</v-btn></nuxt-link>
            </v-card>
        </v-col>
    </v-row>
 </v-container>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>