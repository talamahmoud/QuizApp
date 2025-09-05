import { QuizApp } from "./main.js";

export default class Question {
  constructor({ id, text, options, correctIndex }) {
    this.id = id;
    this.text = text;
    this.options = options;
    this.correctIndex = correctIndex;
    this.selectedIndex = null;
  }

  isCorrect() {
    return this.selectedIndex === this.correctIndex;
  }

  render() {
    const wrapper = document.createElement("article");
    wrapper.className = "question";
    wrapper.dataset.qid = String(this.id);

    const title = document.createElement("div");
    title.className = "q-title";
    title.textContent = this.text;
    wrapper.appendChild(title);

    const list = document.createElement("div");
    list.className = "choices";

    this.options.forEach((opt, i) => {
      const label = document.createElement("label");
      label.className = "choice";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q-${this.id}`;
      input.value = String(i);
      input.checked = (this.selectedIndex === i);

      input.addEventListener("change", () => {
        this.selectedIndex = i;
        QuizApp.instance.persistProgress();
      });

      const span = document.createElement("span");
      span.textContent = opt;

      label.appendChild(input);
      label.appendChild(span);
      list.appendChild(label);
    });

    wrapper.appendChild(list);
    return wrapper;
  }
}
