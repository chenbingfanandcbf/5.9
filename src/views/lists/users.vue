<template>
  <div>
    <mb :name="name" :name1="name1"></mb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-row>
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="form.query"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="ss"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="16">
          <el-button type="primary" @click="dialogFormVisible = true">
            添加用户
          </el-button>
        </el-col>
      </el-row>
      <el-table :data="user" border style="width: 100%">
        <el-table-column type="index" label="#" width="60"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="zt(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
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
              @click="sc(scope.row.id)"
            ></el-button>
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-s-tools"
              @click="qx(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 卡片 -->
    <!-- 添加用户模态框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="list" :rules="rules" ref="list">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="list.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="list.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="list.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="list.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="yesgo">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加用户模态框 -->
    <!-- 编辑用户模态框 -->
    <el-dialog title="编辑用户" :visible.sync="Visibles">
      <el-form :model="list1" :rules="rules" ref="list">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="list1.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="list1.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="list1.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Visibles = false">取 消</el-button>
        <el-button type="primary" @click="bjok">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户模态框 -->
    <!-- 分配权限模态框 -->
    <el-dialog title="分配角色" :visible.sync="dialogForm">
  <el-form :model="form1">
    <el-form-item label="当前用户名">
     <p>{{form1.username}}</p>
    </el-form-item>
    <el-form-item label="当前的角色">
      <p>{{form1.role_name}}</p>
    </el-form-item>
    <el-form-item label="分析角色">
      <el-select v-model="form2" placeholder="请选择活动区域">
        <el-option :label="item.roleName" :value="item.id" v-for="item in infolis" :key="item.id"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogForm = false">取 消</el-button>
    <el-button type="primary" @click="yesadd">确 定</el-button>
  </div>
</el-dialog>
    <!-- 分配权限模态框 -->
  </div>
</template>

<script>
import mb from "@/components/mbx.vue";
import _ from 'lodash'
import { getListApi, getxgApi, getuserslist, getbjApi, getdelApi, getfpqxApi, getqxApi} from "@/utis/api";
export default {
  components: { mb },
  data() {
    return {
      dialogFormVisible: false, //控制添加模态显示隐藏
      Visibles:false,//控制编辑模态框的显示隐藏
      dialogForm:false,//分配权限模态框
      name: "用户列表",
      name1: "用户管理",
      form2:{},
      form: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      form1:{
        username:"",
        role_name:"",
        id:0
      },
      user: [], //总数居
      total: 0, //总条数
      list: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      list1: {
        username: "",
        password: "",
        email: "",
        mobile: "",
        id:"",
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        mobile: [{ required: true, message: "请输入电话", trigger: "blur" }],
      },
      info:{},
      infolis:[],
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    // 页面的调用
    async getUser() {
      const res = await getListApi(this.form);
      this.user = res.users;
      this.total = res.total;
    },
    //添加用户
    yesgo() {
      this.$refs.list.validate(async (valid) => {
        if (!valid) return false;
        const res = await getuserslist(this.list);
        this.getUser();
      });
      this.dialogFormVisible=false,
      this.list.username=""
      this.list.password=""
      this.list.mobile=""
      this.list.email=""
    },
    // 搜索
    ss() {
      this.getUser()
    },
    // 编辑
    bj(row){
      this.Visibles=true
      this.list1={
        username:row.username,
        email:row.email,
        mobile:row.mobile,
        id:row.id
      }
    },
    // 确定编辑
    bjok(){
       this.$refs.list.validate(async (valid) => {
        if (!valid) return false;
        const res = await getbjApi(this.list1.id,this.list1);
        this.getUser();
        this.Visibles=false
      });
    },
    // 删除
    async sc(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
            const res=await getdelApi(id)
            this.getUser()
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 分配权限
    async qx(row){
      this.info=row
      this.dialogForm=true
      this.form1={
        username:row.username,
        role_name:row.role_name,
        id:row.id
      }
      const res=await getfpqxApi()
      this.infolis=res
    },
    // 分配权限
    async yesadd(){
      if(this.form2==""){
        return alert("请选择")
      }
        const res=await getqxApi(this.form2,this.info.id)
        console.log(res)
        this.getUser()
    },
    // 修改状态
    async zt(row){
      console.log(row);
      const res=await getxgApi(row.id,row.mg_state)
      console.log(res);
    }
  },
};
</script>

<style scoped></style>
<style>
.el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 52px;
  line-height: 52px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.el-table {
  margin-top: 20px;
}
</style>
