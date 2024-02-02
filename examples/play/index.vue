<template>
  <div style="margin: 20px;">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="warning">12</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input: 'Hello 123 UI!'
      };
    }
  };
</script>
