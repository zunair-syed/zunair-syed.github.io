// Utils
var Util = function() {};

Util.prototype.getRandomInt = function(min, max) {
  return Math.floor(this.getRandomFloat(min, max));
};

Util.prototype.getRandomFloat = function(min, max) {
  return Math.random() * (max - min + 1) + min;
};

// Line
var Line = function() {
  this.x;
  this.y;
  this.width;
  this.height;

  this.elem;
}

Line.prototype.generateRandom = function() {
  var t = this;
  var u = new Util();

  t.x = u.getRandomInt(-100, screen.width);
  t.y = u.getRandomInt(-100, screen.height);

  t.width = u.getRandomInt(100, 300);
  t.height = u.getRandomInt(2, 10);

  console.log(t);

  var div = document.createElement("div");
  div.classList.add("line");
  div.style.width = t.width + "px";
  div.style.height = t.height + "px";
  div.style.top = t.y + "px";
  div.style.left = t.x + "px";
  div.style.setProperty('animation-delay', u.getRandomFloat(0, .5) + 's');
  div.style.setProperty('animation-duration', u.getRandomFloat(.8, 1.8) + 's');

  document.body.appendChild(div);

};


// DOM ready
(function(){
	for(var i = 0; i <= 80; i++){
    new Line().generateRandom();
	};
})();
