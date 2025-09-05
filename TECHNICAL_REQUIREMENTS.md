# Quiz App – Technical Requirements (Summary)

## Classes

- **Question (Base)**
  - Props: `id`, `text`, `options`, `correctIndex`, `selectedIndex`
  - Methods: `isCorrect()`, `render()`

- **MCQQuestion (extends Question)**
  - Type: `"mcq"`

- **TrueFalseQuestion (extends Question)**
  - Type: `"truefalse"`
  - Options: `["True", "False"]`

- **Quiz**
  - Props: `questions[]`, `passThreshold = 0.7`, `finished`
  - Methods: `score()`, `reset()`

- **StorageService**
  - Methods: `set()`, `get()`, `remove()`, `clearAll()`

- **QuizApp**
  - Props: `storage`, `rootEl`, `resultEl`, `quiz`
  - Methods: `_buildQuestions()`, `renderQuestions()`, `showResult()`,  
    `hideResult()`, `persistProgress()`, `_restoreProgress()`,  
    `handleReset()`, `handleSubmit()`

---

## Implementation

1. Each question renders one DOM element.  
2. MCQ → radio buttons, True/False → fixed two radios.  
3. **Submit button**:
   - Calculates score, shows pass/fail, clears storage.  
4. **Reset button**:
   - Resets selections, clears storage, re-renders questions.  
5. **LocalStorage format**:  
   {
     "quiz-app-oop:answers": { "1": 0, "2": 2 },
     "quiz-app-oop:finished": true
   }
6. Passing threshold = 70%.

## Event Handling
1. submitBtn.addEventListener("click", handleSubmit) → submit quiz.
2. resetBtn.addEventListener("click", handleReset) → reset quiz.

