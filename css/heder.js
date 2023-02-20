


let section = document.querySelectorAll('section');
console.log(section);


console.log(document.getElementsByTagName('button'));
let header = document.querySelector('.header');
let messag = document.createElement('div');
messag.classList.add('cookie-messages');


messag.innerHTML = `We use cookid from   <button class="btn btn--close-cokie">Go it!</button>`
header.append(messag)
// header.after(messag)

 document.querySelector('.btn--close-cokie').addEventListener('click', function(){
    messag.parentElement.removeChild(messag);
})

console.log(getComputedStyle(messag).color)




