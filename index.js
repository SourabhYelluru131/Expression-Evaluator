const operators = ['+', '-', '*', '/'];

const checkPostFix = (expression) => {
    let arr = expression.split(" ");
    let count = 0;

    for (var i = 0; i < arr.length; i++) {
        if (operators.includes(arr[i])) {
            count -= 2;
        }
        if (count < 0) {
            return false;
        }
        count += 1;
    }

    return true;
}


const checkPreFix = (expression) => {
    let op = 0;
    let opd = 0;
    let arr = expression.split(" ");
    for (var i = 0; i < arr.length; i++) {
        if (operators.includes(arr[i])) {
            op += 1;
        }
        else {
            opd += 1;
        }
        if (op < opd && i < (arr.length - 2)) {
            return false;
        }
    }
    if (op !== (opd - 1)) {
        return false;
    }
    return true;
}


const evaluate = (op1, op2, x) => {
    let op1r = parseInt(op1);
    let op2r = parseInt(op2);
    switch (x) {
        case '+':
            return op1r + op2r;
        case '-':
            return op1r - op2r;
        case '*':
            return op1r * op2r;
        case '/':
            return op1r / op2r;
        default:
            return null;
    }
}


const prefixEval = (expression) => {
    arr = expression.split(" ");
    arr.reverse();
    let stack = [];
    arr.forEach(element => {
        if (operators.includes(element)) {
            let op1 = stack.pop();
            let op2 = stack.pop();
            stack.push(evaluate(op1, op2, element));
        }
        else {
            stack.push(element);
        }
    });
    return stack[0];
}


const postfixEval = (expression) => {
    arr = expression.split(" ");
    let stack = [];
    arr.forEach(element => {
        if (operators.includes(element)) {
            let op1 = stack.pop();
            let op2 = stack.pop();
            stack.push(evaluate(op1, op2, element));
        }
        else {
            stack.push(element);
        }
    });
    return stack[0];
}


// eventhandlers for radio buttons
const choice = () => {
    let choices = document.getElementsByClassName("choice");
    for (i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            return choices[i];
        }
    }
}

// main driver function

function evaluateExpression() {
    let exp = document.getElementById("exp").value;
    const rbs = document.querySelectorAll('input[name="choice"]');
    let selectedChoice;
    for (const rb of rbs) {
        if (rb.checked) {
            selectedChoice = rb.value;
            break;
        }
    }
    if (selectedChoice == undefined) {
        alert("Please choose either prefix or postfix");
    }

    if (selectedChoice == 1) {
        if (checkPreFix(exp) == true) {
            let result = prefixEval(exp);
            document.getElementById("result").innerHTML = "Result of the expression is: " + result;
        }
        else {
            alert("Not a valid prefix expression");
        }
    }
    else if (selectedChoice == 2) {
        if (checkPostFix(exp)) {
            let result = postfixEval(exp);
            document.getElementById("result").innerHTML = "Result of the expression is: " + result;
        }
        else {
            alert("Not a valid postfix expression");
        }
    }
}

