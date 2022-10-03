const onLoad = ()=>{

    onLoadCookie()
    fetch('/api/index',{
        method : 'GET',
        headers: {
            'Content-Type': 'application/json',
          }
    })
    .then(response => response.json())
    .then(response =>{
       
        if(response){
            let i=0;
            response.response.forEach(element => {
                const newRow = document.createElement('div')
                newRow.classList.add('row')

                const colID = document.createElement('div')
                const colName =document.createElement('div')
                const colEmail = document.createElement('div')
                const colPass = document.createElement('div')
                const colEdit = document.createElement('div') 

                const editButton = document.createElement('button')
                editButton.title = 'Edit'
                const destroyButton = document.createElement('button')
                destroyButton.title = 'Delete'
                const saveButton = document.createElement('button')
                saveButton.title = 'Save'

                const inputId = document.createElement('input')
                inputId.setAttribute('readonly',true)
                const inputName = document.createElement('input')
                inputName.setAttribute('readonly',true)
                const inputEmail = document.createElement('input')
                inputEmail.setAttribute('readonly',true)
                const inputPass = document.createElement('input')
                inputPass.setAttribute('readonly',true)
                
                

                colID.classList.add('data-field')
                colName.classList.add('data-field')
                colEmail.classList.add('data-field')
                colEdit.classList.add('edit-field') 
                colPass.classList.add('data-field')
                
                editButton.classList.add('edit-button')
                editButton.classList.add('btn-info')
                editButton.innerHTML = '&#9998;'
                destroyButton.classList.add('btn-danger')
                destroyButton.innerHTML = 'X'
                saveButton.classList.add('btn-success')
                saveButton.innerHTML = '&#10003;'
                colEdit.style.visibility = 'hidden'





                editButton.id = i
                editButton.addEventListener("click", onClickPencil)
                i++
                inputId.id = i
                i++
                inputName.id =i
                i++
                inputEmail.id = i
                i++
                inputPass.id = i
                i++
                colEdit.id = i
                i++
                saveButton.id = i
                i++
                destroyButton.id = i
                i++

               

                inputId.setRangeText(element._id)
                colID.appendChild(inputId)
                inputName.setRangeText(element.name)
                colName.append(inputName)
                inputEmail.setRangeText(element.email)
                colEmail.append(inputEmail)
                inputPass.setRangeText(element.password)
                colPass.append(inputPass)
               
                
               
                colEdit.appendChild(destroyButton)
                colEdit.appendChild(saveButton)


                newRow.appendChild(colID)
                newRow.appendChild(colName)
                newRow.appendChild(colEmail)
                newRow.appendChild(colPass)
                newRow.appendChild(colEdit)
                newRow.appendChild(editButton)
                
                



                container.appendChild(newRow)
                
            });
        }
        else{
            alert(response.status)
        }
    })
    .catch((error) => {
       console.log(error)
      });
}

function onClickPencil() {
    if(flag){
    let buttonId = parseInt(event.target.id) 
    
    const eventButton = document.getElementById(`${buttonId}`)
    
    const name = document.getElementById(`${buttonId+2}`)
    const email = document.getElementById(`${buttonId+3}`)
    const pass = document.getElementById(`${buttonId+4}`)
    const edit = document.getElementById(`${buttonId+5}`)
    const saveButton = document.getElementById(`${buttonId+6}`)
    const destroyButton = document.getElementById(`${buttonId+7}`)
    
    
    name.removeAttribute('readonly')
    email.removeAttribute('readonly')
    pass.removeAttribute('readonly')
    eventButton.innerHTML = '&#10154'
    eventButton.removeEventListener('click',onClickPencil)
    eventButton.addEventListener('click',onClickArrow)
    saveButton.style.visibility = 'visible'
    destroyButton.style.visibility = 'visible'
    edit.style.visibility = 'visible'
    
    saveButton.addEventListener('click',onSave)
    destroyButton.addEventListener('click',onDestroy)
    thisUsername = name.value
    thisEmail = email.value
    flag = false
    }
    
    

    

}
function onClickArrow(){
    flag = true
    let buttonId = parseInt(event.target.id) 

    const eventButton = document.getElementById(`${buttonId}`)
    const name = document.getElementById(`${buttonId+2}`)
    const email = document.getElementById(`${buttonId+3}`)
    const pass = document.getElementById(`${buttonId+4}`)
    const saveButton = document.getElementById(`${buttonId+6}`)
    const destroyButton = document.getElementById(`${buttonId+7}`)
    const edit = document.getElementById(`${buttonId+5}`)
    edit.style.visibility = 'hidden'
    saveButton.style.visibility = 'hidden'
    destroyButton.style.visibility = 'hidden'
    eventButton.removeEventListener('click',onClickArrow)
    eventButton.addEventListener('click',onClickPencil)
    eventButton.innerHTML = '&#9998;'
    name.setAttribute('readonly',true)
    email.setAttribute('readonly',true)
    pass.setAttribute('readonly',true)
   
}

