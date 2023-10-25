const conteudo = document.querySelector('#conteudo');
function menu(link){

    //conteudo.innerHTML = link;
    /*
    fetch() // o que eu vou buscar
    .then() // o que eu vou fazer com o que eu busquei (formato)
    .then() // o que eu vou fazer com o que eu fiz com o que eu busquei
    .catch(); // o que eu vou fazer se der erro
    */
   fetch('pages/' + link  + '.html')
    .then(response => response.text())
    .then(html => conteudo.innerHTML = html)
    .catch(error => conteudo.innerHTML = 'Página não encontrada');
}

function guru(){
    fetch('https://yesno.wtf/api')
    .then( response => response.json())
    .then( data => {
        conteudo.innerHTML = `
            <img src="${data.image}" />
            <p>${data.answer}</p>
        `;
    
    })
    .catch( error => console.log(error))
}