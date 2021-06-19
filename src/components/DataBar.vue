<template>
  <div>
    <el-date-picker v-model="dateselect" is-range type="date"> </el-date-picker>
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
      timebetween: {
        begin: null,
        end: null,
      },
    };
  },
  mounted() {
    this.echartsinit();

    this.today();
    this.getData();
    this.upChartbar();
    this.upChartline();
    // this.getData();
    window.addEventListener("resize", this.screenAdapter);
  },
  methods: {
    setdate() {
      let year = this.dateOftable.getFullYear();
      let mouth = this.dateOftable.getMonth() + 1;
      let day = this.dateOftable.getDate();
      this.timebetween.end = year + "-" + mouth + "-" + day + " 00:00:00";
      this.timebetween.begin =
        year + "-" + mouth + "-" + (day - 1) + " 00:00:00";
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
      console.log(this.timebetween.begin, this.timebetween.end);
    },
    echartsinit() {
      this.datebar = this.$echarts.init(document.getElementById("chartbar"));
      this.dataline = this.$echarts.init(document.getElementById("chartline"));
    },
    getData() {
      axios
        .put(
          this.$store.state.preurl + "/data/weight/getweightbydate",
          this.timebetween
        )
        .then((resp) => {
          this.dataInOneDay = resp;
          console.log(resp);
        });
    },
    upChartbar() {
      const sellerNames = ["null", "name"];
      const sellerValues = [50, 100];
      const option = {
        xAxis: {
          type: "category",
        },
        yAxis: {
          type: "value",
          data: sellerNames,
        },
        series: [
          {
            type: "bar",
            data: sellerValues,
          },
        ],
      };
      this.datebar.setOption(option);
    },
    upChartline() {
      console.log("this: ", JSON.stringify(this.dataInOneDay));
      const sellerNames = this.dataInOneDay.map((item) => {
        return item.date;
      });
      const sellerValues = this.dataInOneDay.map((item) => {
        return item.weight;
      });
      console.log(sellerNames);
      const option = {
        xAxis: {
          type: "category",
        },
        yAxis: {
          type: "value",
          data: sellerNames,
        },
        series: [
          {
            type: "line",
            data: sellerValues,
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
  width: 400px;
  height: 400px;
}
</style>
