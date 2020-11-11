const inquirer = require("inquirer");

function initialPrompt () {
  return inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the employee's first name?"
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employee's last name?"
    },
    {
      type: "list",
      name: "role",
      message: "What is the employee's role?",
      choices: [
        "Sales Lead",
        "Salesperson",
        "Regional Manager",
        "Human Resources Manager"
      ]
    }
  ])
};

async function managerPrompt () {
  const managers = await // get managers with sql query
  return inquirer.prompt([
    {
      type: "list",
      name: "manager",
      message: "Who is the employee's manager?",
      choices: managers
    }
  ])
};

let answers;
let managerAnswer;

async function init () {
  try {
    answers = await initialPrompt();
    managerAnswer = await managerPrompt();
    Object.assign(answers, managerAnswer);
    return answers;
  } catch (err) {
    console.log(err);
  }
}

init();