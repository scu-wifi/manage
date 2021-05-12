<template>
  <div>
    <el-table
      :data="tableData"
      height="600"
      max-height="800"
      show-summary
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="data" label="日期" width="180"> </el-table-column>
      <el-table-column prop="weight" label="重量" width="180"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="delateRow(scope.$index, tableData)"
            type="text"
            size="small"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          data: "haha",
          weight: "32",
        },
        {
          data: "haha",
          weight: "32",
        },
        {
          data: "haha",
          weight: "32",
        },
      ],
    };
  },
  methods: {
    delateRow(index, rows) {
      rows.splice(index, 1);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
<style></style>
