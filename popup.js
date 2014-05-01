/*
 * This code runs in the popup, when you click the extension
 * button. Not sure if we even need this. Maybe just load the
 * page for viewing stats here.
 */
var tracker = {
    saySomething: function() {
      var msg = document.createElement('p');
      var msgt = document.createTextNode('This is a message?');
      msg.appendChild(msgt);
      document.body.appendChild(msg);
    }
};

document.addEventListener('DOMContentLoaded', function () {
  tracker.saySomething();
});
