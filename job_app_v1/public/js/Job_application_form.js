
window.onload = function () {
    // Replace 'myFormId' with your actual form ID
    document.getElementById("myForm").reset();
};

let is_work_ex_added = false;
let is_eduction_added = false;

function error() {



    // reser all mesages
    document.getElementById('efname').innerHTML = '';
    document.getElementById('elname').innerHTML = '';
    document.getElementById('eemail').innerHTML = '';
    document.getElementById('edesignation').innerHTML = '';
    document.getElementById('eaddress1').innerHTML = '';
    document.getElementById('eaddress2').innerHTML = '';
    document.getElementById('ephonenumber').innerHTML = '';
    document.getElementById('ecity').innerHTML = '';
    document.getElementById('egender').innerHTML = '';
    document.getElementById('estate').innerHTML = '';
    document.getElementById('ezipcode').innerHTML = '';
    document.getElementById('edob').innerHTML = '';
    document.getElementById('e_gujarati').innerHTML = '';
    document.getElementById('e_java').innerHTML = '';
    document.getElementById('e_rname').innerHTML = '';
    document.getElementById('e_contect_number').innerHTML = '';
    document.getElementById('e_relation').innerHTML = '';
    document.getElementById('e_notice_period').innerHTML = '';
    document.getElementById('e_expected_ctc').innerHTML = '';
    document.getElementById('e_current_ctc').innerHTML = '';
    document.getElementById("e_gujarati").innerHTML = "";
    document.getElementById("e_hindi").innerHTML = "";
    document.getElementById("e_english").innerHTML = "";
    // 1. Reset all error messages at the start
    document.getElementById("e_java").innerHTML = "";
    document.getElementById("e_php").innerHTML = "";
    document.getElementById("e_mysql").innerHTML = "";
    document.getElementById("e_larava").innerHTML = "";





    let invalid = true;


    let fname = document.getElementById('fname').value.trim();
    let lname = document.getElementById('lname').value.trim();
    let designation = document.getElementById('designation').value.trim();
    let email = document.getElementById('email').value.trim();
    let phonenumber = document.getElementById('phoneNumber').value.trim();
    let male = document.getElementById('male').checked;
    let female = document.getElementById('female').checked;

    let dob = document.getElementById('dob').value;
    let address1 = document.getElementById('address1').value.trim();
    let address2 = document.getElementById('address2').value.trim();
    let state = document.getElementById('state').value.trim();
    let zip = document.getElementById('zip').value.trim();
    let city = document.getElementById('city').value.trim();


    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const phoneRegex = /^[6-9]\d{9}$/;
    
    const nameRegex = /^[a-zA-Z\u00C0-\u01FF\s\-\']+$/;
    const zipRegex = /^[1-9][0-9]{5}$/;

    if (fname === "") {
        document.getElementById('efname').innerHTML = 'First name is required';
        invalid = false;

    } else if (!nameRegex.test(fname)) {
        document.getElementById('efname').innerHTML = 'please enter valid first name';
        invalid = false;
    }
    if (lname === "") {
        document.getElementById('elname').innerHTML = 'First name is required';
        invalid = false;

    }
    else if (!nameRegex.test(lname)) {
        document.getElementById('elname').innerHTML = 'please enter valid last name ';
        invalid = false;
    }
    if (email === "") {
        document.getElementById('eemail').innerHTML = "email id required";
        invalid = false;

    }
    else if (!emailRegex.test(email)) {
        document.getElementById('eemail').innerHTML = 'Invalid email format (e.g. name@domain.com)';
        invalid = false;
    }
    if (designation === "") {
        document.getElementById("edesignation").innerHTML = "designtion required"
        invalid = false;

    } else if (!nameRegex.test(designation)) {
        document.getElementById("edesignation").innerHTML = "please enter valid designtion"
        invalid = false;
    }

    const addressRegex = /^[\w\s\#\-\,\/\.\(\)\&]+$/;

    if (address1 === "") {
        document.getElementById('eaddress1').innerHTML = 'address is required';
        invalid = false;
    } else if (!addressRegex.test(address1)) {
        document.getElementById('eaddress1').innerHTML = ' please enter valid address ';
        invalid = false;
    }
    if (address2 === "") {
        document.getElementById('eaddress2').innerHTML = 'address is required';
        invalid = false;
    }
    else if (!addressRegex.test(address2)) {
        document.getElementById('eaddress2').innerHTML = ' please enter valid address ';
        invalid = false;
    }
    if (phonenumber === "") {
        document.getElementById('ephonenumber').innerHTML = 'phone number is required';
        invalid = false;
    } else if (!phoneRegex.test(phonenumber)) {
        document.getElementById('ephonenumber').innerHTML = 'Enter a valid 10-digit number (starting with 6-9)';
        invalid = false;
    }

    // City Validation
    if (city === "") {
        document.getElementById('ecity').innerHTML = 'Please enter your city';
        invalid = false;
    } else if (!nameRegex.test(city)) {
        document.getElementById('ecity').innerHTML = 'City name should only contain letters';
        invalid = false;
    }
    if (!male && !female) {
        document.getElementById('egender').innerHTML = 'please select your gender';
        invalid = false;
    }

    if (zip === "") {
        document.getElementById('ezipcode').innerHTML = 'zip code is required';
        invalid = false;
    } else if (!zipRegex.test(zip)) {
        document.getElementById('ezipcode').innerHTML = 'Enter a valid 6-digit PIN code (cannot start with 0)';
        invalid = false;
    }
    if (dob == "") {
        document.getElementById('edob').innerHTML = 'please select your date of birth';
        invalid = false;
    }


    // now validation for eduction detail ---------------------------------

    //  validation for masters and becherols


    // now validatioin for language known
    let gujarati = document.getElementById('gujarati').checked
    let hindi =  document.getElementById('hindi').checked
    let english =  document.getElementById('english').checked

    let guj_read = document.getElementById('guj_read').checked;
    let guj_write = document.getElementById("guj_write").checked;
    let guj_speak = document.getElementById('guj_speak').checked;

    let hin_read = document.getElementById('hindi_read').checked;
    let hin_write = document.getElementById('hindi_write').checked;
    let hin_speak = document.getElementById('hindi_speak').checked;

    let eng_read = document.getElementById('eng_read').checked;
    let eng_write = document.getElementById('eng_write').checked;
    let eng_speak = document.getElementById('eng_speak').checked;




    // 1. Check if ANY language is selected at all
    if (!gujarati && !hindi && !english) {
        document.getElementById("e_gujarati").innerHTML = "Select at least one language";
        invalid = false;
    }
    // 2. Check if a specific language is picked but has NO skills checked
    else {
        // Check Gujarati
        if (gujarati && !guj_read && !guj_write && !guj_speak) {
            document.getElementById("e_gujarati").innerHTML = "Select at least one skill for Gujarati";
            invalid = false;
        }
        // Check Hindi
        if (hindi && !hin_read && !hin_write && !hin_speak) {
            document.getElementById("e_hindi").innerHTML = "Select at least one skill for Hindi";
            invalid = false;
        }
        // Check English
        if (english && !eng_read && !eng_write && !eng_speak) {
            document.getElementById("e_english").innerHTML = "Select at least one skill for English";
            invalid = false;
        }
    }


    // now validatioin for tecnology known
    let java = document.getElementById("java").checked;
    let php = document.getElementById("php").checked;
    let mysql = document.getElementById("mysql").checked;
    let laraval = document.getElementById("larava").checked;

    let java_beginer = document.getElementsByName("java_level")[0].checked;
    let java_intermidiate = document.getElementsByName("java_level")[1].checked;
    let java_expert = document.getElementsByName("java_level")[2].checked;

    let php_beginer = document.getElementsByName("php_level")[0].checked;
    let php_intermidiate = document.getElementsByName("php_level")[1].checked;
    let php_expert = document.getElementsByName("php_level")[2].checked;

    let mysql_beginer = document.getElementsByName("mysql_level")[0].checked;
    let mysql_intermidiate = document.getElementsByName("mysql_level")[1].checked;
    let mysql_expert = document.getElementsByName("mysql_level")[2].checked;

    let laravel_beginer = document.getElementsByName("larava_level")[0].checked;
    let laravel_intermidiate = document.getElementsByName("larava_level")[1].checked;
    let laravel_expert = document.getElementsByName("larava_level")[2].checked;



    if (!java && !php && !mysql && !laraval) {
        document.getElementById("e_java").innerHTML = "Select at least one technology";
        invalid = false;
    } else {

        if (java && !java_beginer && !java_intermidiate && !java_expert) {
            document.getElementById("e_java").innerHTML = "Select at least one skill level";

            invalid = false;
        }
        if (php && !php_beginer && !php_intermidiate && !php_expert) {
            document.getElementById("e_php").innerHTML = "Select at least one skill level";

            invalid = false;
        }
        if (mysql && !mysql_beginer && !mysql_intermidiate && !mysql_expert) {
            document.getElementById("e_mysql").innerHTML = "Select at least one skill level";

            invalid = false;
        }
        if (laraval && !laravel_beginer && !laravel_intermidiate && !laravel_expert) {
            document.getElementById("e_laravel").innerHTML = "Select at least one skill level";

            invalid = false;
        }

    }

    // now for Reference Contact Validation
    let rname = document.getElementById("rname").value.trim();
    let rcontact = document.getElementById("contect_number").value.trim();
    let relation = document.getElementById("relation").value.trim();

    console.log(rname);
    console.log(rcontact);
    console.log(relation);
    

    if (rname === "") {
        document.getElementById("e_rname").innerHTML = " reference name requires";
        invalid = false;
    } else if (!nameRegex.test(rname)) {
        document.getElementById("e_rname").innerHTML = " please enter valid reference name";
        invalid = false;
    }

    if (rcontact === "") {
        document.getElementById("e_contect_number").innerHTML = " contact number required";
        invalid = false;
    } else if (!phoneRegex.test(rcontact)) {
        document.getElementById("e_contect_number").innerHTML = " please enter valid contect number";
        invalid = false;
    }

    if (relation === "") {
        document.getElementById("e_relation").innerHTML = "Enter relation";
        invalid = false;
    } else if (!nameRegex.test(relation)) {
        document.getElementById("e_relation").innerHTML = "please enter valid relation";
        invalid = false;
    }



    // now for Preferences Validation
    let notice = document.getElementById("notice_period").value.trim();
    let expected = document.getElementById("expected_ctc").value.trim();
    let current = document.getElementById("current_ctc").value.trim();

    if (notice === "") {
        document.getElementById("e_notice_period").innerHTML = "Enter notice period";
        invalid = false;
    } else if (isNaN(notice) || Number(notice) < 0) {
        document.getElementById("e_notice_period").innerHTML = "Enter a valid number of days";
        invalid = false;
    }

    if (expected === "") {
        document.getElementById("e_expected_ctc").innerHTML = "Enter expected CTC";
        invalid = false;
    } else if (isNaN(expected) || Number(expected) <= 0) {
        document.getElementById("e_expected_ctc").innerHTML = "Enter a valid positive amount";
        invalid = false;
    }

    if (current === "") {
        document.getElementById("e_current_ctc").innerHTML = "Enter current CTC";
        invalid = false;
    } else if (isNaN(current) || Number(current) < 0) {
        // Current can be 0 (for freshers), but not negative
        document.getElementById("e_current_ctc").innerHTML = "Enter a valid amount (0 if Fresher)";
        invalid = false;
    }

    // prefered location validartion
    let select = document.getElementById('preferd_location');
    let result = [];
    let options = select.options;

    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            result.push(options[i].value);
        }
    }
    console.log(result.length)

    if (result.length === 0) {
        document.getElementById('e_prefered_location').innerHTML = "please select at least one location"
        invalid = false;
    }


    // now validation for language known
    const selectedLanguages = Array.from(document.querySelectorAll('input[name="languages[]"]:checked'))
        .map(cb => cb.value);

    console.log(selectedLanguages);

    if (is_eduction_added == false) {
        alert("please enter eduction detail at lease one...")
        invalid = false;
    }
    if (is_work_ex_added === false) {
        alert("please enter work expericen detail at lease one...")
        invalid = false;
    }




    return invalid;
}


