console.log('working');
$(document).ready(readyNow);

function readyNow() {
    addClickHandlers();
}

function addClickHandlers() {
    $('#submitButton').on('click', submitEmployee)
    $('#appendTarget').on('click', '.employeeInfo', deleteEmployee)
    // $('#appendTarget').on('click', '.employeeInfo', subtractEmployeeSalary) //DYNAMIC CLICK LISTENER!!!!!!
}

let employeeList = [];

function submitEmployee() {

    ///CONNECT THE INPUT FIELDS TO A NEW EMPLOYEE OBJECT 
    let employee = {
        firstName: $('#firstNameInput').val(),
        lastName: $('#lastNameInput').val(),
        id: $('#employeeIdInput').val(),
        jobTitle: $('#jobTitleInput').val(),
        annualSalary: $('#annualSalaryInput').val(),
    }

    if (employee.firstName === '' || employee.secondName === '' || employee.id === '' || employee.jobTitle === '' || employee.id === '') {
        alert('please enter all fields');
    }
    else {
        employeeList.push(employee); ///PUSHES EMPLOYEE INTO EMPLOYEE LIST ARRAY
        // appendItemToDom();
        appendEmployeeToTable(); // add employee object to table fields
        totalMonthlyCostSetter(employeeList); //
        console.log(employee);
        console.log(employeeList);

    }


    $('#firstNameInput').val('');
    $('#lastNameInput').val('');
    $('#employeeIdInput').val('');
    $('#jobTitleInput').val('');
    $('#annualSalaryInput').val('');

}

function appendEmployeeToTable() {

    $('#appendTarget').empty();

    for (let worker of employeeList) {
        let firstNamedAppend = `<td class="employeeInfo"> ${worker.firstName} </td>`;
        let secondNamedAppend = `<td class="employeeInfo"> ${worker.lastName}</td>`;
        let idAppend = `<td class="employeeInfo" > ${worker.id}</td> `;
        let jobTitleAppend = `<td class="employeeInfo" > ${worker.jobTitle}</td> `;
        let annualSalaryAppend = `<td class="employeeInfo"><span class="salary">${worker.annualSalary} </span> </td> `;
        let deleteButton = `<td class="employeeInfo"> <button class"deleteButton"> Delete </button> </td>`;


        $('#appendTarget').append(`<tr>${firstNamedAppend} ${secondNamedAppend} ${idAppend} ${jobTitleAppend} ${annualSalaryAppend} ${deleteButton}</tr>`);
    }
}

function salaryCalculator() {
    ///calculate Total Monthly Cost of employee salaries
    let totalSalary = 0;
    for (let i = 0; i < employeeList.length; i++) {
        totalSalary = totalSalary + ((employeeList[i].annualSalary) / 12);
        roundedTotalSalary = Number(Math.round(totalSalary + 'e2') + 'e-2');
    }
    return roundedTotalSalary; //output is TMC
}

function totalMonthlyCostSetter() {
    ///check if Total Monthly Cost of salaries is over $20,000
    if (salaryCalculator() > 20000) {
        $('#calculator').addClass("over")  ///add red color if TMC is over 20,000
    }

    let newestSalaryAmount = `<h3 id="calculator"> Total Monthly Cost: $${salaryCalculator()} </h3>` // Naming dynamic h3 so its easier to read when adding
    $('#calculator').empty(); // empty the previous TMC h3
    $('#calculator').append(newestSalaryAmount)  //adding the new TMC as per input fields

}

function deleteEmployee() {

    let clickedRow = $(this).closest("tr"); //get clicked table row
    let clickedSalary = Number((clickedRow.find("td:eq(4)").text()) / 12); //getting table cell value of annual salary

    console.log(clickedSalary);
    previousSalaryTotal = salaryCalculator(); //get before-click TMC
    console.log(previousSalaryTotal);

    let currentTotalSalary = previousSalaryTotal - clickedSalary;  //math to get after-click TMC 
    let roundedCurrentSalary = Number(Math.round(currentTotalSalary + 'e2') + 'e-2');  //rounding function

    let lessEmployeeSalary = `<h3 id="calculator"> Total Monthly Cost: $${roundedCurrentSalary} </h3>`;  ///display expression
    $('#calculator').empty();  //empty before-click value
    $('#calculator').append(lessEmployeeSalary);  //set after-click value

    //turn red if over $20000 in monthly total cost
    if (roundedCurrentSalary > 20000) {
        $('#calculator').addClass("over") // turns red
    } else {
        $('#calculator').removeClass("over") // removes red, turns back to black
    }

    $(this).parent().remove(); // getting rid of the entire row @ where button is clicked
    clickIndex = employeeList.indexOf($(this));  //finding the index value of the clicked employee 
    employeeList.splice(clickIndex);  //removing the clicked employee from employee list

}

