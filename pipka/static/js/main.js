// Two charts definition
var chart1;

// Once DOM (document) is finished loading
$(document).ready(function() {


    // First chart initialization
    var objGraf={
     chart: {
        type: 'spline',
        height: 400,
     },
     rangeSelector:{
        enabled:true,
            buttons: [{
                type: 'month',
                count: 1,
                text: 'Месяц'
            }, {
                type: 'month',
                count: 3,
                text: 'Квартал'
            }, {
                type: 'month',
                count: 6,
                text: 'Пол года'
            }, {
                type: 'year',
                count: 1,
                text: 'Год'
            },{
                type: 'year',
                count: 3,
                text: '3 Года'
            }, 
            {
                type: 'year',
                count: 5,
                text: '5 Лет'
            },{
                type: 'year',
                count: 10,
                text: '10 Лет'
            },
            {
                type: 'all',
                text: 'Все'
            }],
            buttonTheme: {
                    width: 60
            },
              
     },
      _navigator: {
        enabled: false
     },

     title: {
        text: 'График'
     },

     yAxis: {
        title: {
           text: 'Деньги'
        }
     },
     series: []
    };

    var objAjax={
                type:'POST',
                dataType:'json',
                timeout:50000,
                
                error:function(){
                    alert('Произошла какая-то ошибка. </br>Ну хз, попробуйте еще раз');
                    },
                success: function(jdata){
                    for (var i=0;i<jdata.len*2;i+=2)
                    {
                        objGraf.series.push({name:jdata.dat[i],data:jdata.dat[i+1]});
                    }
                    Highcharts.stockChart('chart_1', objGraf);
                }
            }
            objAjax.url='/graf/'; 
     $.ajax(objAjax);  
     
     
     
     
     
     
     

});



/*csrf_token */   
     
 function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

    function csrfSafeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });