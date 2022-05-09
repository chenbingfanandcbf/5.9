<template>
  <div>
    <mbx :name="name" :name1="name1"></mbx>
    <el-card>
      <el-alert title="添加商品信息" type="info" center> </el-alert>
      <el-steps :active="active * 1" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-tabs
        tabPosition="left"
        :before-leave="sss"
        v-model="active"
        @tab-click="handeClick"
      >
        <el-tab-pane label="基本信息">
          <el-form :model="add" :rules="rules">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="add.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="add.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="add.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="add.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="add.goods_cat"
                :options="alllist"
                :props="{
                  expandTrigger: 'hover',
                  label: 'cat_name',
                  value: 'cat_id',
                  children: 'children',
                }"
              ></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <el-checkbox-group
            v-for="item in dtmay"
            :key="item.cat_id"
            v-model="checkList"
          >
            <el-checkbox :label="item.attr_name"></el-checkbox>
            <el-checkbox
              v-for="item1 in item.attr_vals"
              :key="item1.attr_id"
              :label="item1"
            ></el-checkbox>
          </el-checkbox-group>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <el-form>
            <el-form-item
              :label="item.attr_name"
              v-for="item in jtonly"
              :key="item.attr_id"
            >
              <el-input :value="item.attr_vals"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <el-upload
            class="upload-demo"
            action="http://127.0.0.1:8888tmp_uploads/"
            list-type="picture"
            :headers="headers"
            :on-preview="handlePreview"
            :on-success="success"
            :on-remove="handleRemove"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容">
          <quill-editor
            ref="myTextEditor"
            v-model="content"
            :options="editorOption"
            style="height: 400px"
          ></quill-editor>
          <div class="box" style="width:70px">
          <el-button type="primary" @click="addsp">添加商品</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import mbx from "@/components/mbx.vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import _ from "lodash"
import { quillEditor } from "vue-quill-editor";
import { getsjldApi, getsssdApi, getimgdApi, getaddApi } from "@/utis/api";
export default {
  components: { mbx, quillEditor },
  data() {
    return {
      name: "商品管理",
      name1: "添加商品",
      checkList: true,
      active: "0", //步骤条
      dialogVisible: false,
      content: "",
      editorOption: { placeholder: "编辑文章内容" },
      tmp_path: "",
      add: {
        goods_name: "",
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce:"",
        pics:"",
        attrs:""
      },
      rules: {
        goods_name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
        goods_price: [
          { required: true, message: "请输入价格", trigger: "blur" },
        ],
        goods_number: [
          { required: true, message: "请输入数量", trigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "请输入重量", trigger: "blur" },
        ],
      },
      alllist: [],
      dtmay: [],
      jtonly: [],
      checkList: [],
      headers:{
        "Authorization":sessionStorage.getItem("token")
      }
    };
  },
  mounted() {
    this.getsj();
  },
  methods: {
    sss(noactive, olvalue) {
      if (this.add.goods_cat.length < 2) {
        this.$message({
          message: "请选择",
          type: "error",
        });
        return false;
      }
    },
    async getsj() {
      const res = await getsjldApi({ type: 3 });
      this.alllist = res;
    },
    async handeClick() {
      if (this.active == "1") {
        const res = await getsssdApi(this.current, "many");
        res.forEach((item) => {
          item.attr_vals =
            item.attr_vals.length > 0 ? item.attr_vals.split(",") : [];
        });
        this.dtmay = res;
      } else if (this.active == "2") {
        const res = await getsssdApi(this.current, "only");
        this.jtonly = res;
      }
    },
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    async addsp(){
      this.add.goods_cat=this.add.goods_cat.join(',')
      let dtParams=_.cloneDeep(this.dtmay)
      dtParams=dtParams.map(item=>{
        return {attr_id:item.attr_id,"attr_value":item.attr_vals.join(",")}
      })
      let jtParams=_.cloneDeep(this.jtonly)
      jtParams=jtParams.map(item=>{
        return {attr_id:item.attr_id,"attr_value":item.attr_vals}
      })
      let mergeParams=[...dtParams,...jtParams]
      this.add.attrs=mergeParams
      // this.add=_.cloneDeep(this.add)
      const res=await getaddApi(this.add)
      console.log("add",res)
      this.$router.push("/goods")
    },
    handleRemove(file){
      const temp_path=file.response.tmp_path
      const index=this.add.pics.findIndex(item=>{
        return item.pic===temp_path
      })
      this.add.pics.splice(index,1)
    },
    handlePreview(file){
      console.log(file)
    },
    success(res){
      let picObj={pic:res.data.temp_path}
      this.add.pics.push(picObj)
    }
  },
  computed: {
    current() {
      console.log(this.add.goods_cat[this.add.goods_cat.length - 1]);
      return this.add.goods_cat[this.add.goods_cat.length - 1];
    },
  },
};
</script>

<style scoped>
.el-card {
  margin-top: 10px;
  /* height: 100vh; */
}
.el-alert {
  margin: 10px 0 10px 0;
}
.el-button{
  position: absolute;
  bottom: 0;
  left: 0;
}
/* .el-steps{
    
} */
</style>
