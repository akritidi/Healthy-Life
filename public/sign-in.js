const onSumbitHandler = (event)=>{
    event.preventDefault()
    const name = document.querySelector('#username').value
    
    const password = document.querySelector('#password').value
    
      fetch('/api/login', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            name,password
          }
        ),
      })
      .then(response => response.json())
      .then(response => {
        if(response.status){
          if(response.admin){
          message.style.visibility = "visible";
          message.classList.add('success');
          message.innerHTML = response.message;
          setTimeout(function(){
            window.location.href = '/admin'
          },1000)
          }
          else{
          message.style.visibility = "visible";
          message.classList.add('success');
          message.innerHTML = response.message;
          setTimeout(function(){
            window.location.href = '/profile'
          },1000)
        }
        }
        else{
          message.style.visibility = "visible";
          message.classList.add('error');
          message.innerHTML = response.message;
          setTimeout(function(){
            window.location.href = '/sign-in.html'
          },1000)
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

const message = document.querySelector('.msg');
submButton = document.querySelector('#btn-submit')
submButton.addEventListener('click',onSumbitHandler)