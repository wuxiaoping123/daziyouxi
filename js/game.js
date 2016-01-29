function game(){

    this.letterArr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];//存放字母
    this.speed=5;//定义速度
    this.health=15;//初始生命
    this.randomArr=[];//当前屏幕上的字母
    this.letterLength=4;//初始同时下落个数
    this.stepsco=10 ;//过关分数
    this.score=0;//当前分数
    this.step=1;//当前关数
    this.span=[];//存放span
    this.width=document.documentElement.clientWidth;//浏览器宽度
    this.height=document.documentElement.clientHeight;//浏览器高度
    window.that=this;
};
game.prototype={
    play:function(){
        this.createEle(this.letterLength);
        this.move();
        this.key();

    },
    random:function(num){
        var newarr=[];
        for (var i = 0; i < num; i++) {
            var random=Math.floor(Math.random()*this.letterArr.length)
            while(this.check(this.letterArr[random],this.randomArr)){
                random=Math.floor(Math.random()*this.letterArr.length)
            }
            newarr.push(this.letterArr[random]);
            this.randomArr.push(this.letterArr[random])
        };
        // alert(newarr)
        return newarr;
    },
    check:function(val,arr){
        for (var i = 0; i < arr.length; i++) {
            if(arr[i]==val){
                return true;
            }
        };
        return false;
    },
    move:function(){
        var that=this;
        that.t=setInterval(that.move2,60)
    },
    move2:function(){
        // alert(that.span.length)
        for (var i = 0; i < that.span.length; i++) {
            var tops=that.span[i].offsetTop+that.speed;

            that.span[i].style.top=tops+"px";
            if(tops>that.height){
                that.span[i].style.display="none";
                that.span.splice(i,1);
                that.randomArr.splice(i,1);
                that.createEle(1);
                var health=document.getElementsByClassName('life')[0].getElementsByTagName('span')[0]
                health.innerHTML=--that.health;
                if(that.health==0){
                    var score=document.getElementsByClassName("score")[0].getElementsByTagName("span")[0];
                    var again=document.getElementsByClassName("ra")[0]
                    clearInterval(that.t)
                    alert("游戏结束!")
                    location.reload();
                }
                break;
            }
        };
    },
    again:function(){
        var step=document.getElementsByClassName("step")[0].getElementsByTagName("span")[1];
        step.innerHTML=++that.step;
        clearInterval(that.t);
        for (var i = 0; i < that.span.length; i++) {
            that.span[i].style.display="none";

        };
        that.span.splice(0,that.span.length);
        that.randomArr.splice(0,that.randomArr.length);
        that.letterLength++;
        that.speed++;
        that.stepsco+=5;
        if(that.speed>10){
            that.speed=10;
        }
        if(that.letterLength>10){
            that.speed=10
        }
        that.createEle(that.letterLength);
        that.move();
    },
    key:function(){
        var that=this;
        var nowScore=0;
        document.onkeydown=function(e){
            var ev=e||window.event;
            var l=String.fromCharCode(ev.keyCode);
            for (var i = 0; i < that.span.length; i++) {
                if(l==that.span[i].innerHTML){
                    that.span[i].style.display="none"

                    that.span.splice(i,1);
                    that.randomArr.splice(i,1);
                    that.createEle(1);
                    var score=document.getElementsByClassName("score")[0].getElementsByTagName("span")[0];
                    score.innerHTML=++that.score;
                    nowScore++;
                    if(nowScore%that.stepsco==0){
                        nowScore=0;
                        alert("恭喜过关")
                        that.again();

                    }
                    break
                }
            };
        }
    },
    createEle:function(num){
        var arr1=this.random(num);
        // alert(arr1)
        for (var i = 0; i < arr1.length; i++) {
            var span=document.createElement("span");
            span.style.cssText="position:absolute;width:100px;height:100px;top:"+(-250*Math.random()-80)+"px;left:"+(120+Math.random()*(this.width-240))+"px;background-image:url(img/"+arr1[i]+".png);color:rgba(0,0,0,0);background-size:100px 100px;background-repeat:no-repeat;"
            span.innerHTML=arr1[i];
            var aa=document.body;
            aa.appendChild(span);
            this.span.push(span)
            this.randomArr.push(span);
        };
    }
}