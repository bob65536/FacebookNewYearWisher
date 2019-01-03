# FacebookNewYearWisher  
Enjoy the new year celebration while this script sends your whishes to your friends at midnight sharp.

## How to use this file  
To use it, you need to use either Mozilla Firefox or Google Chrome, with the extension [TamperMonkey](https://tampermonkey.net/) installed.  
Then, go to the dashboard of TamperMonkey and add this script.  
When the new year is coming, go to the mobile website of Facebook (m.facebook.com or mbasic.facebook.com), open in different tabs your friend's conversations and wait until midnight.  
Messages will be sent within twenty seconds.  
**NOTE**: with 15 opened convesations, a middle-range laptop (i5-5200) is quite busy (95% CPU) so avoid doing other tasks.

## Does it work?
Before testing it, do a test in a fake conversation one day before (`month==12 && day==31`).
If the page of the conversation reloads on its own, it is good.  
Otherwise, here is a quick troubleshooting: right-click on the conversation and click "Inspect Element". Go to console and observe the messages.  
1. I got nothing! 
* Be sure you are on mbasic.facebook.com (and not on m.facebook.com nor on www.facebook.com).  
* Also, check is the script is enabled!
* Verify the @include parameter and be sure it matches with the beginnig of the URL (before the wildcards).  
* If nothing works: the script has errors and I am sorry. Send me a message and I will help (or post an issue).  

2. I got `document.getElementsByClassName(...)[0].getElementsByTagName(...)[0] is undefined`
Damn, that happened... You will need to change the variable `classNameConv` to the new variable.  
To do so, go to the conversation, right-click on the title and inspect this element.   
You will see the class on which the title belongs (e.g.: `bk` or `bl`).  
Save the modifications, refresh the page and check if the issue was fixed.  

3. I got `[INFO] The script ChatBotNYE does not apply here. Nothing will be done.`
The Facebook URL must have been changed and the filter should be modified on the first condition.  
(Check the @include parameter too).
Also, it means you are not on the right place.  

4. It posts messages every second! Heeelp!
If you use Facebook in English or in Italian, you should not be in trouble.  
But with other languages, the script can't check when a message have been written one minute ago.  
*Solution: go to the line where there is `mtn.startsWith("Just")` and replace "Adesso" with the equivalent in your language.*  

5. The messages are so bad!
Add/Replace some on the function `happpynewyear()`! Just one warning: do not let the pool of messages empty.  

This is at an experimental state. Like any programs, it may have bugs and you should understand JavaScript before tweaking/debugging this script.  
