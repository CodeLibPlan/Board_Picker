
var fs = require('fs');
var board_parser = function(){//객체 하나 당 사이트 하나.

};
board_parser.prototype.addrlist_path = undefined;
board_parser.prototype.parserlist = [];
board_parser.prototype.eventcallback = {};
board_parser.prototype.run = function(){
    console.log('board-parser started');
    this.init();
    this.setloop();
    console.log('board-parser ended');
};
board_parser.prototype.init =function() {
    this.addrlist_path = "./data/parse/addrlist.json";
    var addrlist = fs.readFileSync(this.addrlist_path).toString();//target_number 및 target_selector정보 받기
    addrlist = JSON.parse(addrlist);
    for(var address in addrlist) {
        var info = addrlist[address];
        var target_number = info[0];
        var target_selector = info[1];
        console.log("./data/parse/" + target_number + "/data.json");
        var prevlist = JSON.parse(fs.readFileSync("./data/parse/" + target_number + "/data.json").toString());
        var userinfo = JSON.parse(fs.readFileSync("./data/parse/" + target_number + "/userinfo.json").toString());
        this.parserlist.push(new this.parser(address, target_number, target_selector, prevlist, userinfo));
    }
};
board_parser.prototype.then = function(callback){
    callback();
};
board_parser.prototype.setloop = function(){
    for(var parseridx in this.parserlist){
        var parserinstance = this.parserlist[parseridx];
        parserinstance.run(10000);
    }
};
board_parser.prototype.setEventCallback = function(user, callback){
    this.eventcallback[user] = callback;
};
board_parser.prototype.add = function (){//추가x
    //추가 기능 구현 시 해야 할 일 : addrlist에 새로운 주소 및 ID, selector값 추가

};
board_parser.prototype.parser = function(target_addr, target_number, target_selector, prev_state, req_users) {
    var data_path;
    var userinfo_path;
    var running;
    init();
    return {
        'init': init,
        'run': run,
        'running':running
    };
    function init() {//객체 처음 생성 후 실행. 초기 주소, 셀렉터, 이전 게시판 값을 초기화함.
        data_path = "./data/parse/" + target_number + "/data.json";
        userinfo_path = "./data/parse/" + target_number + "/userinfo.json";
    }
    function save(){
        fs.writeFile(data_path, JSON.stringify(prev_state));
        fs.writeFile(userinfo_path, JSON.stringify(req_users));
    }

    function run(delay) {
        console.log("asdfasgs");
        running = setInterval(()=>{
            parse();
        }, delay);
    }
    async function parse(){
        var phantom = require('phantom');
        var cheerio = require('cheerio');
        const instance = await phantom.create();
        const page = await instance.createPage();
        await page.on('onResourceRequested', function(requestData) {
            console.info('Requesting', requestData.url);
        });

        const status = await page.open('http://computer.cnu.ac.kr/index.php?mid=notice');
        const content = await page.property('content');

        var $ = cheerio.load(content);
        var changed = false;
        $(target_selector).each(await function(){
            var equals = false;
            var idx;
            var txt = $(this).text().replace(/\t/gi,"").replace(/\n/gi," ");
            for(idx in prev_state){
                if(prev_state[idx] === txt){//해당 게시글이 있는지 확인
                    equals = true;
                    break;
                }
                //console.log("nope",prev_state[idx]);
            }
            if(!equals){//해당 게시글이 새 글이라면
                changed = true;
                console.log('new article detected');
                //console.log(prev_state);
                console.log(Object.keys(prev_state).length);
                //console.log(Object.keys(prev_state));
                prev_state['idIndex'] +=1;
                prev_state[prev_state['idIndex']] = txt;
                board_parser.prototype.notifier.__proto__.message = txt;
                console.log("notifier : ", board_parser.prototype.notifier.__proto__);

                //console.log("a : ",board_parser.prototype.notifier);
            }
        });
        if(changed){
            save();
        }
        await instance.exit();

    }

};

var notifier = require('./notifier');
board_parser.prototype.notifier = new notifier();
module.exports = board_parser;