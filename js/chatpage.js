'use strict'

var myFirebaseRef = new Firebase("https://ama-chat-dd148.firebaseio.com/");
var usersRef = null;
// Create our RiveScript interpreter.
var rs = new RiveScript({
  debug:   false,
  onDebug: onDebug
});

// This won't work on the web!
//rs.loadDirectory("brain");

// Load our files from the brain/ folder.
rs.loadFile([
  "js/brain/begin.rive",
  "js/brain/admin.rive",
  "js/brain/clients.rive",
  "js/brain/eliza.rive",
  "js/brain/myself.rive",
  "js/brain/rpg.rive",
  "js/brain/fun.rive",
  "js/brain/random.rive",
  "js/brain/projects.rive",
  "js/brain/school.rive",    
  "js/brain/work.rive",    
  "js/brain/javascript.rive"
  ], on_load_success, on_load_error);

// You can register objects that can then be called 
// using <call></call> syntax
rs.setSubroutine('fancyJSObject', function(rs, args){
  // doing complex stuff here
});

function on_load_success () {
  console.log("Load Success");
  // Now to sort the replies!
  rs.sortReplies();
}

function on_load_error (err) {
  console.log("Loading error: " + err);
}


function onDebug(message) {
  console.log("DEBUGGG!!!");
}


var $messages = $('.messages-content');
var mins;
var msg = "";
var reply = "";

var replaceArr = [
                  ['090','('],
                  ['000',')'],
                  ['070','/'],
                  ['100','¯_(ツ)_/¯'],
                  ['110','(ง ͠° ͟ل͜ ͡°)ง'],
                  ['120','(◕‿◕)'],
                  ['130','(╥_╥)'],
                  ['140','ヾ(⌐■_■)ノ♪'],
                  ['150','(ノಠ益ಠ)ノ彡┻━┻'],
                  ['160','(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧'],
                  ['170',':p']
                 ];

$(window).load(function() {
  $messages.mCustomScrollbar();
  usersRef = myFirebaseRef.child("User | "+new Date().toString());
  setTimeout(function() {
updateScrollbar();
    fakeMessage("Hey there! Ask me anything");
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  var date = new Date();

  if (mins != date.getMinutes()) {
    mins = date.getMinutes();
    $('<div class="timestamp">' + formatAMPM(date) + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {

  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
  
  console.log("rivescriptStr: " + msg);
    try {
    reply = rs.reply("soandso", msg);

    usersRef.push({
        user_message: msg,
        reply: reply
    });

    console.log("reply: " + reply);
    fakeMessage(reply);

    } catch(e) {
      window.alert(e.message + "\n" + e.line);
      console.log(e);
    }

  }, 1000 + (Math.random() * 20) * 100);
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})


function fakeMessage(reply) {
  reply = replaceWithEmoticons(reply);
  console.log("reply: "+reply);
  var replyArr =  removeWhiteNullSpaces(reply.split('.'))
  var isLastMsg = false;
  if ($('.message-input').val() != '') {
    return false;
  }

  startBotThinking();

  for (var i = 0; i < replyArr.length; i++) {
       (function(repObj, i) {
          setTimeout(function() {
            endBotThinking();
            $('<div class="message new"><figure class="avatar"><img src="https://ece.uwaterloo.ca/~zu2syed/img/zunair.png" /></figure>' + repObj + '</div>').appendTo($('.mCSB_container')).addClass('new');
          
            if(i == (replyArr.length-1) ){
              isLastMsg = true;
              setDate();
              endBotThinking();
            }else{
              setTimeout(function() {
                 if(!isLastMsg) startBotThinking();
              }, randInt(250, 1000));
            } 
            updateScrollbar();
          }, randInt(1250, 2500) + (i*1300));
        })(replyArr[i], i);
  
  }
}


function startBotThinking(){
  $('<div class="message loading new"><figure class="avatar"><img src="https://ece.uwaterloo.ca/~zu2syed/img/zunair.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();
  console.log("STARTed");
}

function endBotThinking(){
  $('.message.loading').remove();
  console.log("Ended");
}

function replaceWithEmoticons(str){
  for (var i = replaceArr.length - 1; i >= 0; i--) {
      if(str.indexOf(replaceArr[i][0]) > -1)
        str = findReplace(replaceArr[i][0], replaceArr[i][1], str);
  }
  return str;
}

function findReplace(find, replace, str) {
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
}

function removeWhiteNullSpaces(splitArr){
  for(var i=0; i < splitArr.length; i++){
    if(splitArr[i] == null || (splitArr[i].trim()==='') ) {
      splitArr.splice(i, 1); //remove element
    }
  }
  return splitArr;
}

function formatAMPM(date) {
  var datetext = new Date().toTimeString();
  // datestring is "20:32:01 GMT+0530 (EST)"
  return datetext.split(':')[0] + ":" + datetext.split(':')[1];
}

function randInt(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
