# Quiz App — OOP (ES6)

A single-page Quiz App built with **Object-Oriented Programming** in vanilla JavaScript (ES6 classes). It displays **all questions at once**, allows the user to **reset**, and on **submit** it shows the **final score** with **pass/fail** feedback. Uses **localStorage** to persist answers **during an active attempt**, but starts **fresh after finishing**.

## ✨ Features (User Stories & Acceptance Criteria)
- All questions visible at once.
- Single-select per question (radio inputs).
- **Reset** button clears UI and localStorage.
- **Submit** shows final score and **PASS/FAIL** (≥ 70% to pass).
- If refreshed **before finishing**, answers are restored from localStorage.
- If refreshed **after finishing**, the app starts **fresh** (no old results).
- Implements OOP principles (classes, inheritance, encapsulation, polymorphism).
- At least **12 questions** (mix of MCQ & True/False).

## 🧠 OOP Design
- `StorageService`: Encapsulates persistence (namespaced `localStorage`).
- `Question` (base): shared shape and behavior (`render`, `isCorrect`).
- `MCQQuestion` and `TrueFalseQuestion`: inherit from `Question`.
- `Quiz`: holds state (questions, pass threshold, finished, reset, score).
- `QuizRenderer`: responsible for DOM rendering of questions/results.
- `QuizApp`: orchestrator (singleton), wiring UI, storage, and model.

See the **Architecture Diagram** in `architecture.png`.

## 🏁 Run Locally
Open `index.html` in any modern browser. No build step required.

## 📂 Project Structure
```
.
├─ index.html
├─ styles.css
├─ app.js
├─ README.md
├─ TECHNICAL_REQUIREMENTS.md
└─ architecture.png
```

## 📜 License
MIT
