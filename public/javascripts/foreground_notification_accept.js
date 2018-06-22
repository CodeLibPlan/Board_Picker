console.log("adsf");
setInterval(notify, 1000);
var prev_notify = "";
if (Notification.permission === "denied") {
    alert("이 사이트에 대한 알림 설정이 '거부'로 되어 있습니다.\n정상적으로 알림을 수신하시려면 설정->고급 설정 표시->개인정보 메뉴->콘텐츠 설정->알림(크롬 기준)에서\n이 사이트에 대한 알림을 '허용'으로 바꿔주세요");
}
else if(Notification.permission === "default") {
    Notification.requestPermission();
}

function notify(){

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(this.readyState == 4 && this.status == 200) {
            if(prev_notify !== this.responseText){
                prev_notify = this.responseText;
                new Notification(this.responseText);
                console.log(this.responseText);
            }
        }
    };
    xhr.open("GET", "/notification", true);
    xhr.send();
}