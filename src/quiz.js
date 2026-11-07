// Shuffle a copy so the original question bank is never changed.
export function shuffle(items, random) {
  if (random === undefined) {
    random = Math.random;
  }

  const shuffledItems = items.slice();

  for (let index = shuffledItems.length - 1; index > 0; index = index - 1) {
    const randomNumber = random();
    const randomIndex = Math.floor(randomNumber * (index + 1));
    const temporaryItem = shuffledItems[index];

    shuffledItems[index] = shuffledItems[randomIndex];
    shuffledItems[randomIndex] = temporaryItem;
  }

  return shuffledItems;
}

export function createQuiz(questions) {
  const shuffledQuestions = shuffle(questions);

  return {
    questions: shuffledQuestions,
    index: 0,
    answers: [],
    checked: false,
  };
}

// Accept one answer only. The learner must press Next before answering again.
export function answerQuiz(state, choice) {
  if (state.checked) {
    return false;
  }

  const question = state.questions[state.index];

  if (question === undefined) {
    return false;
  }

  if (!Number.isInteger(choice)) {
    return false;
  }

  if (choice < 0) {
    return false;
  }

  if (choice >= question.choices.length) {
    return false;
  }

  state.answers.push(choice);
  state.checked = true;
  return true;
}

export function nextQuestion(state) {
  if (!state.checked) {
    return false;
  }

  state.index = state.index + 1;
  state.checked = false;
  return true;
}

export function quizScore(state) {
  let score = 0;

  for (let index = 0; index < state.answers.length; index = index + 1) {
    const selectedAnswer = state.answers[index];
    const correctAnswer = state.questions[index].answer;

    if (selectedAnswer === correctAnswer) {
      score = score + 1;
    }
  }

  return score;
}
