'use strict';

const url = 'http://10.107.142.2/produtos/';

//carregar produtos do back-end
//função assincrona para que o await funcione e esperarmos o resposne
const getProdutos = async () =>{
    //efetuando requisição através do fetch e recebendo response
    //a requisição get é solicitada por padrão
    const response = await fetch(url);
    //destruindo objeto e pegando apenas o data
    const {data} = await response.json();
    return data;
};

//função para enviar dados para o back-end
const postProduto = async (produto) => {
    const options = {
        method: 'POST',
        //transformando json em string
        body: JSON.stringify(produto),
        //tipo de conteudo
        headers: {
            'content-Type': 'application/json'
        },
    };

    await fetch(url, options);
};
//função para deletar produto
const deleteProduto = async (id) => {
    const options = {
        method: 'DELETE',
        headers: {
            'content-Type': 'application/json'
        },
    };
    await fetch(`${url}${id}`, options);
};

const putProduto = async (produto) => {
    const options = {
        method: 'PUT',
        //transformando json em string
        body: JSON.stringify(produto),
        //tipo de conteudo
        headers: {
            'content-Type': 'application/json'
        },
    };

    await fetch(`${url}${produto.id}`, options);
};

export{
    getProdutos,
    postProduto,
    deleteProduto,
    putProduto
};