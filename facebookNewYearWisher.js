// ==UserScript==
// @name     ChatBotNYE
// @version  1.6.4.2_Forked
// @grant    unsafeWindow
// @include  https://m*.facebook.com/messages*
// ==/UserScript==
// Author:   Bob Sleigh
// Description :   Wanna send Happy new year msg at midnight SHARP? Good, I have what you need!
// Code forked from facebookChatBot.js (at ver. 1.6.4.2) -- obviously three hours before the new year.
// Hope this will work in 2020 ;)
// Coded and tested on:
var lastEdit="2019-01-03 23:50"
// Reduced script for NYE. Worked flawlessly (^=^) for 2019
// TODO: tailored msg for specific friends (not to look suspicious :) )

//unsafeWindow.on = true;

var autoRefresh = 1000; // Refresh the page every x ms

// Here, put the references of the classes. Hope that Facebook does not change the w
var classNameConv   = 'bk'; // Name of the conversation ('bi' seems to be ok too)

/////////////////////////////////
/////// The Main Function ///////
/////////////////////////////////
if (document.URL.search('m.facebook.com/messages/') > 0 || document.URL.search('mbasic.facebook.com/messages/') > 0) {
  var nameConvo = document.getElementsByClassName(classNameConv)[0].getElementsByTagName('span')[0].valueOf().innerText;
  var convo = firstName(nameConvo);
  var nameConvoFull = fullName(nameConvo);
  var d = new Date();
  var hour = d.getHours();
  var min = d.getMinutes();
  var dayOfTheWk = d.getDay(); // 0=Sunday, 1=Monday, etc
  var day = d.getDate(); // Returns a number between 1 and 31
  var dayStr = ("00" + day).slice(-2);
  var month = d.getMonth()+1; // getMonth() gives a number between 0 and 11 (WTF). Needs to add 1.
  var moStr = ("00" + month).slice(-2);

  console.log("[DEBUG] We are on Facebook so ChatBotNYE is enabled!");
  // mtn is the date when the latest message of the conversation was sent. If one sends a message at [X-1]:59 (eg: 4:59), the script may not work (here, at 5:00)
  try {
    var mtn = document.getElementsByTagName('abbr')[document.getElementsByTagName('abbr').length-1].valueOf().innerText;
  }
  catch(error) {
    var mtn = "A random time ago"; // Placeholder
  }

  // For all conversations, do this:
  if (mtn.startsWith("Just") || mtn.startsWith("Adesso")) {
      console.log("A message was posted seconds ago... I don't want to post another message right now...");
  }
  else {
    if (month==1 && day==1 && hour == 0 && min == 0) {
      // New year!
      var msg = happynewyear();
      if (msg != "") {
        document.getElementById('composerInput').value = msg;
        console.log("New Year: I post!");
        document.getElementsByName('send')[0].click();
      }
    }
  }
}
else {
  console.log("[INFO] The script ChatBotNYE does not apply here. Nothing will be done.");
}
// After this, I reload the page
setTimeout(function() {console.log("Timeout: I reload!"); window.location.reload();}, autoRefresh);

/////////////////////////////////
//////// Useful functions ///////
/////////////////////////////////


function firstName(txt) {
  // This function returns Alain when you put as an argument "Alain Térieur Delamaison" for example.
  // I don't know but it is more normal to call friends like that!
  res = "";
  var N = txt.length;
  var i = 0;
  while (txt[i] != " " && i < N) {
    res = res + txt[i];
    i++;
  }
  return res;
}

function fullName(txt) {
  // This function returns - for the nname of the conversation "Bla bla bla"
  // instead of "Bla bla bla (13 persone)"
  res = "";
  var N = txt.length;
  var i = 0;
  while (txt[i] != "(" && i < N) {
    res = res + txt[i];
    i++;
  }
  return res;
}

function happynewyear() {
  // Happy New year!
  // msgPool will contain a nice pun (the whole message to be sent)
  var d = new Date();
  var yr = d.getFullYear();
  var prevYr = yr-1;
  var msgPool = new Array("BONNE ANNÉE "+convo.toUpperCase()+" !!!", "Bonne année "+convo+" et tous mes meilleurs voeux pour cette nouvelle année "+yr+" <3", "Bonne année "+prevYr+"... euh, "+yr+" copain !!!", convo+", tous mes meilleurs voeux pour une nouvelle année qui promet d'être géniale ;) !", "Achievement unlocked : year "+yr, "Bonne année "+yr+" et puisse cette année être encore meilleure que "+prevYr+" ;) !");
  var i = Math.floor(msgPool.length*Math.random());
  return msgPool[i];
}

