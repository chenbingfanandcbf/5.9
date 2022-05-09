<template>
  <div>
    <mbx :name="name" :name1="name1"></mbx>
    <el-card>
      <el-button type="primary" @click="zkyes">添加分类</el-button>
      <el-table
        :data="list"
        border
        row-key="cat_id"
      >
        <el-table-column type="index" label="#">
            <template slot-scope="scope">
                {{scope.row.index}}
            </template>
        </el-table-column>
        <el-table-column prop="cat_name" label="分类名称"> </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效">
          <template slot-scope="scope">
            <span
              class="el-icon-circle-close"
              v-if="scope.row.cat_deleted == !false"
            ></span>
            <span class="el-icon-circle-check" v-else></span>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="排序">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.cat_level == 0">一级</el-tag>
            <el-tag type="success" v-if="scope.row.cat_level == 1">二级</el-tag>
            <el-tag type="warning" v-if="scope.row.cat_level == 2">三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="bj(scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="del(scope.row.cat_id)"
              >删除</el-button
            >
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
        <el-button type="primary" @click="bjok">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 对话框 -->
    <!-- 对话框 -->
    <el-dialog title="添加分类" :visible.sync="dialog">
      <el-form :model="all">
        <el-form-item label="商品名称" prop="cat_name">
          <el-input v-model="all.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            :options="lis"
            :props="{
              expandTrigger: 'hover',
              value: 'cat_id',
              label: 'cat_name',
              children: 'children',
            }"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="yesok">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 对话框 -->
    <!-- 对话框 -->
    <!-- <el-dialog title="用户编辑" :visible.sync="dialogFormVisible">
      <el-form :model="all">
        <el-form-item label="商品名称">
          <el-input v-model="all.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="tjok">确 定</el-button>
      </div>
    </el-dialog>
    对话框 -->
  </div>
</template>

<script>
import mbx from "@/components/mbx";
import { getflsApi, getbjsApi, getapApi, getaipApi, getgelscApi} from "@/utis/api";
import index from "@/store";
export default {
  components: { mbx },
  data() {
    return {
      name: "用户管理",
      name1: "用户列表",
      dialog: false,
      dialogFormVisible: false,
      al: {
        pagesize: 10,
        pagenum: 1,
      },
      cheList: [],
      list: [],
      lis: [],
      total: 0,
      all: {
        cat_id: 0,
        cat_name: "",
        cat_level:0
      },
    };
  },
  mounted() {
    this.getalllis();
  },
  methods: {
      async del(id){
          const res=await getgelscApi(id)
          this.getalllis()
      },
    async getalllis() {
      const res = await getflsApi(this.al);
      console.log(res);
      let { result, total } = res;
      result.forEach((item, index) => {
        return (item.index = index + 1);
      });
      this.list = result;
      this.total = total;
    },
    handleSizeChange(val) {
      console.log(val);
      this.al.pagesize = val;
      this.getalllis();
    },
    handleCurrentChange(val) {
      this.al.pagenum = val;
      this.getalllis();
    },
    bj(row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.all = {
        id: row.cat_id,
        cat_name: row.cat_name,
      };
    },
    async bjok() {
      const res = await getbjsApi(this.all.id, this.all);
      console.log(res);
      this.getalllis();
      this.dialogFormVisible = false;
    },
    async zkyes() {
      this.dialog = true;
      const res = await getapApi(this.al);
        console.log("商品分类列表", res);
        this.lis = res.result;
    },
    async tjok() {
      const res=await getapApi({
          cat_id:this.all.cat_id,
          cat_name:this.all.cat_name,
          cat_level:this.all.cat_level
      })
    },
    async yesok() {
          const res=await getaipApi(this.all)
      console.log(res);
      this.getalllis()
      this.dialog=false
    },
  },
};
</script>

<style scoped>
.el-card {
  margin-top: 10px;
}
.el-button {
  margin: 10px;
}
.el-icon-circle-check {
  color: #fff;
  background-color: green;
  border-radius: 50%;
}
.el-icon-circle-close {
  color: #fff;
  background: red;
  border-radius: 50%;
}
</style>
