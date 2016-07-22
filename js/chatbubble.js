
/*
  copyright 2014 Lieuwe Rooijakkers (http://www.github.com/lieuwex)
 */

(function() {
  var delayIds, el, fn, i, j, ref, snap;

  el = $(".chatHead");

  this.springs = {};

  this.system = new rebound.SpringSystem();

  snap = function(value, side) {
    switch (side) {
      case "top":
        return el.css({
          transform: "translate3d(0px, " + value + "px, 0px)"
        });
      case "left":
        return el.css({
          transform: "translate3d(" + value + "px, 0px, 0px)"
        });
      case "right":
        return el.css({
          transform: "translate3d(" + ($(window).width() + value) + "px, 0px, 0px)"
        });
      case "bottom":
        return el.css({
          transform: "translate3d(0px, " + ($(window).height() + value) + "px, 0px)"
        });
    }
  };

  springs.top = system.createSpring(40, 6);

  springs.left = system.createSpring(40, 6);

  springs.right = system.createSpring(40, 6);

  springs.bottom = system.createSpring(40, 6);

  springs.top.addListener({
    onSpringUpdate: function(spring) {
      var val;
      val = spring.getCurrentValue();
      val = rebound.MathUtil.mapValueInRange(val, 0, 1, 1, -20);
      return snap(val, "top");
    }
  });

  springs.left.addListener({
    onSpringUpdate: function(spring) {
      var val;
      val = spring.getCurrentValue();
      val = rebound.MathUtil.mapValueInRange(val, 0, 1, 1, -20);
      return snap(val, "left");
    }
  });

  springs.right.addListener({
    onSpringUpdate: function(spring) {
      var val;
      val = spring.getCurrentValue();
      val = rebound.MathUtil.mapValueInRange(val, 0, 1, 1, -40);
      return snap(val, "right");
    }
  });

  springs.bottom.addListener({
    onSpringUpdate: function(spring) {
      var val;
      val = spring.getCurrentValue();
      val = rebound.MathUtil.mapValueInRange(val, 0, 1, 1, -40);
      return snap(val, "bottom");
    }
  });

  $(".chatHead").css({
    top: 25
  });

  springs.right.setCurrentValue(-50).setAtRest();

  springs.right.setEndValue(1);

  fn = function(i) {
    var follower;
    follower = $(".chatHeadFollower")[i];
    follower.style.top = (25 + (5 * (i + 1))) + "px";
    return follower.style.zIndex = 99999 - i;
  };
  for (i = j = 0, ref = $(".chatHeadFollower").length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
    fn(i);
  }

  delayIds = [];

  $(".chatHeadLeader").draggable({
    scroll: false,
    start: function() {
      springs.top.setAtRest();
      springs.left.setAtRest();
      springs.right.setAtRest();
      springs.bottom.setAtRest();
      return $(".chatHeadFollower").css({
        opacity: 0
      });
    },
    drag: function() {
      var k, left, ref1, results, top;
      top = Number($(".chatHeadLeader").css("top").replace(/[^\d\.\-]/ig, ""));
      left = Number($(".chatHeadLeader").css("left").replace(/[^\d\.\-]/ig, ""));
      springs.top.setCurrentValue(top / -20).setAtRest();
      springs.left.setCurrentValue(left / -20).setAtRest();
      springs.right.setCurrentValue(($(window).width() - left) / 40).setAtRest();
      springs.bottom.setCurrentValue(($(window).height() - top) / 40).setAtRest();
      $(".chatHeadBadge").removeClass("under");
      $(".chatHeadBadge").removeClass("right");
      $(".chatHead").css({
        transform: "translate3d(0px, 0px, 0px)"
      });
      results = [];
      for (i = k = 0, ref1 = $(".chatHeadFollower").length; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
        results.push((function(i, top, left) {
          var func;
          func = function() {
            var follower;
            follower = $(".chatHeadFollower")[i];
            follower.style.opacity = 1;
            follower.style.left = left + "px";
            follower.style.top = top + "px";
            return follower.style.zIndex = 99999 - i;
          };
          return delayIds.push(_.delay(func, 20 * (i + 1)));
        })(i, top, left));
      }
      return results;
    },
    stop: function() {
      var closest, delayId, fn1, k, l, left, len, ref1, top, value, values;
      for (k = 0, len = delayIds.length; k < len; k++) {
        delayId = delayIds[k];
        clearTimeout(delayId);
      }
      delayIds = [];
      top = Number($(".chatHeadLeader").css("top").replace(/[^\d\.\-]/ig, ""));
      left = Number($(".chatHeadLeader").css("left").replace(/[^\d\.\-]/ig, ""));
      fn1 = function(i, top, left) {
        var follower;
        follower = $(".chatHeadFollower")[i];
        follower.style.left = (left + (5 * (i + 1))) + "px";
        follower.style.top = (top + (5 * (i + 1))) + "px";
        return follower.style.zIndex = 99999 - i;
      };
      for (i = l = 0, ref1 = $(".chatHeadFollower").length; 0 <= ref1 ? l < ref1 : l > ref1; i = 0 <= ref1 ? ++l : --l) {
        fn1(i, top, left);
      }
      values = [
        {
          side: "top",
          value: top
        }, {
          side: "left",
          value: left
        }, {
          side: "right",
          value: $(window).width() - left
        }, {
          side: "bottom",
          value: $(window).height() - top
        }
      ];
      closest = _.first(_.sortBy(values, function(v) {
        return v.value;
      })).side;
      value = _.first(_.sortBy(values, function(v) {
        return v.value;
      })).value;
      if (closest === "top") {
        springs[closest].setCurrentValue(value / -20).setAtRest();
        $(".chatHead").css({
          top: 0
        });
        $(".chatHeadBadge").addClass("under");
      } else if (closest === "left") {
        springs[closest].setCurrentValue(value / -20).setAtRest();
        $(".chatHead").css({
          left: 0
        });
        $(".chatHeadBadge").addClass("right");
      } else if (closest === "right") {
        springs[closest].setCurrentValue(value / 40).setAtRest();
        $(".chatHead").css({
          left: 0
        });
      } else if (closest === "bottom") {
        springs[closest].setCurrentValue(value / 40).setAtRest();
        $(".chatHead").css({
          top: 0
        });
      }
      return springs[closest].setEndValue(1);
    }
  });

}).call(this);