var app = new Vue({
  el: '#app',
  data: {
    dataValue: new Date(),
    card: false,
    timelinereverse: true,
    imgData: {},
    zhanghuData: {},
    zhanghuShow: [],
    defaultProps: {
      children: 'children',
      label: 'name'
    },
    zhanghuetubiao:{},
    loadingtimeline: true,
    timelineData: [],
    editableTabsValue: '2',
    editableTabs: [{
        title: '收支记录',
        key: 'shouzhi',
        name: '1'
      },
      {
        title: '账户',
        key: 'zhanghu',
        name: '2'
      }, {
        title: '统计',
        key: 'tongji',
        name: '3'
      }
    ]
  },
  async created() {
    await this.getImg()
    await this.getZhanghu()
    await this.getData()
  },
  mounted() {
    this.$nextTick(() => {
      this.getZhanghuEcharts()
    })
  },
  computed: {
    editableTabsTitle: function () {
      let title = ' '
      this.editableTabs.forEach(element => {
        if (element.name === this.editableTabsValue) {
          title = element
        }
      });
      return title
    }
  },
  filters: {
    translateNum(num) {
      num = (num || 0).toString();
      let number = 0,
          floatNum = '',
          intNum = '';
      // 判断是否有小数位，有则截取小数点后的数字
      if (num.indexOf('.') > 0) {
        number = num.indexOf('.'); // 获取小数点出现的位置
        floatNum = num.substr(number); // 截取arr.substr(form, length)
        intNum = num.substring(0,number); // 截取arr.substring(start, end)
      } else {
        intNum = num;
      }
      let result = [],
          counter = 0;
      intNum = intNum.split('');
      // 利用3的倍数，向数组插入','
      for (let i = intNum.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(intNum[i]);
        if (!(counter % 3) && i != 0) { result.unshift(','); }
      }
      return result.join('') + floatNum || '';
    }
  },
  methods: {
    getZhanghuEcharts() {
      var myecharts = echarts.init(document.getElementById('zhanghuecharts'));
      const option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
      };

      // 使用刚指定的配置项和数据显示图表。
      myecharts.setOption(option);
    },
    getData() {
      if(this.editableTabsValue == 1){
        this.getTimeLineData()
      } else if (this.editableTabsValue == 2) {

      }
    },
    getTimeLineData() {
      const time = new Date()
      const fileName = `${time.getFullYear()}.${time.getMonth()}.json`
      axios.get(`/getData?fileName=${fileName}`)
        .then(res => {
          let data = res.data.flat(Infinity)
          this.timelineData = data
          this.timelineData.forEach(item => {
            item.mainfile = this.imgData[item.ionic]
            item.from_to = this.zhanghuData[item.from || item.to]
          })
          this.loadingtimeline = false
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {});
    },
    getImg() {
      axios.get('/getImg')
        .then(res => {
          const data = res.data
          data.forEach(item => {
            this.imgData[item.key] = `ionic/${item.file}`
          })
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {});
    },
    getZhanghu() {
      axios.get('/getZhanghu')
        .then(res => {
          const data = res.data
          console.log(data)
          this.zhanghuShow = data
          data.forEach(item => {
            if(item.children) {
              item.children.forEach(ite => {
                this.zhanghuData[ite.key] = {
                  ionic: ite.ionic,
                  name: ite.name,
                  file: this.imgData[ite.ionic]
                }
              })
            } else {
              this.zhanghuData[item.key] = {
                ionic: item.ionic,
                name: item.name,
                file: this.imgData[item.ionic]
              }
            }
          })
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {});
    }
  },
})














//   //传入数据
//    function addlisttohtml(a){
//     for(let i = 0; i<a.length; i++){
//             var ltr = $('table tr').eq(0).clone(true);
//             ltr.children('td').eq(0).html(a[i].id);
//             ltr.children('td').eq(1).html(a[i]._id);
//             ltr.children('td').eq(2).html(a[i].name);
//             ltr.children('td').eq(3).html(a[i].price);
//             ltr.children('td').eq(4).html(a[i].time);
//             ltr.children('td').eq(5).html('<input type="button" value ="删除">');
//           $('tbody').append(ltr);
//        }
// }
// $.ajax({
//     url : 'http://127.0.0.1:3000/getlist',
//     type : 'get',
//     dataType :'json',
//     success:function(res,status,xhr){
//         console.log(res);
//         $('table tr').eq(0).siblings().hide();
//         // 判断传回页面的数组的孩子是不是数组，
//         // 如果是数组则证明是分页请求的；
//         // 如果其孩子是对象则证明这是一个不分页的请求，清除tbody的内容，
//         // 迎接即将到来的数据即可
//         if(res[0] instanceof Array){
//             $('table tr').eq(0).siblings().hide();
//             addlisttohtml(res[0]);
//             var ldiv = $('<div style="width:80%;margin:50px auto;"></div>');

//             ldiv.insertAfter('table');
//             for(let i=0 ;i<res.length;i++){
//                 var lspan = $('<span "></span>').html(i+1);
//                 lspan.appendTo(ldiv);   
//                 lspan.click(function(){
//                     $(this).css({"background":"red"}).siblings().css({"background": "rgb(188, 243, 243)"})
//                     $('table tr').eq(0).siblings().hide();
//                     addlisttohtml(res[i]);
//                 })
//             }
//             $("div span").eq(0).css({"background":"red"})
//         }
//         else{
//             addlisttohtml(res);
//         }
//     }
// })
// //添加
// $('#namesub1').click(function(){
//     $.ajax({
//         url : 'http://127.0.0.1:3000/addlist',
//         type : 'get',
//         data:{id:$('#id1').val(),name:$('#name1').val(),price:$('#price1').val()},
//         success:function(res,status,xhr){
//             addlisttohtml(res);
//             $('#name1').val("");
//             $('#id1').val("");
//             $('#price1').val("");
//         }
//     })
// })
// //查找
// $('#namesub2').click(function(){
//     $.ajax({
//         url : 'http://127.0.0.1:3000/findlist',
//         type : 'get',
//         data:{name:$('#name2').val()},
//         success:function(res,status,xhr){
//             console.log(res);
//             $('table tr').eq(0).siblings().hide();
//             addlisttohtml(res);
//             $('#name2').val("");  
//         }
//     })
// })
// //删除
// $('table').on("click","tr td input[type=button]",function(){
//     var a = $(this).parent().parent().children('td').eq(1).html();
//     var b = $(this).parent().parent();
//     $.ajax({
//         url : 'http://127.0.0.1:3000/dellist',
//         type : 'get',
//         data:{_id:a},
//         success:function(res,status,xhr){
//             b.hide();
//         }
//     })
// });