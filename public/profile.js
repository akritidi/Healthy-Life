
function onLoad(){
    const cookie = document.cookie
    let fields = cookie.split('=')
    let name = fields[1]
    fetch('/api/show',{
        method : "POST",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              name
            }
          )   
    })
    .then(response => response.json())
    .then(response =>{
        
        if(response.response.firstTimer){
            alert('Welcome to your profile page,please fill in your personal information.Note this information is only available to you!')
        }
        thisGender = response.response.gender
        thisAge    = response.response.age
        thisHeight = response.response.height
        thisWeight = response.response.weight
        gender.innerHTML = "Gender: " + response.response.gender
        age.innerHTML = "Age: "+ response.response.age
        height.innerHTML = "Height: "  + response.response.height
        weight.innerHTML = "Weight: " + response.response.weight
        username.innerHTML = response.response.name
        console.log(response.response.avatar)
        userImage.setAttribute('src',`${response.response.avatar}`)
    })
    .catch(error=>{
        alert("An unexpected error occured!")
    })


}

function onClickPencil(){
    gender.style.display    = 'none'
    age.style.display       = 'none'
    height.style.display    = 'none'
    weight.style.display    = 'none'

    newGender.style.display          = 'initial'
    newAge.style.display             = 'initial'
    newHeight.style.display          = 'initial'
    newWeight.style.display          = 'initial'
    
    newGender.setAttribute('placeholder',`Gender: ${thisGender}`)
    newAge.setAttribute('placeholder',`Age: ${thisAge}`)
    newHeight.setAttribute('placeholder',`Height: ${thisHeight}`)
    newWeight.setAttribute('placeholder',`Weight: ${thisWeight}`)

    editButton.innerHTML = '&#10003;'
    editButton.classList.remove('btn-info')
    editButton.classList.add('btn-success')
    editButton.removeEventListener('click',onClickPencil)
    editButton.addEventListener('click',onSave)
}

function onSave(){
    let postGender    = newGender.value
    let    postAge    = parseInt(newAge.value)
    let postHeight    = parseFloat(newHeight.value)
    let postWeight    = parseFloat(newWeight.value)
    
    
    if(postGender==''){
        postGender = thisGender
        newGender.value = thisGender
        
        
    }
   
    
    if(isNaN(parseInt(postAge))){
        
        newAge.value = thisAge
        postAge= parseInt(newAge.value)
    }
    if(isNaN(parseFloat(postHeight))){
        newHeight.value = thisHeight
       
        postHeight = parseFloat(newHeight.value)
    }
    if(isNaN(parseFloat(postWeight))){
        newWeight.value = thisWeight
        
        postWeight = parseFloat(newWeight.value)
    }
    const cookie = document.cookie
    let fields = cookie.split('=')
    const name = fields[1]
    
    fetch('api/updateMetrics',{
        method : "POST",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              postGender,postAge,postHeight,postWeight,name
            }
          )

    })
    .then(response => response.json())
    .then(response=>{
        if(response.status){
            alert('Your Metrics have been updated!')
            setTimeout(function(){
                window.location.href = '/profile'
              },600)
        }
        else{
            alert(response.message)
        }
    })
    .catch(error=>{
        alert('An unexpected error occured!')
    })
}

function onImageButtonClick(e){

    submitPhoto.style.display = 'initial'
    inputFile.style.display = 'initial'
    
    imageForm.addEventListener('submit', function(e){

        e.preventDefault
        const formData = new FormData(imageForm)
        fetch('/api/uploadAvatar', {

            method : "POST",
            body : formData
            
        })
        .then(response => response.json())
        .then(response => {
           
            if(response.status){
                
                userImage.src = `../uploads/${response.fileName}`
            }
            else{
                alert(response.message)
            }

        })
        // .catch(error =>{
        //     console.log(error)
        // })

    })


}

const  gender           = document.getElementById('gender')
const  age              = document.getElementById('age')
const  height           = document.getElementById('height')
const  weight           = document.getElementById('weight')
const  username         = document.getElementById('username')
const  editButton       = document.getElementById('editButton')
const  newGender        = document.getElementById('newGender')
const  newAge           = document.getElementById('newAge')
const  newHeight        = document.getElementById('newHeight')
const  newWeight        = document.getElementById('newWeight')
const  userImage        = document.getElementById('userImage1')
const  inputFile        = document.getElementById('fileInput')
const  editImageButton  = document.getElementById('editImageButton')
const  submitPhoto      = document.getElementById('submitPhoto')
const  imageForm        = document.getElementById('imageform')

editButton.addEventListener('click',onClickPencil)
editImageButton.addEventListener('click', onImageButtonClick)