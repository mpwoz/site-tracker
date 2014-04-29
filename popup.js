var tracker = {
    saySomething: function() {
      //chrome.runtime.getBackgroundPage( function(currWindow) {
      //  alert(currWindow);
        var msg = document.createElement('p');
        var msgt = document.createTextNode('This is a message?');
        //var win = document.createTextNode(currWindow.location.host);
        msg.appendChild(msgt);
        //msg.appendChild(win);
        document.body.appendChild(msg);
      //}
    }
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  tracker.saySomething();
});