let flag = false;
//  add work experience
let table;

function add() {


    let compny_name = document.getElementById('company_name');
    let work_designatioin = document.getElementById("Work_designation");
    let start = document.getElementById('from');
    let end = document.getElementById('to');



    if (valid_work_experience(compny_name, work_designatioin, start, end)) {
        return;
    }






    if (compny_name.value == "" || work_designatioin.value == "" || start.value == "" || end.value == "") {
        alert("please full all detail of work experience...")
        return;
    }



    const data = ['Company Name', 'Designation', 'From', 'To',''];





    let table_container = document.getElementsByClassName("table_container")[0];
    let fieldset = document.getElementById('fieldset');
    fieldset.style.display = 'block'

    let tbody;

    if (!flag) {

        table = document.createElement("table");
        table.style.border = "1px solid black";
        table.style.borderCollapse = "collapse";

        // create thead
        let thead = document.createElement("thead");
        let tr = document.createElement("tr");

        for (let i = 0; i < data.length; i++) {

            let th = document.createElement("th");
            th.textContent = data[i];
            th.style.border = "1px solid black";
            th.style.padding = "5px";

            tr.appendChild(th);
            console.log('add new col........')
        }
        thead.appendChild(tr);
        table.appendChild(thead);


        let arr = new Array(compny_name.value, work_designatioin.value, start.value, end.value);

        tbody = document.createElement('tbody')
        let ttr = document.createElement('tr');
        for (let i = 0; i < 4; i++) {
            let td = document.createElement('td');
            td.textContent = arr[i];
            ttr.appendChild(td);
        }
        let td = document.createElement('td');
            td.innerHTML = '<button style="cursor: pointer;" class="work" >-</button>';
            ttr.appendChild(td);
        tbody.appendChild(ttr);

        table.appendChild(tbody);



        table_container.appendChild(table);
        flag = true;
    } else {


        let arr = new Array(compny_name.value, work_designatioin.value, start.value, end.value);

        // let tbody=document.createElement('tbody')
        let tr = document.createElement('tr');
        for (let i = 0; i < 4; i++) {
            let td = document.createElement('td');
            td.textContent = arr[i];
            tr.appendChild(td);
        }
        let td = document.createElement('td');
            td.innerHTML = '<button style="cursor: pointer;" class="work" >-</button>';
            tr.appendChild(td);
        // tbody.appendChild(tr);
        table.appendChild(tr);
        // table_container.appendChild(table);



    }
    const container = document.getElementById("hidden_inputs_container");

    const input1 = `<input type="hidden" name="exp_company[]" value="${compny_name.value}">`;
    const input2 = `<input type="hidden" name="exp_designation[]" value="${work_designatioin.value}">`;
    const input3 = `<input type="hidden" name="exp_from[]" value="${start.value}">`;
    const input4 = `<input type="hidden" name="exp_to[]" value="${end.value}">`;

    container.innerHTML += input1 + input2 + input3 + input4;

    compny_name.value = '';
    work_designatioin.value = '';
    from.value = '';
    to.value = '';




    // create table
    is_work_ex_added = true;
    return true;

}

