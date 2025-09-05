import StorageService from "./StorageService.js";
import MCQQuestion from "./MCQQuestion.js";
import TrueFalseQuestion from "./TrueFalseQuestion.js";
import Quiz from "./quiz.js";

export class QuizApp {
  static instance = null;

  constructor({ rootSelector = "#quiz-root", resultSelector = "#result" } = {}) {
    if (QuizApp.instance) return QuizApp.instance;
    QuizApp.instance = this;

    this.storage = new StorageService("quiz-app-oop");
    this.rootEl = document.querySelector(rootSelector);
    this.resultEl = document.querySelector(resultSelector);

    this.quiz = new Quiz(this._buildQuestions());

    const finished = this.storage.get("finished", false);
    if (!finished) {
      this._restoreProgress();
    } else {
      this.storage.clearAll();
    }

    this.renderQuestions();

    document.getElementById("resetBtn")?.addEventListener("click", () => this.handleReset());
    document.getElementById("submitBtn")?.addEventListener("click", () => this.handleSubmit());
  }

  _buildQuestions() {
    let id = 1;
    return [
      new MCQQuestion({ id: id++, text: "Which HTML tag is used to include JavaScript code?", options: ["<script>", "<javascript>", "<js>", "<code>"], correctIndex: 0 }),
      new MCQQuestion({ id: id++, text: "Which method adds an element to the end of an array?", options: ["push()", "add()", "append()", "insert()"], correctIndex: 0 }),
      new MCQQuestion({ id: id++, text: "What does CSS stand for?", options: ["Cascading Style Sheets", "Colorful Style Syntax", "Creative Style System", "Computer Style Sheets"], correctIndex: 0 }),
      new MCQQuestion({ id: id++, text: "Which is NOT a JS primitive type?", options: ["number", "string", "boolean", "object"], correctIndex: 3 }),
      new MCQQuestion({ id: id++, text: "Which method filters array elements?", options: ["map()", "filter()", "reduce()", "forEach()"], correctIndex: 1 }),
      new MCQQuestion({ id: id++, text: "ES6 keyword to create a constant?", options: ["let", "var", "const", "static"], correctIndex: 2 }),
      new TrueFalseQuestion({ id: id++, text: "In JS, '===' checks value and type.", answerTrue: true }),
      new TrueFalseQuestion({ id: id++, text: "The DOM stands for Document Object Model.", answerTrue: true }),
      new TrueFalseQuestion({ id: id++, text: "localStorage clears when browser closes.", answerTrue: false }),
      new TrueFalseQuestion({ id: id++, text: "In CSS, 'margin' is inside the border.", answerTrue: false }),
      new MCQQuestion({ id: id++, text: "Which event fires when input changes & loses focus?", options: ["input", "change", "submit", "keyup"], correctIndex: 1 }),
      new MCQQuestion({ id: id++, text: "Encapsulation in OOP means?", options: ["Combine data+methods in one unit", "Inheritance", "Recursion", "Sorting"], correctIndex: 0 }),
    ];
  }

  renderQuestions() {
    this.rootEl.innerHTML = "";
    this.quiz.questions.forEach(q => {
      this.rootEl.appendChild(q.render());
    });
  }

  showResult() {
    const { correct, total, percent } = this.quiz.score();
    const passed = percent >= this.quiz.passThreshold;
    this.resultEl.hidden = false;
    this.resultEl.innerHTML = `
      <div class="score">Your Score: ${correct} / ${total}
        <span class="badge ${passed ? "pass" : "fail"}">${passed ? "PASS" : "FAIL"}</span>
      </div>
      <div class="small">Pass if score ≥ ${Math.round(this.quiz.passThreshold * 100)}%</div>
    `;
  }

  hideResult() {
    this.resultEl.hidden = true;
    this.resultEl.innerHTML = "";
  }

  persistProgress() {
    const answers = {};
    this.quiz.questions.forEach(q => {
      answers[q.id] = q.selectedIndex;
    });
    this.storage.set("answers", answers);
  }

  _restoreProgress() {
    const saved = this.storage.get("answers", {});
    this.quiz.questions.forEach(q => {
      if (saved.hasOwnProperty(q.id)) {
        q.selectedIndex = saved[q.id];
      }
    });
  }

  handleReset() {
    this.quiz.reset();
    this.storage.clearAll();
    this.renderQuestions();
    this.hideResult();
  }

  handleSubmit() {
    this.quiz.finished = true;
    this.showResult();
    this.storage.clearAll();
    this.storage.set("finished", true);
    setTimeout(() => this.storage.clearAll(), 0);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new QuizApp();
});
