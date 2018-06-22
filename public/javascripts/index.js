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
function newPage(event){
    console.log("new page!", event.target.value);
    var iframe = document.getElementsByTagName("iframe")[0];
    iframe.src = event.target.value;
    iframe.contentWindow.onload=()=>{
        var atag = iframe.contentWindow.document.getElementsByTagName("a");
        for(var idx in atag){
            atag[idx].href="";
            atag[idx].addEventListener('click',(event)=>{
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange=function(){
                    if(this.readyState == 4 && this.status == 200) {

                    }
                };
                xhr.open("GET", "/notification/add", true);
                var message = "address="+iframe.src+"&selector="+pick_board_selector(event.target);
                console.log(message);
                xhr.send(message);
            });
        }
    };
}
function link_replace(){
    var iframe = document.getElementsByTagName("iframe")[0];
    var atag = iframe.contentWindow.document.getElementsByTagName("a");
    for(var idx in atag) {
        //atag[idx].removeAttribute('href');
        atag[idx].addEventListener('click',(event)=>{console.log(event.target)})
    }
}

function pick_board_selector(el){
        if (!(el instanceof Element)) return;
        var path = [];
        while (el.nodeType === Node.ELEMENT_NODE) {
            var selector = el.nodeName.toLowerCase();
            if (el.id) {
                selector += '#' + el.id;
            } else {
                var sib = el, nth = 1;
                while (sib.nodeType === Node.ELEMENT_NODE && (sib = sib.previousSibling) && nth++);
                selector += ":nth-child("+nth+")";
            }
            path.unshift(selector);
            el = el.parentNode;
        }
        return path.join(" > ");
}
function init_elements() {
    var windowheight = window.innerHeight;
    console.log("asdf");
    document.getElementsByTagName("header")[0].style.height = windowheight + "px";
    document.getElementById("show").style.height = windowheight + "px";
    document.getElementById("add").style.height = windowheight + "px";
    document.getElementsByTagName("footer")[0].style.height = (windowheight / 2) + "px";
    console.log(document.getElementById("iframe_cover").style.height );
    document.getElementById("iframe_cover").style.height = (windowheight-50) + "px";
    console.log(document.getElementById("iframe_cover").style.height );
    document.getElementById("addressbox").value = document.getElementsByTagName("iframe")[0].src;
    get_notifications_list();
}
document.addEventListener('load',get_notifications_list());
function get_notifications_list(){
    console.log("notifications load");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(this.readyState == 4 && this.status == 200) {
            console.log(xhr.responseText);
            var sitelist = JSON.parse(xhr.responseText);
            for(var idx in sitelist){
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(sitelist[idx]));
                var img = document.createElement("img");
                img.setAttribute("src", "/images/trash.png");
                li.appendChild(img);
                var ol = document.getElementById("registered_list");
                ol.appendChild(li);
                ol.appendChild(document.createElement("div"));
            }
        }
    };
    xhr.open("GET", "/notification/get", true);
    xhr.send();
}