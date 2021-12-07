'use strict';
//destruction encurtando import 
import {openModal,closeModal} from './modal.js';
import {getProdutos, postProduto, deleteProduto, putProduto} from './produtos.js';
import {imagePreview} from './imagePreview.js';
/*
                    <tr>
                        <td>
                            <img src="./img/mouse.jpg" class="produto-image" />
                        </td>
                        <td>Mouse</td>
                        <td>120,50</td>
                        <td>Informática</td>
                        <td>
                            <button type="button" class="button green">
                                editar
                            </button>
                            <button type="button" class="button red">
                                excluir
                            </button>
                        </td>
                    </tr>
*/
/*
End-point
http://10.107.142.2/api/v1/produtos/
http://meusite.com.br/api/v1/produtos/

Obs: produtos -> recurso

Methods (Verbos HTTP)
C - POST
R - GET
U - PUT / PATH
D - DELETE
*/
const criarLinha = ({foto, nome, preco, categoria, id}) =>{
    const linha = document.createElement('tr');
    linha.innerHTML = `
        <td>
            <img src="${foto}" class="produto-image" />
        </td>
        <td>${nome}</td>
        <td>${preco}</td>
        <td>${categoria}</td>
        <td>
            <button type="button" class="button green" data-idproduto=${id}>
                editar
            </button>
            <button type="button" class="button red" data-idproduto=${id}>
                excluir
            </button>
        </td>
    `;
    return linha;

};
//pegar produtos e exibir na tela
const carregarProdutos = async() =>{
    const container = document.querySelector('tbody');
    const produtos = await getProdutos();
    //percorrendo produto com map e criando todas as linhas 
    const linhas = produtos.map(criarLinha);
    //substitui os filhos (assim não precisamos de uma função para apagar os dadaos)
    //utilizando "..." para espalhar todos os objetos 
    container.replaceChildren(...linhas);
};

//função para passar id dpo input e da imagem
const handlePreview = () => imagePreview('inputFile', 'imagePreview')

//função para receber dados a serem cadastrado
const salvarProduto = async() =>{
    const produto = {
        nome: document.getElementById('product').value,
        preco: document.getElementById('price').value,
        categoria: document.getElementById('category').value,
        foto: document.getElementById('imagePreview').src,
    };
    await postProduto(produto);
    closeModal();
    carregarProdutos();
};

//função para capturar o click no tbody
const handleClickTbody = async ({target}) =>{
    if(target.type === 'button'){
        const acao = target.textContent.trim();
        if(acao === 'excluir'){
            //passando o id pro delete
            await deleteProduto(target.dataset.idproduto);
            carregarProdutos();
        }
    }
};

carregarProdutos();

//eventos
document
    .getElementById('cadastrarCliente')
    .addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal);

document.getElementById('cancel').addEventListener('click', closeModal);

document.getElementById('inputFile').addEventListener('change', handlePreview);

document.getElementById('save').addEventListener('click', salvarProduto);

document.querySelector('tbody').addEventListener('click', handleClickTbody);

