'use strict';

//função para carregar imagem de preveiw
const imagePreview = (idFile, idImg) =>{
    //recebendo array de arquivos selecionados no input
    const file = document.getElementById(idFile).files[0];
    const preview  = document.getElementById(idImg);
    //instanciando classe FileReader
    const fileReader = new FileReader();

    if(file){
        fileReader.readAsDataURL(file);
    }
    else{
        preview.src = "./img/foto.png"
    }

    fileReader.onloadend = () => preview.src = fileReader.result;
};

export{imagePreview};