var express = require("express");
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var port = process.env.port || 3006;

// Function for addition
const addTwoNumber = (n1, n2) => {
    return n1 + n2;
};

// Function for subtraction
const subtractTwoNumber = (n1, n2) => {
    return n1 - n2;
};

// Function for multiplication
const multiplyTwoNumber = (n1, n2) => {
    return n1 * n2;
};

// Function for division
const divideTwoNumber = (n1, n2) => {
    if (n2 === 0) {
        return "Cannot divide by zero";
    }
    return n1 / n2;
};

// Handle GET requests for addition
app.get("/addTwoNumber", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    const result = addTwoNumber(n1, n2);
    res.json({ statuscode: 200, data: result });
});

// Handle GET requests for subtraction
app.get("/subtractTwoNumber", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    const result = subtractTwoNumber(n1, n2);
    res.json({ statuscode: 200, data: result });
});

// Handle GET requests for multiplication
app.get("/multiplyTwoNumber", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    const result = multiplyTwoNumber(n1, n2);
    res.json({ statuscode: 200, data: result });
});

// Handle GET requests for division
app.get("/divideTwoNumber", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    const result = divideTwoNumber(n1, n2);
    res.json({ statuscode: 200, data: result });
});

// Handle POST request for basic calculator operation
app.post("/calculate", (req, res) => {
    const { num1, num2, operation } = req.body;
    let result;

    switch (operation) {
        case 'add':
            result = addTwoNumber(num1, num2);
            break;
        case 'subtract':
            result = subtractTwoNumber(num1, num2);
            break;
        case 'multiply':
            result = multiplyTwoNumber(num1, num2);
            break;
        case 'divide':
            result = divideTwoNumber(num1, num2);
            break;
        default:
            return res.status(400).json({ statuscode: 400, message: "Invalid operation" });
    }

    res.json({ statuscode: 200, data: result });
});

app.listen(port, () => {
    console.log("App listening on port: " + port);
});
