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
  ]);
}

function updatePrompt() {

  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of the Employee?"
    },
    {
      type: "input",
      name: "email",
      message: "What is the Employee's Email?"
    },
    {
      type: "input",
      name: "id",
      message: "What is the Employee ID number?"
    },
    {
      type: "list",
      name: "role",
      message: "What type of Employee are they?",
      choices: [
        "Intern",
        "Engineer",
        "Manager",
      ]
    },

  ])
};

function rolePrompt(role) {
  if (role === "Intern") {
    return inquirer.prompt([
      {
        type: "input",
        name: "school",
        message: "What School does the intern go to?"
      },
    ])
  } else if (role === "Manager") {
    return inquirer.prompt([
      {
        type: "input",
        name: "officeNumber",
        message: "What is the office number?"
      },
    ])
  } else if (role === "Engineer")
    return inquirer.prompt([
      {
        type: "input",
        name: "gitHubName",
        message: "What is your GitHub Name?"
      },
    ])


};

function continuePrompt() {
  return inquirer.prompt([
    { 
      type: "list",
      name: "continue",
      message: "Do you want to add more Employees?",
      choices: [
              "Yes",
              "No",
            ]
    },
  ])
 
};


let answers;
let roleAnswer;
let employee;
let continuation;

async function init() {

  try {

    const employees = []
    let addMore = true
    while (addMore) {
      answers = await generalPrompt()
      roleAnswer = await rolePrompt(answers.role)
      Object.assign(answers, roleAnswer)
      switch(answers.role) {
        case "Intern":
          employee = new Intern(answers.name, answers.id, answers.email, answers.school)
          break;
        case "Manager":
          employee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
          break;
        default:
          employee = new Engineer(answers.name, answers.id, answers.email, answers.gitHubName)
      }
      employees.push(employee)
      continuation = await continuePrompt()
      addMore = continuation.continue === "Yes"
    }
    


    const html = render(employees);
     
    await writeFileAsync("Output/team.html", html);

  } catch (err) {
    console.log(err);
  }

}



init();


