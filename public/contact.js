function onSubmit(){
    let name    =  nameContact.value
    let email   =  emailContact.value
    let message =  messageContact.value
    console.log(name)
    fetch('/api/contact/addContactUs',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              name,email,message
            }
          )
    })
    .then(response => response.json())
    .then(response =>{
        if(response.status){
            alert(response.message)
            setTimeout(function(){
                window.location.href = '/'
              },500)
        }
        else{
            alert(response.message)
        }
    })
    .catch(error =>{
        alert('Unexpected Error')
    })
}





const nameContact             =   document.getElementById('nameContact')
const emailContact            =   document.getElementById('emailContact')
const messageContact          =   document.getElementById('messageContact')
const submitButton            =   document.getElementById('contactSubmit')
submitButton.addEventListener('click',onSubmit)