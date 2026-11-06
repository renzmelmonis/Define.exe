export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
export function createQuiz(questions) {
  return {
    questions: shuffle(questions),
    index: 0,
    answers: [],
    checked: false,
  };
}
export function answerQuiz(state, choice) {
  if (
    state.checked ||
    !state.questions[state.index] ||
    !Number.isInteger(choice) ||
    choice < 0 ||
    choice >= state.questions[state.index].choices.length
  )
    return false;
  state.answers.push(choice);
  state.checked = true;
  return true;
}
export function nextQuestion(state) {
  if (!state.checked) return false;
  state.index++;
  state.checked = false;
  return true;
}
export function quizScore(state) {
  return state.answers.reduce(
    (score, answer, i) => score + Number(answer === state.questions[i].answer),
    0,
  );
}
