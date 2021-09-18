
const searchInput = document.getElementById('input');
const searchBtn = document.getElementById('btn');
const showCountry = document.getElementById('show-country');
const detailCountry = document.getElementById('detail-country');
const alertDiv = document.getElementById('alert');

document.addEventListener('keypress',(e)=>{
  
  if(e.key==='Enter' && searchInput.value !=='' ){
    searchBtn.click();
  }
});
searchBtn.addEventListener('click',(e)=>{
  if(searchInput.value ===''){
    alertDiv.innerHTML =`<h2> Please Enter Country Name !!!</h2>`;
    showCountry.innerHTML='';
    detailCountry.innerHTML='';
    return;
  }else{ 
  
    //fetch handle
    const ul = `https://restcountries.eu/rest/v2/name/${searchInput.value}`;
    fetch(ul)
    .then(res=>res.json())
    .then(data=>showData(data));
      //clear alert 
      alertDiv.innerHTML='';
      showCountry.innerText='';
      searchInput.value='';
      detailCountry.innerHTML='';
  }
    
});

const showData =(data)=>{

if(data.message==="Not Found"){
  alertDiv.innerHTML =`<h2>  Valid Country Name !!!</h2>`;
  return;
}
data.forEach(element => {
   
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML=`
    <div class="card p-1" style="width: 18rem;">
    <img src=" ${element.flag}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Country Name: ${element.name}</h5>
     
      <button onclick = " details( '${element.callingCodes[0]}')" class="btn btn-primary">Details</button>
    </div>
  </div>
    `;
    showCountry.appendChild(div);
});

}


function details(data){
  
    const ul =`https://restcountries.eu/rest/v2/callingcode/${data}`;
    fetch(ul)
    .then(res=>res.json())
    .then(data=>extraData(data))

}

const extraData =(data)=>{
 
  data.forEach(element=>{
    
    //clear  detailCountry
    detailCountry.innerHTML='';
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML=`
    <div class="card p-1 " style="width: 18rem;">
    <img src=" ${element.flag}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title"> Country Name: ${element.name}</h5>
      <p class="card-text">Capital: ${element.capital}</p>
      <p class="card-text">Subregion: ${element.subregion}</p>
    </div>
  </div>
    `;
    detailCountry.appendChild(div);
     })
}