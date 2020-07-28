


console.log('working');
$(document).ready(readyNow);

function readyNow() {
    addClickHandlers();
    
    
}

function addClickHandlers() {
  
    $('#inputForm').submit(addEmployeeToArray)
    $('#employeeParent').on('click', '.deleteBtn', deleteEmployee)
}

let employeeList = [];


function loopIds() {
    for (let i = 0; i < employeeList.length; i++) {
       if (employee.id === employeeList[i].id) {
        return true;   } 
    }
}

function addEmployeeToArray() {

    console.log(employeeList);

    // loopIds();
    ///CONNECT THE INPUT FIELDS TO A NEW EMPLOYEE OBJECT 
 
        const employee = {
            firstName: $('#firstNameInput').val(),
            lastName: $('#lastNameInput').val(),
            id: $('#employeeIdInput').val(),
            jobTitle: $('#jobTitleInput').val(),
            annualSalary: $('#annualSalaryInput').val(),
        }
    

        if (employee.firstName === '' || employee.secondName === '' || employee.id === '' || employee.jobTitle === '' || employee.id === '' || employee.annualSalary === '') {
            alert('please enter all fields');
        }  else if ( loopIds() === true ) {
            alert('That employee already exists') ;
           
        } 
        else {
            employeeList.push(employee); ///PUSHES EMPLOYEE INTO EMPLOYEE LIST ARRAY

            ////ADD EMPLOYEE TO DOM//
            $('#employeeParent').empty();

            for (let worker of employeeList) {
                let firstNamedAppend = `<td class="employeeInfo th-sm"> ${worker.firstName} </td>`;
                let secondNamedAppend = `<td class="employeeInfo th-sm"> ${worker.lastName}</td>`;
                let idAppend = `<td class="employeeInfo text-center th-sm" > ${worker.id}</td> `;
                let jobTitleAppend = `<td class="employeeInfo text-center th-sm" > ${worker.jobTitle}</td> `;
                let annualSalaryAppend = `<td class="employeeInfo text-center th-sm"><span class="salary">${worker.annualSalary} </span> </td> `;
                let deleteButton = `<td class="employeeInfo text-center th-sm"> <button type="button" class="btn btn-outline-secondary deleteBtn" > Delete </button> </td>`;

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

        // }
    }
    ///clear Input values
    $('#firstNameInput').val('');
    $('#lastNameInput').val('');
    $('#employeeIdInput').val('');
    $('#jobTitleInput').val('');
    $('#annualSalaryInput').val('');

    return false; //prevents .submit from refreshing//
}


function deleteEmployee() {

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
    

        // getting rid of the entire row @ where button is clicked
    if ($('.deleteBtn').length > 0) {
        $(this).closest('tr').remove(); 
    }
    

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
    } else if (roundedTotalSalary > 20000){
        $('.calculator').removeClass("over") // removes red, turns back to black
    }
}