function goto_show(event){
    var now_Y_offset = window.pageYOffset;
    var goto_offsets = document.getElementById('show').getBoundingClientRect();
    goto(now_Y_offset,goto_offsets.top);
}
function goto_add(event){
    var now_Y_offset = window.pageYOffset;
    var goto_offsets = document.getElementById('add').getBoundingClientRect();
    goto(now_Y_offset,goto_offsets.top);
}
function goto_header(event){
    var now_Y_offset = window.pageYOffset;
    var goto_offsets = document.getElementsByTagName('header')[0].getBoundingClientRect();
    goto(now_Y_offset,goto_offsets.top);
}
function goto(starty, endy){
    var speed = 60;
    var a;
    a = function (innerspeed, istarty, iendy) {
        if (innerspeed == 0) return;
        var diff=iendy-istarty;
        window.scroll(0, istarty);
        window.scrollTo(0, istarty +(diff/innerspeed));
        setTimeout(function(){a(innerspeed - 1, istarty +(diff/innerspeed), iendy)}, 4);
    };
    a(speed, starty, endy);
}