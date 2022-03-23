

const evento = (boolean) => new Promise((res,rej)=>{
    if(boolean===true){
        res('La promesa se resolvió');        
    }
    else{
        rej('No se resolvió');
    }
}).then((resultado)=>{
    console.log(resultado)
}).catch(error=> console.log(error))

evento(false);
evento(true);
