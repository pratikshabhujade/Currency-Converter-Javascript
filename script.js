const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns  = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns)
{
    for (CurrCode in countryList) 
        
{
       let newOption = document.createElement("option");
       newOption.innerText = CurrCode;
       newOption.value = CurrCode;
       if(select.name === "from" && CurrCode === "USD")
       {
        newOption.selected="selected";
       } else if (select.name === "to" && CurrCode === "INR") 
       {
        newOption.selected="selected";
       }
       select.append(newOption);
    }
    select.addEventListener("change" , (evt) => {
        updateFlag(evt.target);
    });

};

const updateFlag = (element) => {
let CurrCode = element.value;
let coutryCode = countryList[CurrCode];
let newSrc  = `https://flagsapi.com/${coutryCode}/flat/64.png`;
let img = element.parentElement.querySelector("img");
img.src= newSrc;


};

btn.addEventListener("click" , async(evt) => {
    evt.preventDefault();
    let amount = document.querySelector("form input");
    let amountVal = amount.value;
    if (amountVal=== "" || amountVal < 1) 
    {
        amountVal  = 1 ;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    console.log(response);
    let data = await response.json();
    let rate  = data[toCurr.value.toLowerCase()]; 
    let finalAmount = amount*rate ;
    msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;


    


});


