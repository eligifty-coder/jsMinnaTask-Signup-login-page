let inputs = document.querySelectorAll(".loginSec .inputVal")
const myForm = document.querySelector('.loginSec form')
let loader = document.querySelector('.mySubmitBtn');
let rotateSection = document.querySelector('section')
inputs = Array.from(inputs)
let myInterval
let reg
let testEvery
const loginBtn = document.querySelector('.submitLogin');
const checkToDisableFun=()=>{
   rotateSection.classList.add('rotated')
   const toggleDisable = inputs.filter(item => item.value.length == 0)
   if (toggleDisable) {
      loginBtn.disabled = true
   }
   inputs.forEach(item => {
   item.dataset['enable']=0
   item.onchange = checkToValidateFun
})
}
document.addEventListener('DOMContentLoaded', checkToDisableFun)
function checkToValidateFun(){
   const thisValue = this.value.trim()
   clearInterval(myInterval)
   switch(this.name){
      case "email":
         reg = reg = /^\w+([\.-_]?\w+)*@\w+([\.-]?\w+)*\.(\w{2,3})+$/
         testEvery = reg.test(thisValue)
         checkIfEmpty = checkForZeroLengthFun(thisValue)
         if(checkIfEmpty){
            regExpDetail(testEvery, this)
         }else{
            emptyFieldValidationFun(this)
         }
         break
         // password testing
      case 'password':
         reg = /[\d\D]{8,}/
         testEvery = reg.test(thisValue)
         checkIfEmpty = checkForZeroLengthFun(thisValue)
         if(checkIfEmpty){
            regExpDetail(testEvery, this)
         }else{
            emptyFieldValidationFun(this)
         }
         break
         case 'checkbox':
         testEvery= this.checked
            regExpDetail(testEvery, this)
         break
   }
}
// check for empty field
function checkForZeroLengthFun(thisValue){
   return Boolean(thisValue.length)
}

// emptyFieldValidationFun
function emptyFieldValidationFun(ele){
   let eleBoundary = ele.getBoundingClientRect()
   let valueToBeInserted = `field cannot be empty`
   myInterval = setTimeout(() => {
      errorMessageFun(eleBoundary, ele, valueToBeInserted)
   }, 500)
}
// regExp MAtch
function regExpDetail(test, ele) {
   let eleBoundary = ele.getBoundingClientRect()
   switch (ele.name) {
      case "email":
         if(test){
            ele.dataset['enable'] = 1
         }
         if (!test) {
            console.log(test)
            let valueToBeInserted = `wrong input fill the ${ele.name} field appropriately`
            myInterval = setTimeout(() => {
               errorMessageFun(eleBoundary, ele, valueToBeInserted)
            }, 200)
         }
         break
         case "password":
         if(!checkForZeroLengthFun){
            valueToBeInserted= `field cannot be empty`
         }
         if(test){
            ele.dataset['enable'] = 1
         }
         if (!test) {
            let valueToBeInserted = `${ele.name} field should contain atleast 8 characters`
            myInterval = setTimeout(() => {
               errorMessageFun(eleBoundary, ele, valueToBeInserted)
            }, 500)
         }
         break
         case "checkbox":
         if(test){
            ele.dataset['enable'] = 1
         }
         if (!test) {
            let valueToBeInserted = `kindly tick the box to agree`
            myInterval = setTimeout(() => {
               errorMessageFun(eleBoundary, ele, valueToBeInserted)
            }, 500)
         }
   }
   enableSignUpBtn(inputs)
}
// error Message
function errorMessageFun(elebound, ele, valueToBeInserted) {
   const newDiv = document.createElement('span');
   let textInsert = document.createTextNode(valueToBeInserted)
   newDiv.append(textInsert)
   ele.insertAdjacentElement('afterend', newDiv)
   newDiv.classList.add('changePosition')
   newDiv.classList.add('changeLoginPosition')
   let tops = `${Math.floor(elebound.top -110)}px`
   const lefts = `${Math.floor(elebound.left-190)}px`
   if(ele.name=="checkbox"){
      tops = `${Math.floor(elebound.top-140)}px`
      newDiv.style.color="red"
      newDiv.style.fontSize="8px"
   }
   newDiv.style.top = tops
   newDiv.style.left = lefts
   myInterval = setTimeout(() => {
      clearErrorFun(newDiv, ele)
   }, 4000)
}
function clearErrorFun(eleDiv, ele) {
	ele.value = ''
	eleDiv.style.display = 'none'
}
// check to enable login Btn
function enableSignUpBtn(arr){
   let checkEnable = arr.every(item=>item.dataset['enable']==1)
   if(checkEnable){
      loginBtn.disabled=false
      myForm.onsubmit = loginFun
   }
}
// login event
function loginFun() {
   event.preventDefault()
	myInterval = setTimeout(() => {
		simulateLoadFun()
	}, 1000)
}
// loader
function simulateLoadFun(){
   loader.style.zIndex = '1'
   setTimeout(clearLoadingInterval,2000)
}
function clearLoadingInterval() {
   loader.style.zIndex = '-1'
}
console.log(loader)
