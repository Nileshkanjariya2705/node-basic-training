const employees = {
  names: ['nilesh', 'dhiraj', 'parthiv', 'rohit', 'meet', 'parshant'],
  roles: ['java developer', 'backend developer', 'frontend developer', 'devops developer', 'wordpress developer', 'DBA developer'],
  departments: ['IT', 'IT', 'IT', 'IT', 'IT', 'IT'],
  status: ['full time', 'full time', 'full time', 'full time', 'full time', 'full time']
};


let table=document.createElement('table');
table.setAttribute('border','1px solid red')
table.style.borderCollapse='collapse'


let thead=document.createElement('thead');
let headarrow=document.createElement('tr');



// headar
for (let key in employees){
    let th=document.createElement('th');
    th.textContent=key
    headarrow.appendChild(th);
}
thead.appendChild(headarrow);
table.appendChild(thead)

//  data



let tbody=document.createElement('tbody');

let lenght=employees.names.length;

for(let key in employees){
    let bodyrow=document.createElement('tr');

    for(let j=0; j<4; j++){
        let td=document.createElement('td');
        td.textContent=employees[key][j];
        bodyrow.appendChild(td)
    }
    tbody.appendChild(bodyrow);
}


table.appendChild(tbody)
let div=document.getElementById('tab');
div.appendChild(table)

table.style.width='100%'

table.style.height='300px'
table.style.textAlign='center'