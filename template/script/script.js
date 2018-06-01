window.onresize = resize_elements;

function goto_show(event){
    var target = document.getElementById('show');
    goto(target);
}
function goto_add(event){
    var target = document.getElementById('add');
    goto(target);
}
function goto_header(event){
    var target = document.getElementsByTagName('header')[0];
    goto(target);
}
function goto(target){
    var speed = 30;//speed는 반복 횟수. 높으면 느려짐
    var a;
    var distance = target.getBoundingClientRect().y/speed;
    a = function (innerspeed, itarget, idistance) {
        if (innerspeed == 0){
            if(itarget.getBoundingClientRect().y != 0){
                console.log(Math.floor(itarget.getBoundingClientRect().top));
                window.scrollTo(0, itarget.getBoundingClientRect().top+window.pageYOffset);
            }
            return;
        }
        window.scrollTo(0, window.pageYOffset+(idistance));
        setTimeout(function(){a(innerspeed - 1, itarget, idistance)}, 10);
    };
    a(speed, target, distance);
}
function resize_elements(){
    var windowheight=window.innerHeight;
    console.log("asdf");
    document.getElementsByTagName("header")[0].style.height=windowheight+"px";
    document.getElementById("show").style.height=windowheight+"px";
    document.getElementById("add").style.height=windowheight+"px";
    document.getElementsByTagName("footer")[0].style.height=(windowheight/2)+"px";
}