var my_life = 3;
var cpu_life = 3;


function changeHoverActive(className) {
  $(className).toggleClass('hover_ignore');
}

function attrDisabled(className) {
  $(className).attr('disabled');
}

function removeDisabled(className) {
  $(className).removeAttr('disabled');
}

function setText(className, text) {
  $(className).text(text);
}

function choiceHand(className, handNum) {
  var imgName = ["gu", "choki","pa", "Question"];
  var handImg = 'img/' + imgName[handNum] + '.jpg';
  $(className).attr('src', handImg);
}

function showLife(player, life, text){
  var _html = '';
  for (var i = 0; i < life; i ++){
    _html += '<li><img src="img/Life.jpg"></li>';
  }
  $('.' + player + '_life > ul').html(_html);
}

function result(myHandNum, cpuHandNum) {
  var resultNum = (myHandNum - cpuHandNum + 3) % 3;
  var resultText = ["あいこ!?", "まけ...", "かち!!"];
  setText('.result', resultText[resultNum]);
  if (resultNum == 1) {
    showLife('my', my_life -= 1);
  } else if (resultNum == 2) {
    showLife('cpu', cpu_life -= 1);
  }
}

function finishPlay() {
  changeHoverActive('.start');
  changeHoverActive('.reset');
  attrDisabled('.hand_button button');
  attrDisabled('.start button');
  removeDisabled('.reset button');
}

function lifeNothing(className) {
  if (my_life == 0) {
    setText('.result', "ざんねん、あなたのまけ...");
    finishPlay();
  }  else if (cpu_life == 0) {
    setText('.result', "おめでとう、あなたのかち!!!");
    finishPlay();
  }
}


$(function() {
  showLife('my', my_life);
  showLife('cpu', cpu_life);
  changeHoverActive('.start');
  $('.start button').click(function() {
    attrDisabled('.start button');
    $('.start button').attr('disabled');
    setText('.title', 'じゃん');
    $('.title').delay(500).fadeIn('slow', function() {
      setText('.title', 'けん');
      changeHoverActive('.hand_button');
      changeHoverActive('.start');
      removeDisabled('.hand_button button');
    });
  });

  $('.hand_button button').click(function() {
    var myHandNum = $(this).data('hand');
    var cpuHandNum = _.random(0, 2);

    changeHoverActive('.hand_button');
    changeHoverActive('.start');
    attrDisabled('.hand_button button');
    removeDisabled('.start button');
    setText('.title', 'ぽん');
    choiceHand('.my_hand', myHandNum);
    choiceHand('.cpu_hand', cpuHandNum);
    result(myHandNum, cpuHandNum);
    lifeNothing();
  });

  $('.reset button').click(function() {
    var resetNum = $(this).data('hand');
    my_life = 3;
    cpu_life = 3;

    changeHoverActive('.start');
    changeHoverActive('.reset');
    attrDisabled('.reset button');
    removeDisabled('.start button');
    setText('.title', 'じゃんけんぽん');
    setText('.result', 'かてるかな?');
    choiceHand('.my_hand', resetNum);
    choiceHand('.cpu_hand', resetNum);
    showLife('my', my_life);
    showLife('cpu', cpu_life);
  });
});
