const selectedDepList=[]
let puan=0;


fetchDepartmantNames();
printAllDepNames();




function toggleContent(item) {
    const content = item.querySelector('.kanban-item-content');
    content.style.display = content.style.display === 'none' ? 'inline' : 'none';
}




function calculateTotal() {
    puan=0;
    let dogrular = 0;
    let yanlislar = 0;


    dogrular+=parseInt(document.getElementById('turkce-dogru').value) || 0
    dogrular+=parseInt(document.getElementById('matematik-dogru').value) || 0
    dogrular+=parseInt(document.getElementById('sosyal-dogru').value) || 0
    dogrular+=parseInt(document.getElementById('fen-dogru').value) || 0


    yanlislar+=parseInt(document.getElementById('turkce-yanlis').value) || 0
    yanlislar+=parseInt(document.getElementById('matematik-yanlis').value) || 0
    yanlislar+=parseInt(document.getElementById('sosyal-yanlis').value) || 0
    yanlislar+=parseInt(document.getElementById('fen-yanlis').value) || 0

    



    puan+=1.33*(dogrular-(yanlislar/4))
    puan+=(0.6*parseFloat(document.getElementById('obp').value))
    puan+=3*(((parseInt(document.getElementById('ayt-fen-dogru').value) || 0) + (parseInt(document.getElementById('ayt-matematik-dogru').value) || 0))-(((parseInt(document.getElementById('ayt-fen-yanlis').value) || 0) + (parseInt(document.getElementById('ayt-matematik-yanlis').value) || 0)))/4)

    puan+=100
    document.getElementById('totalScore').textContent = `Puaniniz: ${puan}`;

    finalQuery();


}



function addDepartment() {

    const select = document.getElementById('departmentSelect');
    const selectedDepartment = select.value;
    if (selectedDepartment) {

        const departmentItem = document.createElement('div');



        addDepartmantToList(departmentItem,selectedDepartment);

        departmentItem.onclick = function(){
            removeDepartmant(this);
        }


        createKanbanItem(selectedDepartment);


    }

    finalQuery();


}

function removeDepartmant(thisObj){
    const className=thisObj.textContent.replaceAll(" ", "-");

    const tmpDelete=Array.from(document.getElementsByClassName(className));

    for (let index = 0; index < tmpDelete.length; index++) {
        const element = tmpDelete[index];
        element.remove();
    }


    selectedDepList.pop(thisObj.textContent);
    thisObj.remove();
}



function addDepartmantToList(departmentItem,selectedDepartment){
    const departmentList = document.getElementById('selectedDepartments');

    departmentItem.textContent = selectedDepartment;
    departmentList.appendChild(departmentItem);
    selectedDepList.push(selectedDepartment);
}


function createKanbanItem(selectedDepartment){

    const allColumns=document.querySelectorAll(".kanban-col");



    allColumns.forEach(element => {


        const kanbanItem=document.createElement("div");
        kanbanItem.classList.add("kanban-item");
        kanbanItem.classList.add(selectedDepartment.replaceAll(" ","-"));
        kanbanItem.classList.add((element.classList[1]));
        kanbanItem.onclick = function() {
            toggleContent(this);
        };



        const departmantHeader=document.createElement("h3");
        departmantHeader.textContent=selectedDepartment;
        kanbanItem.appendChild(departmantHeader);


        const kanbanItemContent=document.createElement("div");
        kanbanItemContent.classList.add("kanban-item-content");

        kanbanItemContent.style.display='none';

        kanbanItem.appendChild(kanbanItemContent);

        element.appendChild(kanbanItem);
    });
}








function finalQuery(){
    selectedDepList.forEach(departmant => {
        for (let index = 0; index < 4; index++) {
            getSchoolsByPuan(puan,`202${index}`,departmant)    
        }
        
    });
}






function filterDepartments() {
    const input = document.getElementById('departmentSearch');
    const filter = input.value.toUpperCase();
    const select = document.getElementById('departmentSelect');
    const options = select.getElementsByTagName('option');

    for (let i = 0; i < options.length; i++) {
        const txtValue = options[i].textContent || options[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            options[i].style.display = "";
        } else {
            options[i].style.display = "none";
        }
    }
}





function fetchDepartmantNames(){
    fetch('/api/bolum_isimleri').then(response => response.json())
        .then(data => {

            printAllDepNames(data);
        })
}


function printAllDepNames(bolumler){
      bolumler.sort();

      const selectDep=document.getElementById("departmentSelect");
      
      for (let index = 0; index < bolumler.length; index++) {
        const element = bolumler[index];
        let option = document.createElement("option");
        option.value=element;
        option.textContent=element;
        selectDep.appendChild(option);


      }
    
}




function getSchoolsByPuan(puan,year,bolum_adi){    
    
    fetch("/api/okullarWithPuan",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({ 
            puan:puan,
            year: year,
            bolum_adi_req: bolum_adi
        })
        
    }).then(response =>response.json())
    .then(data=>{

        const curr=document.getElementsByClassName(bolum_adi.replaceAll(" ", "-"))
        // burada curr de class aratiriz year uyusuyorsa elementi ekle
        


        for (let index = 0; index < curr.length; index++) {
            
            const element = curr[index];
            if (element.classList[2]===year) {
                const content=element.querySelector(".kanban-item-content");
                content.innerHTML="";
                content.appendChild(jsonsToTable(data,year))             
            }

        }
        
        
    })
    .catch(error=>{
        console.log(error)
    });
}

function jsonsToTable(jsonArray,year){
    let table=document.createElement("table");

    table.className=("table-hover");

    let thead=document.createElement("thead");
    let headRow=document.createElement("tr");
    const headers = ["Universite", "Siralama", "Puan"];

    let keys=Object.keys(jsonArray[0]);

    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent=header;
        headRow.appendChild(th);
    });

    let th=document.createElement("th");

    thead.appendChild(headRow);
    table.appendChild(thead);

    let tbody=document.createElement("tbody");

    const dynamicKeyPuan = `puan_${year}`;
    const dynamicKeySiralama=`siralama_${year}`;
    jsonArray.forEach(obj =>{
        let dataRow = document.createElement("tr");

        keys.forEach(key=>{

            if (key==="universite_adi" || key===dynamicKeyPuan || key===dynamicKeySiralama) {
                let td=document.createElement("td");
                td.textContent=obj[key];
                dataRow.appendChild(td);
            }
        });

        tbody.appendChild(dataRow);
    });

    table.appendChild(tbody);

    return table;

}


