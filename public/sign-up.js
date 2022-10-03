
const onSumbitHandler = (event)=>{
  event.preventDefault()
  const name = document.querySelector('#username').value
  const email = document.querySelector('#email').value
  const password = document.querySelector('#password').value
  const confirmpassword = document.querySelector('#confirm-password').value
    fetch('/api/register', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          name,email,password,confirmpassword
        }
      )
    })
    .then(response => response.json())
    .then(response => {
      if(response.status){
        message.style.visibility = "visible";
        message.classList.add('success');
        message.innerHTML = response.message;
        setTimeout(function(){
          window.location.href = '/signin'
        },1000)
        
      }
      else{
        message.style.visibility = "visible";
        message.classList.add('error');
        message.innerHTML = response.message;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

const message = document.querySelector('.msg');
submButton = document.querySelector('#btn-submit')
submButton.addEventListener('click',onSumbitHandler)


