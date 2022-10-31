// function([string1, string2],target id,[color1,color2])    
 consoleText(['Development', 'Sharing', 'Influence'], 'text',['green','green','green']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 10)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 50)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 50)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 50)
}
var words = document.getElementsByClassName('word');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}

function changeWord() {
  var cw = wordArray[currentWord];
  var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
  for (var i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }
  
  for (var i = 0; i < nw.length; i++) {
    nw[i].className = 'letter behind';
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }
  
  currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
}

function animateLetterOut(cw, i) {
  setTimeout(function() {
		cw[i].className = 'letter out';
  }, i*80);
}

function animateLetterIn(nw, i) {
  setTimeout(function() {
		nw[i].className = 'letter in';
  }, 340+(i*80));
}

function splitLetters(word) {
  var content = word.innerHTML;
  word.innerHTML = '';
  var letters = [];
  for (var i = 0; i < content.length; i++) {
    var letter = document.createElement('span');
    letter.className = 'letter';
    letter.innerHTML = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }
  
  wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 4000);

const lis = document.querySelectorAll("li");
const lbs = document.querySelectorAll(".lb");
const ul = document.querySelector("ul");
const lineDash = document.querySelector(".line-dash");


var dashOrigin = -35; //pixels
var selectedLi = -35; //pixels
var speed = 500; //move this many pixels in one second.
var distance = 0;
var time = 0;

// initial animation and class for HOME
TweenLite.to(lbs[0], 0.6, {
					y: -43,
					ease: Bounce.easeOut,
					delay: 1
				});

lis[0].classList.add("active");

//push all the bottom lines down.
function pushDownLb() {
	for(let k = 0; k < lbs.length; ++k)
		TweenLite.to(lbs[k], 0.5, {
					y: 0,
					ease:  Power3.easeOut
				});
}

ul.addEventListener(
	"mouseleave",
	function(e) {
		// to avoid a bug in chrome that sometimes triggers mouseleave on click
		// and the relatedTarget comes up null
		if (e.relatedTarget) {
			distance = Math.abs(dashOrigin - selectedLi);
			time = distance / speed;
			dashOrigin = selectedLi;
			if (time) {
				// overlaping tweens would give a zero time
				TweenLite.to(lineDash, time, {
					strokeDashoffset: selectedLi,
					ease: Bounce.easeOut
				});
			} //if
		} //if
	},
	false
);

for (let i = 0; i < 4; ++i) {
	lis[i].addEventListener("mouseover", function() {
		distance = Math.abs(-250 * i - 35 - dashOrigin);
		time = distance / speed;
		dashOrigin = -250 * i - 35;
		if (time) {
			TweenLite.to(lineDash, time, {
				strokeDashoffset: -250 * i - 35,
				ease: Bounce.easeOut
			});
		} //if
	});

	lis[i].addEventListener("click", function() {
		selectedLi = -250 * i - 35;
		pushDownLb();
		let current = document.getElementsByClassName("active");
		current[0].classList.remove("active");
		lis[i].classList.add("active");
		TweenLite.to(lbs[i], 0.5, {
					y: -43,
					ease: Bounce.easeOut
				});
	});
}

