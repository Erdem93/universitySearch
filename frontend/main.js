tmpGetAllDepNames()
let puan=0;
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
    console.log(((parseInt(document.getElementById('ayt-fen-dogru').value) || 0) + (parseInt(document.getElementById('ayt-matematik-dogru').value) || 0))-(((parseInt(document.getElementById('ayt-fen-yanlis').value) || 0) + (parseInt(document.getElementById('ayt-matematik-yanlis').value) || 0)))/4)

    puan+=100
    document.getElementById('totalScore').textContent = `Total Score: ${puan}`;

    finalQuery();


}









selectedDepList=[]

function addDepartment() {
    
    
    const select = document.getElementById('departmentSelect');
    const selectedDepartment = select.value;

    if (selectedDepartment) {
        
        const departmentList = document.getElementById('selectedDepartments');
        const departmentItem = document.createElement('div');
        departmentItem.textContent = selectedDepartment;
        departmentItem.onclick = function() { 
            
            
            const tmpDelete=Array.from(document.getElementsByClassName(this.textContent.replaceAll(" ", "-")));

            

            for (let index = 0; index < tmpDelete.length; index++) {
                const element = tmpDelete[index];
                element.remove();
            }


            selectedDepList.pop(this.textContent)
            console.log(selectedDepList);
            this.remove();
        };
        departmentList.appendChild(departmentItem);
        selectedDepList.push(selectedDepartment);
    
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

    finalQuery();
    
    
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


function jsonsToTable(jsonArray,year){
    let table=document.createElement("table");
    
    table.className=("table-hover");

    let thead=document.createElement("thead");
    let headRow=document.createElement("tr");
    console.log(jsonArray)
    let keys=Object.keys(jsonArray[0]);



    
        let th=document.createElement("th");
        th.textContent="Universite"
        th.classList.add("univ-head");
        headRow.appendChild(th);

        let th2=document.createElement("th");
        th2.textContent="Siralama"

        headRow.appendChild(th2);
        
        let th3=document.createElement("th");
        th3.textContent="Puan"
    
        headRow.appendChild(th3)
    

    thead.appendChild(headRow);
    table.appendChild(thead);

    let tbody=document.createElement("tbody");
    
    const dynamicKeyPuan = `puan_${year}`;
    const dynamicKeySiralama=`siralama_${year}`;
    console.log("dynapuan "+dynamicKeyPuan);
        jsonArray.forEach(obj =>{
        let dataRow = document.createElement("tr");
        
        keys.forEach(key=>{
            
            if (key=="universite_adi" || key===dynamicKeyPuan || key==dynamicKeySiralama) {    
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




function tmpGetAllDepNames(){

    const bolumler=[
        "Bilgisayar Mühendisliği (İngilizce) (Burslu)",
        "Tıp (Burslu)",
        "Elektrik-Elektronik Mühendisliği (İngilizce) (Burslu)",
        "Matematik (İngilizce) (Burslu)",
        "Endüstri Mühendisliği (İngilizce) (Burslu)",
        "Bilgisayar Mühendisliği (İngilizce)",
        "Moleküler Biyoloji ve Genetik (İngilizce) (Burslu)",
        "Tıp (İngilizce)",
        "Pilotaj (Fakülte) (İngilizce) (Burslu)",
        "Makine Mühendisliği (İngilizce) (Burslu)",
        "Kimya-Biyoloji Mühendisliği (İngilizce) (Burslu)",
        "Mühendislik ve Doğa Bilimleri Programları (İngilizce) (Burslu)",
        "Bilgisayar Mühendisliği (Burslu)",
        "Pilotaj (Fakülte)",
        "Yapay Zeka ve Veri Mühendisliği (İngilizce)",
        "Elektrik-Elektronik Mühendisliği (İngilizce)",
        "Tıp",
        "Endüstri Mühendisliği (İngilizce)",
        "Yapay Zeka Mühendisliği (İngilizce) (Burslu)",
        "Tıp (İngilizce) (Burslu)",
        "Kimya (İngilizce) (Burslu)",
        "Bilgisayar Mühendisliği (İngilizce) (%50 İndirimli)",
        "Elektronik ve Haberleşme Mühendisliği (İngilizce)",
        "Pilotaj (Yüksekokul) (İngilizce) (Burslu)",
        "Elektrik-Elektronik Mühendisliği (Burslu)",
        "Elektrik-Elektronik Mühendisliği (İngilizce) (%50 İndirimli)",
        "Endüstri Mühendisliği (Burslu)",
        "Bilgisayar Mühendisliği (Fransızca)",
        "Havacılık ve Uzay Mühendisliği (İngilizce)",
        "Makine Mühendisliği (İngilizce)",
        "Uçak Mühendisliği",
        "Bilişim Sistemleri ve Teknolojileri (Fakülte) (İngilizce) (Burslu)",
        "Pilotaj (Yüksekokul) (Burslu)",
        "Fizik (İngilizce) (Burslu)",
        "Elektronik ve Haberleşme Mühendisliği",
        "Endüstri Mühendisliği",
        "Yapay Zeka Mühendisliği (İngilizce)",
        "Tıp (İngilizce) (KKTC Uyruklu)",
        "Tıp (İngilizce) (%50 İndirimli)",
        "Makine Mühendisliği (Burslu)",
        "Bilgisayar Mühendisliği",
        "Kontrol ve Otomasyon Mühendisliği (İngilizce)",
        "Endüstri Mühendisliği (Fransızca)",
        "Bilgisayar Mühendisliği (Almanca)",
        "Uzay Mühendisliği (İngilizce)",
        "Kontrol ve Otomasyon Mühendisliği",
        "Kimya Mühendisliği (İngilizce)",
        "Bilgisayar Mühendisliği (%50 İndirimli)",
        "İşletme Mühendisliği (İngilizce)",
        "Diş Hekimliği (İngilizce) (Burslu)",
        "Matematik Mühendisliği",
        "Yazılım Mühendisliği (İngilizce) (Burslu)",
        "Endüstri Mühendisliği (İngilizce) (%50 İndirimli)",
        "Yapay Zeka Mühendisliği (İngilizce) (%50 İndirimli)",
        "Elektrik Mühendisliği (İngilizce)",
        "Bilgisayar Mühendisliği (İngilizce) (Ücretli)",
        "Tıp (%50 İndirimli)",
        "Matematik (İngilizce)",
        "Makine Mühendisliği (İngilizce) (%50 İndirimli)",
        "Metalurji ve Malzeme Mühendisliği (İngilizce)",
        "Elektrik-Elektronik Mühendisliği (Almanca)",
        "Tıp (Ankara)",
        "Elektrik-Elektronik Mühendisliği (%50 İndirimli)",
        "Makine Mühendisliği",
        "Moleküler Biyoloji ve Genetik (İngilizce)",
        "Elektrik Mühendisliği",
        "Malzeme Bilimi ve Nanoteknoloji Mühendisliği (Burslu)",
        "Uçak Mühendisliği (İngilizce) (Burslu)",
        "Matematik Mühendisliği (İngilizce)",
        "Endüstri Mühendisliği (Almanca)",
        "Fizik (İngilizce)",
        "Mimarlık (İngilizce) (Burslu)",
        "Diş Hekimliği (İngilizce)",
        "Elektrik-Elektronik Mühendisliği (İngilizce) (Ücretli)",
        "Makine Mühendisliği (Almanca)",
        "Mühendislik ve Doğa Bilimleri Programları (İngilizce) (%50 İndirimli)",
        "Diş Hekimliği",
        "Mekatronik Mühendisliği (Almanca)",
        "Tıp (KKTC Uyruklu)",
        "Uçak Mühendisliği (İngilizce)",
        "İşletme Mühendisliği (İngilizce) (Burslu)",
        "İnşaat Mühendisliği (İngilizce)",
        "Mekatronik Mühendisliği (İngilizce)",
        "Mühendislik Programları (İngilizce) (Burslu)",
        "Kimya Mühendisliği",
        "Yapay Zeka ve Veri Mühendisliği",
        "İstatistik (İngilizce)",
        "Dijital Oyun Tasarımı (İngilizce) (Burslu)",
        "Kimya (İngilizce)",
        "Kimya-Biyoloji Mühendisliği (İngilizce) (%50 İndirimli)",
        "Metalurji ve Malzeme Mühendisliği",
        "Havacılık ve Uzay Mühendisliği (İngilizce) (Burslu)",
        "Tıp (İngilizce) (UOLP-Marmara Üniversitesi) (Burslu)",
        "Mekatronik Mühendisliği",
        "Mekatronik Mühendisliği (İngilizce) (Burslu)",
        "Diş Hekimliği (Burslu)",
        "Eczacılık (İngilizce) (Burslu)",
        "Fizik Mühendisliği",
        "Fizik (İngilizce) (%50 İndirimli)",
        "Endüstri Mühendisliği (İngilizce) (Ücretli)",
        "Enerji Sistemleri Mühendisliği (İngilizce) (Burslu)",
        "Gemi İnşaatı ve Gemi Makineleri Mühendisliği",
        "Endüstri Mühendisliği (%50 İndirimli)",
        "Tıp (Ankara) (Kız) (İçişleri Bakanlığı Adına)",
        "Tıp (Ücretli)",
        "Biyomedikal Mühendisliği (Burslu)",
        "Yazılım Mühendisliği",
        "Bilgisayar Mühendisliği (Ücretli)",
        "Matematik (Fransızca)",
        "Uzay Mühendisliği (İngilizce) (Burslu)",
        "Tıp (Ankara) (Kız) (Milli Savunma Bakanlığı Adına)",
        "Matematik (İngilizce) (%50 İndirimli)",
        "Yazılım Mühendisliği (İngilizce)",
        "Moleküler Biyoloji ve Genetik (İngilizce) (%50 İndirimli)",
        "Mimarlık (İngilizce)",
        "Tıp (İngilizce) (Ücretli)",
        "Endüstriyel Tasarım (Fakülte) (İngilizce)",
        "Tıp (İngilizce) (UOLP-Marmara Üniversitesi) (%50 İndirimli)",
        "Biyomedikal Mühendisliği (İngilizce) (Burslu)",
        "Diş Hekimliği (Ankara)",
        "Diş Hekimliği (Ankara) (Kız) (İçişleri Bakanlığı Adına)",
        "Makine Mühendisliği (İngilizce) (Ücretli)",
        "Eczacılık (İngilizce)",
        "Elektrik-Elektronik Mühendisliği",
        "Kimya (İngilizce) (%50 İndirimli)",
        "Yapay Zeka Mühendisliği (İngilizce) (Ücretli)",
        "Biyoloji (İngilizce)",
        "Endüstriyel Tasarım (Fakülte) (Burslu)",
        "Tıp (%25 İndirimli)",
        "Mimarlık (Burslu)",
        "Yapay Zeka Mühendisliği (Burslu)",
        "Makine Mühendisliği (%50 İndirimli)",
        "Tıp (Ankara)(Erkek) (İçişleri Bakanlığı Adına)",
        "İnşaat Mühendisliği (İngilizce) (Burslu)",
        "Eczacılık",
        "Kimya Mühendisliği (İngilizce) (Burslu)",
        "Yazılım Mühendisliği (Burslu)",
        "Tekstil Mühendisliği (İngilizce)",
        "Diş Hekimliği (%50 İndirimli)",
        "Diş Hekimliği (İngilizce) (%50 İndirimli)",
        "Tıp (İngilizce) (%25 İndirimli)",
        "Matematik Öğretmenliği (İngilizce)",
        "Mimarlık",
        "Eczacılık (Burslu)",
        "Petrol ve Doğalgaz Mühendisliği (İngilizce)",
        "Bilişim Sistemleri ve Teknolojileri (Fakülte) (İngilizce) (%50 İndirimli)",
        "Elektronik Mühendisliği",
        "Diş Hekimliği (UOLP-Sağlık Bilimleri Üniversitesi) (Burslu)",
        "Genetik ve Biyomühendislik (İngilizce) (Burslu)",
        "Tıp (Ankara)(Erkek) (Milli Savunma Bakanlığı Adına)",
        "Gıda Mühendisliği (İngilizce)",
        "Diş Hekimliği (Ankara)(Erkek) (İçişleri Bakanlığı Adına)",
        "Moleküler Biyoteknoloji (Almanca)",
        "Uçak Mühendisliği (Burslu)",
        "Endüstriyel Tasarım (Fakülte) (İngilizce) (Burslu)",
        "Diş Hekimliği (Ücretli)",
        "Bilgisayar ve Öğretim Teknolojileri Öğretmenliği (İngilizce)",
        "Bilişim Sistemleri Mühendisliği (İngilizce) (Burslu)",
        "Tıp (İngilizce) (UOLP-Marmara Üniversitesi) (Ücretli)",
        "Mimarlık (İngilizce) (%50 İndirimli)",
        "Çevre Mühendisliği (İngilizce)",
        "Yazılım Mühendisliği (İngilizce) (%50 İndirimli)",
        "Matematik Öğretmenliği",
        "Moleküler Biyoloji ve Genetik (Burslu)",
        "Diş Hekimliği (Ankara)(Erkek) (Milli Savunma Bakanlığı Adına)",
        "Eczacılık (Ankara)",
        "Elektrik-Elektronik Mühendisliği (Ücretli)",
        "Kimya",
        "Maden Mühendisliği (İngilizce)",
        "Diş Hekimliği (UOLP-Sağlık Bilimleri Üniversitesi) (%50 İndirimli)",
        "Bilgisayar Mühendisliği (İÖ)(Ücretli)",
        "Diş Hekimliği (İngilizce) (Ücretli)",
        "Gemi Makineleri İşletme Mühendisliği",
        "Tıp (İstanbul) (Erkek) (Milli Savunma Bakanlığı Adına)",
        "Gıda Mühendisliği",
        "Kentsel Tasarım ve Peyzaj Mimarlığı (İngilizce) (Burslu)",
        "Diş Hekimliği (%25 İndirimli)",
        "Gemi İnşaatı ve Gemi Makineleri Mühendisliği (İngilizce) (Burslu)",
        "Yazılım Geliştirme (Fakülte) (İngilizce) (Burslu)",
        "Dil ve Konuşma Terapisi (Fakülte) (İngilizce) (Burslu)",
        "Uçak Mühendisliği (İngilizce) (Ücretli)",
        "Jeoloji Mühendisliği (İngilizce)",
        "Deniz Ulaştırma İşletme Mühendisliği (Fakülte)",
        "Veterinerlik (İngilizce)",
        "İnşaat Mühendisliği (Almanca)",
        "Eczacılık (Ankara)(Erkek) (Milli Savunma Bakanlığı Adına)",
        "İlköğretim Matematik Öğretmenliği (İngilizce)",
        "Gemi ve Deniz Teknolojisi Mühendisliği",
        "Bilgisayar Mühendisliği (İngilizce) (İÖ)(Ücretli)",
        "İlköğretim Matematik Öğretmenliği",
        "İnşaat Mühendisliği",
        "Elektronik ve Haberleşme Mühendisliği (İngilizce) (UOLP-New Jersey Institute Of Technology) (Ücretli)",
        "Moleküler Biyoloji ve Genetik",
        "Malzeme Bilimi ve Nanoteknoloji Mühendisliği (İngilizce) (Burslu)",
        "Dil ve Konuşma Terapisi (Fakülte)",
        "Eczacılık (İngilizce) (%50 İndirimli)",
        "Bilişim Sistemleri ve Teknolojileri (Fakülte) (İngilizce) (Ücretli)",
        "Biyomühendislik (İngilizce)",
        "Fizik (İngilizce) (Ücretli)",
        "Malzeme Bilimi ve Teknolojileri (Almanca)",
        "Moleküler Biyoloji ve Genetik (İngilizce) (Ücretli)",
        "Deniz Ulaştırma İşletme Mühendisliği (Fakülte) (İngilizce) (Burslu)",
        "Yapay Zeka ve Veri Mühendisliği (İngilizce) (KKTC Uyruklu)",
        "Fizik Öğretmenliği (İngilizce)",
        "Eczacılık (%50 İndirimli)",
        "Bilgi Güvenliği Teknolojisi (Fakülte) (İngilizce) (Burslu)",
        "Enerji Bilimi ve Teknolojileri (Almanca)",
        "Kimya Öğretmenliği (İngilizce)",
        "Enerji Sistemleri Mühendisliği (İngilizce)",
        "Gemi Makineleri İşletme Mühendisliği (İngilizce) (Burslu)",
        "Eczacılık (Ücretli)",
        "Dil ve Konuşma Terapisi (Fakülte) (Burslu)",
        "Nükleer Enerji Mühendisliği (İngilizce)",
        "Çevre Mühendisliği",
        "Veterinerlik",
        "İstatistik",
        "İlköğretim Matematik Öğretmenliği (Burslu)",
        "Yazılım Mühendisliği (İngilizce) (UOLP-Sam Houston State) (Ücretli)",
        "Uçak Gövde ve Motor Bakımı (Fakülte)",
        "Havacılık ve Uzay Mühendisliği",
        "Uçak Gövde ve Motor Bakımı (Yüksekokul) (İngilizce) (Burslu)",
        "Biyomühendislik",
        "Matematik",
        "Hemşirelik (Fakülte) (Burslu)",
        "İç Mimarlık",
        "Diş Hekimliği (UOLP-Sağlık Bilimleri Üniversitesi) (Ücretli)",
        "Şehir ve Bölge Planlama (İngilizce)",
        "Biyomedikal Mühendisliği (İngilizce)",
        "Eczacılık (İngilizce) (Ücretli)",
        "Malzeme Bilimi ve Mühendisliği (İngilizce)",
        "Bilgisayar Bilimleri",
        "Diş Hekimliği (İngilizce) (%25 İndirimli)",
        "Eczacılık (%25 İndirimli)",
        "Makine Mühendisliği (Ücretli)",
        "Hemşirelik (Fakülte) (İngilizce)",
        "Gemi Makineleri İşletme Mühendisliği (İngilizce)",
        "Hemşirelik (Fakülte)",
        "Meteoroloji Mühendisliği",
        "İlköğretim Matematik Öğretmenliği (İngilizce) (Burslu)",
        "Hemşirelik (Fakülte) (İngilizce) (Burslu)",
        "Deniz Ulaştırma İşletme Mühendisliği (Fakülte) (İngilizce) (UOLP-Suny Maritime) (%50 İndirimli)",
        "Gemi İnşaatı ve Gemi Makineleri Mühendisliği (İngilizce) (%50 İndirimli)",
        "Beslenme ve Diyetetik (Fakülte) (İngilizce) (Burslu)",
        "Yazılım Mühendisliği (İÖ)(Ücretli)",
        "Deniz Ulaştırma İşletme Mühendisliği (Fakülte) (İngilizce)",
        "Bilgisayar Mühendisliği (İngilizce) (UOLP-Azerbaycan Teknik Üniversitesi) (Ücretli)",
        "Bilgisayar Mühendisliği (İngilizce) (UOLP-Uluslararası Saraybosna Üniversitesi) (Ücretli)",
        "Gıda Mühendisliği (İngilizce) (Burslu)",
        "İç Mimarlık (İngilizce) (Burslu)",
        "Mimarlık (%50 İndirimli)",
        "Elektrik-Elektronik Mühendisliği (İÖ)(Ücretli)",
        "Havacılık Elektrik ve Elektroniği (Fakülte)",
        "Uçak Elektrik ve Elektroniği (İngilizce) (Burslu)",
        "Dijital Oyun Tasarımı (Burslu)",
        "Fen Bilgisi Öğretmenliği (İngilizce)",
        "Beslenme ve Diyetetik (Fakülte)",
        "Geomatik Mühendisliği (İngilizce)",
        "Bilgisayar Mühendisliği (M.T.O.K.) (M.T.O.K.)",
        "Biyomühendislik (UOLP-Montana State Üniversitesi) (İngilizce) (UOLP)(Ücretli)",
        "Malzeme Bilimi ve Nanoteknoloji Mühendisliği (%50 İndirimli)",
        "Maden Mühendisliği",
        "Endüstri Mühendisliği (Ücretli)",
        "İşletme Mühendisliği (İngilizce) (%50 İndirimli)",
        "Endüstri Mühendisliği (İngilizce) (UOLP-Suny Binghamton) (Ücretli)",
        "Elektrik-Elektronik Mühendisliği (İngilizce) (İÖ)(Ücretli)",
        "Bilişim Sistemleri Mühendisliği",
        "Bilişim Sistemleri Mühendisliği (İngilizce) (UOLP-Suny Binghamton) (Ücretli)",
        "Endüstriyel Tasarım (Fakülte)",
        "Yazılım Geliştirme (Yüksekokul) (İngilizce) (Burslu)",
        "Bilgisayar Mühendisliği (İngilizce) (KKTC Uyruklu)",
        "Moleküler Biyoloji ve Genetik (KKTC Uyruklu)",
        "Biyomühendislik (İngilizce) (Burslu)",
        "Makine Mühendisliği (İÖ)(Ücretli)",
        "Fizyoterapi ve Rehabilitasyon (Fakülte) (İngilizce) (Burslu)",
        "Yapay Zeka Mühendisliği (İngilizce) (KKTC Uyruklu)",
        "Kimya Mühendisliği (İngilizce) (KKTC Uyruklu)",
        "Otomotiv Mühendisliği (İngilizce) (Burslu)",
        "Endüstri Mühendisliği (İÖ)(Ücretli)",
        "Beslenme ve Diyetetik (Fakülte) (Burslu)",
        "Gemi Makineleri İşletme Mühendisliği (İngilizce) (%50 İndirimli)",
        "Kimya Mühendisliği (Burslu)",
        "Metalurji ve Malzeme Mühendisliği (İngilizce) (Burslu)",
        "Kimya (İngilizce) (Ücretli)",
        "Elektronik ve Haberleşme Mühendisliği (İngilizce) (KKTC Uyruklu)",
        "İstatistik (Burslu)",
        "Matematik Mühendisliği (KKTC Uyruklu)",
        "Elektronik ve Haberleşme Mühendisliği (İngilizce) (UOLP-Uluslararası Saraybosna Üniversitesi) (Ücretli)",
        "Mühendislik ve Doğa Bilimleri Programları (İngilizce) (Ücretli)",
        "Geomatik Mühendisliği",
        "Matematik (İngilizce) (Ücretli)",
        "Jeoloji Mühendisliği",
        "Eczacılık (İngilizce) (%25 İndirimli)",
        "Makine Mühendisliği (İngilizce) (UOLP-Uluslararası Saraybosna Üniversitesi) (Ücretli)",
        "Fizyoterapi ve Rehabilitasyon (Fakülte) (Burslu)",
        "Şehir ve Bölge Planlama (İngilizce) (Burslu)",
        "Malzeme Bilimi ve Mühendisliği (İngilizce) (Burslu)",
        "Elektrik-Elektronik Mühendisliği (M.T.O.K.) (M.T.O.K.)",
        "Fizyoterapi ve Rehabilitasyon (Fakülte)",
        "Elektronik ve Haberleşme Mühendisliği (İÖ)(Ücretli)",
        "Malzeme Bilimi ve Nanoteknoloji Mühendisliği (Ücretli)",
        "Kimya-Biyoloji Mühendisliği (İngilizce) (Ücretli)",
        "İnşaat Mühendisliği (Burslu)",
        "Mimarlık (İngilizce) (Ücretli)",
        "Jeofizik Mühendisliği",
        "Kimya Öğretmenliği (İngilizce) (KKTC Uyruklu)",
        "Mekatronik Mühendisliği (Burslu)",
        "Otomotiv Mühendisliği",
        "Peyzaj Mimarlığı (İngilizce)",
        "Matematik ve Bilgisayar Bilimleri (Burslu)",
        "Deniz Ulaştırma İşletme Mühendisliği (Fakülte) (İngilizce) (%50 İndirimli)",
        "Yazılım Mühendisliği (İngilizce) (KKTC Uyruklu)",
        "Adli Bilimler (Burslu)",
        "Cevher Hazırlama Mühendisliği",
        "Bilgisayar Mühendisliği (%25 İndirimli)",
        "Fizik Mühendisliği (İngilizce)",
        "Uçak Mühendisliği (İngilizce) (KKTC Uyruklu)",
        "Moleküler Biyoloji ve Genetik (İngilizce) (KKTC Uyruklu)",
        "Tekstil Mühendisliği",
        "Gıda Mühendisliği (Burslu)",
        "Malzeme Bilimi ve Mühendisliği",
        "Endüstriyel Tasarım Mühendisliği",
        "Biyomedikal Mühendisliği (%50 İndirimli)",
        "Bilişim Sistemleri ve Teknolojileri (Fakülte) (Burslu)",
        "Fizik Öğretmenliği",
        "Endüstriyel Tasarım (Fakülte) (%50 İndirimli)",
        "Ergoterapi",
        "Elektrik-Elektronik Mühendisliği (İngilizce) (%25 İndirimli)",
        "Şehir ve Bölge Planlama",
        "Biyoloji",
        "Kimya Mühendisliği (İngilizce) (%50 İndirimli)",
        "Uçak Gövde ve Motor Bakımı (Fakülte) (İÖ)(Ücretli)",
        "Dijital Oyun Tasarımı (İngilizce) (%50 İndirimli)",
        "Enerji Sistemleri Mühendisliği",
        "Kimya Öğretmenliği",
        "Uçak Gövde ve Motor Bakımı (Yüksekokul) (Burslu)",
        "Mühendislik Programları (İngilizce) (%25 İndirimli)",
        "Havacılık Elektrik ve Elektroniği (Fakülte) (Burslu)",
        "Hemşirelik (Fakülte) (Ankara)",
        "Mekatronik Mühendisliği (İngilizce) (%50 İndirimli)",
        "Ergoterapi (Burslu)",
        "Dijital Oyun Tasarımı",
        "Hemşirelik (Yüksekokul) (Burslu)",
        "Biyomedikal Mühendisliği (İngilizce) (%50 İndirimli)",
        "İç Mimarlık (İngilizce) (%50 İndirimli)",
        "Mekatronik Mühendisliği (M.T.O.K.) (M.T.O.K.)",
        "Yazılım Mühendisliği (İngilizce) (Ücretli)",
        "Makine Mühendisliği (M.T.O.K.) (M.T.O.K.)",
        "Fen Bilgisi Öğretmenliği",
        "Biyomühendislik (İngilizce) (UOLP-Uluslararası Saraybosna Üniversitesi) (Ücretli)",
        "Elektrik Mühendisliği (İÖ)(Ücretli)",
        "Uçak Bakım ve Onarım (Fakülte) (Burslu)",
        "Veterinerlik (Burslu)",
        "Beslenme ve Diyetetik (Yüksekokul) (Burslu)",
        "Fizik",
        "Metalurji ve Malzeme Mühendisliği (Burslu)",
        "Havacılık Elektrik ve Elektroniği (Yüksekokul) (Burslu)",
        "Uçak Gövde ve Motor Bakımı (Yüksekokul)",
        "Dil ve Konuşma Terapisi (Fakülte) (%50 İndirimli)",
        "Makine Mühendisliği (İngilizce) (İÖ)(Ücretli)",
        "Dil ve Konuşma Terapisi (Yüksekokul) (Burslu)",
        "Matematik (Burslu)",
        "Havacılık ve Uzay Mühendisliği (İngilizce) (%50 İndirimli)",
        "Uzay Mühendisliği",
        "Veterinerlik (İngilizce) (Burslu)",
        "Gemi İnşaatı ve Gemi Makineleri Mühendisliği (UOLP-Strathclyde) (İngilizce) (UOLP)",
        "Elektrik-Elektronik Mühendisliği (UOLP-Azerbaycan Teknik Üniversitesi) (Ücretli)",
        "Bilgisayar ve Öğretim Teknolojileri Öğretmenliği",
        "Endüstri Mühendisliği (İngilizce) (KKTC Uyruklu)",
        "Gemi Makineleri İşletme Mühendisliği (İngilizce) (UOLP-Suny Maritime) (%50 İndirimli)",
        "Harita Mühendisliği",
        "Matematik ve Bilgisayar Bilimleri",
        "Gemi İnşaatı ve Gemi Makineleri Mühendisliği (İngilizce) (Ücretli)",
        "Fizik (İngilizce) (KKTC Uyruklu)",
        "Biyoloji (İngilizce) (KKTC Uyruklu)",
        "Mekatronik Mühendisliği (İÖ)(Ücretli)",
        "Bilgisayar Mühendisliği (İngilizce) (%25 İndirimli)",
        "İç Mimarlık (Burslu)",
        "Gemi ve Yat Tasarımı (Burslu)",
        "Uçak Bakım ve Onarım (Fakülte)",
        "Havacılık Elektrik ve Elektroniği (Fakülte) (İÖ)(Ücretli)",
        "Ebelik (Fakülte) (Burslu)",
        "Genetik ve Biyomühendislik (İngilizce) (%50 İndirimli)",
        "Kentsel Tasarım ve Peyzaj Mimarlığı (İngilizce) (%50 İndirimli)",
        "Ebelik (Yüksekokul) (Burslu)",
        "Biyomedikal Mühendisliği",
        "Yazılım Mühendisliği (İngilizce) (%25 İndirimli)",
        "Fotonik (İngilizce)",
        "Uçak Bakım ve Onarım (Yüksekokul) (Burslu)",
        "Ebelik (Fakülte)",
        "Biyomedikal Mühendisliği (Ücretli)",
        "Hemşirelik (Yüksekokul) (%50 İndirimli)",
        "Endüstriyel Tasarım (Fakülte) (Ücretli)",
        "Mekatronik Mühendisliği (İngilizce) (KKTC Uyruklu)",
        "Hemşirelik (Yüksekokul) (İngilizce) (Burslu)",
        "Bitki Koruma",
        "İnşaat Mühendisliği (İngilizce) (UOLP-Suny Buffalo) (Ücretli)",
        "Beslenme ve Diyetetik (Fakülte) (Ankara)",
        "Enerji Sistemleri Mühendisliği (İngilizce) (%50 İndirimli)",
        "İç Mimarlık (İngilizce) (Ücretli)",
        "Ebelik (Fakülte) (Ankara)",
        "Biyokimya",
        "Endüstri Mühendisliği (İngilizce) (İÖ)(Ücretli)",
        "Adli Bili≈üim M√ºhendisliƒüi",
        "Yazılım Mühendisliği (%50 İndirimli)",
        "Perfüzyon (Burslu)",
        "Fizyoterapi ve Rehabilitasyon (Yüksekokul) (Burslu)",
        "Hemşirelik (Yüksekokul)",
        "Biyoloji Öğretmenliği",
        "Odyoloji (Fakülte)",
        "Matematik (İÖ)(Ücretli)",
        "Matematik (Uzaktan Öğretim)",
        "Mimarlık (Ücretli)",
        "Hemşirelik (Fakülte) (%50 İndirimli)",
        "Pilotaj (Fakülte) (İngilizce) (Ücretli)",
        "Bilişim Sistemleri Mühendisliği (İngilizce) (%50 İndirimli)",
        "Yazılım Mühendisliği (M.T.O.K.) (M.T.O.K.)",
        "İnşaat Mühendisliği (İÖ)(Ücretli)",
        "İşletme Mühendisliği (İngilizce) (Ücretli)",
        "Fizik Öğretmenliği (İngilizce) (KKTC Uyruklu)",
        "Fizyoterapi ve Rehabilitasyon (Fakülte) (Ankara)",
        "Ergoterapi (Ankara)",
        "Hemşirelik (Fakülte) (İÖ)(Ücretli)",
        "Bilişim Sistemleri Mühendisliği (M.T.O.K.) (M.T.O.K.)",
        "Adli Bilimler",
        "Bilgisayar Mühendisliği (M.T.O.K.) (M.T.O.K.) (İÖ)(Ücretli)",
        "Enerji Sistemleri Mühendisliği (M.T.O.K.) (M.T.O.K.)",
        "Gıda Mühendisliği (İngilizce) (KKTC Uyruklu)",
        "Hemşirelik (Yüksekokul) (İÖ)(Ücretli)",
        "Ebelik (Yüksekokul)",
        "Deniz Ulaştırma İşletme Mühendisliği (Yüksekokul) (İngilizce) (Burslu)",
        "İnşaat Mühendisliği (İngilizce) (UOLP-Azerbaycan Mimarlık ve İnşaat Üniversitesi) (Ücretli)",
        "Odyoloji (Fakülte) (Burslu)",
        "Uzay Mühendisliği (İngilizce) (%50 İndirimli)",
        "İlköğretim Matematik Öğretmenliği (%50 İndirimli)",
        "Yapay Zeka Mühendisliği (%50 İndirimli)",
        "İnşaat Mühendisliği (KKTC Uyruklu)",
        "Hidrojeoloji Mühendisliği",
        "Enerji Sistemleri Mühendisliği (İngilizce) (Ücretli)",
        "Endüstriyel Tasarım (Fakülte) (İngilizce) (%50 İndirimli)",
        "Dil ve Konuşma Terapisi (Fakülte) (İngilizce) (%50 İndirimli)",
        "Metalurji ve Malzeme Mühendisliği (İngilizce) (%50 İndirimli)",
        "Elektrik-Elektronik Mühendisliği (KKTC Uyruklu)",
        "Odyoloji (Fakülte) (İngilizce) (Burslu)",
        "Kimya (İngilizce) (KKTC Uyruklu)",
        "İmalat Mühendisliği",
        "Pilotaj (Yüksekokul) (İngilizce) (Ücretli)",
        "Astronomi ve Uzay Bilimleri",
        "Metalurji ve Malzeme Mühendisliği (İÖ)(Ücretli)",
        "Moleküler Biyoloji ve Genetik (%50 İndirimli)",
        "Adli Bili≈üim M√ºhendisliƒüi (ƒ∞√ñ)(√úcretli)",
        "Aktüerya Bilimleri",
        "Yazılım Mühendisliği (M.T.O.K.) (M.T.O.K.) (İÖ)(Ücretli)",
        "İnşaat Mühendisliği (İngilizce) (%50 İndirimli)",
        "Endüstriyel Tasarım Mühendisliği (Burslu)",
        "Malzeme Bilimi ve Nanoteknoloji Mühendisliği (İngilizce) (%50 İndirimli)",
        "Elektrik-Elektronik Mühendisliği (M.T.O.K.) (M.T.O.K.) (İÖ)(Ücretli)",
        "Elektronik ve Haberleşme Mühendisliği (İngilizce) (Burslu)",
        "Hemşirelik (Fakülte) (İngilizce) (%50 İndirimli)",
        "Elektrik-Elektronik Mühendisliği (%25 İndirimli)",
        "Yazılım Mühendisliği (KKTC Uyruklu)",
        "Mimarlık (İngilizce) (%25 İndirimli)",
        "Otomotiv Mühendisliği (İÖ)(Ücretli)",
        "Deniz Ulaştırma İşletme Mühendisliği (Fakülte) (İngilizce) (Ücretli)",
        "Jeofizik Mühendisliği (İngilizce)",
        "Otomotiv Mühendisliği (İngilizce) (%50 İndirimli)",
        "Uzay ve Uydu Mühendisliği",
        "Tıp Mühendisliği",
        "Yazılım Mühendisliği (%25 İndirimli)",
        "İlköğretim Matematik Öğretmenliği (İngilizce) (%50 İndirimli)",
        "Gemi İnşaatı ve Gemi Makineleri Mühendisliği (KKTC Uyruklu)",
        "Kentsel Tasarım ve Peyzaj Mimarlığı (Burslu)",
        "Tekstil Mühendisliği (M.T.O.K.) (M.T.O.K.)",
        "Otomotiv Mühendisliği (M.T.O.K.) (M.T.O.K.)",
        "Uçak Mühendisliği (KKTC Uyruklu)",
        "Havacılık ve Uzay Mühendisliği (İngilizce) (Ücretli)",
        "Beslenme ve Diyetetik (Fakülte) (%50 İndirimli)",
        "Veterinerlik (%50 İndirimli)",
        "Yazılım Mühendisliği (Ücretli)",
        "Polimer Malzeme Mühendisliği",
        "Gemi Makineleri İşletme Mühendisliği (İngilizce) (Ücretli)",
        "Yapay Zeka Mühendisliği (Ücretli)",
        "Deri Mühendisliği (İngilizce)",
        "Deniz Ulaştırma İşletme Mühendisliği (Yüksekokul) (İngilizce) (%50 İndirimli)",
        "İnşaat Mühendisliği (M.T.O.K.) (M.T.O.K.)",
        "Endüstriyel Tasarım Mühendisliği (M.T.O.K.) (M.T.O.K.)",
        "Ortez ve Protez (Burslu)",
        "Biyomedikal Mühendisliği (İngilizce) (Ücretli)",
        "İnşaat Mühendisliği (%50 İndirimli)",
        "Uçak Bakım ve Onarım (Yüksekokul)",
        "Ebelik (Fakülte) (%50 İndirimli)",
        "Odyoloji (Yüksekokul) (Burslu)",
        "Adli Bili≈üim M√ºhendisliƒüi (M.T.O.K.) (M.T.O.K.)",
        "Raylı Sistemler Mühendisliği (İngilizce)",
        "Genetik ve Biyomühendislik (İngilizce)",
        "Hemşirelik (Fakülte) (%25 İndirimli)",
        "Tarım Makineleri ve Teknolojileri Mühendisliği (İngilizce) (Burslu)",
        "Bahçe Bitkileri",
        "Endüstri Mühendisliği (KKTC Uyruklu)",
        "Gıda Mühendisliği (%50 İndirimli)",
        "İlköğretim Matematik Öğretmenliği (%25 İndirimli)",
        "Fizyoterapi ve Rehabilitasyon (Fakülte) (İngilizce)",
        "Biyomühendislik (İngilizce) (%50 İndirimli)",
        "Orman Mühendisliği",
        "Malzeme Bilimi ve Mühendisliği (İngilizce) (%50 İndirimli)",
        "İnşaat Mühendisliği (İngilizce) (Ücretli)",
        "Mekatronik Mühendisliği (Almanca)(KKTC Uyruklu)",
        "İlköğretim Matematik Öğretmenliği (Ücretli)",
        "Peyzaj Mimarlığı",
        "Odyoloji (Fakülte) (Ankara)",
        "Bilişim Sistemleri ve Teknolojileri (Yüksekokul) (İngilizce) (Burslu)",
        "Metalurji ve Malzeme Mühendisliği (M.T.O.K.) (M.T.O.K.)",
        "Biyomedikal Mühendisliği (M.T.O.K.) (M.T.O.K.)",
        "Petrol ve Doğalgaz Mühendisliği",
        "Uzay Mühendisliği (İngilizce) (Ücretli)",
        "Bilişim Sistemleri Mühendisliği (İngilizce) (Ücretli)",
        "Endüstri Mühendisliği (İngilizce) (%25 İndirimli)",
        "Deniz Ulaştırma İşletme Mühendisliği (Fakülte) (İngilizce) (UOLP-Suny Maritime) (Ücretli)",
        "Deniz Ulaştırma İşletme Mühendisliği (Yüksekokul) (İngilizce) (Ücretli)",
        "Kimya Mühendisliği (%50 İndirimli)",
        "Uçak Mühendisliği (İngilizce) (%25 İndirimli)",
        "Yazılım Geliştirme (Fakülte) (İngilizce) (%50 İndirimli)",
        "Bilişim Sistemleri Mühendisliği (Burslu)",
        "Yazılım Mühendisliği (M.T.O.K.)",
        "Ebelik (Yüksekokul) (%50 İndirimli)",
        "Optik ve Akustik Mühendisliği (İngilizce)",
        "Fotonik",
        "Makine Mühendisliği (M.T.O.K.) (M.T.O.K.) (İÖ)(Ücretli)",
        "Gemi Makineleri İşletme Mühendisliği (İngilizce) (UOLP-Suny Maritime) (Ücretli)",
        "Mekatronik Mühendisliği (M.T.O.K.) (M.T.O.K.) (İÖ)(Ücretli)",
        "Uçak Mühendisliği (%25 İndirimli)",
        "Genetik ve Biyomühendislik (İngilizce) (Ücretli)",
        "Uçak Mühendisliği (Ücretli)",
        "Nanoteknoloji M√ºhendisliƒüi (ƒ∞ngilizce)",
        "Endüstri Mühendisliği (%25 İndirimli)",
        "Mekatronik Mühendisliği (İngilizce) (Ücretli)",
        "Mühendislik Programları (İngilizce) (Ücretli)",
        "Yazılım Mühendisliği (M.T.O.K.) (İÖ)(Ücretli)",
        "Mekatronik Mühendisliği (%50 İndirimli)",
        "Nükleer Enerji Mühendisliği",
        "Uzay Bilimleri ve Teknolojileri",
        "Metalurji ve Malzeme Mühendisliği (%50 İndirimli)",
        "Pilotaj (Yüksekokul) (Ücretli)",
        "Gıda Mühendisliği (İngilizce) (%50 İndirimli)",
        "Raylı Sistemler Mühendisliği",
        "Uçak Mühendisliği (İngilizce) (%50 İndirimli)",
        "Harita Mühendisliği (İngilizce)",
        "Biyomedikal Mühendisliği (İÖ)(Ücretli)",
        "Genetik ve Biyomühendislik",
        "Havacılık Elektrik ve Elektroniği (Yüksekokul)",
        "Endüstriyel Tasarım (Fakülte) (İngilizce) (Ücretli)",
        "Ortez ve Protez",
        "Bilgisayar Teknolojisi ve Bilişim Sistemleri",
        "Beslenme ve Diyetetik (Yüksekokul) (%50 İndirimli)",
        "Bilişim Sistemleri ve Teknolojileri (Yüksekokul)",
        "Fizyoterapi ve Rehabilitasyon (Fakülte) (İÖ)(Ücretli)",
        "Matematik (İngilizce) (KKTC Uyruklu)",
        "Fizyoterapi ve Rehabilitasyon (Fakülte) (%50 İndirimli)",
        "İstatistik ve Bilgisayar Bilimleri",
        "Beslenme ve Diyetetik (Fakülte) (İngilizce) (%50 İndirimli)",
        "Hemşirelik (Fakülte) (Ücretli)",
        "Tarım Makineleri ve Teknolojileri Mühendisliği",
        "Bilişim Sistemleri ve Teknolojileri (Yüksekokul) (Burslu)",
        "İç Mimarlık (İÖ)(Ücretli)",
        "Matematik ve Bilgisayar Bilimleri (İngilizce) (Burslu)",
        "Aktüerya Bilimleri (KKTC Uyruklu)",
        "Yazılım Geliştirme (Yüksekokul) (İngilizce) (%50 İndirimli)",
        "Moleküler Biyoloji ve Genetik (Ücretli)",
        "Beslenme ve Diyetetik (Fakülte) (Ücretli)",
        "İstatistik (%50 İndirimli)",
        "Hemşirelik (Yüksekokul) (Ücretli)",
        "İstatistik ve Bilgisayar Bilimleri (İngilizce) (Burslu)",
        "Tarla Bitkileri",
        "İş Sağlığı ve Güvenliği (Fakülte) (Burslu)",
        "Ortez ve Protez (Ankara)",
        "Beslenme ve Diyetetik (Yüksekokul)",
        "Veterinerlik (İngilizce) (%50 İndirimli)",
        "Fizyoterapi ve Rehabilitasyon (Yüksekokul) (%50 İndirimli)",
        "Uçak Gövde ve Motor Bakımı (Yüksekokul) (İngilizce) (%25 İndirimli)",
        "Su Bilimleri ve Mühendisliği",
        "Bilgi Güvenliği Teknolojisi (Fakülte) (İngilizce) (%50 İndirimli)",
        "Toprak Bilimi ve Bitki Besleme",
        "Uçak Elektrik ve Elektroniği (İngilizce) (%25 İndirimli)",
        "Biyosistem Mühendisliği",
        "Ağaç İşleri Endüstri Mühendisliği",
        "Dijital Oyun Tasarımı (%50 İndirimli)",
        "Fizyoterapi ve Rehabilitasyon (Yüksekokul)",
        "Bilişim Sistemleri ve Teknolojileri (Fakülte)",
        "Dijital Oyun Tasarımı (Ücretli)",
        "İç Mimarlık (%50 İndirimli)",
        "Acil Yardım ve Afet Yönetimi (Fakülte)",
        "Şehir ve Bölge Planlama (KKTC Uyruklu)",
        "Hemşirelik (Yüksekokul) (İngilizce) (%50 İndirimli)",
        "Yazılım Geliştirme (Fakülte) (İngilizce) (Ücretli)",
        "Orman Endüstrisi Mühendisliği",
        "Su Ürünleri Mühendisliği (İngilizce)",
        "Basım Teknolojileri",
        "Ergoterapi (%50 İndirimli)",
        "Matematik (%50 İndirimli)",
        "Bilgi Güvenliği Teknolojisi (Yüksekokul) (İngilizce) (Burslu)",
        "Biyoteknoloji",
        "Hemşirelik (Yüksekokul) (%25 İndirimli)",
        "İş Sağlığı ve Güvenliği (Fakülte)",
        "Matematik ve Bilgisayar Bilimleri (%50 İndirimli)",
        "Bilişim Sistemleri ve Teknolojileri (Fakülte) (%50 İndirimli)",
        "Havacılık Elektrik ve Elektroniği (Yüksekokul) (%50 İndirimli)",
        "Ebelik (Yüksekokul) (Ücretli)",
        "Uçak Bakım ve Onarım (Yüksekokul) (%50 İndirimli)",
        "Uçak Bakım ve Onarım (Fakülte) (%50 İndirimli)",
        "Bilgi Güvenliği Teknolojisi (Fakülte) (İngilizce) (Ücretli)",
        "Bilişim Sistemleri ve Teknolojileri (Yüksekokul) (İngilizce) (Ücretli)",
        "Havacılık Elektrik ve Elektroniği (Yüksekokul) (Ücretli)",
        "Havacılık Elektrik ve Elektroniği (Fakülte) (%50 İndirimli)",
        "Uçak Bakım ve Onarım (Yüksekokul) (Ücretli)",
        "Dijital Oyun Tasarımı (İngilizce) (Ücretli)",
        "Fizyoterapi ve Rehabilitasyon (Fakülte) (Ücretli)",
        "Hemşirelik (Fakülte) (İngilizce) (Ücretli)",
        "Fizyoterapi ve Rehabilitasyon (Fakülte) (İngilizce) (%50 İndirimli)",
        "Fizyoterapi ve Rehabilitasyon (Fakülte) (İngilizce) (Ücretli)",
        "Tarımsal Biyoteknoloji",
        "Su Ürünleri Mühendisliği",
        "Bilişim Sistemleri ve Teknolojileri (Yüksekokul) (İngilizce) (%50 İndirimli)",
        "Dil ve Konuşma Terapisi (Fakülte) (Ücretli)",
        "Matematik ve Bilgisayar Bilimleri (Ücretli)",
        "Zootekni",
        "Odyoloji (Fakülte) (%50 İndirimli)",
        "Adli Bilimler (%50 İndirimli)",
        "Tarƒ±msal Yapƒ±lar ve Sulama",
        "Şehir ve Bölge Planlama (İngilizce) (%50 İndirimli)",
        "Ziraat Mühendisliği Programları",
        "Nanobilim ve Nanoteknoloji",
        "Gerontoloji",
        "Gemi ve Yat Tasarımı (%25 İndirimli)",
        "Kentsel Tasarım ve Peyzaj Mimarlığı (%50 İndirimli)",
        "İç Mimarlık (Ücretli)",
        "Uçak Gövde ve Motor Bakımı (Yüksekokul) (%25 İndirimli)",
        "Endüstriyel Tasarım (Yüksekokul)",
        "Gıda Teknolojisi (Fakülte)",
        "Ebelik (Yüksekokul) (%25 İndirimli)",
        "Matematik ve Bilgisayar Bilimleri (İngilizce) (Ücretli)",
        "Beslenme ve Diyetetik (Fakülte) (İÖ)(Ücretli)",
        "Tarımsal Genetik Mühendisliği (İngilizce)",
        "İş Sağlığı ve Güvenliği (Açıköğretim) (Açıköğretim)",
        "İç Mimarlık (%25 İndirimli)",
        "Biyokimya (KKTC Uyruklu)",
        "Dil ve Konuşma Terapisi (Fakülte) (KKTC Uyruklu)",
        "Fizik (KKTC Uyruklu)",
        "Beslenme ve Diyetetik (Fakülte) (%25 İndirimli)",
        "Süt Teknolojisi",
        "Fizik (İngilizce) (UOLP-Coe College) (Ücretli)",
        "Dil ve Konuşma Terapisi (Yüksekokul) (%25 İndirimli)",
        "Kimya (KKTC Uyruklu)",
        "Bilişim Sistemleri ve Teknolojileri (Yüksekokul) (Ücretli)",
        "Peyzaj Mimarlığı (İngilizce) (Burslu)",
        "Acil Yardım ve Afet Yönetimi (Yüksekokul)",
        "Bilişim Sistemleri ve Teknolojileri (Yüksekokul) (%50 İndirimli)",
        "İstatistik ve Bilgisayar Bilimleri (İngilizce) (Ücretli)",
        "Biyosistem Mühendisliği (İngilizce)",
        "Fizyoterapi ve Rehabilitasyon (Yüksekokul) (Ücretli)",
        "Havacılık Elektrik ve Elektroniği (Yüksekokul) (%25 İndirimli)",
        "Şehir ve Bölge Planlama (Burslu)",
        "Uçak Gövde ve Motor Bakımı (Fakülte) (KKTC Uyruklu)",
        "Kentsel Tasarım ve Peyzaj Mimarlığı",
        "Tütün Eksperliği",
        "Perfüzyon (%50 İndirimli)",
        "Tarım Makineleri ve Teknolojileri Mühendisliği (İngilizce) (%50 İndirimli)",
        "Bitkisel Üretim ve Teknolojileri (İngilizce)",
        "Fizyoterapi ve Rehabilitasyon (Fakülte) (%25 İndirimli)",
        "İstatistik ve Bilgisayar Bilimleri (İngilizce) (%50 İndirimli)",
        "Dil ve Konuşma Terapisi (Yüksekokul) (Ücretli)",
        "Ebelik (Fakülte) (Ücretli)",
        "Biyoloji (KKTC Uyruklu)",
        "Tohum Bilimi ve Teknolojisi",
        "Tarım Makineleri ve Teknolojileri Mühendisliği (İngilizce) (Ücretli)",
        "Beslenme ve Diyetetik (Fakülte) (İngilizce) (Ücretli)",
        "Matematik ve Bilgisayar Bilimleri (İngilizce) (%50 İndirimli)",
        "Odyoloji (Yüksekokul) (%50 İndirimli)",
        "Bitkisel Üretim ve Teknolojileri (İngilizce) (Burslu)",
        "Biyoloji (UOLP-Gence Devlet Üniversitesi) (Ücretli)",
        "Su Ürünleri Mühendisliği (KKTC Uyruklu)",
        "Acil Yardım ve Afet Yönetimi (Fakülte) (İÖ)(Ücretli)",
        "Hayvansal Üretim ve Teknolojileri (Fakülte) (İngilizce)",
        "Odyoloji (Fakülte) (İngilizce) (%50 İndirimli)",
        "Ergoterapi (İngilizce) (Burslu)",
        "Balƒ±k√ßƒ±lƒ±k Teknolojisi M√ºhendisliƒüi",
        "Aktüerya Bilimleri (İngilizce) (Burslu)",
        "Veterinerlik (İngilizce) (KKTC Uyruklu)",
        "Bahçe Bitkileri (İngilizce) (Burslu)",
        "Kentsel Tasarım ve Peyzaj Mimarlığı (Ücretli)",
        "Ortez ve Protez (%50 İndirimli)",
        "Kanatlı Hayvan Yetiştiriciliği",
        "İş Sağlığı ve Güvenliği (Yüksekokul)",
        "Peyzaj Mimarlığı (KKTC Uyruklu)",
        "Veterinerlik (KKTC Uyruklu)",
        "Odyoloji (Fakülte) (Ücretli)",
        "Ağaç İşleri Endüstri Mühendisliği (M.T.O.K.) (M.T.O.K.)",
        "Peyzaj Mimarlığı (İngilizce) (%50 İndirimli)",
        "Yaban Hayatı Ekolojisi ve Yönetimi",
        "Beslenme ve Diyetetik (Yüksekokul) (Ücretli)",
        "Bitkisel Üretim ve Teknolojileri",
        "Odyoloji (Fakülte) (KKTC Uyruklu)",
        "Odyoloji (Yüksekokul) (Ücretli)",
        "Biyosistem Mühendisliği (KKTC Uyruklu)",
        "İş Sağlığı ve Güvenliği (Fakülte) (%50 İndirimli)",
        "Bilgi Güvenliği Teknolojisi (Yüksekokul) (İngilizce) (%50 İndirimli)",
        "Hayvansal Üretim ve Teknolojileri (Fakülte)",
        "İstatistik (KKTC Uyruklu)",
        "Gemi ve Yat Tasarımı (Ücretli)",
        "Zootekni (KKTC Uyruklu)",
        "Astronomi ve Uzay Bilimleri (KKTC Uyruklu)",
        "Gıda Teknolojisi (Yüksekokul)",
        "İç Mimarlık (KKTC Uyruklu)",
        "Hayvansal Üretim ve Teknolojileri (Yüksekokul)",
        "Şehir ve Bölge Planlama (%50 İndirimli)",
        "Bahçe Bitkileri (İngilizce) (%50 İndirimli)",
        "Balƒ±k√ßƒ±lƒ±k Teknolojisi M√ºhendisliƒüi (ƒ∞ngilizce) (Burslu)",
        "Ergoterapi (İngilizce) (%50 İndirimli)",
        "Ebelik (Fakülte) (KKTC Uyruklu)",
        "Acil Yardım ve Afet Yönetimi (Fakülte) (İngilizce) (Burslu)",
        "Tarla Bitkileri (KKTC Uyruklu)",
        "Acil Yardım ve Afet Yönetimi (Fakülte) (İngilizce) (Ücretli)",
        "Bitkisel Üretim ve Teknolojileri (İngilizce) (%50 İndirimli)",
        "Ergoterapi (İngilizce) (Ücretli)",
        "Adli Bilimler (KKTC Uyruklu)",
        "Kentsel Tasarım ve Peyzaj Mimarlığı (İngilizce) (Ücretli)",
        "Acil Yardım ve Afet Yönetimi (Fakülte) (İngilizce) (%50 İndirimli)",
        "Beslenme ve Diyetetik (Fakülte) (İngilizce) (%25 İndirimli)"
      ]
      bolumler.sort();

      const selectDep=document.getElementById("departmentSelect");
      
      for (let index = 0; index < bolumler.length; index++) {
        const element = bolumler[index];
        let option = document.createElement("option");
        option.value=element;
        option.textContent=element;
        selectDep.appendChild(option);
        console.log("sa");

      }
    
}




function getSchoolsByPuan(puan,year,bolum_adi){    
    
    fetch("http://localhost:3000/api/okullarWithPuan",{
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
            console.log(element.classList[2]);
            if (element.classList[2]==year) {
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