function onDestroy(){
    let buttonId = parseInt(event.target.id) 
    const userIDField = document.getElementById(`${buttonId-6}`)
    const userID = userIDField.value

    fetch('/api/destroy',{
        method : "POST",
        headers: {
            'Content-Type': 'application/json',
          },
        body : JSON.stringify({
            userID
        })  
    
    })
    .then(response => response.json())
    .then(response =>{
        if(response.status){
            
            setTimeout(function(){
                window.location.href = '/admin'
              },600)
        }
        else{
            alert(message)
        }
    })
    

}

function onSave(){
    let buttonId = parseInt(event.target.id) 
    const userID = document.getElementById(`${buttonId-5}`).value
    const name =  document.getElementById(`${buttonId-4}`).value
    const email =  document.getElementById(`${buttonId-3}`).value
    const password =  document.getElementById(`${buttonId-2}`).value
    
    fetch('/api/update',{
        method : "POST",
        headers: {
            'Content-Type': 'application/json',
          },
        body : JSON.stringify({
            userID,name,email,password,thisUsername,thisEmail
        })  


    })
    .then(response => response.json())
    .then(response =>{
        if(response.status){
            
            setTimeout(function(){
                window.location.href = '/admin'
              },600)
        }
        else{
            alert(response.message)
        }
    })
    


}

 


 
function onSubmit() {
    event.preventDefault()
    const name = document.querySelector('#username').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    const confirmpassword = document.querySelector('#password').value
    let adminStatus = false
    if(document.getElementById('admin').checked) {
         adminStatus = true
        
      }else if(document.getElementById('notAdmin').checked) {
         adminStatus = false
      }
      else{
          return alert('Select Admin Status!')
      }
      fetch('/api/register', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            name,email,password,confirmpassword,adminStatus
          }
        ),
      })
      .then(response => response.json())
      .then(response => {
        if(response.status){
            
            
            setTimeout(function(){
                window.location.href = 'adminpage.html'
            },1000)
          
        }
        else{
          alert(response.message)
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
}

function onLoadCookie(){
    
    const cookie = document.cookie
    let fields = cookie.split('; ')
    let temp
    let pos=0;
    for(let i=0; i <fields.length;i++){
        temp = fields[i].split('=')
        if(temp[0]=='healthylifesession'){
                pos=i
            }
    }
    let name = fields[pos].split('=')
    if(name[1]!=''){
        if(document.cookie!=""){
            const signInButton = document.getElementById('signin')
            signInButton.style.display = 'none'
            const toEditLi = document.getElementById('toEdit')         
            console.log(toEditLi)
            toEditLi.classList.add('dropdown')
            
            const aTag = document.createElement('a')
            aTag.id = 'user-dropdown';
            aTag.classList.add('nav-link')
            aTag.classList.add('dropdown-toggle')
            aTag.href = '#'
            aTag.setAttribute('role','button')
            aTag.setAttribute('data-toggle','dropdown')
            aTag.setAttribute('aria-haspopup','true')
            aTag.setAttribute('aria-expanded','false')
            aTag.innerHTML = name[1];
    
            const newDiv = document.createElement('div')
            newDiv.classList.add('dropdown-menu')
            newDiv.setAttribute('aria-labelledby','navbarDropdown')
           
            const settingsTag = document.createElement('a')
            settingsTag.classList.add('dropdown-item')
            settingsTag.id = 'js-dropdown-item';
            settingsTag.addEventListener('click',onProfile)
            settingsTag.innerHTML = 'go to profile'
           
            const logoutTag = document.createElement('a')
            logoutTag.classList.add('dropdown-item')
            logoutTag.id = 'js-dropdown-item';
            logoutTag.innerHTML = 'Logout'
            logoutTag.addEventListener('click',onClick)
    
    
            newDiv.appendChild(logoutTag)
    
            newDiv.appendChild(settingsTag)
            aTag.appendChild(newDiv)
            toEditLi.appendChild(aTag)
            const imageHolder = document.getElementById('userImage')
            

            let username = name[1]
            fetch('/api/getAvatar',{
                method : "POST",
                headers : {
                    "Content-Type": "Application/json"
                },
                body : JSON.stringify({
                    username
                })
            })
            .then(response => response.json())
            .then(response =>{
                if(response.status){
                    
                    let imgUrl = response.avatarUrl.split('/')
                    
                    imageHolder.setAttribute('src',`/uploads/${imgUrl[2]}`)
                }
                else{
                    alert(response.message)
                }
            })
            .catch(error =>{
                alert(error)
            })
            const imageContainer = document.getElementById('userImage')
            imageContainer.style.visibility = 'visible'
            const imageUser = document.getElementById('userImageHold')
            imageUser.style.visibility = 'visible'
            
            
           
        }
        else{
           return
        }
    }
    else{
        return
    }
    return
    


}

function onClick(){

    
        var cookies = document.cookie.split(";");
    
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        setTimeout(function(){
          window.location.href = '/'
         },100)
    
   
}
function onProfile(){
    setTimeout(function(){
        window.location.href = '/profile'
      },100)
}




let flag = true;
const buttonSubmit = document.getElementById('btn-submit')
buttonSubmit.addEventListener('click',onSubmit)
const container = document.getElementById('container')
