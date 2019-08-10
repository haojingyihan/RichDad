
var app = new Vue({
    el: '#app',
    data: {
        value8: '',
        editableTabsValue: '1',
        editableTabs:[
            {
                title: '收入',
                name: '1'
            }, {
                title: '支出',
                name: '2'
            }, {
                title: '资产',
                name: '3'
            }, {
                title: '负债',
                name: '4'
            }
        ]
    },
    created(){
        this.getlist()
    },
    computed:{
        editableTabsTitle:function() {
            let title = ' '
            this.editableTabs.forEach(element => {
                if (element.name == this.editableTabsValue){
                    title = element
                }
            });
            return title
        }
    },
    methods: {
        getlist(){
            axios.get('/getlist?ID=12345')
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
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