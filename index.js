#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todos = [];
let blue = chalk.blue.bold.italic;
let red = chalk.red.bold.italic;
let green = chalk.green.bold.italic;
let white = chalk.white.bold.italic;
let yellow = chalk.yellow.bold.italic;
console.log(blue("\n\t Welcome to Fariha's todo application.\n"));
let condition = true;
while (condition) {
    let task = await inquirer.prompt({
        name: "taskOption",
        type: "list",
        message: white("Select one of the choices"),
        choices: [
            "Add Task",
            "Delete Task",
            "Mark as Complete",
            "Replace Task",
            "View Task",
            "Exit",
        ],
    });
    if (task.taskOption == "Add Task") {
        let addTask = await inquirer.prompt([
            {
                name: "task1",
                type: "input",
                message: white("What you want to add in your todos?"),
            },
            {
                name: "task2",
                type: "confirm",
                message: yellow("Do you want to add more?"),
                default: "yes",
            },
        ]);
        todos.push(addTask.task1);
        console.log(green(`Your task ${todos} has been added successfully.`));
        console.log(todos);
    }
    else if (task.taskOption == "Delete Task") {
        if (todos.length == 0) {
            console.log(red("Your Todo list is empty"));
        }
        else {
            let delTask = await inquirer.prompt([
                {
                    name: "del1",
                    type: "list",
                    message: white("What you want to delete in your todos?"),
                    choices: todos,
                },
                {
                    name: "del2",
                    type: "confirm",
                    message: yellow("Do you want to delete more?"),
                    default: "yes",
                },
            ]);
            let index = todos.indexOf(delTask.del1);
            todos.splice(index, 1);
            todos.forEach((todo) => {
                console.log(todo);
            });
        }
    }
    else if (task.taskOption == "Mark as Complete") {
        if (todos.length == 0) {
            console.log(red("Your Todo list is empty"));
        }
        else {
            let markTask = await inquirer.prompt([
                {
                    name: "mark1",
                    type: "list",
                    message: white("What you want to mark as completed?"),
                    choices: todos,
                },
                {
                    name: "mark2",
                    type: "confirm",
                    message: yellow("Do you want to mark more?"),
                    default: "yes",
                },
            ]);
            let index = todos.indexOf(markTask.mark1);
            todos.splice(index, 1);
            console.log(green(`Congratulations! Your ${markTask.mark1} task has been completed successfully `));
            todos.forEach((todo) => {
                console.log(todo);
            });
        }
    }
    else if (task.taskOption == "Replace Task") {
        let repTask = await inquirer.prompt([
            {
                name: "rep1",
                type: "checkbox",
                message: white("Select todo which you want to update"),
                choices: todos,
                validate: function (answer) {
                    if (answer.length !== 1) {
                        return red("Please Select one todo");
                    }
                    return true;
                },
            },
            {
                name: "rep2",
                type: "input",
                message: yellow("Enter new update todo value"),
            },
            {
                name: "rep3",
                type: "confirm",
                message: white("Do you want to replace more task?"),
                default: "yes",
            },
        ]);
        let userSelect = todos.indexOf(repTask.rep1);
        console.log(todos.splice(userSelect, 1, repTask.rep2));
        console.log(userSelect);
    }
    else if (task.taskOption == "View Task") {
        console.log(green(`Your todo list is: ${todos}`));
    }
    else if (task.taskOption == "Exit") {
        condition = false;
        console.log(blue("Hope you enjoyed your todos!"));
    }
}
