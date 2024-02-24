<template>
  <section>
    <h1 style="margin-bottom: 20px">{{ $route.meta.text }}</h1>
    <el-text style="margin-right: 10px;">Mavzu:</el-text>
    <el-switch 
      v-model="isDark" 
      :active-action-icon="Moon" 
      :inactive-action-icon="Sunny" 
      style="--el-switch-on-color: #73767a; --el-switch-off-color: #eebe77"
      @change="useToggle(isDark)" />
  </section>
</template>

<script setup>
import { useDark, useToggle } from "@vueuse/core";
import { Sunny, Moon } from '@element-plus/icons-vue'

const isDark = useDark()

</script>