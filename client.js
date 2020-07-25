console.log('working');
$(document).ready(readyNow);

function readyNow() {
    addClickHandlers();
}

function addClickHandlers() {
    $('#submitButton').on('click', submitInput)
    $('#appendTarget').on('click', '.employeeInfo', deleteEmployee) 
    // $('#appendTarget').on('click', '.employeeInfo', subtractEmployeeSalary) //DYNAMIC CLICK LISTENER!!!!!!
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
        salarySetter(employeeList);
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
        let annualSalaryAppend = `<td class="employeeInfo"><span class="salary">${worker.annualSalary} </span> </td> `;                                            
        let deleteButton = `<td class="employeeInfo"> <button class"deleteButton"> Delete </button> </td>`;


        $('#appendTarget').append(`<tr>${firstNamedAppend} ${secondNamedAppend} ${idAppend} ${jobTitleAppend} ${annualSalaryAppend} ${deleteButton}</tr>`);
    }
}




function deleteEmployee() {

    let clickedRow = $(this).closest("tr"); 
    let clickedSalary = Number((clickedRow.find("td:eq(4)").text())/12); 

    console.log(clickedSalary);
    previousSalaryTotal = salaryCalculator();
    console.log(previousSalaryTotal);

    
    let currentTotalSalary = previousSalaryTotal - clickedSalary;
    let roundedCurrentSalary = Number(Math.round(currentTotalSalary+'e2')+'e-2');


    if (employeeList.length === 0) {
        $('#calculator').empty();
        $('#calculator').append( `<h3 id="calculator"> Total Monthly Cost: $${0.00} </h3>`);
    }
    else{
        let lessEmployeeSalary = `<h3 id="calculator"> Total Monthly Cost: $${roundedCurrentSalary} </h3>`;
        $('#calculator').empty();
        $('#calculator').append(lessEmployeeSalary);

    }

    $(this).parent().remove();
    clickIndex = employeeList.indexOf($(this));
    employeeList.splice(clickIndex);

}

function salaryCalculator() {
        let totalSalary = 0;
        for (let i = 0; i < employeeList.length; i++) {
            totalSalary = totalSalary + ((employeeList[i].annualSalary) / 12);
            roundedTotalSalary = Number(Math.round(totalSalary+'e2')+'e-2');
        }
    return roundedTotalSalary;
}





function salarySetter() {
    // let totalSalary = 0;
    
    
    // for (let i = 0; i < employeeList.length; i++) {
    //     totalSalary = totalSalary + ((employeeList[i].annualSalary) / 12);
    //     roundedTotalSalary = Number(Math.round(totalSalary+'e2')+'e-2');
    // }
    
    console.log(salaryCalculator());
    result = salaryCalculator();

    let newestSalaryAmount = `<h3 id="calculator"> Total Monthly Cost: $${result} </h3>`
    $('#calculator').empty();
    $('#calculator').append(newestSalaryAmount)

}









    // clickedId =  $(this).parent().val();
    // for (let i = 0; i < employeeList.length; i++) {
    //     totalSalary += Number(employeeList[i].annualSalary / 12);
    // }
    // for (let i = 0; i < employeeList.length; i++) {
    //     updatedSalary = totalSalary - Number(employeeList[this].annualSalary);
    // }
