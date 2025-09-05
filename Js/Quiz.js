export default class Quiz {
  constructor(questions = []) {
    this.questions = questions;
    this.passThreshold = 0.7;
    this.finished = false;
  }

  score() {
    const correct = this.questions.reduce((acc, q) => acc + (q.isCorrect() ? 1 : 0), 0);
    return {
      correct,
      total: this.questions.length,
      percent: this.questions.length ? correct / this.questions.length : 0
    };
  }

  reset() {
    this.questions.forEach(q => q.selectedIndex = null);
    this.finished = false;
  }
}
