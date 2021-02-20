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

const testWillCatchFish = () => {
    const testCases = [
        makeCase([true, 0], true),
        makeCase([true, 7], true),
        makeCase([true, 8], true),
        makeCase([false, 8], true),
        makeCase([false, 7], false)
    ]
    return runCases(willCatchFish, testCases, 'If we know whether or not we\'ll catch fish, it kind of takes the fun out of fishing, no?');
}

const testIsRecordBreakingCod = () => {
    const testCases = [
        makeCase(['code', 104], false),
        makeCase(['cod', 103], false),
        makeCase(['cod', 104], true),
        makeCase(['code', 103], false),
    ]
    return runCases(isRecordBreakingCod, testCases, 'Was that a record breaking cod or a code breaking record?');
}

const testIsBoatSafe = () => {
    const testCases = [
        makeCase([5], true),
        makeCase([5.1], false),
        makeCase([0], true)
    ]
    return runCases(isBoatSafe, testCases, 'Now to hook up my anemometer to this function.');
}

const testWasFishingFun = () => {
    const testCases = [
        makeCase([true, true], true),
        makeCase([false, false], true),
        makeCase([true, false], false),
        makeCase([false, true], false)
    ]
    return runCases(wasFishingFun, testCases, 'Misery loves company, as long as that company doesn\'t catch the only fish.');
}

const testIsBoatSufficient = () => {
    const testCases = [
        makeCase([10,10,1], false),
        makeCase([5,10,10], false),
        makeCase([5,10,11], true),
        makeCase([11,10,1], true),
        makeCase([10,10,10], false),
    ]
    return runCases(isBoatSufficient, testCases, 'I\'d still like to have a bigger boat.');
}

const testShouldMove = () => {
    const testCases = [
        makeCase([false, 1, 1], false),
        makeCase([true, 1, 1], false),
        makeCase([true, 1, 0], false),
        makeCase([false, 1, 0], true),
    ]
    return runCases(shouldMove, testCases, 'Not catching fish over there is always better than continuing to not catch fish here.');
}

const testCanJustifyFishing = () => {
    const testCases = [
        makeCase([true, null], true),
        makeCase([true, 0], true),
        makeCase([true, ''], true),
        makeCase([true], true),
        makeCase([true, 'Grade Stuff'], false),
        makeCase([false, 'Grade Stuff'], true),
        makeCase([false, ''], true),
    ]
    return runCases(canJustifyFishing, testCases, 'That was weird...The second argument always seems to be 0...I guess I should go fishing.');
}

const testIsSameFish = () => {
    const testCases = [
        makeCase(['Dorothy', 'Dorothy'], true),
        makeCase(['Bruce', 'Dorothy'], false),
    ]
    return runCases(isSameFish, testCases, 'Fish have a lot better memory than you might believe, but they\'re always hungry.');
}

//NOTE: The order of questions in this array must match the order of requirements on the DOM and in the index.js file.
const questions = [
    question(testWillCatchFish),
    question(testIsRecordBreakingCod),
    question(testIsBoatSafe),
    question(testWasFishingFun),
    question(testIsBoatSufficient),
    question(testShouldMove),
    question(testCanJustifyFishing),
    question(testIsSameFish)
]

runValidation(questions);