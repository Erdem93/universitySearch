function toggleContent(item) {
    const content = item.querySelector('.kanban-item-content');
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
}

function calculateTotal() {
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

    
    let puan=0;


    puan+=1.33*(dogrular-(yanlislar/4))
    puan+=(0.6*parseFloat(document.getElementById('obp').value))
    puan+=3*(((parseInt(document.getElementById('ayt-fen-dogru').value) || 0) + (parseInt(document.getElementById('ayt-matematik-dogru').value) || 0))-(((parseInt(document.getElementById('ayt-fen-yanlis').value) || 0) + (parseInt(document.getElementById('ayt-matematik-yanlis').value) || 0)))/4)
    console.log(((parseInt(document.getElementById('ayt-fen-dogru').value) || 0) + (parseInt(document.getElementById('ayt-matematik-dogru').value) || 0))-(((parseInt(document.getElementById('ayt-fen-yanlis').value) || 0) + (parseInt(document.getElementById('ayt-matematik-yanlis').value) || 0)))/4)

    puan+=100
    document.getElementById('totalScore').textContent = `Total Score: ${puan}`;
    getSchoolsByPuan(puan);
}

function addDepartment() {
    const select = document.getElementById('departmentSelect');
    const selectedDepartment = select.value;
    if (selectedDepartment) {
        const departmentList = document.getElementById('selectedDepartments');
        const departmentItem = document.createElement('div');
        departmentItem.textContent = selectedDepartment;
        departmentItem.onclick = function() { this.remove(); };
        departmentList.appendChild(departmentItem);
    }
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

function getSchoolsByPuan(puan){
    fetch("http://localhost:3000/api/okullarWithPuan",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({puan})
    }).then(response =>response.json())
    .then(data=>{
        console.log(JSON.stringify(data));
        document.querySelector(".kanban-item-content").textContent=JSON.stringify(data);
    
    })
    .catch(error=>{
        console.log(error)
    });
}