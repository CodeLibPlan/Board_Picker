#!/usr/bin/env node

var parser = require('./threads/board-parser');
var notifier = require('./threads/notifier');
//(new parser()).run();
//(new notifier()).StaticQueue.add("asdg");
//console.log(notifier.StaticQueue().add("item"));
//console.log(notifier.StaticQueue().remove());

var queue = require("./threads/Queue");
queue = new queue();
console.log(queue.enqueue("a"));
console.log(queue.enqueue("a"));
console.log(queue.enqueue("a"));
console.log(queue.enqueue("a"));
console.log(queue.enqueue("a"));
console.log(queue.enqueue("a"));