function removeLastRow() {
    if (flag == false) {
        alert("please enter experinece");
        return;
    }
    let table_container = document.getElementsByClassName('table_container')[0];
    console.log(table_container.children[0].children[1].children[table_container.children[0].children[1].children.length - 1]);

    table.removeChild(table.children[1])
    console.log()
}

let eduction_table;
let flag_for_eduction = false;

let tbody_for_eduction;
function add_eduction() {

    let course = document.getElementById('course');
    let passing_year = document.getElementById('Passing_Year');
    let uni_bord = document.getElementById('Uni_Board');
    let result = document.getElementById('Result');


    if (!valid_eduction(course, passing_year, uni_bord, result)) {
        return;
    }


    if (course.value == '' || passing_year.value == '' || uni_bord.value == '' || result.value == '') {
        alert('please fill out all detail of eduction')
        return false;
    }

    let arr = new Array(course.value, passing_year.value, uni_bord.value, result.value);


    if (!flag_for_eduction) {
        let eduction_fieldset = document.getElementById('eduction_fieldset');
        eduction_fieldset.style.display = 'block';

        const data = ['course', 'passing_year', 'uni/board', 'result',''];

        let eduction_container = document.getElementsByClassName('eduction_container')[0];
        eduction_table = document.createElement('table');
        eduction_table.setAttribute("id","eduction_table")
        let thead = document.createElement('thead');
        let tr = document.createElement('tr');
        for (let i = 0; i < data.length; i++) {
            let th = document.createElement('th');
            th.textContent = data[i];
            tr.appendChild(th);
        }

        thead.appendChild(tr);
        eduction_table.appendChild(thead);



        tbody_for_eduction = document.createElement('tbody');
        let b_tr = document.createElement('tr');
        for (let j = 0; j < arr.length; j++) {
            let td = document.createElement('td');
            td.textContent = arr[j];
            b_tr.appendChild(td);
        }
         let td = document.createElement('td');
      
            td.innerHTML ='<button style="cursor: pointer;" class="ed" >-</button>' ;
            b_tr.appendChild(td);


        tbody_for_eduction.append(b_tr);
        eduction_table.appendChild(tbody_for_eduction)

        eduction_container.appendChild(eduction_table);
        flag_for_eduction = true;
    } else {
        let tr = document.createElement('tr');
        for (let i = 0; i < arr.length; i++) {
            let td = document.createElement('td');
            td.textContent = arr[i];
            tr.appendChild(td);
        }
          let td = document.createElement('td');
      
            td.innerHTML ='<button style="cursor: pointer;" class="ed" >-</button>' ;
            tr.appendChild(td);

        tbody_for_eduction.appendChild(tr);


    }
    let container = document.getElementById("eduction_hidden_container");

    const input1 = `<input type="hidden" name="edu_course_name[]" value="${course.value}">`;
    const input2 = `<input type="hidden" name="edu_passing_year[]" value="${passing_year.value}">`;
    const input3 = `<input type="hidden" name="edu_board_uni[]" value="${uni_bord.value}">`;
    const input4 = `<input type="hidden" name="edu_result[]" value="${result.value}">`;

    container.innerHTML += input1 + input2 + input3 + input4;

    course.value = '';
    uni_bord.value = '';
    passing_year.value = '';
    result.value = '';

    is_eduction_added = true;


}

