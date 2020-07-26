console.log('working');
$(document).ready(readyNow);

function readyNow() {
    addClickHandlers();
}

function addClickHandlers() {
    $('#inputForm').submit(addEmployeeToArray)
    $('#appendTarget').on('click', '.employeeInfo', deleteEmployee)
}

let employeeList = [];

function addEmployeeToArray() {
    
    ///CONNECT THE INPUT FIELDS TO A NEW EMPLOYEE OBJECT 
    let employee = {
        firstName: $('#firstNameInput').val(),
        lastName: $('#lastNameInput').val(),
        id: $('#employeeIdInput').val(),
        jobTitle: $('#jobTitleInput').val(),
        annualSalary: $('#annualSalaryInput').val(),
    }

    if (employee.firstName === '' || employee.secondName === '' || employee.id === '' || employee.jobTitle === '' || employee.id === '' || employee.annualSalary === '') {
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

    return false;
}


function appendEmployeeToTable() {

    $('#appendTarget').empty();

    for (let worker of employeeList) {
        let firstNamedAppend = `<td class="employeeInfo"> ${worker.firstName} </td>`;
        let secondNamedAppend = `<td class="employeeInfo"> ${worker.lastName}</td>`;
        let idAppend = `<td class="employeeInfo text-center" > ${worker.id}</td> `;
        let jobTitleAppend = `<td class="employeeInfo text-center" > ${worker.jobTitle}</td> `;
        let annualSalaryAppend = `<td class="employeeInfo text-center"><span class="salary">${worker.annualSalary} </span> </td> `;
        let deleteButton = `<td class="employeeInfo text-center"> <button type="button" class="btn btn-outline-secondary delete" > Delete </button> </td>`;

        employeeToAppend = `<tr>${firstNamedAppend} ${secondNamedAppend} ${idAppend} ${jobTitleAppend} ${annualSalaryAppend} ${deleteButton}</tr>`;
        $('#appendTarget').append(employeeToAppend);
    }
}



function salaryCalculator(someArray) {
    let totalSalary = 0;
    for (let i = 0; i < someArray.length; i++) {	
        totalSalary = totalSalary + Number((someArray[i].annualSalary) / 12);
    }
    roundedTotalSalary = totalSalary.toFixed(2);    
    return roundedTotalSalary;
}




function deleteEmployee() {
    //delete employee from table and employeeList array
    let clickedRow = $(this).closest("tr"); //get clicked table row
    let clickedSalary = (clickedRow.find("td:eq(4)").text() / 12); //getting table cell value of annual salary
    console.log(clickedSalary);

    let total = 0;
    for (let i = 0; i < employeeList.length; i++) {	
        total = total + Number(((employeeList[i].annualSalary)) / 12);
    }
    roundedSalary = total.toFixed(2);
    console.log(Number(roundedSalary)); //get before-click TMC
    

    let currentTotalSalary = Number(roundedSalary) - clickedSalary;  //math to get after-click TMC 
    let roundedCurrentSalary = (Math.round(Number(currentTotalSalary) + 'e2') + 'e-2');  //rounding function

  
    let lessEmployeeSalary = `<h3 class="text-center" id="calculator"> Total Monthly Cost: $${Number(roundedCurrentSalary)} </h3>`;  ///display expression
    $('#calculator').empty();  //empty before-click value
    $('#calculator').append(lessEmployeeSalary);  //set after-click value


    $(this).parent().remove(); // getting rid of the entire row @ where button is clicked
    clickIndex = employeeList.indexOf($(this));  //finding the index value of the clicked employee 
    employeeList.splice(clickIndex);  //removing the clicked employee from employee list
    

    //turn red if over $20000 in monthly total cost
    if (roundedCurrentSalary > 20000) {
        $('#calculator').addClass("over") // turns red
    } else {
        $('#calculator').removeClass("over") // removes red, turns back to black
    }
}

function totalMonthlyCostSetter() {
    ///check if Total Monthly Cost of salaries is over $20,000
    if (salaryCalculator(employeeList) > 20000) {
        $('#calculator').addClass("over")  ///add red color if TMC is over 20,000
    }

    let newestSalaryAmount = `<h3 class="text-center"id="calculator"> Total Monthly Cost: $${salaryCalculator(employeeList)} </h3>` // Naming dynamic h3 so its easier to read when adding
    $('#calculator').empty(); // empty the previous TMC h3
    $('#calculator').append(newestSalaryAmount)  //adding the new TMC as per input fields

}




