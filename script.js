let singUpBtn = document.querySelector(".clickBtn button")
const myForm = document.querySelector("form")
let inputs = document.querySelectorAll('.inputVal')
let loader = document.querySelector('.loader')
let rotateSection = document.querySelector('section')
let myInterval
let testEvery
let reg
let checkIfEmpty
const checkToEnableArr=[]
// disable sign up button
const checkToDisableFun = () => {
   inputs = Array.from(inputs)
   rotateSection.classList.add('rotated')
   const toggleDisable = inputs.filter(item => item.value.length == 0)
   if (toggleDisable) {
      singUpBtn.disabled = true
   }
   inputs.forEach(item => {
   item.dataset['enable']=0
   item.onchange = checkToValidateFun
})
}
document.addEventListener('DOMContentLoaded', checkToDisableFun);
function checkToValidateFun() {
   const thisValue = this.value.trim()
   clearInterval(myInterval)
   switch (this.name) {
      // name testing
      case 'firstName':
      case 'lastName':
         reg = /[a-zA-Z]+/i
         const valArr = thisValue.split('')
         testEvery = valArr.every((item) => {
            return reg.test(item)
         })
         checkIfEmpty = checkForZeroLengthFun(thisValue)
         if(checkIfEmpty){
            regExpDetail(testEvery, this)
         }else{
            emptyFieldValidationFun(this)
         }
         
         
         break
         // email testing
      case 'email':
         reg = /^\w+([\.-_]?\w+)*@\w+([\.-]?\w+)*\.(\w{2,3})+$/
         testEvery = reg.test(thisValue)
         checkIfEmpty = checkForZeroLengthFun(thisValue)
         if(checkIfEmpty){
            regExpDetail(testEvery, this)
         }else{
            emptyFieldValidationFun(this)
         }
         // checkToEnableFun(testEvery)
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
         // confirm password testing
      case 'confirmPassword':
         reg = this.parentElement.previousElementSibling.children[0].value
         testEvery = reg == thisValue
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
      // name Validation
      case "firstName":
      case "lastName":
         if(test){
            ele.dataset['enable']=1
         }
         if (!test) {
            let valueToBeInserted = `${ele.name} field  shouldn't contain any number or symbol`
            myInterval = setTimeout(() => {
               errorMessageFun(eleBoundary, ele, valueToBeInserted)
            }, 500)
         }
         break
         // email validation
      case "email":
         if(test){
            ele.dataset['enable'] = 1
         }
         if (!test) {
            let valueToBeInserted = `wrong input fill the ${ele.name} field appropriately`
            myInterval = setTimeout(() => {
               errorMessageFun(eleBoundary, ele, valueToBeInserted)
            }, 500)
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
      case "confirmPassword":
         if(!checkForZeroLengthFun){
            valueToBeInserted= `field cannot be empty`
         }
         if(test){
            ele.dataset['enable'] = 1
         }
         if (!test) {
            let valueToBeInserted = `password does not match`
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
// check for empty field
function checkForZeroLengthFun(thisValue){
   return Boolean(thisValue.length)
}
// error Message
function errorMessageFun(elebound, ele, valueToBeInserted) {
   const newDiv = document.createElement('span');
   let textInsert = document.createTextNode(valueToBeInserted)
   newDiv.append(textInsert);
   ele.insertAdjacentElement('afterend', newDiv);
   newDiv.classList.add('changePosition');
   let tops = `${Math.floor(elebound.top +50)}px`
   const lefts = `${Math.floor(elebound.left)}px`
   if(ele.name=="checkbox"){
      tops = `${Math.floor(elebound.top+10)}px`
      newDiv.style.color="red"
      newDiv.style.fontSize="10px"
   }
   newDiv.style.top = tops
   newDiv.style.left = lefts
   myInterval = setTimeout(() => {
      clearErrorFun(newDiv, ele)
   }, 4000)
}

function clearErrorFun(eleDiv, ele) {
   ele.value = ""
   eleDiv.style.display = "none"
}
// check to enable SignUp Btn
function enableSignUpBtn(arr){
   let checkEnable = arr.every(item=>item.dataset['enable']==1)
   if(checkEnable){
      singUpBtn.disabled=false
      myForm.onsubmit = signUpFun
   }
}
function signUpFun(){
   event.preventDefault()
   myInterval= setTimeout(()=>{simulateLoadFun()},1000)
}
// loader
function simulateLoadFun(){
   let eleBoundary =singUpBtn.getBoundingClientRect()
   let topLevel = `${Math.floor(eleBoundary.top+15)}px`
   let leftLevel = `${Math.floor(eleBoundary.left+50)}px`
   loader.style.display="block"
   loader.style.top=topLevel
   loader.style.left=leftLevel
   singUpBtn.classList.add('changeColor')
   setTimeout(clearLoadingInterval,3000)
}
function clearLoadingInterval(){
   loader.style.display = 'none'
   singUpBtn.classList.remove('changeColor')
}