function remove_last_eduction() {

    if (flag_for_eduction == false) {
        alert('please enter eduction detail..')
        return;
    }
    tbody_for_eduction.removeChild(tbody_for_eduction.children[0]);
}



// accessfin element form selct option 


// valid function
function valid_work_experience(company_name, work_designatioin, start, end) {
    document.getElementById('e_company_name').innerHTML = ""
    document.getElementById('e_Work_designation').innerHTML = "";
    document.getElementById('e_from').innerHTML = "";
    document.getElementById('e_to').innerHTML = "";



    let invalid = false;
    const nameRegex = /^[a-zA-Z\u00C0-\u01FF\s\-\']+$/;

    console.log('function call...........')
    if (company_name.value === "") {
        document.getElementById('e_company_name').innerHTML = "company name is required"
        invalid = true;
    } else if (!nameRegex.test(company_name.value)) {
        document.getElementById('e_company_name').innerHTML = "please enter valid compny name"
        invalid = true;
    }
    if (work_designatioin.value === "") {
        document.getElementById('e_Work_designation').innerHTML = "designation is required";
        invalid = true;
    } else if (!nameRegex.test(work_designatioin.value)) {
        document.getElementById('e_Work_designation').innerHTML = "please enter valid designation";
        invalid = true;
    }
    if (start.value === "") {
        document.getElementById('e_from').innerHTML = "starting date is required";
        invalid = true;
    }
    if (end.value === "") {
        document.getElementById('e_to').innerHTML = "starting date is required";
        invalid = true;
    }

    return invalid;
}

function valid_eduction(course, passing_year, uni_bord, result) {
    let invalid = true;

    document.getElementById('e_course').innerHTML = '';
    document.getElementById('e_Passing_Year').innerHTML = '';
    document.getElementById('e_Uni_Board').innerHTML = '';
    document.getElementById('e_Result').innerHTML = '';



    // 2. Course Validation (Letters/Numbers allowed)
    if (course.value === "") {
        document.getElementById('e_course').innerHTML = 'Enter course name (e.g., BCA, B.Tech)';
        invalid = false;
    }

    // 3. Passing Year Validation (4 digits)
    const yearRegex = /^(19|20)\d{2}$/; // Allows years from 1900 to 2099
    if (passing_year.value === "") {
        document.getElementById('e_Passing_Year').innerHTML = 'Enter passing year';
        invalid = false;
    } else if (!yearRegex.test(passing_year.value)) {
        document.getElementById('e_Passing_Year').innerHTML = 'Enter a valid 4-digit year';
        invalid = false;
    }

    // 4. University/Board Validation
    if (uni_bord.value === "") {
        document.getElementById('e_Uni_Board').innerHTML = 'Enter University or Board name';
        invalid = false;
    }

    // 5. Result Validation (Percentage or CGPA)
    if (result.value === "") {
        document.getElementById('e_Result').innerHTML = 'Enter your result';
        invalid = false;
    } else if (isNaN(result.value) || Number(result.value) < 0 || Number(result.value) > 100) {
        document.getElementById('e_Result').innerHTML = 'Enter a valid percentage (0-100)';
        invalid = false;
    }


    return invalid;
}

document.addEventListener("click",(e)=>{
     

       if(e.target.classList.contains('ed')){
        let row=e.target.closest('tr');
        if(row){
            let ans=confirm('are you sure!!')
            if(ans){

                row.remove();
            }
        }
       }
        
})

document.addEventListener("click",(e)=>{
       if(e.target.classList.contains('work')){
        let row=e.target.closest('tr');
        if(row){
             let ans=confirm('are you sure!!')
            if(ans){

                row.remove();
            }
        }
       }
        
})