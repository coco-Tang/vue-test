<template>
  <div>
    <div style="width:calc(100% - 10px);height:305px;" id="home_page_map"></div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      cityData: [
        { name: "北京", value: Math.round(Math.random() * 1000) },
        { name: "天津", value: Math.round(Math.random() * 1000) },
        { name: "上海", value: Math.round(Math.random() * 1000) },
        { name: "重庆", value: Math.round(Math.random() * 1000) },
        { name: "河北", value: Math.round(Math.random() * 1000) },
        { name: "河南", value: Math.round(Math.random() * 1000) },
        { name: "云南", value: Math.round(Math.random() * 1000) },
        { name: "辽宁", value: Math.round(Math.random() * 1000) },
        { name: "黑龙江", value: Math.round(Math.random() * 1000) },
        { name: "湖南", value: Math.round(Math.random() * 1000) },
        { name: "安徽", value: Math.round(Math.random() * 1000) },
        { name: "山东", value: Math.round(Math.random() * 1000) },
        { name: "新疆", value: Math.round(Math.random() * 1000) },
        { name: "江苏", value: Math.round(Math.random() * 1000) },
        { name: "浙江", value: Math.round(Math.random() * 1000) },
        { name: "江西", value: Math.round(Math.random() * 1000) },
        { name: "湖北", value: Math.round(Math.random() * 1000) },
        { name: "广西", value: Math.round(Math.random() * 1000) },
        { name: "甘肃", value: Math.round(Math.random() * 1000) },
        { name: "山西", value: Math.round(Math.random() * 1000) },
        { name: "内蒙古", value: Math.round(Math.random() * 1000) },
        { name: "陕西", value: Math.round(Math.random() * 1000) },
        { name: "吉林", value: Math.round(Math.random() * 1000) },
        { name: "福建", value: Math.round(Math.random() * 1000) },
        { name: "贵州", value: Math.round(Math.random() * 1000) },
        { name: "广东", value: Math.round(Math.random() * 1000) },
        { name: "青海", value: Math.round(Math.random() * 1000) },
        { name: "西藏", value: Math.round(Math.random() * 1000) },
        { name: "四川", value: Math.round(Math.random() * 1000) },
        { name: "宁夏", value: Math.round(Math.random() * 1000) },
        { name: "海南", value: Math.round(Math.random() * 1000) },
        { name: "台湾", value: Math.round(Math.random() * 1000) },
        { name: "香港", value: Math.round(Math.random() * 1000) },
        { name: "澳门", value: Math.round(Math.random() * 1000) }
      ]
    };
  },
  mounted() {
    var map = echarts.init(document.getElementById("home_page_map"));
    const chinaJson = require("./map-data/china.json");
    echarts.registerMap("china", chinaJson);
    // var option = {
    //   title: {
    //     text: "iphone销量",
    //     subtext: "纯属虚构",
    //     left: "center"
    //   },
    //   tooltip: {
    //     trigger: "item"
    //   },
    //   legend: {
    //     orient: "vertical",
    //     left: "left",
    //     data: ["iphone3", "iphone4", "iphone5"]
    //   },
    //   visualMap: {
    //     min: 0,
    //     max: 2500,
    //     left: "left",
    //     top: "bottom",
    //     text: ["高", "低"], // 文本，默认为数值文本
    //     calculable: true
    //   },
    //   toolbox: {
    //     show: true,
    //     orient: "vertical",
    //     left: "right",
    //     top: "center",
    //     feature: {
    //       mark: { show: true },
    //       dataView: { show: true, readOnly: false },
    //       restore: { show: true },
    //       saveAsImage: { show: true }
    //     }
    //   },
    //   series: [
    //     {
    //       name: "iphone3",
    //       type: "map",
    //       mapType: "china",
    //       roam: false,
    //       label: {
    //         normal: {
    //           show: false
    //         },
    //         emphasis: {
    //           show: true
    //         }
    //       },
    //       data: [
    //         { name: "北京", value: Math.round(Math.random() * 1000) },
    //         { name: "天津", value: Math.round(Math.random() * 1000) },
    //         { name: "上海", value: Math.round(Math.random() * 1000) },
    //         { name: "重庆", value: Math.round(Math.random() * 1000) },
    //         { name: "河北", value: Math.round(Math.random() * 1000) },
    //         { name: "河南", value: Math.round(Math.random() * 1000) },
    //         { name: "云南", value: Math.round(Math.random() * 1000) },
    //         { name: "辽宁", value: Math.round(Math.random() * 1000) },
    //         { name: "黑龙江", value: Math.round(Math.random() * 1000) },
    //         { name: "湖南", value: Math.round(Math.random() * 1000) },
    //         { name: "安徽", value: Math.round(Math.random() * 1000) },
    //         { name: "山东", value: Math.round(Math.random() * 1000) },
    //         { name: "新疆", value: Math.round(Math.random() * 1000) },
    //         { name: "江苏", value: Math.round(Math.random() * 1000) },
    //         { name: "浙江", value: Math.round(Math.random() * 1000) },
    //         { name: "江西", value: Math.round(Math.random() * 1000) },
    //         { name: "湖北", value: Math.round(Math.random() * 1000) },
    //         { name: "广西", value: Math.round(Math.random() * 1000) },
    //         { name: "甘肃", value: Math.round(Math.random() * 1000) },
    //         { name: "山西", value: Math.round(Math.random() * 1000) },
    //         { name: "内蒙古", value: Math.round(Math.random() * 1000) },
    //         { name: "陕西", value: Math.round(Math.random() * 1000) },
    //         { name: "吉林", value: Math.round(Math.random() * 1000) },
    //         { name: "福建", value: Math.round(Math.random() * 1000) },
    //         { name: "贵州", value: Math.round(Math.random() * 1000) },
    //         { name: "广东", value: Math.round(Math.random() * 1000) },
    //         { name: "青海", value: Math.round(Math.random() * 1000) },
    //         { name: "西藏", value: Math.round(Math.random() * 1000) },
    //         { name: "四川", value: Math.round(Math.random() * 1000) },
    //         { name: "宁夏", value: Math.round(Math.random() * 1000) },
    //         { name: "海南", value: Math.round(Math.random() * 1000) },
    //         { name: "台湾", value: Math.round(Math.random() * 1000) },
    //         { name: "香港", value: Math.round(Math.random() * 1000) },
    //         { name: "澳门", value: Math.round(Math.random() * 1000) }
    //       ]
    //     },
    //     {
    //       name: "iphone4",
    //       type: "map",
    //       mapType: "china",
    //       label: {
    //         normal: {
    //           show: false
    //         },
    //         emphasis: {
    //           show: true
    //         }
    //       },
    //       data: [
    //         { name: "北京", value: Math.round(Math.random() * 1000) },
    //         { name: "天津", value: Math.round(Math.random() * 1000) },
    //         { name: "上海", value: Math.round(Math.random() * 1000) },
    //         { name: "重庆", value: Math.round(Math.random() * 1000) },
    //         { name: "河北", value: Math.round(Math.random() * 1000) },
    //         { name: "安徽", value: Math.round(Math.random() * 1000) },
    //         { name: "新疆", value: Math.round(Math.random() * 1000) },
    //         { name: "浙江", value: Math.round(Math.random() * 1000) },
    //         { name: "江西", value: Math.round(Math.random() * 1000) },
    //         { name: "山西", value: Math.round(Math.random() * 1000) },
    //         { name: "内蒙古", value: Math.round(Math.random() * 1000) },
    //         { name: "吉林", value: Math.round(Math.random() * 1000) },
    //         { name: "福建", value: Math.round(Math.random() * 1000) },
    //         { name: "广东", value: Math.round(Math.random() * 1000) },
    //         { name: "西藏", value: Math.round(Math.random() * 1000) },
    //         { name: "四川", value: Math.round(Math.random() * 1000) },
    //         { name: "宁夏", value: Math.round(Math.random() * 1000) },
    //         { name: "香港", value: Math.round(Math.random() * 1000) },
    //         { name: "澳门", value: Math.round(Math.random() * 1000) }
    //       ]
    //     },
    //     {
    //       name: "iphone5",
    //       type: "map",
    //       mapType: "china",
    //       label: {
    //         normal: {
    //           show: false
    //         },
    //         emphasis: {
    //           show: true
    //         }
    //       },
    //       data: [
    //         { name: "北京", value: Math.round(Math.random() * 1000) },
    //         { name: "天津", value: Math.round(Math.random() * 1000) },
    //         { name: "上海", value: Math.round(Math.random() * 1000) },
    //         { name: "广东", value: Math.round(Math.random() * 1000) },
    //         { name: "台湾", value: Math.round(Math.random() * 1000) },
    //         { name: "香港", value: Math.round(Math.random() * 1000) },
    //         { name: "澳门", value: Math.round(Math.random() * 1000) }
    //       ]
    //     }
    //   ]
    // };
    var option = {
        title: {
            text: 'USA Population Estimates (2012)',
            subtext: 'Data from www.census.gov',
            sublink: 'http://www.census.gov/popest/data/datasets.html',
            left: 'right'
        },
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {
                var value = (params.value + '').split('.');
                value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                return params.seriesName + '<br/>' + params.name + ': ' + value;
            }
        },
        visualMap: {
            left: 'right',
            min: 500000,
            max: 38000000,
            inRange: {
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            },
            text:['High','Low'],           // 文本，默认为数值文本
            calculable: true
        },
        toolbox: {
            show: true,
            //orient: 'vertical',
            left: 'left',
            top: 'top',
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: 'USA PopEstimates',
                type: 'map',
                roam: true,
                map: 'china',
                itemStyle:{
                    emphasis:{label:{show:true}}
                },
                // 文本位置修正
                textFixed: {
                    Alaska: [20, -20]
                },
                data:[
                  // {name: 'Alabama', value: [121.15,31.89,4822023]},
                  // {name: 'Alabama', value: [121.15,31.89,4822023]},
                  // {name: 'Alabama', value: [121.15,31.89,4822023]},
                  // {name: 'Alabama', value: [121.15,31.89,4822023]},
                  // {name: 'Alabama', value: [121.15,31.89,4822023]},
                  // {name: 'Alabama', value: [121.15,31.89,4822023]},
                  // {name: 'Alabama', value: [121.15,31.89,4822023]},
                  // {name: 'Alabama', value: [121.15,31.89,4822023]},
                    {name: '江苏', value: 4822023},
                    { name: "北京", value: Math.round(Math.random() * 1000) },
            { name: "天津", value: Math.round(Math.random() * 1000) },
            { name: "上海", value: Math.round(Math.random() * 1000) },
            { name: "广东", value: Math.round(Math.random() * 1000) },
            { name: "台湾", value: Math.round(Math.random() * 1000) },
            { name: "香港", value: Math.round(Math.random() * 1000) },
            { name: "澳门", value: Math.round(Math.random() * 1000) }
                    // {name: 'Alaska', value: 731449},
                    // {name: 'Arizona', value: 6553255},
                    // {name: 'Arkansas', value: 2949131},
                    // {name: 'California', value: 38041430},
                    // {name: 'Colorado', value: 5187582},
                    // {name: 'Connecticut', value: 3590347},
                    // {name: 'Delaware', value: 917092},
                    // {name: 'District of Columbia', value: 632323},
                    // {name: 'Florida', value: 19317568},
                    // {name: 'Georgia', value: 9919945},
                    // {name: 'Hawaii', value: 1392313},
                    // {name: 'Idaho', value: 1595728},
                    // {name: 'Illinois', value: 12875255},
                    // {name: 'Indiana', value: 6537334},
                    // {name: 'Iowa', value: 3074186},
                    // {name: 'Kansas', value: 2885905},
                    // {name: 'Kentucky', value: 4380415},
                    // {name: 'Louisiana', value: 4601893},
                    // {name: 'Maine', value: 1329192},
                    // {name: 'Maryland', value: 5884563},
                    // {name: 'Massachusetts', value: 6646144},
                    // {name: 'Michigan', value: 9883360},
                    // {name: 'Minnesota', value: 5379139},
                    // {name: 'Mississippi', value: 2984926},
                    // {name: 'Missouri', value: 6021988},
                    // {name: 'Montana', value: 1005141},
                    // {name: 'Nebraska', value: 1855525},
                    // {name: 'Nevada', value: 2758931},
                    // {name: 'New Hampshire', value: 1320718},
                    // {name: 'New Jersey', value: 8864590},
                    // {name: 'New Mexico', value: 2085538},
                    // {name: 'New York', value: 19570261},
                    // {name: 'North Carolina', value: 9752073},
                    // {name: 'North Dakota', value: 699628},
                    // {name: 'Ohio', value: 11544225},
                    // {name: 'Oklahoma', value: 3814820},
                    // {name: 'Oregon', value: 3899353},
                    // {name: 'Pennsylvania', value: 12763536},
                    // {name: 'Rhode Island', value: 1050292},
                    // {name: 'South Carolina', value: 4723723},
                    // {name: 'South Dakota', value: 833354},
                    // {name: 'Tennessee', value: 6456243},
                    // {name: 'Texas', value: 26059203},
                    // {name: 'Utah', value: 2855287},
                    // {name: 'Vermont', value: 626011},
                    // {name: 'Virginia', value: 8185867},
                    // {name: 'Washington', value: 6897012},
                    // {name: 'West Virginia', value: 1855413},
                    // {name: 'Wisconsin', value: 5726398},
                    // {name: 'Wyoming', value: 576412},
                    // {name: 'Puerto Rico', value: 3667084}
                ]
            }
        ]
    };
    map.setOption(option);
    window.addEventListener("resize", function() {
      map.resize();
    });
  }
};
</script>
<style lang="less" scoped>

</style>

