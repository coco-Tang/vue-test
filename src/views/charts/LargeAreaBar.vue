<template>
  <div class="large-area-bar">
    <el-table
      :data="tableData"
      @row-dblclick="EchartsHandler"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    <div id="linearea"  style="width: 800px;height: 600px;"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import axios from "axios";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          id: 1
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          id: 2
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          id: 3
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          id: 4
        }
      ],
      chartData:[]
    };
  },
  methods: {
    // initChart(data) {
    //   // let _this = this;
    //   let mycharts = echarts.init(document.getElementById("linearea"));
    //   let option = {
    //     xAxis: {
    //       //x轴默认就是类目轴，此处为了方便理解，一并写出来了
    //       type: "category", //设置为类目轴，该轴适用于离散的类目数据，使用该轴必须用data属性来设置类目数据
    //       data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    //     },
    //     yAxis: {
    //       //这里为空，但是不可以省略，因为折线（面积）图默认使用的是二维的直角坐标系（也称为笛卡尔坐标系）
    //       //所以需要x轴跟y轴，而y轴为空是因为此处没有对y轴做任何设置，采用默认配置
    //     },
    //     series: [
    //       {
    //         type: "line", //设置图表类型为折线（面积）图
    //         name: "标准折线图", //系列名称，用于tooltip的显示或者legend的图例筛选
    //         data: data //数据
    //       },
    //     ],
    //     title: {
    //       text: "折线（面积）图 -- 这是个主标题",
    //       subtext: "这是个副标题",
    //       left: "center" //控制标题的位置，水平居中
    //     },
    //     legend: {
    //       data: ["折线图", "面积图"],
    //       top: "bottom"
    //     },
    //     tooltip: {
    //       trigger: "axis", //设置提示框的触发类型为坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
    //       axisPointer: {
    //         type: "shadow" //设置坐标轴指示器的类型是阴影指示器，坐标轴指示器是指示坐标轴当前刻度的工具。
    //       }
    //     }
    //   };
    //   mycharts.setOption(option);
    // },
    initChart(data) {
      var base = +new Date(2017, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var date = [];

      // var data = [Math.random() * 300];

      for (var i = 1; i < 20000; i++) {
          var now = new Date(base += oneDay);
          date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
          // data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
      }

      let mycharts = echarts.init(document.getElementById("linearea"));
      let  option = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: '大数据量面积图',
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: date
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%']
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 10
            }, {
                start: 0,
                end: 10,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }],
            series: [
                {
                    name:'模拟数据',
                    type:'line',
                    smooth:true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            color: 'rgb(255, 70, 131)'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgb(255, 158, 68)'
                            }, {
                                offset: 1,
                                color: 'rgb(255, 70, 131)'
                            }])
                        }
                    },
                    data: data
                }
            ]
        };
      mycharts.setOption(option);
    },
    EchartsHandler(row) {
      // console.log(row.id);
      let data = this.getChartData(row.id);
      console.log(data);
      this.initChart(data);
    },
    getChartData(id) {
      let data = [];
      switch (id) {
        case 3:
          data=[1, 5, 10, 6,245,29090,87984375084,98749483753,7843,1226734094,4219989304,872,36728890,90902];
          break;
        case 1:
          data=[9, 10, 87, 289,245,29090,87984375084,98749483753,7843,1226734094,4219989304,872,36728890,90902];
          break;
        case 2:
          data=[90, 38, 178, 78,245,29090,87984375084,98749483753,7843,1226734094,4219989304,872,36728890,90902];
          break;
        default:
          data = [3, 2, 4, 2, 5, 1, 3,245,29090,87984375084,98749483753,7843,1226734094,4219989304,872,36728890,90902];
      }
      return data
    }
  },
  created() {
    // axios({});
  },
  mounted() {
    if (!this.chartData) {
      this.initChart(this.chartData);
    }
  }
};
</script>
