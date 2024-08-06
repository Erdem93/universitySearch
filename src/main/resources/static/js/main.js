function toggleContent(item) {
    const content = item.querySelectorAll('.kanban-item-content');

    for (const contentKey of content) {

        contentKey.style.display = contentKey.style.display === 'none' ? 'block' : 'none';
    }

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
    puan+=(0.6*parseFloat(document.getElementById('obp').value) || 0)
    puan+=3*(((parseInt(document.getElementById('ayt-fen-dogru').value) || 0) + (parseInt(document.getElementById('ayt-matematik-dogru').value) || 0))-(((parseInt(document.getElementById('ayt-fen-yanlis').value) || 0) + (parseInt(document.getElementById('ayt-matematik-yanlis').value) || 0)))/4)
    console.log(((parseInt(document.getElementById('ayt-fen-dogru').value) || 0) + (parseInt(document.getElementById('ayt-matematik-dogru').value) || 0))-(((parseInt(document.getElementById('ayt-fen-yanlis').value) || 0) + (parseInt(document.getElementById('ayt-matematik-yanlis').value) || 0)))/4)

    puan+=100
    document.getElementById('totalScore').textContent = `Total Score: ${puan}`;
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