<template>
  <el-container>
    <el-aside width="auto">
      <sidebar-part />
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup>
import sidebarPart from "@/components/sidebar-part.vue";
</script>