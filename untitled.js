//var user = authenticateUser("iphone_subu") //is 10232d1226293e821dsafafdf138721223ez for subu's username
var username = "10232d1226293e821dsafafdf138721223ez"


// Store frame for motion functions
var previousFrame = null;
var paused = false;
var pauseOnGesture = false;

// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

// to use HMD mode:
// controllerOptions.optimizeHMD = true;

Leap.loop(controllerOptions, function(frame) {
  if (paused) {
    return; // Skip this update
  }

  // Display Hand object data
  var handOutput = document.getElementById("handData");
  var handString = "";
  if (frame.hands.length > 0) {
    for (var i = 0; i < frame.hands.length; i++) {
      var hand = frame.hands[i];

      handString += "<div style='width:300px; float:left; padding:5px'>";
      handString += "Grab strength: " + hand.grabStrength + "<br />";

      // IDs of pointables associated with this hand
      if (hand.pointables.length > 0) {
        var fingerIds = [];
        for (var j = 0; j < hand.pointables.length; j++) {
          var pointable = hand.pointables[j];
            fingerIds.push(pointable.id);
        }
        if (fingerIds.length > 0) {
          handString += "Fingers IDs: " + fingerIds.join(", ") + "<br />";
        }
      }

      handString += "</div>";
    }
  }
  else {
    handString += "No hands";
  }
  handOutput.innerHTML = handString;


  // Store frame for motion functions
  previousFrame = frame;
})

function vectorToString(vector, digits) {
  if (typeof digits === "undefined") {
    digits = 1;
  }
  return "(" + vector[0].toFixed(digits) + ", "
             + vector[1].toFixed(digits) + ", "
             + vector[2].toFixed(digits) + ")";
}

function togglePause() {
  paused = !paused;

  if (paused) {
    document.getElementById("pause").innerText = "Resume";
  } else {
    document.getElementById("pause").innerText = "Pause";
  }
}

function pauseForGestures() {
  if (document.getElementById("pauseOnGesture").checked) {
    pauseOnGesture = true;
  } else {
    pauseOnGesture = false;
  }
}



// Philips hue ajax request
function authenticateUser(developer) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "http://192.168.3.2/api/" + developer,
        headers: {"X-HTTP-Method-Override, Access-Control-Allow-Origin: *": "PUT"},
    });
}
 
function modifyLight(saturation, brightness, hue) {
    $.ajax({
        type: 'PUT',
        dataType: 'json',
        url: "http://192.168.3.2/api/10232d1226293e821dsafafdf138721223ez/lights/1/state",
        headers: {"X-HTTP-Method-Override, Access-Control-Allow-Origin: *": "PUT"},
        data: {"on":true, "sat":saturation, "bri":brightness,"hue":hue}
    });
}
 






// function vectorToString(vector, digits) {
//   if (typeof digits === "undefined") {
//     digits = 1;
//   }
//   return "(" + vector[0].toFixed(digits) + ", "
//              + vector[1].toFixed(digits) + ", "
//              + vector[2].toFixed(digits) + ")";
// }

// function togglePause() {
//   paused = !paused;

//   if (paused) {
//     document.getElementById("pause").innerText = "Resume";
//   } else {
//     document.getElementById("pause").innerText = "Pause";
//   }
// }

// function pauseForGestures() {
//   if (document.getElementById("pauseOnGesture").checked) {
//     pauseOnGesture = true;
//   } else {
//     pauseOnGesture = false;
//   }
// }