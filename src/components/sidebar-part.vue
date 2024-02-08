<template>
  <el-menu
    :default-active="$route.name"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @select="handleSelect"
    active-text-color="#67C23A"
  >

    <el-button style="border: none; padding: 22.5px; opacity: 0.75;" size="large" border="0" @click="isCollapse = !isCollapse">
      <el-icon :size="18">
        <expand v-if="isCollapse" />
        <close-bold v-else />
      </el-icon>
    </el-button>
    <el-menu-item v-for="item in menu" :index="item.name" :key="item.name" :route="{name: item.name}">
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
import router from '@/router';

const isCollapse = ref(true)

const handleSelect = (index) => {
  router.push({ name: index })
}

</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
</style>
