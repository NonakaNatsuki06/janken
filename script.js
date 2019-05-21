my_life = 3;
cpu_life = 3;


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
  var handImg = 'img/' + handNum + '.jpg';
  $(className).attr('src', handImg);
}

function showLife(player, life, text){
  _html = '';
  for (var i = 0; i < life; i ++){
    _html += '<li><img src="img/Life.jpg"></li>';
  }
  $('.' + player + '_life > ul').html(_html);
  setText('.result', text)
}

function result(myHandNum, cpuHandNum) {
  var resultNum = (myHandNum - cpuHandNum + 3) % 3;
  if (resultNum == 0) {
    setText('.result', 'あいこ!?');
  } else if (resultNum == 1) {
    showLife('my', my_life -= 1, 'まけ...');
  } else if (resultNum == 2) {
    showLife('cpu', cpu_life -= 1, 'かち!!');
  }
}

function checkLifeCount(className) {
  if (my_life == 0) {
    changeHoverActive('.start');
    changeHoverActive('.reset');
    attrDisabled('.hand_button button');
    attrDisabled('.start button');
    removeDisabled('.reset button');
    setText('.result', 'ざんねん...あなたのまけ...');
  }  else if (cpu_life == 0) {
    changeHoverActive('.start');
    changeHoverActive('.reset');
    attrDisabled('.hand_button button');
    attrDisabled('.start button');
    removeDisabled('.reset button');
    setText('.result', 'おめでとう、あなたのかち!');
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
    setText('.title', 'じゃん');
    setText('.title', 'ぽん');
    choiceHand('.my_hand', myHandNum);
    choiceHand('.cpu_hand', cpuHandNum);
    result(myHandNum, cpuHandNum);
    checkLifeCount();
  });

  $('.reset button').click(function() {
    var resetNum = $(this).data('hand');
    // 再定義
    my_life = 1;
    cpu_life = 1;

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
