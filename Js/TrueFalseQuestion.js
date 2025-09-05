import Question from "./Question.js";

export default class TrueFalseQuestion extends Question {
  constructor({ id, text, answerTrue }) {
    const options = ["True", "False"];
    const correctIndex = answerTrue ? 0 : 1;
    super({ id, text, options, correctIndex });
    this.type = "truefalse";
  }
}
