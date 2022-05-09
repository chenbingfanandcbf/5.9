<template>
  <div class="home">
    <div class="box">
      <el-form ref="from" :rules="rule" :model="from">
        <el-form-item prop="username">
          <el-input
            placeholder="请输入内容"
            v-model="from.username"
            class="input-with-select"
            prefix-icon="el-icon-user-solid"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="from.password"
            class="input-with-select"
            prefix-icon="el-icon-lock"
          >
          </el-input>
        </el-form-item>
        <el-button type="primary" @click="dl">登录</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import {getUsersApi} from '@/utis/api.js'
export default {
  data() {
    return {
      from: {
        uaername: "admin",
        password: "123456",
      },
      rule: {
        name: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
        kwy: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  mounted() {},
  methods: {
    dl() {
      this.$refs.from.validate(async(valid) => {
        if (!valid) return false;
        const res=await getUsersApi(this.from)
        console.log(res)
        localStorage.setItem("token",res)
        this.$router.push("/about")
      });
    },
     resetForm(from) {
        this.$refs.from.resetFields();
      }
  },
};
</script>
<style>
.home {
  width: 100%;
  height: 100vh;
  background: #2b4b6b;
}
.box {
  width: 600px;
  height: 300px;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
}
.el-form {
  width: 100%;
  height: 100%;
  margin-top: 90px;
}
.el-form-item {
  width: 80%;
  height: 60px;
  text-align: center;
  margin-left: 50px;
}
.el-form-item__error {
  margin-left: 50px;
}
.el-input {
  width: 80%;
  height: 50px;
  line-height: 50px;
}
</style>
