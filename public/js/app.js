console.log("Good Job")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1= document.querySelector('.msg-1')
const msg2=document.querySelector('.msg-2')
msg1.innerHTML='Weather updates for your loactions comes here.'


weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const location = search.value
  msg1.innerHTML='Loading...'
  msg2.innerHTML=''
  fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
      msg1.innerHTML=''
      if(data.error)
      msg2.innerHTML=data.error
      else
      {
        msg2.innerHTML=data.location+"<br>"+data.forecast
      }
    })
  })

})
