<template>
  <div>
    <mbx name="商品管理" name1="分类参数"></mbx>
    <el-card>
      <el-alert
        title="注意：只允许为第三级分类设置相关参数"
        :closable="false"
        type="warning"
      >
      </el-alert>
      <el-form>
        <el-form-item label="选择商品分类">
          <el-cascader
            v-model="cheall"
            :options="lia"
            :props="{
              expandTrigger: 'hover',
              label: 'cat_name',
              children: 'children',
              value: 'cat_id',
            }"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" :disabled="isok" @click="tj"
            >添加参数</el-button
          >
          <el-table border :data="getParamsmany">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  :key="index"
                  v-for="(item, index) in scope.row.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(scope.row, index)"
                >
                  {{ item }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  class="el-icon-edit"
                  @click="bjs(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  class="el-icon-delete"
                  @click="del(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="only">
          <el-button type="primary" :disabled="isok" @click="tj"
            >添加参数</el-button
          >
          <el-table border :data="getParamsonly">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  v-for="(item, index) in scope.row.attr_vals"
                  :key="index"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(scope.row, index)"
                >
                  {{ item }}
                </el-tag>

                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInputt"
                  size="small"
                  @keyup.enter.native="handleInputConfirm1(scope.row)"
                  @blur="handleInputConfirm1(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput1(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  class="el-icon-edit"
                  @click="bjs(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  class="el-icon-delete"
                  @click="del(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加对话框 -->
    <el-dialog title="添加静态属性" :visible.sync="dialogFormVisible">
      <el-form :model="all" :rules="rules" ref="form">
        <el-form-item label="静态属性" prop="attr_name">
          <el-input class="inp" v-model="all.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="yesok">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加对话框 -->
    <!-- 编辑对话框 -->
    <el-dialog title="编辑静态属性" :visible.sync="FormVisible">
      <el-form :model="a" :rules="rules" ref="form">
        <el-form-item label="静态属性" prop="attr_name">
          <el-input class="inp" v-model="a.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="FormVisible = false">取 消</el-button>
        <el-button type="primary" @click="ysok">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑对话框 -->
  </div>
</template>

<script>
import mbx from "@/components/mbx";
import {
  getsjldApi,
  getflsApi,
  getsssdApi,
  getinputApi,
  getdelinputApi,
  getaddcsApi,
  getgelscApi,
} from "@/utis/api.js";
export default {
  components: { mbx },
  data() {
    return {
      activeName: "many",
      inputVisible: false,
      inputValue: "",
      dialogFormVisible: false,
      FormVisible: false,
      al: {
        pagenum: 1,
        pagesize: 10,
      },
      all: {
        attr_name: "",
      },
      a: {
        attr_name: "",
        attr_id: "",
      },
      rules: {
        attr_name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
      lia: [],
      cheall: [],
      getParamsmany: [],
      getParamsonly: [],
    };
  },
  mounted() {
    this.getalllis();
  },
  methods: {
    async getalllis() {
      const res = await getsjldApi(this.al);
      console.log(res);
      this.lia = res.result;
    },
    handleChange() {
      this.getGoode();
    },
    handleClick() {
      console.log(this.activeName);
      this.getGoode();
    },
    async getGoode() {
      if (this.cheall.length < 3) {
        this.$message({
          showClose: true,
          message: "请选择三级分类",
        });
        return false;
      }
      const res = await getsssdApi(this.currid, this.activeName);
      if (this.activeName === "many") {
        res.forEach((item) => {
          item.inputVisible = false;
          item.inputValue = "";
          item.attr_vals =
            item.attr_vals.length > 0
              ? item.attr_vals.split(",") //转为数字组
              : [];
        });
        console.log("res:::", res);
        this.getParamsmany = res;
      } else if (this.activeName === "only") {
        res.forEach((item) => {
          item.inputVisible = false;
          item.inputValue = "";
          item.attr_vals =
            item.attr_vals.length > 0
              ? item.attr_vals.split(",") //转为数字组
              : [];
        });
        this.getParamsonly = res;
      }
    },
    async handleInputConfirm(row) {
      let inputValue = row.inputValue;
      if (row.inputValue.trim().length > 0) {
        row.attr_vals.push(row.inputValue);
        const res = await getinputApi(row.cat_id, row.attr_id, {
          attr_name: row.attr_name,
          attr_sel: this.activeName, //动态静态
          attr_vals: row.attr_vals.join(","), //转为字符串
        });
      }
      row.inputVisible = false;
      row.inputValue = "";
    },
    async handleInputConfirm1(row) {
      console.log(this.activeName);
      let inputValue = row.inputValue;
      if (row.inputValue.trim().length > 0) {
        row.attr_vals.push(row.inputValue);
        const res = await getinputApi(row.cat_id, row.attr_id, {
          attr_name: row.attr_name,
          attr_sel: this.activeName, //动态静态
          attr_vals: row.attr_vals.join(","), //转为字符串
        });
      }
      row.inputVisible = false;
      row.inputValue = "";
    },
    showInput(row) {
      row.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    showInput1(row) {
      row.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInputt.$refs.input.focus();
      });
    },
    async handleClose(row, index) {
      row.attr_vals.splice(index, 1);
      const res = await getinputApi(row.cat_id, row.attr_id, {
        attr_name: row.attr_name,
        attr_sel: this.activeName, //动态静态
        attr_vals: row.attr_vals.join(","), //转为字符串
      });
      this.getGoode();
    },
    tj() {
      this.dialogFormVisible = true;
      this.all.attr_name = "";
    },
    async yesok() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) {
          return false;
        }
        const res = await getaddcsApi(this.currid, {
          attr_name: this.all.attr_name,
          attr_sel: this.activeName,
        });
        this.getGoode();
        this.dialogFormVisible = false;
      });
    },
    bjs(row) {
      this.FormVisible = true;
      this.a = {
        attr_id: row.attr_id,
        attr_name: row.attr_name,
        attr_vals:row.attr_vals
      };

    },
    async ysok() {
      const res = await getinputApi(this.currid, this.a.attr_id, {
        attr_name: this.a.attr_name,
        attr_sel: this.activeName,
        attr_vals:this.a.attr_vals.join(',')
      });
      this.getGoode();
      this.FormVisible = false;
    },
    async del(row) {
      const res = await getdelinputApi(this.currid, row.attr_id);
      this.getGoode();
    },
  },
  computed: {
    isok() {
      return this.cheall.length !== 3;
    },
    currid() {
      return this.cheall[this.cheall.length - 1];
    },
  },
};
</script>
<style>
.el-card {
  margin: 10px 0;
}
.el-alert {
  margin: 10px;
}
.input-new-tag{
  width: 100px;
}
.el-form {
  width: 100%;
  height: 100%;
  margin-top: 30px;
}
.el-form-item {
  width: 80%;
  height: 60px;
  text-align-last: left;
  margin-left: 10px;
}
.el-tag {
  margin: 5px 10px;
}
.el-input {
  width: 100px;
}
.inp {
  width: 80%;
}
</style>

<style scoped></style>
