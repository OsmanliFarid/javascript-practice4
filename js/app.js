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
    const ShowBoxs2 = document.querySelector("#ShowBoxs2")
    users.innerHTML = ""
        ShowBoxs2.innerHTML += `<div class="ShowBox2">
        <i class="fa-solid fa-xmark" id="CloseBtn"></i>
            <form method="get">
            
                <input type="text" placeholder="adinizi yazin" id="AddUserInp2">
                <input type="text" placeholder="soyadiniz yazin" id="AddSurNameInp2">
                <input type="text" placeholder="email yazin" id="AddEmailInp2">
                <input type="number" placeholder="telefon yazin" id="AddPhoneInp2">
    
                <input type="submit" id="AddSubmitInput2">
            </form>
        </div>`
        const AddEmailInp2 = document.querySelector("#AddEmailInp2")
        const AddUserInp2 = document.querySelector("#AddUserInp2")
        const AddSurNameInp2 = document.querySelector("#AddSurNameInp2")
        const AddPhoneInp2 = document.querySelector("#AddPhoneInp2")
        const AddSubmitInput2 = document.querySelector("#AddSubmitInput2")
        axios.get(url + "/" + id).then(({data}) =>{
            AddUserInp2.value = data.username
            AddSurNameInp2.value = data.surname
            AddEmailInp2.value = data.email
            AddPhoneInp2.value = data.phone
            
            
        })
        
        AddSubmitInput2.addEventListener("click",(e) =>{
            e.preventDefault()
            if(AddUserInp2.value.length > 0 && AddSurNameInp2.value.length > 0 && AddEmailInp2.value.length > 0 && AddPhoneInp2.value.length > 0 && AddEmailInp2.value.includes("@")){
                axios.get(url + "/" + id).then(({data}) =>{
                
                
                    let newARR = {
                        username: AddUserInp2.value,
                                surname: AddSurNameInp2.value,
                                email: AddEmailInp2.value,
                                phone: AddPhoneInp2.value,
                    }
                    
                    axios.patch(url + "/" + id,newARR).then((element) =>{
                        
                        console.log(element);
                        
                        showData(url,id)
                    })
                    
                })
                ShowBoxs2.innerHTML = ""
            }else{
                alert("lutfen formu duzgun doldurun")
            }
            
        })
    
    const CloseBtn = document.querySelector("#CloseBtn")
    CloseBtn.addEventListener("click",() =>{
        ShowBoxs2.innerHTML = ""
        showData(ENDPOINT)
    })
    
    
}



const DeleteShow = (url,id) =>{
  
    Swal.fire({
        title: "Əminsinizmi?",
        text: "Bunu geri qaytara bilməyəcəksiniz!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Bəli, silinsin!"
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(url + "/" + id).then((element) => {
            showData(ENDPOINT);
          });
      
          Swal.fire({
            title: "Silindi!",
            text: "Faylınız silindi.",
            icon: "success"
          });
        }
      });
  
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
        if(AddUserInp.value.length > 0 && AddSurNameInp.value.length > 0 && AddEmailInp.value.length > 0 && AddPhoneInp.value.length > 0 && AddEmailInp.value.includes("@")){
            Swal.fire({
                title: "Yeni istifadəçi əlavə edəkmi?",
                text: "Yeni istifadəçi əlavə olunsunmu?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Bəli"
              }).then((result) => {
                if (result.isConfirmed) {
                  let newArr = {
                    username: AddUserInp.value,
                    surname: AddSurNameInp.value,
                    email: AddEmailInp.value,
                    phone: AddPhoneInp.value,
                  };
              
                  axios.post(ENDPOINT, newArr).then((element) => {
                      ShowBoxs.innerHTML = "";
                      showData(ENDPOINT);
                      cardBtn.innerText = "elave et";
                  });
              
                  Swal.fire({
                    title: "Yeni istifadəçi əlavə olundu",
                    text: "Yeni istifadəçi əlavə olundu",
                    icon: "success"
                    
                  });
                  
                }
              });
              
            
            
            
        }else{
            alert("form duzgun doldurun")
            
        }
        
           
            
            
       })
       
    }else if(cardBtn.innerText === "bagla"){
        ShowBoxs.innerHTML = ""
        cardBtn.innerText = "elave et"
        showData(ENDPOINT)
    }
    
})


