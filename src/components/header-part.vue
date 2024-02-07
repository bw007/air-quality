<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >

    <el-menu-item index="2" @click="isCollapse = !isCollapse">
      <el-icon>
        <expand v-if="isCollapse" />
        <close-bold v-else />
      </el-icon>
    </el-menu-item>
    <el-menu-item v-for="item in menu" :index="item.path" :key="item.name">
      <el-icon>
        <component :is="item.icon" />
      </el-icon>
      <template #title>{{ item.title }}</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref } from 'vue'
import { menu } from '@/stores/utils/menu'

const isCollapse = ref(false)
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
</style>
