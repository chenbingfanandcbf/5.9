<template>
  <div>
    <mbx name="订单管理" name1="订单列表"></mbx>
    <el-card>
      <el-input
        class="input"
        placeholder="请输入内容"
        v-model="a.query"
        @clear="ss"
      >
        <el-button slot="append" icon="el-icon-search" @click="ss"></el-button>
      </el-input>
      <el-table :data="list" border>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="订单号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款" prop="pay_status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.pay_status == 0" type="danger"
              >未付款</el-tag
            >
            <el-tag v-if="scope.row.pay_status == 1" type="success"
              >已付款</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            {{ scope.row.update_time | ran }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              circle
              icon="el-icon-edit"
              size="mini"
              @click="zk"
            ></el-button>
            <el-button
              type="info"
              circle
              icon="el-icon-location-outline"
              size="mini"
              @click="wl(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="a.pagenum"
        :page-sizes="[5, 10, 20, 30, 40]"
        :page-size="a.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <el-dialog title="修改地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item class="it" label="省市区/县">
          <el-cascader
            :options="sj"
            :props="desrwqwd"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 物流信息 -->

    <el-dialog title="查看物流进度" :visible.sync="FormVisible">
    <el-timeline>
    <el-timeline-item
      v-for="(item, index) in all"
      :key="index"
      :icon="item.icon"
      :color="item.color"
      >
      <h3>{{item.context}}</h3>
      {{item.ftime}}
    </el-timeline-item>
  </el-timeline>
      <div slot="footer" class="dialog-footer">
        <el-button @click="FormVisible = false">取 消</el-button>
        <el-button type="primary" @click="FormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 物流信息 -->
  </div>
</template>

<script>
import mbx from "@/components/mbx.vue";
import sj from "@/dz/cj.js";
import wlxx from "@/dz/wlxx.json";
console.log(wlxx);
import { getordersApi } from "@/utis/api.js";
export default {
  components: { mbx },
  data() {
    return {
      sj: sj,
      FormVisible: false,
      desrwqwd: {
        expandTrigger: "hover",
        label: "label",
        children: "children",
        value: "value",
      },
      dialogFormVisible: false,
      a: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      form: {},
      list: [],
      total: 0,
      all: wlxx.data,
    };
  },
  mounted() {
    this.getalllist();
  },
  methods: {
    async getalllist() {
      const res = await getordersApi(this.a);
      console.log(res);
      this.list = res.goods;
      this.total = res.total;
    },
    zk() {
      this.dialogFormVisible = true;
    },
    handleCurrentChange(val) {
      this.a.pagenum = val;
      this.getalllist();
    },
    handleSizeChange(val) {
      this.a.pagesize = val;
      this.getalllist();
    },
    handleChange() {
      console.log("handleChange");
    },
    wl() {
      this.FormVisible = true;
    },
    ss() {
      this.getalllist();
    },
  },
};
</script>
<style>
.input {
  height: 52px;
  line-height: 52px;
  width: 30% !important;
  margin: 10px;
}
.el-input {
  width: 90%;
  height: 52px;
  line-height: 52px;
}
.el-input__inner {
  height: 52px;
  line-height: 52px;
}
.it {
  text-align-last: left;
  margin-left: 50px;
}
.el-step__main {
  margin: 10px;
}
</style>
<style scoped></style>
