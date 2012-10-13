$(function(){
  $("#container").masonry({itemSelector:".item"});

  render_navigator();
  markRight();
  markNearest();
});

$(window).scroll(function(){ 
  markNearest();
});

(function($) {
    $.fn.goTo = function() {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 'fast');
        return this; // for chaining...
    }
})(jQuery);

var render_navigator = function(){
  var template = '<a class="time-sec" href="#"></a>';
  var prev_date = "";
  $(".item").each(function(){
      var date = $(this).attr('value');
      if(date && date!== prev_date){
        $(template).text(date).appendTo($("#timeline-navigator"));
        prev_date = date;
      }
  });

  $("a.time-sec").live('click',function(){
    var date = $(this).text();
    $(".item").each(function(){
      if($(this).attr('value') == date){
        $(this).goTo();
        return false;
      }
    })
  })
}

var markRight = function(){
  $(".item").each(function(){
    if(this.offsetLeft > 200){
      $(this).addClass('right').children('.arrow').addClass('right-arrow');
    }
    else{
      $(this).addClass('left').children('.arrow').addClass('left-arrow');
    }
  })
}

var markNearest = function(){
  resetElement();

  var scrollPosition = document.documentElement.scrollTop;
  var scrollHeight = document.documentElement.scrollHeight

  var minDistance = scrollHeight;
  var nearest = null;

  $(".item").each(function(){
    var actualTop = this.offsetTop;
    var current = this.offsetParent;
　　　　while(current !== null){
　　　　　　actualTop += current.offsetTop;
　　　　　　current = current.offsetParent;
　　　　}

    var dis = actualTop - scrollPosition + this.clientHeight/3;
    if(dis >= 0 && dis < minDistance){
       minDistance = dis;
       nearest = this;
    }
  })

  if(nearest !== null){
    var date = $(nearest).attr('value');
    alert(date);
    $("a.time-sec").each(function(){
      if(date == $(this).text()){
        $(this).css('border-left','solid #369 5px');
        $(this).css('color','#369');
      }  
    })
  }
}

var resetElement = function(){
  $("a.time-sec").css('border-left','solid #CCD3E1 5px');
  $("a.time-sec").css('color','#CCD3E1');  
}

