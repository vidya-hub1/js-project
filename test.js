let typeContent = document.querySelector(".type-content p");
let input = document.getElementById("typeValue");
let words = (mistakes = isTyping = 0);
let resetBtn = document.getElementById("resetBtn");
let soundToggle = document.getElementById("soundToggle");
let tLeft = document.getElementById("left");
let error = document.getElementById("mistakes");
let wpm = document.getElementById("wpm");
let cpm = document.getElementById("cpm");

let maxTime = 60;
let timeLeft = maxTime;
let time;


let correctType = new Audio("./correct.mp3");
let inCorrectType = new Audio("./incorrect.mp3");

let soundEnabled = true; 


soundToggle.addEventListener("change", function () {
  soundEnabled = !this.checked;

  
  if (!soundEnabled) {
    correctType.pause();
    inCorrectType.pause();
    correctType.currentTime = 0;
    inCorrectType.currentTime = 0;
  }
});


const playSound = (audio) => {
  if (soundEnabled) {
    audio.currentTime = 0; 
    audio.play();
  }
};


const  paragraphs = [
    "A long time ago, there lived a wealthy and affluent king in a far away kingdom. He had a very beautiful daughter of marriageable age, named Afiong. All the young men in the country wanted to marry her, but she refused all offers of marriage. Most of the rich old men asked for her hand in marriage, but she called them old and ugly. Afiong was very proud and vain.",
  
     
    "In spite of repeated entreaties from her parents, she refused to marry any man from her land. She vowed to marry a rich prince from a far away kingdom. Her prince would be the best-looking man in the entire world. He would be strong and perfect in every way, and capable of loving her properly. So Afiong the princess continued to disobey her parents, at which they were very much grieved. ",
     
     
    "One day, there was commotion within the village. “What could be happening?” people enquired. Not long after, the news got to the palace, a very fine man had been seen in the market, who was better-looking than any of the natives. Afiong rushed to the market at once, and directly she saw the most handsome man she had ever set her eyes on. She fell in love immediately, and invited him to her house. The prince was delighted, and went home with her.",
     
     
    "On his arrival, the handsome prince was introduced by Afiong to her parents. The prince immediately asked their consent to marry their daughter. At first they refused, as they did not wish her to marry a stranger, but at last they agreed. He lived with Afiong for two days in her parents' house, and then said he wished to take his wife back to his country, which was far off. To this the princess readily agreed, as he was such a fine man, but her parents tried to persuade her not to go. However, being very headstrong, she made up her mind to go, and they started off together. It was a sad day for the king and the queen.",
     
     
    "After walking for several days, Afiong and her husband crossed the border between the spirit land and the human land. Immediately they set foot in the spirit land, strange things began to happen. First of all one man came to the prince and demanded his legs, then another his head, and the next his body, and so on, until in a few minutes the prince was left with an nothing but a skull.",
     
     
    "The princess became terrified. She could not understand what had happened to her handsome prince. The prince then laughed at the princess and confessed that the princess was now seeing him in his natural state. He had borrowed all his body parts from the other spirits so he would look human when he went to ask for her hand in marriage. In fact, his entire body consisted of only a human skull.", 
     
     
    "The princess wanted to return home, but the skull would not allow this, and ordered her to go with him. When they arrived at the skull's house they found his mother, who was a very old woman quite incapable of doing any work. She could only creep about. Afiong tried her best to help her, and cooked her food, and brought water and firewood for the old woman. The old creature was very grateful for these attentions, and soon became quite fond of Afiong.",
     
     
    "One day the old woman felt very sorry for Afiong, and decided to help her. She promised to send her back to her country as soon as possible, providing that she promised that in the future she would obey her parents. This Afiong readily consented to do. Then the old woman sent for the spider, who was a very clever hairdresser, and made him dress Afiong's hair in the latest fashion. She also presented her with anklets and other things on account of her kindness. She then used her supernatural power to call the breeze to gently carry Afiong to her father’s kingdom. Soon afterwards, the breeze deposited Afiong outside her home, and left her there.",
     
    
    "When the king and the queen saw their daughter they were very glad, as they had for some months given her up as lost. There was feasting and dancing throughout the kingdom for eight days and nights. Afterwards, the king  passed a law that parents should never allow their daughters to marry strangers who came from a far country. Then the prince from a neighbouring village came to ask for Afiong’s hand in marriage and she willingly consented, and lived with him for many years, and had many children.",
  ]



function loadPara() {
  let random = Math.floor(Math.random() * paragraphs.length);
  typeContent.innerHTML = "";
  currentParagraph = paragraphs[random];
  typeContent.innerHTML = currentParagraph
    .split("")
    .map((char) => `<span>${char}</span>`)
    .join("");
  typeContent.querySelector("span").classList.add("active");

  
  document.addEventListener("click", () => input.focus());
  typeContent.addEventListener("click", () => input.focus());
}

loadPara();


input.addEventListener("input", (e) => {
  let chars = typeContent.querySelectorAll("span");
  let inputValue = e.target.value.split("")[words];

  if (!isTyping) {
    time = setInterval(timesetup, 1000); 
    isTyping = true;
  }

  if (words < chars.length - 1) {
    if (inputValue == null) {
      if (words > 0) {
        words--;
        if (chars[words].classList.contains("incorrect")) {
          mistakes--;
        }
        chars[words].classList.remove("correct", "incorrect");
      }
    } else {
      if (chars[words].innerText === inputValue) {
        chars[words].classList.add("correct");
        playSound(correctType); 
      } else {
        chars[words].classList.add("incorrect");
        mistakes++;
        playSound(inCorrectType); 
      }
    }
    words++;
    chars.forEach((element) => element.classList.remove("active"));
    chars[words].classList.add("active");

    error.innerText = `Mistakes : ${mistakes}`;
    cpm.innerText = `CPM : ${words - mistakes}`;
  } else {
    clearInterval(time);
    input.value = "";
  }
});


const timesetup = () => {
  if (timeLeft > 0) {
    timeLeft--;
    tLeft.innerText = `Time-Left : ${timeLeft}S `;
    let wpmTab = Math.round(
      ((words - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm.innerText = `WPM : ${wpmTab}`;
  } else {
    clearInterval(time);
    input.setAttribute("disabled", true);
    alert("Time is up! Try again.");
    input.value = "";
  }
};


resetBtn.addEventListener("click", () => {
  loadPara();
  clearInterval(time);
  input.removeAttribute("disabled");
  wpm.innerText = `WPM : 0`;
  error.innerText = `Mistakes : 0`;
  cpm.innerText = `CPM : 0`;
  timeLeft = maxTime;
  tLeft.innerText = `Time-Left : ${maxTime}S `;
  input.value = "";
  words = mistakes = isTyping = 0;
});



