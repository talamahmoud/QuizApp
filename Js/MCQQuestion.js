import Question from "./Question.js";

export default class MCQQuestion extends Question {
  constructor({ id, text, options, correctIndex }) {
    super({ id, text, options, correctIndex });
    this.type = "mcq";
  }
}
