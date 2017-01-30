$(document).ready(function(){
    var level=$('section').length;
    var paralax_obj={'#first':1,'#second':0.85,'#third':0.6,'#fourth':0.35,'#fifth':0.2};

    var mass=grid('.paralax_img',level);
    var el,
        k1=1,
        point,
        self;
    $('.paralax_img').load(function(){
        self=$(this);
        for(var key in paralax_obj){
            if(key==='#first'){
                point=randomPos(mass);
                self.css({'top':point[0]*0.75+"px",'left':point[1]+'px'});  
                continue;
            }

             el=self.clone().appendTo(key);
            el.height(el.height()*k1)
            point=randomPos(mass);
            blu=3-4*k1+'px';
            el.css({'top':50+point[0]*paralax_obj[key]+"px",'left':point[1]+'px',
                      '-webkit-filter': 'blur('+blu+')',
                         '-moz-filter': 'blur('+blu+')',
                           '-o-filter': 'blur('+blu+')',
                          '-ms-filter': 'blur('+blu+')',
                              'filter': 'blur('+blu+')'});
            k1-=0.7/level;
        }
        k1=0.75;
    });
    $("#first").onepage_scroll({
        sectionContainer: "section",
        paralax:paralax_obj
    },100);
});

function grid(selector,b){
        selector = selector||".paralax_img";
        b = b||3;
       var docHeight=$('section').length*Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
        );
    var docWidth=document.documentElement.clientWidth;

    var a=$(selector).length,
          mass=[];
          
    x=(docWidth-200)/b;
    y=(docHeight-250)/a;
    for(var i=0;i<=docHeight;i+=y){
        for(var j=0;j<=docWidth;j+=x){
            mass.push([i,j]);
            
        }
        
    }
    return mass;
}

function randomPos(mass){
    while(true){
        x = Math.floor(mass.length * Math.random());
        if(mass[x]!=="-1"){
            a=mass[x];
            mass[x]='-1';
            return a;
        }
        
    }
    
}