let singUpBtn = document.querySelector(".clickBtn button")
const myForm = document.querySelector("form")
let inputs = document.querySelectorAll('.inputVal')
let loader = document.querySelector('.loadingBtn')
let rotateSection = document.querySelector('section')
let myInterval
let testEvery
let reg
let checkIfEmpty
let emailed = document.querySelector(".emailed")
let first = document.querySelector(".first")
let last = document.querySelector(".last")
let confirmed = document.querySelector(".confirmed")
let passed = document.querySelector(".passed")
let checked = document.querySelector(".checked")
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
					reg = /[a-zA-Z]+/i;
					const valArr = thisValue.split('');
					testEvery = valArr.every((item) => {
						return reg.test(item);
					});
					checkIfEmpty = checkForZeroLengthFun(thisValue);
					if (checkIfEmpty) {
						regExpDetail(testEvery, this);
					} else {
						emptyFieldValidationFun(first);
					}
					break;
				case 'lastName':
					reg = /[a-zA-Z]+/i;
					const valArrL = thisValue.split('');
					testEvery = valArrL.every((item) => {
						return reg.test(item);
					});
					checkIfEmpty = checkForZeroLengthFun(thisValue);
					if (checkIfEmpty) {
						regExpDetail(testEvery, this);
					} else {
						emptyFieldValidationFun(last);
					}
					break;
				// email testing
				case 'email':
					reg = /^\w+([\.-_]?\w+)*@\w+([\.-]?\w+)*\.(\w{2,3})+$/;
					testEvery = reg.test(thisValue);
					checkIfEmpty = checkForZeroLengthFun(thisValue);
					if (checkIfEmpty) {
						regExpDetail(testEvery, this);
					} else {
						emptyFieldValidationFun(emailed);
					}
					// checkToEnableFun(testEvery)
					break;
				// password testing
				case 'password':
					reg = /[\d\D]{8,}/;
					testEvery = reg.test(thisValue);
					checkIfEmpty = checkForZeroLengthFun(thisValue);
					if (checkIfEmpty) {
						regExpDetail(testEvery, this);
					} else {
						emptyFieldValidationFun(passed);
					}
					break;
				// confirm password testing
				case 'confirmPassword':
					reg = this.parentElement.previousElementSibling.children[0].value
					testEvery = reg == thisValue
					checkIfEmpty = checkForZeroLengthFun(thisValue)
					if (checkIfEmpty) {
						regExpDetail(testEvery, this)
					} else {
						emptyFieldValidationFun(confirmed)
					}
					break;
				case 'checkbox':
               testEvery = this.checked? true:false
					regExpDetail(testEvery, this)
					break
			}
}

// emptyFieldValidationFun
function emptyFieldValidationFun(ele){
   let valueToBeInserted = `field cannot be empty, blank space not allowed`
   singUpBtn.disabled = true;
   myInterval = setTimeout(() => {
      errorMessageFun( ele, valueToBeInserted)
   }, 500)
}
// regExp MAtch
function regExpDetail(test, ele) {
   switch (ele.name) {
      // Fname Validation
      case "firstName":
         if(test){
            ele.dataset['enable']=1
         }
         if (!test) {
            singUpBtn.disabled = true;
            let valueToBeInserted = `${ele.name} field  shouldn't contain any number or symbol`
            myInterval = setTimeout(() => {
               errorMessageFun(first,valueToBeInserted)
            }, 500)
         }
         break
         case "lastName":
         if(test){
            ele.dataset['enable']=1
         }
         if (!test) {
            singUpBtn.disabled = true;
            let valueToBeInserted = `${ele.name} field  shouldn't contain any number or symbol`
            myInterval = setTimeout(() => {
               errorMessageFun(last,  valueToBeInserted)
            }, 500)
         }
         break
         // email validation
         case "email":
         if(test){
            ele.dataset['enable'] = 1
         }
         if (!test) {
            singUpBtn.disabled = true;
            let valueToBeInserted = `wrong input fill the ${ele.name} field appropriately`
            myInterval = setTimeout(() => {
               errorMessageFun(emailed, valueToBeInserted)
            }, 500)
         }
         
         break
      case "password":
         if(!checkForZeroLengthFun){
            valueToBeInserted= `field cannot be empty, blank space not allowed`
            singUpBtn.disabled = true;
         }
         if(test){
            ele.dataset['enable'] = 1
         }
         if (!test) {
            singUpBtn.disabled = true;
            let valueToBeInserted = `${ele.name} field should contain atleast 8 characters`
            myInterval = setTimeout(() => {
               errorMessageFun(passed,valueToBeInserted)
            }, 500)
         }
         break
      case "confirmPassword":
         if(!checkForZeroLengthFun){
            singUpBtn.disabled = true;
            valueToBeInserted= `field cannot be empty`
         }
         if(test){
            ele.dataset['enable'] = 1
         }
         if (!test) {
            singUpBtn.disabled = true
            let valueToBeInserted = `password does not match`
            myInterval = setTimeout(() => {
               errorMessageFun(confirmed,  valueToBeInserted)
            }, 500)
         }
         break
      case "checkbox":
         if(ele.checked){
            ele.dataset['enable'] = 1
         }
         if (!ele.checked) {
            let valueToBeInserted = `kindly tick the box to agree`
            singUpBtn.disabled = true
            myInterval = setTimeout(() => {
               errorMessageFun(checked, valueToBeInserted)
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
function errorMessageFun(elebound, valueToBeInserted) {
   elebound.style.display="inline"
   singUpBtn.disabled = true
   elebound.innerHTML= valueToBeInserted
   elebound.style.color="red"
   elebound.style.fontSize="12px"
   myInterval = setTimeout(() => {
      clearErrorFun(elebound)
   }, 3000)
}

function clearErrorFun(eleDiv) {
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
   loader.style.display="block"
   setTimeout(clearLoadingInterval,3000)
}
function clearLoadingInterval(){
   loader.style.display = 'none'
}


