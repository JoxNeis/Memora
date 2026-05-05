# Memora
> *Study smarter. Remember longer.*

[![License](https://img.shields.io/badge/license-Apache%202.0-red?style=flat-square)](LICENSE)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Backend](https://img.shields.io/badge/backend-none-lightgrey?style=flat-square)](.)
[![Status](https://img.shields.io/badge/status-in%20development-orange?style=flat-square)](.)

---

Memora is a **client-side quiz application** that turns your own JSON files into interactive study sessions — no account, no server, no fuss.

```
Upload a JSON quiz file  →  Take the quiz  →  See your results & explanations
```

---

## ✨ Features

- **Three question types** — Multiple Choice, Multiple Answer, and Fill in the Blank
- **LaTeX rendering** via MathJax — perfect for math and science content
- **Shuffled questions** — configurable per quiz file
- **Instant grading** — with per-question explanations
- **Session-based state** — answers persist across navigation using `sessionStorage`
- **Fully offline** — pure HTML/CSS/JS, zero dependencies to install

---

## 📁 Project Structure

```
Memora/
├── App/
│   ├── Model/
│   │   ├── Quiz.js              # Top-level quiz model
│   │   ├── ProblemSet.js        # Collection of problems
│   │   ├── Problem.js           # Abstract base class
│   │   ├── MultipleChoice.js
│   │   ├── MultipleAnswer.js
│   │   ├── FillInTheBlank.js
│   │   ├── Option.js
│   │   ├── Answer.js
│   │   ├── Work.js              # User's in-progress answers
│   │   └── Checker.js           # Grading logic
│   ├── Service/
│   │   ├── QuizService.js       # Bridges storage ↔ models
│   │   └── StorageService.js    # sessionStorage wrapper
│   └── Storage/
│       └── template.json        # Example quiz file
│
└── Public/
    ├── Assets/
    │   └── Styles/
    │       ├── root.css          # Design tokens & global styles
    │       ├── desktop.css
    │       ├── mobile.css
    │       └── main.css
    └── Page/
        ├── home/                 # Upload page
        ├── quiz/                 # Quiz session page
        └── result/               # Results & explanations page
```

---

## 🚀 Getting Started

No build step required. Just serve the files with any static file server.

```bash
# Option 1 — Python
python -m http.server 8080

# Option 2 — Node
npx serve .

# Option 3 — VS Code
# Use the "Live Server" extension and open index.html
```

Then open `http://localhost:8080` in your browser.

---

## 📄 Quiz File Format

Memora reads `.json` files you author yourself. Here's the full schema:

```json
{
  "title": "My Quiz",
  "duration": 600,
  "settings": {
    "shuffleQuestions": true,
    "questionCount": 5
  },
  "questionBank": [...]
}
```

### Question Types

<details>
<summary><strong>MultipleChoice</strong> — one correct answer</summary>

```json
{
  "id": 1,
  "type": "MultipleChoice",
  "text": "What is 2 + 2?",
  "key": "B",
  "option": [
    { "id": "A", "text": "3", "explanation": "Not quite." },
    { "id": "B", "text": "4", "explanation": "Correct!" },
    { "id": "C", "text": "5", "explanation": "Not quite." }
  ]
}
```
</details>

<details>
<summary><strong>MultipleAnswer</strong> — one or more correct answers</summary>

```json
{
  "id": 2,
  "type": "MultipleAnswer",
  "text": "Which are prime numbers?",
  "key": ["A", "C"],
  "option": [
    { "id": "A", "text": "2",  "explanation": "Correct — 2 is prime." },
    { "id": "B", "text": "4",  "explanation": "Incorrect — 4 = 2×2." },
    { "id": "C", "text": "7",  "explanation": "Correct — 7 is prime." }
  ]
}
```
</details>

<details>
<summary><strong>FillInTheBlank</strong> — typed answer</summary>

```json
{
  "id": 3,
  "type": "FillInTheBlank",
  "text": "F = m · ___",
  "key": "a",
  "explanation": "Force equals mass times acceleration: F = ma."
}
```
</details>

> **Tip:** LaTeX is supported in any text field using `$...$` for inline and `$$...$$` for display math.

---

## 🧭 Page Flow

```
index.html
    │
    ▼
Home (upload.html)
  Upload .json file
    │
    ▼
Quiz (quiz.html)
  Answer questions
    │
    ▼
Result (result.html)
  View score & explanations
```

State is passed between pages via `sessionStorage` — the raw JSON is stored on upload and reconstructed into class instances on each page load.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Language | Vanilla JavaScript (ES Modules) |
| Styling | Plain CSS with custom properties |
| Math rendering | [MathJax 3](https://www.mathjax.org/) |
| Storage | `sessionStorage` (no backend) |
| Build tools | None |

---

## 📝 License

Licensed under the [Apache License 2.0](LICENSE).

---

<sub>Created by JoxNeis · 2026</sub># Memora
> *Study smarter. Remember longer.*

[![License](https://img.shields.io/badge/license-Apache%202.0-red?style=flat-square)](LICENSE)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Backend](https://img.shields.io/badge/backend-none-lightgrey?style=flat-square)](.)
[![Status](https://img.shields.io/badge/status-in%20development-orange?style=flat-square)](.)

---

Memora is a **client-side quiz application** that turns your own JSON files into interactive study sessions — no account, no server, no fuss.

```
Upload a JSON quiz file  →  Take the quiz  →  See your results & explanations
```

---

## ✨ Features

- **Three question types** — Multiple Choice, Multiple Answer, and Fill in the Blank
- **LaTeX rendering** via MathJax — perfect for math and science content
- **Shuffled questions** — configurable per quiz file
- **Instant grading** — with per-question explanations
- **Session-based state** — answers persist across navigation using `sessionStorage`
- **Fully offline** — pure HTML/CSS/JS, zero dependencies to install

---

## 📁 Project Structure

```
Memora/
├── App/
│   ├── Model/
│   │   ├── Quiz.js              # Top-level quiz model
│   │   ├── ProblemSet.js        # Collection of problems
│   │   ├── Problem.js           # Abstract base class
│   │   ├── MultipleChoice.js
│   │   ├── MultipleAnswer.js
│   │   ├── FillInTheBlank.js
│   │   ├── Option.js
│   │   ├── Answer.js
│   │   ├── Work.js              # User's in-progress answers
│   │   └── Checker.js           # Grading logic
│   ├── Service/
│   │   ├── QuizService.js       # Bridges storage ↔ models
│   │   └── StorageService.js    # sessionStorage wrapper
│   └── Storage/
│       └── template.json        # Example quiz file
│
└── Public/
    ├── Assets/
    │   └── Styles/
    │       ├── root.css          # Design tokens & global styles
    │       ├── desktop.css
    │       ├── mobile.css
    │       └── main.css
    └── Page/
        ├── home/                 # Upload page
        ├── quiz/                 # Quiz session page
        └── result/               # Results & explanations page
```

---

## 🚀 Getting Started

No build step required. Just serve the files with any static file server.

```bash
# Option 1 — Python
python -m http.server 8080

# Option 2 — Node
npx serve .

# Option 3 — VS Code
# Use the "Live Server" extension and open index.html
```

Then open `http://localhost:8080` in your browser.

---

## 📄 Quiz File Format

Memora reads `.json` files you author yourself. Here's the full schema:

```json
{
  "title": "My Quiz",
  "duration": 600,
  "settings": {
    "shuffleQuestions": true,
    "questionCount": 5
  },
  "questionBank": [...]
}
```

### Question Types

<details>
<summary><strong>MultipleChoice</strong> — one correct answer</summary>

```json
{
  "id": 1,
  "type": "MultipleChoice",
  "text": "What is 2 + 2?",
  "key": "B",
  "option": [
    { "id": "A", "text": "3", "explanation": "Not quite." },
    { "id": "B", "text": "4", "explanation": "Correct!" },
    { "id": "C", "text": "5", "explanation": "Not quite." }
  ]
}
```
</details>

<details>
<summary><strong>MultipleAnswer</strong> — one or more correct answers</summary>

```json
{
  "id": 2,
  "type": "MultipleAnswer",
  "text": "Which are prime numbers?",
  "key": ["A", "C"],
  "option": [
    { "id": "A", "text": "2",  "explanation": "Correct — 2 is prime." },
    { "id": "B", "text": "4",  "explanation": "Incorrect — 4 = 2×2." },
    { "id": "C", "text": "7",  "explanation": "Correct — 7 is prime." }
  ]
}
```
</details>

<details>
<summary><strong>FillInTheBlank</strong> — typed answer</summary>

```json
{
  "id": 3,
  "type": "FillInTheBlank",
  "text": "F = m · ___",
  "key": "a",
  "explanation": "Force equals mass times acceleration: F = ma."
}
```
</details>

> **Tip:** LaTeX is supported in any text field using `$...$` for inline and `$$...$$` for display math.

---

## 🧭 Page Flow

```
index.html
    │
    ▼
Home (upload.html)
  Upload .json file
    │
    ▼
Quiz (quiz.html)
  Answer questions
    │
    ▼
Result (result.html)
  View score & explanations
```

State is passed between pages via `sessionStorage` — the raw JSON is stored on upload and reconstructed into class instances on each page load.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Language | Vanilla JavaScript (ES Modules) |
| Styling | Plain CSS with custom properties |
| Math rendering | [MathJax 3](https://www.mathjax.org/) |
| Storage | `sessionStorage` (no backend) |
| Build tools | None |

---

## 📝 License

Licensed under the [Apache License 2.0](LICENSE).

---

<sub>Created by JoxNeis · 2026</sub>