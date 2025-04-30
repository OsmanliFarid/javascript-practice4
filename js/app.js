const users = document.querySelector("#users")
const ENDPOINT = "http://localhost:3001/users"
const cardBtn = document.querySelector("#cartBtn")
const showData = (url) =>{
    users.innerHTML = ""
   axios.get(url).then(({data}) =>{
    data.forEach(({id,username,surname,email,phone}) => {
        
        
        users.innerHTML += `<div class="card">
          <h5 class="card-name">${username}</h5>
          <p class="card-surname"><strong>Soyad:</strong>${surname}</p>
          <p class="card-email"><strong>Email:</strong>${email}</p>
          <p class="card-phone"><strong>Telefon:</strong>${phone}</p>
          <div class="card_btn_box">
            <button class="card-complient "onclick="EditShow('${url}', '${id}')">Edit</button>
            <button class="card-delete" onclick="DeleteShow('${url}', '${id}')">Sil</button>
          </div>
        </div>`
    });
    
    
    
   })
}
showData(ENDPOINT)



const EditShow = (url,id) =>{
    axios.get(url + "/" + id).then(({data}) =>{
        
        const newUser = prompt("user deyisdirmek",data.username)
        let newARR = {
            username:newUser
        }
        axios.patch(url + "/" + id,newARR).then((element) =>{
            
            console.log(element);
            
            showData(url,id)
        })
    })
    
}



const DeleteShow = (url,id) =>{
  axios.delete(url + "/" + id).then((element) =>{
    showData(ENDPOINT)
    
  })
  
}
const ShowBoxs = document.querySelector("#ShowBoxs")
cardBtn.addEventListener('click',() =>{
    if(cardBtn.innerText === "elave et"){
        users.innerHTML = ""
        ShowBoxs.innerHTML = ""
        ShowBoxs.innerHTML += `<div class="ShowBox">
                <form method="get">
                    <input type="text" placeholder="adinizi yazin" id="AddUserInp">
                    <input type="text" placeholder="soyadiniz yazin" id="AddSurNameInp">
                    <input type="text" placeholder="email yazin" id="AddEmailInp">
                    <input type="number" placeholder="telefon yazin" id="AddPhoneInp">
    
                    <input type="submit" id="AddSubmitInput">
                </form>
            </div>`
        cardBtn.innerText = "bagla"
        
       const AddEmailInp = document.querySelector("#AddEmailInp")
       const AddUserInp = document.querySelector("#AddUserInp")
       const AddSurNameInp = document.querySelector("#AddSurNameInp")
       const AddPhoneInp = document.querySelector("#AddPhoneInp")
       const AddSubmitInput = document.querySelector("#AddSubmitInput")
       AddSubmitInput.addEventListener('click',(e) =>{
        e.preventDefault()
        let newArr = {
            username:AddUserInp.value,
            surname:AddSurNameInp.value,
            email:AddEmailInp.value,
            phone:AddPhoneInp.value,
        }
            console.log(newArr);
            
       })
       
    }else if(cardBtn.innerText === "bagla"){
        ShowBoxs.innerHTML = ""
        cardBtn.innerText = "elave et"
        showData(ENDPOINT)
    }
    
})


