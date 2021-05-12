<template>
  <div class="feed">
    <div class="add">
      <!-- <el-dialog title="添加饲料信息" :visible.sync="visable"> -->
      <el-popover
        v-model="visable"
        title="添加饲料信息"
        placement="bottom-start"
        @show="clear"
      >
        <el-form :model="inputdata">
          <el-form-item>
            <el-input
              type="text"
              v-model="inputdata.standard"
              placeholder="标准"
            ></el-input
          ></el-form-item>
          <el-form-item>
            <el-input
              type="text"
              v-model="inputdata.kind"
              placeholder="规格"
              @keydown.enter.native="add"
            ></el-input
          ></el-form-item>
        </el-form>
        <el-button class="topbutton" @click="add">确定</el-button>
        <el-button @click="quence">取消</el-button>
        <el-button slot="reference">添加</el-button>
      </el-popover>
      <el-popconfirm
        confirm-button-text="确定"
        cancel-button-text="取消"
        title="确定全部删除吗？"
        @confirm="delateall()"
      >
        <el-button
          class="topbutton"
          slot="reference"
          :disabled="this.multipleSelection.length == 0"
          >批量删除</el-button
        >
      </el-popconfirm>
    </div>
    <div class="table">
      <el-table
        :data="feedtabel"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          align="center"
          prop="date"
          label="日期"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="standard"
          label="分栏重量"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="kind"
          label="饲料类别"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-dialog
              :visible.sync="table_visible"
              title="修改饲料信息"
              @open="chage(scope.$index, feedtabel)"
            >
              <el-form :model="inputdata">
                <el-form-item>
                  <el-input
                    type="text"
                    v-model="inputdata.standard"
                    placeholder="标准"
                  ></el-input
                ></el-form-item>
                <el-form-item>
                  <el-input
                    type="text"
                    v-model="inputdata.kind"
                    placeholder="规格"
                    @keydown.enter.native="change_confirm"
                  ></el-input
                ></el-form-item>
              </el-form>
              <el-button @click="change_confirm(scope.$index, feedtabel)"
                >确定</el-button
              >
              <el-button @click="table_visible = !table_visible"
                >取消</el-button
              ></el-dialog
            >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="table_visible = true"
            />
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              title="确定删除吗？"
              @confirm="delate(scope.$index, feedtabel)"
            >
              <el-button
                class="feed_button_main"
                type="danger"
                icon="el-icon-delete"
                circle
                size="mini"
                slot="reference"
              ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      multipleSelection: [],
      table_visible: false,
      visable: false,
      feedtabel: [
        {
          id: "",
          date: "2021/4/26",
          standard: "15kg",
          kind: "高乐高",
        },
      ],
      inputdata: {
        id: "",
        date: "",
        standard: "",
        kind: "",
      },
    };
  },
  mounted() {
    //页面加载操作
  },
  methods: {
    add() {
      if (this.inputdata.kind && this.inputdata.standard) {
        const curront = new Date();
        this.inputdata.date = curront.toLocaleString;
        this.feedtabel.push({ ...this.inputdata });
        this.visable = false;
      } else {
        this.$message({
          type: "warning",
          message: "请输入数据",
        });
      }
    },
    quence() {
      this.visable = false;
    },

    clear() {
      this.inputdata.date = "";
      this.inputdata.standard = "";
      this.inputdata.kind = "";
    },
    delateall() {
      console.log(this.multipleSelection);
      this.multipleSelection.array.forEach((element) => {
        element.splice();
      });
    },
    delate(index, rows) {
      rows.splice(index, 1);
    },
    chage(index, rows) {
      this.inputdata = { ...rows[index] };
    },
    change_confirm(index, rows) {
      console.log(index, rows);
      // this.feedtabel[this.index] = { ...this.inputdata };
      // console.log(this.feedtabel);
      console.log("chage");
      this.table_visible = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
<style>
.feed {
  padding: 10px;
}
.el-table {
  text-align: center;
}
.feed_button_main {
  margin: 5px;
}
.topbutton {
  margin: 2px 10px;
}
</style>
