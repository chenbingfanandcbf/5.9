<template>
  <div>
    <mbx :name="name" :name1="name1"></mbx>
    <el-card class="box-card">
      <el-row>
        <el-col :span="8"
          ><el-input
            placeholder="请输入内容"
            v-model="al.query"
            class="input-with-select"
            @clear="ss"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="ss"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="16">
          <el-button type="primary" @click="add">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table :data="lis" border style="width: 100%">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称"> </el-table-column>
        <el-table-column prop="goods_price" label="商品价格"> </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.upd_time | rank }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="bj(scope.row)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="dels(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.al.pagenum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="this.al.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 表格 -->
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="用户编辑" :visible.sync="dialogFormVisible">
      <el-form :model="all">
        <el-form-item label="商品名称">
          <el-input v-model="all.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="bjok"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 对话框 -->
  </div>
</template>

<script>
import mbx from "@/components/mbx.vue";
import { getspApi, getdelsApi, getdelssApi, getbjsApi } from "@/utis/api";
export default {
  components: { mbx },
  data() {
    return {
      name: "商品管理",
      name1: "商品列表",
      dialogFormVisible:false,
      al: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      all: {
        id: 0,
        cat_name: "",
      },
      lis: [],
      total: 0,
    };
  },
  mounted() {
    this.getalllis();
  },
  methods: {
    async getalllis() {
      const res = await getspApi(this.al);
      console.log(res);
      this.lis = res.goods;
      this.total = res.total;
    },
    // 添加
    add() {
      this.$router.push("/add");
    },
    async dels(row) {
      const res = await getdelssApi(row.goods_id);
      console.log(res);
      this.getalllis();
    },
    ss() {
      console.log(this.al.query);
      this.getalllis();
    },
    handleSizeChange(val) {
      this.al.pagesize = val;
      this.getalllis();
    },
    handleCurrentChange(val) {
      this.al.pagenum = val;
      this.getalllis();
    },
    bj(row) {
      console.log(row);
      this.dialogFormVisible=true
      this.all={
        id:row.goods_id,
        cat_name:row.goods_name,
      }
    },
    async bjok(){
      const res=await getbjsApi(this.all.id,this.all)
      console.log(res);
      this.getalllis()
    }
  },
};
</script>
<style>
.el-input__inner {
  width: 100%;
  height: 52px;
  line-height: 52px;
}
.el-table {
  margin-top: 10px;
}
</style>
<style scoped></style>
