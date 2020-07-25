console.log('working');
$(document).ready(readyNow);

function readyNow() {
    addClickHandlers();
}

function addClickHandlers() {
    $('#submitButton').on('click', submitInput)
    $('#appendTarget').on('click', '.employeeInfo', deleteEmployee) //DYNAMIC CLICK LISTENER!!!!!!
}

let employeeList = [];

function submitInput() {

    ///CONNECT THE INPUT FIELDS TO AN OBJECT 
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
        employeeList.push(employee); ///PUSHES INVENTORY ITEM INTO INVENTORY ARRAY
        // appendItemToDom();
        appendItemToTable();
        salaryCalculator(employeeList);
        console.log(employee);
        console.log(employeeList);

    }


    $('#firstNameInput').val('');
    $('#lastNameInput').val('');
    $('#employeeIdInput').val('');
    $('#jobTitleInput').val('');
    $('#annualSalaryInput').val('');

}


function appendItemToTable() {

    $('#appendTarget').empty();

    for (let worker of employeeList) {
        let firstNamedAppend = `<td class="employeeInfo"> ${worker.firstName} </td>`;
        let secondNamedAppend = `<td class="employeeInfo"> ${worker.lastName}</td>`;
        let idAppend = `<td class="employeeInfo" > ${worker.id}</td> `;
        let jobTitleAppend = `<td class="employeeInfo" > ${worker.jobTitle}</td> `;
        let annualSalaryAppend = `<td class="employeeInfo" > ${worker.annualSalary}</td> `;
        let deleteButton = `<td class="employeeInfo"> <button class"deleteButton"> Delete </button> </td>`;


        $('#appendTarget').append(`<tr>${firstNamedAppend} ${secondNamedAppend} ${idAppend} ${jobTitleAppend} ${annualSalaryAppend} ${deleteButton}</tr>`);
    }
}

function deleteEmployee() {

    $(this).parent().remove();
    

    clickIndex = employeeList.indexOf($(this));
    // console.log(lastClickIndex); /// LOL AT THAT RESULT. have to always try a hunch and sometimes it works!
    employeeList.splice(clickIndex);
    
    for (let i = 0; i < employeeList.length; i++) {
        updatedSalary - Number(employeeList[i].annualSalary);
    }
    let lessEmployeeAmount = `<h3 id="calculator"> Total Monthly Cost: $${totalSalary} </h3>`
    $('#calculator').empty();
    $('#calculator').append(lessEmployeeAmount)
    // $('#calculator').empty();
}

let totalSalary = 0;

function salaryCalculator() {

    for (let i = 0; i < employeeList.length; i++) {
        totalSalary += Number(employeeList[i].annualSalary / 12);
    }
    console.log(totalSalary);
    let newSalaryAmount = `<h3 id="calculator"> Total Monthly Cost: $${totalSalary} </h3>`
    $('#calculator').empty();
    $('#calculator').append(newSalaryAmount)
    
}


