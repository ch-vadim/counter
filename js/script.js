const activityTypeInput = document.querySelector(".radios-group");
const minActivityInput = activityTypeInput.querySelector('#activity-minimal');

const inputs = document.querySelector('.inputs-group');
const weightInput =  inputs.querySelector('#weight');
const heightInput = inputs.querySelector('#height');
const ageInput = inputs.querySelector('#age');
const genderMaleInput = document.querySelector('#gender-male');

const outputBlock = document.querySelector('.counter__result');
const caloriesNormOutput = outputBlock.querySelector('#calories-norm');
const caloriesMinOutput = outputBlock.querySelector('#calories-minimal');
const caloriesMaxOutput = outputBlock.querySelector('#calories-maximal');

const submitButton = document.querySelector('.form__submit-button');
const resetButton = document.querySelector('.form__reset-button');

let activityCoef = 1.55


const calculateCalories = (weight, height, age, genderCoef) =>  
  Math.round(((10 * weight) + (6.25 * height) - (5 * age) + genderCoef) * activityCoef);


const onSubmitButtonClick = (evt) => {
  evt.preventDefault();

  const weight = weightInput.value;
  const height = heightInput.value;
  const age = ageInput.value;
  const genderCoef = genderMaleInput.checked ? 5 : - 165;

  const calories = calculateCalories(weight, height, age, genderCoef)
  const caloriesMin = Math.round(calories * 0.85);
  const caloriesMax = Math.round(calories * 1.15);

  caloriesNormOutput.textContent = calories;
  caloriesMinOutput.textContent = caloriesMin;
  caloriesMaxOutput.textContent = caloriesMax;

  outputBlock.classList.remove('counter__result--hidden');
}


const onResetButtonClick = (evt) => {
  evt.preventDefault();

  genderMaleInput.checked = true;
  weightInput.value = '';
  heightInput.value = '';
  ageInput.value = '';
  minActivityInput.checked = true;
  submitButton.disabled = true;
  resetButton.disabled = true;

  outputBlock.classList.add('counter__result--hidden');
}


const onInputsField = () => {
  submitButton.disabled = !weightInput.value || !heightInput.value || !ageInput.value;
  resetButton.disabled =  !weightInput.value && !heightInput.value && !ageInput.value;
}


activityTypeInput.addEventListener('change', (evt) => {
  switch(evt.target.id) {
    case 'activity-minimal':
      activityCoef = 1.2;
      break; 
    case 'activity-low':
      activityCoef = 1.375;
      break;
    case 'activity-medium':
      activityCoef = 1.55;
      break;
    case 'activity-high':
      activityCoef = 1.725;
      break;
    case 'activity-maximal':
      activityCoef = 1.9;
      break;
  }
})

inputs.addEventListener('input', onInputsField)

resetButton.addEventListener('click', onResetButtonClick)
submitButton.addEventListener('click', onSubmitButtonClick)