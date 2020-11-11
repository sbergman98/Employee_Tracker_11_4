const mysql = require("mysql");
const inquirer = require("inquirer");



var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "LuckyD852#$",
    database: "employee_tracker_DB"
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);


});





// Write code to use inquirer to gather information about the employees,\

function firstPrompt() {
  return inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do first?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees by Manager",
        "Add Employee",
        "Remove Employee",
        "Updated Employee Role",
        "Update Employee Manager",
      ]
    },
  ])
};

function departmentPrompt() {
  return inquirer.prompt([
    {
      type: "list",
      name: "department",
      message: "What department would you like?",
      choices: [
        "Sales",
        "Management",
        "Human Resources",
      ]
    },
  ])
};

function addEmployeePrompt () {
  return inquirer.prompt([
    // ask question for each field and then make sql query to add to table
  ])
}

function updateEmployeePrompt () {
  // make a loop
  // list off categories
  // if a category is selected, prompt for new value
  // then, ask to continue updating fields or not
  // once done, formulate mysql query to update table
}

function queryEmployeesByDepartment(category, selection) {
    var query = connection.query(`SELECT * FROM employee WHERE ${category}=?`, [selection], function (err, res) {
        if (err) throw err;

        console.table(res);
    });
    // logs the actual query being run
    console.log(query.sql);
    connection.end();
  }


async function init() {

  try {

    const employees = []
    let addMore = true
    while (addMore) {
      firstAnswer = await firstPrompt()
      switch (firstAnswer.action){
        case "View All Employees":
          connection.query('SELECT * FROM employee',   function (error, results, fields) {
              if (error) throw error;
              console.table(results);
            });
          break;
        case  "View All Employees By Department":
          departmentAnswer = await departmentPrompt()
          switch (departmentAnswer.department){
            case "Sales": // associate employees with department_id
              queryEmployeesByDepartment("department_id", "1")
              break;
            case "Mangement":
              queryEmployeesByDepartment("department_id", "2")
              break;
            case "Human Resources":
              queryEmployeesByDepartment("department_id", "3")
              break;
          }
          break;
        case  "View All Employees by Manager":
          connection.query(`SELECT employee.first_name, employee.last_name, roles.title, roles.salary, department.dept_name, 
          manager.first_name AS manager_firstname, manager.last_name AS manager_lastname FROM employee
          LEFT JOIN roles 
          ON employee.role_id = roles.id`,   function (error, results, fields) {
              if (error) throw error;
              console.table(results);
            });
          break;
        case  "Add Employee":

          // look at from-team-profile generator, and once answers object has been crated, use it to form SQL query.
          addedEmployee = addEmployeePrompt();

          
          break;
        case  "Remove Employee":
          // First, sql query to get list of employees
          // then use inquirer select to choose employee and 
          // once selecte, do SQL query to remove employee

          break;
        case  "Update Employee Role" :
          updatedEmployee = updatedEmployeePrompt();

          break;
        default:    
      }
    }
  } catch (err) {
    console.log(err);
  }
}
init();