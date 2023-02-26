const loadPhoneData=async (AllPhone,dataLimit)=>{
    const URL =`https://openapi.programming-hero.com/api/phones?search=${AllPhone}`
    const res= await fetch(URL)
    const data =await res.json()
    loadDisplayData(data.data, dataLimit);
}

const loadDisplayData = (phone, dataLimit) =>{
    const showData =document.getElementById('show-data');
    showData.textContent=' ';
   

    const showAllPhone=document.getElementById('showAllBtn');
    if(dataLimit && phone.length > 10){
        phone=phone.slice(0,12);
        showAllPhone.classList.remove('d-none')
    }
    else{
        showAllPhone.classList.add('d-none')
    }

    const noPhone =document.getElementById('found-search-msg');
    if(phone.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none')
    }

    phone.forEach(phoneData => {
        console.log(phoneData);
        const createDiv=document.createElement('div');
        createDiv.classList.add('col');
        createDiv.innerHTML=`
        <div class="card">
           <img src="${phoneData.image}"  class="card-img-top  p-2" alt="...">
            <div class="card-body">
            <h5 class="card-title">${'Brand : ' + phoneData.brand}</h5>
            <h6 class="card-title text-primary">${'Name : ' + phoneData.phone_name}</h6>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
            <button onClick="loadPhoneDetails('${phoneData.slug}')" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
        </div>
        `
        showData.appendChild(createDiv);
    });

    // stop spinner
    loadedSpinner(false)
}

const processSearch =(dataLimit)=>{
    // start spinner
    loadedSpinner(true)
    const searchText =document.getElementById('search-text');
    const searchValue =searchText.value;
    loadPhoneData(searchValue, dataLimit);
    console.log(searchValue, dataLimit);
}


document.getElementById('searchBtn').addEventListener('click', function(){
    // data Limited
    processSearch(10)
})

 // code for enter kay
document.getElementById('search-text').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10)
    }
});

document.getElementById('showAllBtnBtn').addEventListener('click', function(){
    // No limitation data
    processSearch()
})

const loadedSpinner= (isSpinner)=>{
    const spinner= document.getElementById('loadSpinner');
    if(isSpinner){
        spinner.classList.remove(('d-none'))
    }
    else{
        spinner.classList.add('d-none')
    }
}


// Phone Details

const loadPhoneDetails= async id => {
    const URL =`https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(URL)
    const data =await res.json();
    showModalDetails(data.data);
}

const showModalDetails = (modal)=>{
    console.log(modal);
    document.getElementById('exampleModalLabel').innerText=`${modal.brand}`;
  const releaseDatePhone =  document.getElementById('ReleaseDate');
  releaseDatePhone.innerHTML=`
    <img src="${modal.image}" alt="">
    <p>Name : ${modal.name }</p>
    <p>ReleaseDate : ${modal.releaseDate ? modal.releaseDate : 'No releaseDAte found'}</p>
    <p>Storage : ${modal.mainFeatures.storage }</p>
    <p>Display : ${modal.mainFeatures.displaySize}</p>
    <p>Bluetooth : ${modal.others.Bluetooth}</p>
   
  `
}

loadPhoneData('Apple')