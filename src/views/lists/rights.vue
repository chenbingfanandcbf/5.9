<template>
  <div>
    <el-table :data="lis" border style="width: 100%">
      <el-table-column label="#" type="index"> </el-table-column>
      <el-table-column prop="authName" label="权限名称"> </el-table-column>
      <el-table-column prop="path" label="路径"> </el-table-column>
      <el-table-column label="权限等级">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.level==0">一级</el-tag>
          <el-tag type="success" v-if="scope.row.level==1">二级</el-tag>
          <el-tag type="warning"  v-if="scope.row.level==2">三级</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getqxsxApi } from "@/utis/api";
export default {
  data() {
    return {
      lis: [],
    };
  },
  mounted() {
    this.getallApi();
  },
  methods: {
    async getallApi() {
      const res = await getqxsxApi();
      console.log("222", res);
      this.lis = res;
    },
  },
};
</script>

<style scoped></style>
