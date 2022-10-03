function onLoad(){
    
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
