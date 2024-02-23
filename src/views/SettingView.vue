<template>
  <section>
    <h1 style="margin-bottom: 20px">{{ $route.meta.text }}</h1>
    <el-text style="margin-right: 10px;">Mavzu:</el-text>
    <el-switch
      v-model="value1"
      :active-action-icon="Moon"
      :inactive-action-icon="Sunny"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Sunny, Moon } from '@element-plus/icons-vue'
const value1 = ref(false)

</script>

<style lang="">
  
</style>