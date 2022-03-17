const cards = document.querySelector('.cards__container');

window.addEventListener('scroll',()=>{  

    let posicion = cards.getBoundingClientRect();


    if(posicion.top<=725 ){
        cards.classList.add('animated');
    }

    else{
        cards.classList.remove('animated');

    }

});
