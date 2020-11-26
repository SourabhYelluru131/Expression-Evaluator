class PrefixError(Exception):

    def __init__(self, *args, **kwargs):
        Exception.__init__(self, *args, **kwargs)  # call the superclass
        print 'Not a valid prefix expression'

class PostFixError(Exception):

    def __init__(self, *args, **kwargs):
        Exception.__init__(self, *args, **kwargs)  # call the superclass
        print 'Not a valid postfix expression'


operators = ['+', '-', '*', '/']


def check_postfix(ex):
    arr = ex.split(" ")
    count = 0
    """
    Count decreases by 2 on encountering operator
    Count increases by 1 when encountering an operand
    Count must never go below 0 if postfix expression is valid
    """
    for x in arr:
        if x in operators:
            count -= 2
        else:
            count += 1
        if count < 0:
            return False
    return True


def check_prefix(ex):
    op = 0
    opd = 0
    arr = ex.split(" ")
    """
    If operators is less than operands before two elements before the last, then it is invalid
    """
    for i in range(0, len(arr)):
        if arr[i] in operators:
            op += 1
        else:
            opd += 1
        if op < opd and i < len(arr)-2:
            return False
    if op != opd-1:
        return False
    return True


def evaluate(op1,op2,x):
    op1 = int(op1)
    op2 = int(op2)
    if x == '+':
        return op1+op2
    elif x == '-':
        return op1-op2
    elif x == '*':
        return op1*op2
    else:
        return op1/op2


def prefix_eval(ex):
    arr = ex.split(" ")
    arr.reverse()
    stack = []
    for x in arr:
        if x in operators:
            op1 = stack.pop()
            op2 = stack.pop()
            stack.append(evaluate(op1, op2, x))
        else:
            stack.append(x)
    return stack[0]


def postfix_eval(ex):
    arr = ex.split(" ")
    stack = []
    for x in arr:
        if x in operators:
            op2 = stack.pop()
            op1 = stack.pop()
            stack.append(evaluate(op1, op2, x))
        else:
            stack.append(x)
    return stack[0]


print("Enter 1 f you want to evaluate a prefix expression")
print("Enter 2 if you want to evaluate a postfix expression")
choice = int(input())
print("Enter the expression with spaces in between the number and operator")
exp = input()
if choice == 1:
    try:
        assert check_prefix(exp) is True
        print(prefix_eval(exp))
    except AssertionError as error:
        raise PrefixError
else:
    try:
        assert check_postfix(exp) is True
        print(postfix_eval(exp))
    except AssertionError as error:
        raise PostFixError



