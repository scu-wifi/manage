<template>
  <div>
    <el-button
      type="primary"
      @click="query"
      style="margin-left: 80px; margin-right: 20px"
      >查看图表</el-button
    >
    <el-date-picker v-model="dateOftable" placeholder="选择日期" type="date">
    </el-date-picker>
    <div class="chart" id="chartbar"></div>
    <div class="chart" id="chartline"></div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      dateOftable: new Date(),
      datebar: null, //柱状图对象
      dataline: null, //折线图对象
      dateselect: null, //选择日期记录
      dataInOneDay: [],
      bardate: [],
      barlength: [],
      linedate: [],
      lineweight: [],
      timebetween: {
        begin: null,
        end: null,
      },
    };
  },
  beforeMount() {},
  mounted() {
    this.echartsinit();
    // this.$watch("lineweight", function () {
    //   this.upChartline();
    // });
    // this.$watch("barlength", function () {
    //   this.upChartbar();
    //   console.log(this.barlength);
    // });
    // window.addEventListener("resize", this.screenAdapter);
    this.today();
    this.getData();
    this.getLength();
  },
  updated() {},
  methods: {
    upechar() {
      this.upChartline();
      this.upChartbar();
    },
    query() {
      if (this.dateOftable) {
        this.setdate();
        this.getData();
        this.getLength();
      } else {
        this.$message.error("请选择日期");
      }
    },
    logthis() {
      console.log(this.barlength);
      this.upChartline();
      this.upChartline();
    },
    setdate() {
      let year = this.dateOftable.getFullYear();
      let mouth = this.dateOftable.getMonth() + 1;
      let day = this.dateOftable.getDate();
      this.timebetween.end = year + "-" + mouth + "-" + (day + 1) + " 00:00:00";
      this.timebetween.begin = year + "-" + mouth + "-" + day + " 00:00:00";
      this.setbardate(year + "-" + mouth + "-" + day);
      console.log(this.timebetween.begin, this.timebetween.end);
    },
    yestday() {
      let time = new Date();
      let year = time.getFullYear();
      let mouth = time.getMonth() + 1;
      let day = time.getDate();
      this.timebetween.end = year + "-" + mouth + "-" + day + " 00:00:00";
      this.timebetween.begin =
        year + "-" + mouth + "-" + (day - 1) + " 00:00:00";
      this.setbardate(year + "-" + mouth + "-" + (day - 1));
      console.log(this.timebetween.begin, this.timebetween.end);
    },
    today() {
      let time = new Date();
      let year = time.getFullYear();
      let mouth = time.getMonth() + 1;
      console.log(mouth);
      let day = time.getDate();
      this.timebetween.end = year + "-" + mouth + "-" + (day + 1) + " 00:00:00";
      this.timebetween.begin = year + "-" + mouth + "-" + day + " 00:00:00";
      this.setbardate(year + "-" + mouth + "-" + day);
      console.log(this.timebetween.begin, this.timebetween.end);
    },
    echartsinit() {
      this.datebar = this.$echarts.init(document.getElementById("chartbar"));
      this.dataline = this.$echarts.init(document.getElementById("chartline"));
    },
    setbardate(date) {
      for (let index = 0; index < 24; index++) {
        let item = { ...this.timebetween };
        item.begin = date + " " + index + ":00:00";
        item.end = date + " " + (index + 1) + ":00:00";
        this.bardate.splice(index, 1, item);
      }
    },
    getData() {
      axios
        .put(
          this.$store.state.preurl + "/data/weight/getweightbydate",
          this.timebetween
        )
        .then((resp) => {
          this.linedate = resp.map((item) => {
            return item.date;
          });
          this.lineweight = resp.map((item) => {
            return item.weight;
          });
          this.dataInOneDay = JSON.parse(JSON.stringify(resp));
          this.upChartline();
        });
    },
    getLength() {
      this.bardate.forEach((element, index) => {
        axios
          .put(
            this.$store.state.preurl + "/data/weight/getlengthbydate",
            element
          )
          .then((resp) => {
            this.barlength.splice(index, 1, resp);
            console.log(index, resp);
            this.upChartbar();
          });
      });
    },
    upChartbar() {
      const sellerNames = this.bardate;
      const namedate = this.bardate[0].begin.substring(0, 10);
      const begin = [
        "00:00:00",
        "01:00:00",
        "02:00:00",
        "03:00:00",
        "04:00:00",
        "05:00:00",
        "06:00:00",
        "07:00:00",
        "08:00:00",
        "09:00:00",
        "10:00:00",
        "11:00:00",
        "12:00:00",
        "13:00:00",
        "14:00:00",
        "15:00:00",
        "16:00:00",
        "17:00:00",
        "18:00:00",
        "19:00:00",
        "20:00:00",
        "21:00:00",
        "22:00:00",
        "23:00:00",
        "24:00:00",
      ];
      const sellerValues = this.barlength;
      const option = {
        dataZoom: [
          {
            xAxisIndex: 0,
            type: "inside", //slider
          },
          {
            xAxisIndex: 1,
            type: "inside", //slider
          },

          // {
          //   yAxisIndex: 0,
          //   type: "inside", //slider
          // },
        ],
        toolbox: {
          feature: {
            dataZoom: {},
            magicType: {
              type: ["bar", "pie"],
            },
          },
        },
        xAxis: [
          {
            type: "category",
            data: sellerNames,
            // boundaryGap: false,
            // axisTick: {
            //   alignWithLabel: true,
            // },
            show: false,
            axisLabel: {
              show: false,
              interval: 0,
              rotate: 70,
            },
          },
          {
            type: "category",
            data: begin,
            position: "bottom",
            axisLabel: {
              show: true,
              interval: 0,
              rotate: 70,
            },
            boundaryGap: false,
            axisPointer: {
              show: false,
            },
          },
        ],
        yAxis: {
          type: "value",
          // scale: true,
        },
        title: {
          text: namedate + "每小时进食分布",
          textStyle: {
            color: "red",
            size: 18,
          },
          top: 20,
          left: 280,
        },
        tooltip: {
          trigger: "item",
          // triggerOn: "click",
          // formatter: function (arg) {
          //   return arg.map((item) => {
          //     return item.begin + " " + item.end;
          //   });
          // },
        },
        series: [
          {
            type: "bar",
            data: sellerValues,
            markPoint: {
              data: [
                {
                  type: "max",
                },
                {
                  // type: "min",
                },
              ],
            },
            markLine: {
              data: [
                {
                  type: "average",
                },
              ],
            },
            label: {
              show: true,
              rotate: 45,
            },
          },
        ],
      };
      this.datebar.setOption(option);
    },
    upChartline() {
      const sellerNames = this.linedate.map((item) => {
        return item.substring(10, 19);
      });
      const namedate = this.linedate[1].substring(0, 10);
      const sellerValues = this.lineweight;
      const option = {
        dataZoom: [
          {
            xAxisIndex: 0,
            type: "inside", //slider
          },
          // {
          //   yAxisIndex: 0,
          //   type: "inside", //slider
          // },
        ],
        toolbox: {
          feature: {
            saveAsImage: {},
            // DataView:{},
            dataZoom: {},
          },
        },
        xAxis: {
          type: "category",
          data: sellerNames,
        },
        yAxis: {
          type: "value",
          scale: true,
        },
        title: {
          text: namedate + "全天进食情况",
          textStyle: {
            color: "red",
            size: 18,
          },
          top: 20,
          left: 280,
        },
        tooltip: {
          trigger: "axis",
          // triggerOn: "click",
        },
        series: [
          {
            type: "line",
            data: sellerValues,
            markPoint: {
              data: [
                {
                  type: "max",
                },
                {
                  type: "min",
                },
              ],
            },
            markLine: {
              data: [
                {
                  type: "average",
                },
              ],
            },
            smooth: false,
            lineStyle: {
              color: "blue",
              type: "solid", //dashed,dotted
            },
          },
        ],
      };
      this.dataline.setOption(option);
    },
    screenAdapter() {},
  },
};
</script>
<style scoped>
.chart {
  width: 1000px;
  height: 400px;
}
</style>
