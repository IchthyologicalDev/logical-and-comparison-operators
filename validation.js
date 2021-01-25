/*
WARNING!!!!!
This file checks your work. If you make changes to this file, then the tests might not work.
*/


const UNCHANGED_MESSAGE = 'Did you make a change yet? If so, make sure that you saved your file and refreshed this page!';
const SUCCESS = Symbol('success');

/**
 * Clears all nested content from an element
 * @param {HTMLElement} element - element to clear
 */
const clearElement = (element) => {
    while(element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
}

/**
 * Writes a result message to the DOM
 * @param {number} questionIndex - DOM index for this question
 * @param {string} result - message to be written
 * @param {boolean} success - whether the test passed
 */
const writeResult = (questionIndex, result, success) => {
    const resultElement = document.querySelectorAll('.problem-container > .question')[questionIndex].querySelector('.result');
    clearElement(resultElement);
    const textNode = document.createTextNode(result);
    resultElement.appendChild(textNode);

    if(success) {
        resultElement.classList.add('pass');
    }
    else if (result !== UNCHANGED_MESSAGE) {
        resultElement.classList.add('fail');
    }

}

/**
 * Main function. Runs validation on all provided questions.
 * @param {Object[]} questions - Array of questions
 */
const runValidation = (questions) => {
    questions.forEach((question, index) => {
        question.validate();

        writeResult(index, question.message, question.passed);
    });
}

/**
 * Creates a question object.
 * @param {function} validator - function that returns a boolean based on this question passing
 * @param {string} success - message if result passes validation
 * @param {string} failure  - message if result fails validation
 * 
 * @returns {Object} - question object
 */
const question = (validator) => {
    return {
        validate: function () {
            try {
                const { passed, message } = validator();
                this.message = message;
                this.passed = passed;
            }
            catch (e) {
                if (e.name === 'ReferenceError') {
                    this.message = 'Your code has an error at or before this question. Open up your console to see more information.'
                    this.passed = false;
                    console.error(e);
                }
            }
        }
    }
}

/**
 * 
 * @param {boolean} passed - Whether the requirement was met
 * @param {string} message - message to display
 * @returns {object} - Result Object
 */
const resultObject = (passed, message) => ({ passed, message })

/*
***********************************************************************************
*************************************IMPORTANT*************************************
***********************************************************************************
Everything below can be safely removed from the template. You MIGHT want to keep the 
getTypeMessage function, depending on the problems that you have in mind. Perhaps 
additional helper methods will be added later. This template will be updated accordingly.
There is a short example of what validation functions might look like, as well as an
example of triggering validation.
***********************************************************************************
***********************************************************************************
*/

const objectEquals = (actual, expected) => {
    throw new Error('NOT IMPLEMENTED');
}

/**
 * 
 * @param {*} actual 
 * @param {*} expected 
 * @param {string} successMessage 
 * @returns resultObject
 */
const equals = (actual, expected, successMessage) => {
    return typeof expected == 'object' 
        ? objectEquals(actual, expected)
        : actual === expected;
}

/**
 * NOTE: The error message is only accurate when using primitives
 * @param {function} fn - function under test
 * @param {* []} given - arguments array
 * @param {*} expected
 * @param {string} successMessage 
 * @returns resultObject
 */
const getResultMessage = (fn, given, expected) => {
    const actual = fn(...given);
    return equals(actual, expected)
        ? SUCCESS
        : `Error when running ${fn.name}(${[...given].toString()}): Expected ${expected}, but got ${actual}.${expected == actual ? ' Check your data type!':''}`;
}

const makeCase = (given, expected) => ({given, expected})

const runCases = (fn, testCases, successMessage) => {
    for(const testCase of testCases) {
        const {given, expected} = testCase;
        const result = getResultMessage(fn, given, expected);
        if(result != SUCCESS) {
            return resultObject(false, result);
        }
    }
    return resultObject(true, successMessage)
}

const testAdd = () => {
    const testCases = [
        makeCase(['5', '5'], 10),
        makeCase(['-5', '5'], 0),
        makeCase(['3.1', 3], 6.1),
        makeCase([1.2, 2.1], 3.3),
        makeCase([42, '0'], 42)
    ]
    return runCases(add, testCases, 'This all adds up to a successful function!');
}

const testRoundDownToTens = () => {
    const testCases = [
        makeCase([10], 10),
        makeCase([22], 20),
        makeCase([3], 0),
    ]
    return runCases(roundDownToTens, testCases, 'Success! We just round them all down, and just drop the remainder.');
}

const testGetMonthlyPayment = () => {
    const testCases = [
        makeCase([1000, .06], 5),
        makeCase([1000, 0], 0),
        makeCase([0, 1], 0),
        makeCase([12, 1], 1),
    ]
    return runCases(getMonthlyPayment, testCases, 'Success! Did this question pique your interest?');
}

const testGetTaxRate = () => {
    const testCases = [
        makeCase([1000, 100], 10),
        makeCase([1000, 0], 0),
        makeCase([6000, 1500], 25),
    ]
    return runCases(getTaxRate, testCases, 'Success! The IRS wants to know if you\'re job hunting.');
}

const testMakeIOweYou = () => {
    const testCases = [
        makeCase([750, .01], 'I owe you $757.5'),
        makeCase([1200, .02], 'I owe you $1224'),
        makeCase([1500, 0], 'I owe you $1500'),
    ]
    return runCases(makeIOweYou, testCases, 'I owe you a success message!');
}

const testGetLeftoverBait = () => {
    const testCases = [
        makeCase([100, 9], 1),
        makeCase([89, 7], 5),
        makeCase([42, 1], 0),
    ]
    return runCases(getLeftoverBait, testCases, 'Remainder of 0 failing test cases');
}

const testGetDuration = () => {
    const testCases = [
        makeCase([40, 20], 30),
        makeCase([50, 75], 90),
        makeCase([1, 10], 600),
    ]
    return runCases(getDuration, testCases, 'Success! Let\'s jet');
}

const testGetPopulation = () => {
    const testCases = [
        makeCase([5, 1], 30),
        makeCase([10, 2], 360),
        makeCase([7, 0], 7),
    ]
    return runCases(getPopulation, testCases, '"So many friends, SO MANY FISH!" - Lucy Cousins');
}

//NOTE: The order of questions in this array must match the order of requirements on the DOM and in the index.js file.
const questions = [
    question(testAdd),
    question(testRoundDownToTens),
    question(testGetMonthlyPayment),
    question(testGetTaxRate),
    question(testMakeIOweYou),
    question(testGetLeftoverBait),
    question(testGetDuration),
    question(testGetPopulation)
]

runValidation(questions);