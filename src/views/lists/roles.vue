<template>
  <div>
    <mbx name="权限管理" name1="角色列表"></mbx>
    <el-card>
      <el-button type="primary" @click="add">添加角色</el-button>
      <el-table border :data="All">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div v-if="scope.row.children.length < 0">暂无数据</div>
            <div v-if="scope.row.children.length > 0">
              <el-row v-for="item1 in scope.row.children" :key="item1.id">
                <el-col :span="6">
                  <el-tag
                    type="primary"
                    closable
                    @click="del(scope.row, scope.row.id, item1.id)"
                  >
                    {{ item1.authName }}
                  </el-tag>
                </el-col>
                <el-col :span="18">
                  <el-row v-for="item2 in item1.children" :key="item2.id">
                    <el-col :span="8">
                      <el-tag type="success" closable>{{
                        item2.authName
                      }}</el-tag>
                    </el-col>
                    <el-col :span="16">
                      <el-row v-for="item3 in item2.children" :key="item3.id">
                        <el-col :span="8">
                          <el-tag type="warning" closable>
                            {{ item3.authName }}
                          </el-tag>
                        </el-col>
                        <el-col :span="16"></el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="bj(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="del(scope.row)"
            ></el-button>
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-s-tools"
              @click="fpqx(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加某台狂 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
      <el-form :model="a" ref="a" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="a.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="a.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addok">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加某台狂 -->
    <!-- 编辑某台狂 -->
    <el-dialog title="编辑角色" :visible.sync="dialogVisible">
      <el-form :model="b" ref="b" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="b.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="b.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="bjok">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑某台狂 -->
    <!-- 分配权限某台狂 -->
    <el-dialog title="分配权限" :visible.sync="diasible">
      <el-tree
        ref="qqq"
        :data="list"
        show-checkbox
        node-key="id"
        :default-checked-keys="checkall"
        :props="defaultProps"
        default-expand-all
        :highlight-current="true"
      >
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="diasible = false">取 消</el-button>
        <el-button type="primary" @click="fpok">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配权限某台狂 -->
  </div>
</template>

<script>
import mbx from "@/components/mbx.vue";
import {
  getallApi,
  getlisApi,
  getjkApi,
  getdelelApi,
  getqxsxApi,
  getsdfApi,
  getqxsxsApi,
} from "@/utis/api.js";
export default {
  components: { mbx },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "authName",
      },
      All: [],
      diasible: false,
      dialogFormVisible: false,
      dialogVisible: false,
      checkall: [],
      info: "",
      list: [],
      chiid: 0,
      a: {
        roleName: "",
        roleDesc: "",
      },
      b: {
        roleName: "",
        roleDesc: "",
        roleId: 0,
      },
      rules: {
        roleName: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur",
          },
        ],
        roleDesc: [
          {
            required: true,
            message: "请输入角色描述",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getliatApi();
  },
  methods: {
    async getliatApi() {
      const res = await getallApi();
      console.log(res);
      this.All = res;
    },
    add() {
      this.dialogFormVisible = true;
    },
    addok() {
      this.$refs.a.validate(async (valid) => {
        if (!valid) return false;
        const res = await getlisApi(this.a);
        this.getliatApi();
      });
      this.dialogFormVisible = false;
      this.a.roleDesc = "";
      this.a.roleName = "";
    },
    bj(row) {
      this.b = {
        roleDesc: row.roleDesc,
        roleName: row.roleName,
        roleId: row.id,
      };
      this.dialogVisible = true;
    },
    async bjok() {
      const res = await getjkApi(this.b.roleId, this.b);
      this.getliatApi();
      this.dialogVisible = false;
    },
    async del(row) {
      const res = await getdelelApi(row.id);
      this.getliatApi();
    },
    async fpqx(row) {
  
      const res = await getqxsxsApi("tree");
      this.getfpqx(row, this.checkall);
      this.list = res;
      this.chiid = row.id;
      this.diasible = true;
    },
    getfpqx(row, checkall) {
      if (!row.children) {
        return checkall.push(row.id);
      }
      row.children.forEach((item) => {
        this.getfpqx(item, checkall);
      });
    },
    async fpok() {
      const aa = this.$refs.qqq.getHalfCheckedKeys();
      const bb = this.$refs.qqq.getCheckedKeys();
      const cc = [...aa, ...bb];
      const dd = cc.join(",");
      const res = await getsdfApi(dd, this.chiid);
      this.getliatApi()
      this.diasible = false;
    },
    async del(row, roleId, rightId) {
      const res = await getdelsApi(roleId, rightId);
      console.log("111", res);
      this.getliatApi();
    },
  },
};
</script>

<style scoped>
.el-card {
  margin: 10px;
}
.el-button {
  margin: 10px;
}
</style>
