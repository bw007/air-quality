<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :router="true"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
  >

    <el-menu-item @click="isCollapse = !isCollapse">
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
import router from '@/router';

const isCollapse = ref(true)

const handleOpen = (key, keyPath) => {
  console.log(keyPath);
  console.log("open");
}

const handleClose = (key, keyPath) => {
  console.log(keyPath);
  console.log("close");
}

const handleSelect = (index, indexPath) => {
  console.log(index);
  console.log(indexPath);
  console.log("select");
  router.push(index)
}

</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
</style>
