#! /usr/bin/env node
import inquirer from "inquirer";
let myBalance = 10000;
let myPin = 1010;
let keepGoing = true;
let count = 0;
let pinEntered = false;
do {
    if (!pinEntered) {
        let pinAns = await inquirer.prompt({
            name: "pin",
            message: "Please enter your Pin : ",
            type: "number",
        });
        if (pinAns.pin === myPin) {
            console.log("Correct pin code");
            pinEntered = true;
        }
        else {
            console.log("Incorrect Pin !");
            count++;
            if (count === 1) {
                console.log("\nLast chance to enter correct pin otherwise, Your card will be captured.");
                continue;
            }
            else {
                console.log("Your Card is Captured\nPlease contact our main Branch");
                break;
            }
        }
    }
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: "Select Operation",
            type: "list",
            choices: ["withdraw", "check balance", "fastcash", "change Pin", "Exit"],
        },
    ]);
    if (operationAns.operation === "withdraw") {
        let amountAns = await inquirer.prompt([
            {
                name: "amount",
                message: "Enter your amount: ",
                type: "number",
            },
        ]);
        if (amountAns.amount > myBalance) {
            console.log("Insufficient balance\n");
            console.log("Select Operation");
            continue;
        }
        else {
            myBalance -= amountAns.amount;
            console.log("Transaction Completed");
            console.log("Your remaining balance is: " + myBalance);
        }
    }
    else if (operationAns.operation === "check balance") {
        console.log("Your balance is: " + myBalance);
    }
    else if (operationAns.operation === "fastcash") {
        let cashAns = await inquirer.prompt([
            {
                name: "fastcash",
                message: "Select Option from the following: ",
                type: "list",
                choices: [1000, 2000, 3000, 5000, 10000],
            },
        ]);
        let amount = cashAns.fastcash;
        if (amount <= myBalance) {
            myBalance -= amount;
            console.log("Transaction Completed");
            console.log("Your remaining balance is: " + myBalance);
            break;
        }
        else {
            console.log("Insufficient balance\n");
            console.log("Select Operation");
            continue;
        }
    }
    else if (operationAns.operation === "change Pin") {
        let newpin = await inquirer.prompt({
            name: "setPin",
            message: "Enter the new Pin: ",
            type: "number"
        });
        myPin = newpin.setPin;
        pinEntered = false;
        console.log("\n---Back to Login---");
    }
    else if (operationAns.operation === "Exit") {
        break;
    }
} while (keepGoing);
