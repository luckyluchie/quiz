class Question {
  constructor(text, choices, answer, link, comment) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.link = link;
    this.comment = comment
  }
  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}
let questions = [
  new Question("En 1860 les Bisserains se sont prononcés majoritairement pour le rattachement de la Savoie à la France à :", ["65%", "85%", "100%"], "100%", "https://www.lectura.plus/Presse/show/?id=73COURDALPES-18600423-P-0002.pdf&query=&back=%2FPresse%2Fsearch%2F%3Fquery%3D%26fromDate%3D23%252F04%252F1860%26untilDate%3D%26publications%255B%255D%3D73COURDALPES", "Plus de 500 000 pages de journaux  de la presse ancienne en Auvergne-Rhône-Alpes  ont été numérisées. Des filtres permettent de retrouver facilement un sujet qui vous intéresse et d’aller ainsi directement à l’information recherchée. Vous pouvez consulter ces journaux depuis chez vous."),
  new Question("Lors du recensement de 1876, la population de Bissy était de :", ["829 habitants","1829 habitants", "2829 habitants"], "829 habitants", "http://www.archinoe.fr/v2/ark:/77293/eee0a50b15cf0137", "Les recensements de Bissy ont été numérisés par les Archives Départementales de la Savoie puis mis en ligne.  Vous pouvez donc les consulter depuis chez vous"),
  new Question("La ligne de chemin de fer PLM Chambéry-Lyon a été inaugurée en  :", ["1804","1884", "1904"], "1884", "https://www.lectura.plus/Presse/show/?id=73COURDALPES-18840926-P-0002.pdf&query=&back=%2FPresse%2Fsearch%2F%3Fquery%3D%26fromDate%3D1884%26untilDate%3D%26publications%255B0%255D%3D73COURDALPES%26startPage%3D9", "Le 20 octobre 1856, le chemin de fer Victor Emmanuel reliant Saint-Jean de Maurienne  à Aix-les-Bains (Choudy) était inauguré. Et le projet allait être élaboré d'une nouvelle ligne de chemin de fer reliant Chambéry à Lyon par un tunnel sous la montagne de l'Epine."),
  new Question("Un de ces personnages célèbres a séjourné à Bissy :", ["Raymond Poincaré","Alphonse de Lamartine", "Edith Piaf"], "Alphonse de Lamartine", "images/lamartine.pdf", "Dans ses \"Mémoires inédits 1795 - 1815\", Lamartine évoque l\'un de ses séjours à Bissy dans le château de Maistre,  avec son ami Vignet. \"Tous nos jours étaient semblables à Bissy. Vignet me traitait en frère, le colonel de Maistre en fils, les nièces en cousin ; nous passions les journées à nous promener dans les pelouses, dans les bois de sapins, dans les sillons cultivés, dans les prairies qui se déroulaient entre le lac du Bourget et la vallée de Chambéry.\""),
  new Question("Un de ces ruisseaux ne traverse pas Bissy. Lequel ?", ["le Merderet", "l'Erier", "le Forezan"], "l'Erier", "images/ruisseaux-bissy.pdf", "La Leysse et l'Hyères ont créé bien des tourments aux habitants de Bissy, mais d'autres ruisseaux, plus petits, ont eux aussi, eu leurs colères.")
];

class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}

// Regroup all  functions relative to the App Display
const display = {
  elementShown: function(id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  endQuiz: function() {
    let answersBtn = innerHTML = "<button>Voir les réponses</button>"
    endQuizHTML = `
      <h1>Quiz terminé !</h1>
      <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>
      ${answersBtn}
      `
      this.elementShown("quiz", endQuizHTML)
      let btn = document.querySelector('button')
      btn.classList.add('all-answers-btn')
      btn.addEventListener('click', function() {
        btn.style.display = "none" // hide the answer button
        let allAnswers = document.createElement('div')
        document.body.append(allAnswers)
        allAnswers.innerHTML = '<h5>REPONSES</h5><br>'
        for (let i = 0; i < quiz.questions.length; i++) {
          allAnswers.innerHTML += `<a href="${questions[i].link}" target="_blank"> ${[i + 1]}. ${questions[i].text} <br> <b>${questions[i].answer}</b></a><br><span>${questions[i].comment}</span><br><hr><br>` // return questions, answers with link, and comments
        }
        allAnswers.classList.add('answers-list') 
      }) 
  },
  question: function() {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },
  choices: function() {
    let choices = quiz.getCurrentQuestion().choices;

    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function() {
        quiz.guess(guess);
        quizApp();
      }
    }
    // display choices and handle guess
    for(let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },
  progress: function() {
    let currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
  },
};

// Game logic
quizApp = () => {
  if (quiz.hasEnded()) {
    display.endQuiz();
  } else {
    display.question();
    display.choices();
    display.progress();
  } 
}
// Create Quiz
let quiz = new Quiz(questions);
quizApp();


