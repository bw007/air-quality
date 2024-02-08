<template>
  <el-row :gutter="1">
    <el-col :span="6">
      <sidebar-part />
    </el-col>
    <el-col :span="18">
      <router-view />
    </el-col>
  </el-row>
</template>

<script setup>
import sidebarPart from '@/components/sidebar-part.vue' 
</script>

<style lang="">
  
</style>