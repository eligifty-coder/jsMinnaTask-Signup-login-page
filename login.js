let inputs = document.querySelectorAll(".loginSec .inputVal")
const myForm = document.querySelector('.loginSec form')
let loader = document.querySelector('.mySubmitBtn');
let rotateSection = document.querySelector('section')
let emailed = document.querySelector('.emailed');
let passed = document.querySelector('.passed');
let checked = document.querySelector('.checked');
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
   switch (this.name) {
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
					checkIfEmpty = checkForZeroLengthFun(thisValue)
					if (checkIfEmpty) {
						regExpDetail(testEvery, this)
					} else {
						emptyFieldValidationFun(passed)
					}
					break;
				case 'checkbox':
					testEvery = this.checked ? true : false
					regExpDetail(testEvery, this)
					break
			}
}
// check for empty field
function checkForZeroLengthFun(thisValue){
   return Boolean(thisValue.length)
}

// emptyFieldValidationFun
function emptyFieldValidationFun(ele) {
	let valueToBeInserted = `field cannot be empty, blank space not allowed`;
	loginBtn.disabled = true
	myInterval = setTimeout(() => {
		errorMessageFun(ele, valueToBeInserted);
	}, 500);
}
// regExp MAtch
function regExpDetail(test, ele) {
   switch (ele.name) {
				case 'email':
					if (test) {
						ele.dataset['enable'] = 1;
					}
					if (!test) {
						loginBtn.disabled = true
						let valueToBeInserted = `wrong input fill the ${ele.name} field appropriately`;
						myInterval = setTimeout(() => {
							errorMessageFun(emailed, valueToBeInserted);
						}, 500);
					}

					break;
				case 'password':
					if (!checkForZeroLengthFun) {
						valueToBeInserted = `field cannot be empty, blank space not allowed`;
						loginBtn.disabled = true
					}
					if (test) {
						ele.dataset['enable'] = 1;
					}
					if (!test) {
						loginBtn.disabled = true
						let valueToBeInserted = `${ele.name} field should contain atleast 8 characters`;
						myInterval = setTimeout(() => {
							errorMessageFun(passed, valueToBeInserted);
						}, 500);
					}
					break;
				case 'checkbox':
					if (ele.checked) {
						ele.dataset['enable'] = 1
					}
					if (!ele.checked) {
						let valueToBeInserted = `kindly tick the box to agree`
						loginBtn.disabled = true;
						myInterval = setTimeout(() => {
							errorMessageFun(checked, valueToBeInserted)
						}, 500)
					}
			}
   enableSignUpBtn(inputs)
}
// error Message
function errorMessageFun(elebound, valueToBeInserted) {
	elebound.style.display = 'inline'
	loginBtn.disabled = true
	elebound.innerHTML = valueToBeInserted
	elebound.style.color = 'red'
	elebound.style.fontSize = '12px'
	myInterval = setTimeout(() => {
		clearErrorFun(elebound)
	}, 3000)
}
function clearErrorFun(eleDiv) {
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
