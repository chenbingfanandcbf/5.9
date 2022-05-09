<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ name }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ name1 }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: ["name", "name1"],
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped></style>
