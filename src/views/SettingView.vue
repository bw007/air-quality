<template>
  <section>
    <h1 style="margin-bottom: 20px">{{ $route.meta.text }}</h1>
    <div>
      <el-text style="margin-right: 10px;">Mavzu:</el-text>
      <el-switch 
        v-model="isDark" 
        :active-action-icon="Moon" 
        :inactive-action-icon="Sunny" 
        style="--el-switch-on-color: #73767a; --el-switch-off-color: #eebe77"
        @change="useToggle(isDark)"
      />
    </div>
    <div style="margin-top: 50px;">
      <el-text tag="b" type="danger" size="large">Diqqat!</el-text>
      <br>
      <el-text>
        Ushbu sahifalardagi ma'lumotlar 
        <el-link type="primary" target="_blank" href="https://waqi.info/">https://waqi.info/</el-link>
        saytidan olinmoqda. Ma'lumotlar tog'riligiga kafolat berilmaydi.
      </el-text>
    </div>
  </section>
</template>

<script setup>
import { useDark, useToggle } from "@vueuse/core";
import { Sunny, Moon } from '@element-plus/icons-vue'

const isDark = useDark()

</script>