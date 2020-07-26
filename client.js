console.log('working');
$(document).ready(readyNow);

function readyNow() {
    addClickHandlers();
}

function addClickHandlers() {
    $('#inputForm').submit(addEmployeeToArray)
    $('#employeeParent').on('click', '.employeeInfo', deleteEmployeeSalary)
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
        ////ADD EMPLOYEE TO DOM//
        $('#employeeParent').empty();

        for (let worker of employeeList) {
            let firstNamedAppend = `<td class="employeeInfo"> ${worker.firstName} </td>`;
            let secondNamedAppend = `<td class="employeeInfo"> ${worker.lastName}</td>`;
            let idAppend = `<td class="employeeInfo text-center" > ${worker.id}</td> `;
            let jobTitleAppend = `<td class="employeeInfo text-center" > ${worker.jobTitle}</td> `;
            let annualSalaryAppend = `<td class="employeeInfo text-center"><span class="salary">${worker.annualSalary} </span> </td> `;
            let deleteButton = `<td class="employeeInfo text-center"> <button type="button" class="btn btn-outline-secondary delete" > Delete </button> </td>`;

            employeeToAppend = `<tr>${firstNamedAppend} ${secondNamedAppend} ${idAppend} ${jobTitleAppend} ${annualSalaryAppend} ${deleteButton}</tr>`;
            $('#employeeParent').append(employeeToAppend);
    }

        /// ADDING TO TOTAL MONTHLY COST
        let totalSalary = 0;
        for (let i = 0; i < employeeList.length; i++) {	
            totalSalary = totalSalary + Number((employeeList[i].annualSalary) / 12);
        }
        roundedTotalSalary = totalSalary.toFixed(2);  
        console.log(roundedTotalSalary);
        
        ///check if Total Monthly Cost of salaries is over $20,000
        if (roundedTotalSalary > 20000) {
            $('.calculator').addClass("over")  ///add red color if TMC is over 20,000
            let newestSalaryAmount = `<h3 class="text-center calculator" > Total Monthly Cost: $${roundedTotalSalary} </h3>`
            $('.calculator').empty(); // empty the previous TMC h3
            $('.calculator').append(newestSalaryAmount) 
        }
        else {
            $('.calculator').removeClass("over") // removes red, turns back to black
            newestSalaryAmount = `<h3 class="text-center calculator" > Total Monthly Cost: $${roundedTotalSalary} </h3>` // Naming dynamic h3 so its easier to read when adding
            $('.calculator').empty(); // empty the previous TMC h3
            $('.calculator').append(newestSalaryAmount) 
        }
        console.log(employee);
        console.log(employeeList);

    }
    ///clear values of inputs 
    $('#firstNameInput').val('');
    $('#lastNameInput').val('');
    $('#employeeIdInput').val('');
    $('#jobTitleInput').val('');
    $('#annualSalaryInput').val('');

    return false; //prevents .submit from refreshing//
}


function deleteEmployeeSalary() {

    /// GETTING SALARY OF CLICKED EMPLOYEE
    let tempArray = [];
    let clickedRow = $(this).siblings(".employeeInfo");    //get clicked table row
    $.each(clickedRow, function() {               // loops thru every single <td> element
        tempArray.push($(this).text());        // pushes the text within the <td> to tempArray
    });                                         //would be most helpful with advanced functionality
    
    let clickedSalary = (Number(tempArray[4]) / 12);  //get salary number
    let clickedId = (tempArray[2]);  //get unique employeeId number
    console.log('this is the clicked id ' + clickedId); 
    console.log('this is the clicked salary being removed ' + clickedSalary.toFixed(2));
    
      
    
    $(this).parent("tr").empty(); // getting rid of the entire row @ where button is clicked
    employeeList.splice(employeeList.indexOf($(this).val()), 1);
    console.log(employeeList);

    let totalMonthlySalary = 0;
    for (let i = 0; i < employeeList.length; i++) {	
        totalMonthlySalary = totalMonthlySalary + Number(((employeeList[i].annualSalary)) / 12);
    }
        roundedTotalSalary = (Math.round(Number(totalMonthlySalary) + 'e2') + 'e-2'); 



    $('.calculator').empty();  //empty before-click value
    $('.calculator').append(`<h3 class="text-center calculator"> Total Monthly Cost: $${Number(roundedTotalSalary)} </h3>`);  //set after-click value

        //turn red if over $20000 in monthly total cost
    if (roundedTotalSalary > 20000) {
        $('.calculator').addClass("over") // turns red
    } else {
        $('.calculator').removeClass("over") // removes red, turns back to black
    }

    

}


// let updatedTotalSalary = roundedSalary - clickedSalary.toFixed(2);  //math to get after-click TMC 
// let roundedUpdatedSalary = (Math.round(Number(currentTotalSalary) + 'e2') + 'e-2');  //rounding function

// console.log('monthly cost less removed employee' + updatedTotalSalary);




      // removed clicked employee from table and employeeList array
    // clickIndex = employeeList.indexOf($(this));  //finding the index value of the clicked employee 
    // console.log('this is the index of employeeList ' + clickIndex);


/// another means to get CLICKED ROW OF TABLE/////D
    






     // for (let worker of employeeList) {
    //     if (clickedId === worker.id) {
    //         employeeList.splice(worker., 1);
    //     }
        
    // }
    // clickedRow = $(this).parent("tr"); 
    // clickedSalary = (clickedRow.find("td:eq(4)").text() / 12); 


    // employeeList.splice(clickIndex, 1);  //removing the clicked employee from employee list
    // console.log(employeeList);