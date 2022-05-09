<template>
  <div>
    <el-container>
      <el-header>
        <h3>
          <img src="/img/1.jpg" alt="" />
          后台管理
          <el-button type="info"> 退出 </el-button>
        </h3>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 侧边栏 -->
          <el-menu
          :collapse-transition="true"
          :default-active="$router.name"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            :unique-opened="true"
          >
            <el-submenu :index="item.id.toString()" v-for="item in lis" :key="item.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :ind="item1.id.toString()" :index="item1.path" v-for="(item1,index1) in item.children" :key="index1">{{item1.authName}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
          <!-- 侧边栏 -->
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {getCenianlanApi} from '@/utis/api.js'
export default {
  data() {
    return {
        lis:[],
    };
  },
  mounted() {
      this.getCebianlan()
  },
  methods: {
      async getCebianlan(){
          const res=await getCenianlanApi()
          console.log(res);
          this.lis=res
      }
  },
};
</script>

<style scoped lang="scss">
.el-header {
  background-color:  rgb(84, 92, 100);
  color: #333;
  position: relative;
  h3 {
    width: 100%;
    height: 100%;
    padding-left: 100px;
    img {
      width: 60px;
      height: 60px;
      position: absolute;
      top: 0;
      left: 50px;
    }
    .el-button {
      position: absolute;
      right: 40px;
      bottom: 10px;
    }
  }
}
.el-menu-item{
  border: 0;
}
.el-aside {
  background-color:  rgb(84, 92, 100);
  color: #333;
  line-height: 200px;
  width: 100%;
  height: 100vh;
}

.el-main {
  width: 100%;
  height: 100vh;
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
