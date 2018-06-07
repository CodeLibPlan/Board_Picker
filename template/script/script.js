window.onresize = resize_elements;// 창 크기가 바뀌면 엘리먼트 크기를 리사이즈시킨다.

// 목록 화면으로 이동(스크롤 방식)
function goto_show(event){
    var target = document.getElementById('show');
    goto(target);
}
// 추가 화면으로 이동(스크롤 방식)
function goto_add(event){
    var target = document.getElementById('add');
    goto(target);
}
//헤더로 이동(스크롤 방식)
function goto_header(event){
    var target = document.getElementsByTagName('header')[0];
    goto(target);
}
//주어진 target의 위치로 스크롤하는 메소드
function goto(target){
    var speed = 30;//speed는 반복 횟수. 높으면 느려짐
    var a;
    var distance = target.getBoundingClientRect().y/speed;
    a = function (innerspeed, itarget, idistance) {//재귀 방식으로 구현하기 위해 함수를 새로 정의해 줌.
        if (innerspeed == 0){
            if(itarget.getBoundingClientRect().y != 0){
                console.log(Math.floor(itarget.getBoundingClientRect().top));
                window.scrollTo(0, itarget.getBoundingClientRect().top+window.pageYOffset);
            }
            return;
        }
        window.scrollTo(0, window.pageYOffset+(idistance));
        setTimeout(function(){a(innerspeed - 1, itarget, idistance)}, 10);//10밀리초마다 움직임
    };
    a(speed, target, distance);
}
// 화면의 엘리먼트들을 창 크기에 맞춰 주는 메소드
function resize_elements() {
    var windowheight = window.innerHeight;
    console.log("asdf");
    document.getElementsByTagName("header")[0].style.height = windowheight + "px";
    document.getElementById("show").style.height = windowheight + "px";
    document.getElementById("add").style.height = windowheight + "px";
    document.getElementsByTagName("footer")[0].style.height = (windowheight / 2) + "px";
    console.log(document.getElementById("iframe_cover").style.height );
    document.getElementById("iframe_cover").style.height = (windowheight-50) + "px";
    console.log(document.getElementById("iframe_cover").style.height );
}