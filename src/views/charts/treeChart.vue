<template>
  <div class="data-statistics">
      <div class="wrapper">
        <div class="data">
          <h3>数据统计</h3>
          <div id="main"></div>
        </div>
     </div>
  </div>
</template>
<script>
import echarts from "echarts"
export default {
  data(){
      return {
        chart: ""
      }
  },
  methods: {
     initChart() {
      this.chart = echarts.init(document.querySelector('#main'));
      this.chart.setOption({tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [
            {
                type: 'tree',
                data: [{
                        "name": "话单总量\n362221",
                        "value": 362221,
                        "children": [
                          {
                            "name": "有效话单\n342221",
                            "value": 342221,
                            "children": [
                              {
                                "name": "中标话单\n7362",
                                "value": 7362,
                                "children": [
                                  {"name": "推送话单数\n6221", "value": 6221},
                                  {"name": "未推送话单数\n221", "value": 221}
                                ]
                              },
                              {
                                "name": "未中标话单\n362221",
                                "value": 362221
                              }
                            ]
                          },
                          {
                            "name": "无效话单\n2221",
                            "value": 2221
                          }
                        ]
                      }],
                top: '1%',
                left: '7%',
                bottom: '1%',
                right: '20%',

                // symbolSize: 7,

                label: {
                    normal: {
                        position: 'left',
                        // verticalAlign: 'middle',
                        // align: 'right',
                        fontSize: 24,
                        // width:10,
                    },
                    // width: 40%
                },

                // leaves: {
                //     label: {
                //         normal: {
                //             position: 'right',
                //             verticalAlign: 'middle',
                //             align: 'left'
                //         }
                //     }
                // },
                width: 1660,
                height: 830,
                symbol: "circle",
                symbolSize: 16,
                itemStyle: {
                  color: "#ffcc73",
                  borderColor: "#ffa303",
                  borderWidth: 3
                },
                // label: {
                //   fontSize:50,
                //   // width: 56,
                //   // height: 14,
                //   fontFamily: "MicrosoftYaHei",
                //   // fontSize: 14,
                //   // fontWeight: normal,
                //   // fontStretch: normal,
                //   // lineHeight: 0,
                //   // letterSpacing: 0,
                //   // color: "#999999",
                // },
                // textStyle: {
                //   fontSize:50,
                // },
                lineStyle: {
                  color: "#ffa303",
                  type: "dashed"
                },
                initialTreeDepth:3,
                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750
            }
      ]});
    }
  },
  mounted() {
    this.initChart();
  }
}
</script>
<style lang="scss" scoped>
.data-statistics {
  width: 100%;
  height: 800px;
  .wrapper {
    width: 100%;
    // height: calc(100% - 200px);
    height: 100%;
    background-color: #e5e5ef;
    padding: 20px;
    .data {
      width: 100%;
      height: 100%;
      background-color: #fff !important;
      border-radius: 3px;
      >h3 {
        padding: 20px;
      }
      #main {
        width: 100%;
        height: calc(100% - 65px);
      }
    }
    
  }
}
</style>

