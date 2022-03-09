const cards = document.querySelector('.cards__container');

window.addEventListener('scroll',()=>{  

    let posicion = cards.getBoundingClientRect();
    // console.log(posicion);


    if(posicion.top<=720 ){
        cards.classList.add('animated');
    }

    else{
        cards.classList.remove('animated');

    }

});
