import { DateTime } from "./luxon.js";
const date = DateTime.now()

let btn_calculate = document.querySelector('button')
let input = document.querySelector('input')
let body = document.querySelector('body')
btn_calculate.addEventListener('click', () => {
	if(document.querySelector('p')){
		document.querySelector('p').remove()
	}
	let dt = input.value.split('-')
	let result = date.minus(DateTime.local(+dt[0],+dt[1],+dt[2]).c) 
	let p = document.createElement('p')
	p.textContent = `You are ${result.c.year} years ${result.c.month} months old`
	body.append(p)
})
