// First time playing with SW? This script is just for logging,
// you can pretty much ignore it until you want to dive deeper.

if (!navigator.serviceWorker.controller) {
  console.log("This page is not controlled by a ServiceWorker");
}
else {
  console.log("This page is controlled by a ServiceWorker");
}

navigator.serviceWorker.getRegistration().then(function(reg) {
  function showWaitingMessage() {
    console.log("New service worker waiting to be active.");
  }

  reg.addEventListener('updatefound', function() {
    console.log("a new ServiceWorker found");
    var installing = reg.installing;
    reg.installing.addEventListener('statechange', function() {
      if (installing.state == 'installed') {
        console.log("New ServiceWorker installed.");
        // give it a second to see if it activates immediately
        setTimeout(function() {
          if (installing.state == 'activated') {
            console.log("New ServiceWorker activated");
          }
          else {
            showWaitingMessage();
          }
        }, 1000);
      }
      else if (installing.state == 'redundant') {
        console.log("Failed to install service worker");
      }
    });
  });

  if (reg.waiting) {
    showWaitingMessage();
  }
});