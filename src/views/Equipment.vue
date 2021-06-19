<template>
  <div class="equipment">
    <div style="padding: 10px">
      <el-button type="primary" size="small" @click="refersheq">刷新</el-button>
    </div>

    <el-card
      class="box-card"
      shadow="hover"
      v-for="item in eqstatedata"
      :key="item.id"
    >
      <div class="clearfix">
        <div class="ideq">设备名称</div>
        <div class="data">
          <el-tag @click="changname(item)">{{ item.nameEq }}</el-tag>
        </div>
      </div>
      <div class="clearfix">
        <div class="ideq">设备编号</div>
        <div class="data">
          <el-tag>{{ item.idEq }}</el-tag>
        </div>
      </div>

      <div>
        <el-tooltip
          :disabled="item.state === 'true'"
          effect="dark"
          content="设备或已损坏，请现场查看"
          placement="top"
        >
          <el-switch
            active-text="开"
            inactive-text="关"
            active-color="#13ce66"
            inactive-color="#ff4949"
            v-model="item.runState"
            :disabled="item.state === 'false'"
            @change="
              (value) => {
                tempeter(value, item);
              }
            "
          ></el-switch
        ></el-tooltip>
      </div>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      value: false,
      state: false,
      logdata: {
        idEq: "",
        kindOp: "",
        loginName: "",
        operation: "",
      },
      eqstatedata: [
        // {
        //   id: 1,
        //   idEq: "1102",
        //   nameEq: "体重秤",
        //   state: "true",
        //   chageDate: "2021-05-15T00:15:50",
        //   runState: "true",
        // },
        // {
        //   id: 2,
        //   idEq: "1103",
        //   nameEq: null,
        //   state: "true",
        //   chageDate: null,
        //   runState: "true",
        // },
        // {
        //   id: 3,
        //   idEq: "1104",
        //   nameEq: null,
        //   state: "true",
        //   chageDate: null,
        //   runState: "false",
        // },
        // {
        //   id: 4,
        //   idEq: "1105",
        //   nameEq: null,
        //   state: "false",
        //   chageDate: null,
        //   runState: "true",
        // },
      ],
    };
  },
  mounted() {
    this.refersheq();
  },
  methods: {
    refersheq() {
      axios
        .get(this.$store.state.preurl + "/data/state-equpment/getall")
        .then((resp) => {
          if (resp) {
            this.eqstatedata = resp;
            this.eqstatedata.forEach((item) => {
              if (item.runState === "true") {
                item.runState = true;
              } else {
                item.runState = false;
              }
            });
          }
        });
    },
    changname(item) {
      this.$prompt("修改" + item.idEq + "设备名称", "设备管理", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputVale: item.nameEq,
      }).then(({ value }) => {
        let item1 = { ...item };
        item1.nameEq = value;

        axios
          .post(
            this.$store.state.preurl + "/data/state-equpment/updatename",
            item1
          )
          .then((resp) => {
            if (resp) {
              this.refersheq();
            }
          });
      });
    },
    tempeter(value, item) {
      console.log(value, item);
      if (
        this.$store.state.user.userType === "管理员" ||
        this.$store.state.user.userType === "系统管理员"
      ) {
        this.logdata.idEq = item.idEq;
        this.logdata.loginName = this.$store.state.user.loginName;
        this.logdata.operation = "用户";
        if (value) {
          this.logdata.kindOp = "开启";
        } else {
          this.logdata.kindOp = "关闭";
        }
        item.runState = value;
        axios
          .post(this.$store.state.preurl + "/data/state-equpment/update", item)
          .then((resp) => {
            if (resp) {
              this.refersheq();
            }
          });
        axios.put(
          this.$store.state.preurl + "/data/log-equpment/chagestate",
          this.logdata
        );
      } else {
        this.$message({
          type: "warning",
          message: "您不是管理员，如有需要请联系管理员",
        });
        this.refersheq();
      }
    },
  },
};
</script>
<style>
.equipment .box-card {
  margin: 10px;
  padding: 0;
  float: left;
  width: 170px;
}
.equipment .clearfix {
  height: 30px;
  margin: 14px 0;
}
.ideq {
  height: 14px;
  font-size: 14px;
  margin: 8px 0;
  display: inline-flex;
}
.data {
  margin-left: 15px;
  display: inline-flex;
}
.el-switch {
  margin: 10px 20px;
}
</style>
