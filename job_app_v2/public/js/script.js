

document.addEventListener('click', (e) => {
    if (e.target.classList.contains("remove_eduction")) {
        let row = e.target.closest("tr");
        if (row) {
            row.remove()
        }
    }
})

function add_experience() {
    let table = document.getElementById("experience_table");

    let row = document.createElement("tr");
    row.innerHTML = `
      
          <td>
            <label for="compnay_name">compnay_name:<input name="compnay_name[]" id="compnay_name" type="text"></label>
          </td>
            <td>
            <label for="work_designation">designation:<input name="work_designation[]" id="work_designation" type="text"></label>
          </td>
           <td>
            <label for="start_date">start_date:<input name="start_date[]" id="start_date" type="date"></label>
          </td>
           <td>
            <label for="end_date">End date:<input name="end_date[]" id="end_date" type="date"></label>
          </td>
          <td>
            <input type="button" class="remove_eduction" value="-">
          </td>
       
    `
    table.appendChild(row)

}

function error() {
    let invalid = true;

    document.getElementById("e_language").innerHTML = '';
    document.getElementById("e_gujarati").innerHTML = '';
    document.getElementById("e_hindi").innerHTML = '';
    document.getElementById("e_english").innerHTML = '';
    document.getElementById('efname').innerHTML = '';
    document.getElementById('elname').innerHTML = '';
    document.getElementById('eemail').innerHTML = '';
    document.getElementById('edesignation').innerHTML = '';
    document.getElementById('eaddress1').innerHTML = '';
    document.getElementById('eaddress2').innerHTML = '';
    document.getElementById('ephonenumber').innerHTML = '';
    document.getElementById('ezipcode').innerHTML = '';
    document.getElementById('edob').innerHTML = '';
    document.getElementById('e_tech').innerHTML = '';
    document.getElementById('e_java').innerHTML = '';
    document.getElementById('e_php').innerHTML = '';
    document.getElementById('e_mysql').innerHTML = '';


    // validation form  basic_detail    
    let fname = document.getElementById('fname').value.trim();
    let lname = document.getElementById('lname').value.trim();
    let designation = document.getElementById('designation').value.trim();
    let email = document.getElementById('email').value.trim();
    let phonenumber = document.getElementById('phoneNumber').value.trim();
    // let male = document.getElementById('male').checked;
    // let female = document.getElementById('female').checked;
    document.getElementById('e_rname').innerHTML = '';
    document.getElementById('e_contect_number').innerHTML = '';
    document.getElementById('e_relation').innerHTML = '';
    document.getElementById('e_notice_period').innerHTML = '';
    document.getElementById('e_expected_ctc').innerHTML = '';
    document.getElementById('e_current_ctc').innerHTML = '';

    let dob = document.getElementById('dob').value;
    let address1 = document.getElementById('address1').value.trim();
    let address2 = document.getElementById('address2').value.trim();
    // let state = document.getElementById('state').value.trim();
    let zip = document.getElementById('zip').value.trim();
    // let city = document.getElementById('city').value.trim();

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


    // validation for eduction detail
    let course_name = document.getElementsByName("course_name[]");
    let passing_year = document.getElementsByName("passing_year[]");
    let uni_board = document.getElementsByName("uni_board[]");
    let result = document.getElementsByName("result[]");

    for (let i = 0; i < course_name.length; i++) {
        if (course_name[i].value.trim() === '') {
            course_name[i].placeholder = "enter course name"
            invalid = false;
        }
        if (passing_year[i].value.trim() === '') {
            passing_year[i].placeholder = "enter passing year"
            invalid = false;
        }
        if (uni_board[i].value.trim() === '') {
            uni_board[i].placeholder = "enter uni/board"
            invalid = false;
        }
        if (result[i].value.trim() === '') {
            result[i].placeholder = "enter result"
            invalid = false;
        }
    }

    // validtion for technology
    let compnay_name = document.getElementsByName("compnay_name[]")
    let work_designation = document.getElementsByName("work_designation[]")
    let start_date = document.getElementsByName("start_date[]")
    let end_date = document.getElementsByName("end_date[]")

    for (let j = 0; j < compnay_name.length; j++) {
        if (compnay_name[j].value.trim() === '') {
            compnay_name[j].placeholder = 'please enter company name'
            invalid = false;
        }
        if (work_designation[j].value.trim() === '') {
            work_designation[j].placeholder = 'please enter designation'
            invalid = false;
        }
        if (start_date[j].value.trim() === '') {
            start_date[j].placeholder = 'please enter start data'
            invalid = false;
        }
        if (end_date[j].value.trim() === '') {
            end_date[j].placeholder = 'please enter end date'
            invalid = false;
        }
    }

    // validation for language
    let gujarati = document.getElementById('gujarati').checked;
    let hindi = document.getElementById('hindi').checked;
    let engilsh = document.getElementById('english').checked;

    let guj_read = document.getElementById("guj_read").checked
    let guj_write = document.getElementById("guj_write").checked
    let guj_speak = document.getElementById("guj_speak").checked

    let hindi_read = document.getElementById("hindi_read").checked
    let hindi_write = document.getElementById("hindi_write").checked
    let hindi_speak = document.getElementById("hindi_speak").checked

    let eng_read = document.getElementById("eng_read").checked
    let eng_write = document.getElementById("eng_write").checked
    let eng_speak = document.getElementById("eng_speak").checked

    if (!gujarati && !hindi && !engilsh) {
        document.getElementById("e_language").innerHTML = "please select at least one language"
        invalid = false;
    }
    if (gujarati && !guj_read && !guj_speak && !guj_write) {
        document.getElementById("e_gujarati").innerHTML = "please select at least   one level for gujarati"
        invalid = false;
    }
    if (engilsh && !eng_read && !eng_speak && !eng_write) {
        document.getElementById("e_english").innerHTML = "please select at least   one level for english"
        invalid = false;
    }
    if (hindi && !hindi_read && !hindi_speak && !hindi_write) {
        document.getElementById("e_hindi").innerHTML = "please select at least   one level for gujarati"
        invalid = false;
    }


    // validation for technology
    let java = document.getElementById("java").checked
    let php = document.getElementById("php").checked
    let mysql = document.getElementById("mysql").checked

    let java_beginner = document.getElementById("java_beginner").checked;
    let java_Mediator = document.getElementById("java_Mediator").checked;
    let java_expert = document.getElementById("java_Expert").checked;

    let php_beginner = document.getElementById("php_beginner").checked;
    let php_Mediator = document.getElementById("php_Mediator").checked;
    let php_expert = document.getElementById("php_Expert").checked;

    let mysql_beginner = document.getElementById("mysql_beginner").checked;
    let mysql_Mediator = document.getElementById("mysql_Mediator").checked;
    let mysql_expert = document.getElementById("mysql_Expert").checked;
    if (!java && !php && !mysql) {
        document.getElementById("e_tech").innerHTML = 'please select at least on technology'
        invalid = false;
    }
    if (java && !java_beginner && !java_Mediator && !java_expert) {
        document.getElementById("e_java").innerHTML = 'please select at least one skill level for java'
        invalid = false;
    }

    if (php && !php_beginner && !php_Mediator && !php_expert) {
        document.getElementById("e_php").innerHTML = 'please select at least one skill level for php'
        invalid = false;
    }
    if (mysql && !mysql_beginner && !mysql_Mediator && !mysql_expert) {
        document.getElementById("e_mysql").innerHTML = 'please select at least one skill level for mysql'
        invalid = false;
    }

    // now for Reference Contact Validation
    let rname = document.getElementById("rname").value.trim();
    let rcontact = document.getElementById("contect_number").value.trim();
    let relation = document.getElementById("relation").value.trim();




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
    let select = document.getElementsByName('preferred')[0];
    let result1 = [];
    let options = select.options;

    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            result1.push(options[i].value);
        }
    }
    console.log(result1.length)

    if (result1.length === 0) {
        document.getElementById('e_prefered_location').innerHTML = "please select at least one location"
        invalid = false;
    }




    return invalid;
}


