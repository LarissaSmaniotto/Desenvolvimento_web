const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_DOMÍNIO.firebaseapp.com",
    databaseURL: "https://SEU_PROJETO.firebaseio.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "SEU_ID",
    appId: "SEU_APP_ID"
  };
  
  
  firebase.initializeApp(firebaseConfig);
  
  
  const database = firebase.database();
  
function displayPartyItems(items) {
    const partyItemsElement = document.getElementById('party-items');
    partyItemsElement.innerHTML = '<h2>Itens da Loja</h2>';

    Object.keys(items).forEach(itemKey => {
        const item = items[itemKey];
        const itemCard = `
            <div class="card">
                <h3>${item.name}</h3>
                <p><strong>Preço:</strong> $${item.price.toFixed(2)}</p>
                <p><strong>Descrição:</strong> ${item.description}</p>
                <button onclick="deleteItem('${itemKey}')">Excluir</button>
            </div>
        `;
        partyItemsElement.innerHTML += itemCard;
    });
}

function readPartyItems() {
    database.ref('party-items').on('value', snapshot => {
        const items = snapshot.val();
        if (items) {
            displayPartyItems(items);
        } else {
            partyItemsElement.innerHTML += '<p>Nenhum item na loja ainda.</p>';
        }
    });
}

function addItem() {
    const itemName = document.getElementById('item-name').value;
    const itemPrice = document.getElementById('item-price').value;
    const itemDescription = document.getElementById('item-description').value;

    // Validar os campos
    if (!itemName || !itemPrice || !itemDescription) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const newItemRef = database.ref('party-items').push();
    newItemRef.set({
        name: itemName,
        price: parseFloat(itemPrice),
        description: itemDescription
    }, error => {
        if (error) {
            alert('Erro ao adicionar item. Por favor, tente novamente.');
        } else {
          
            document.getElementById('item-name').value = '';
            document.getElementById('item-price').value = '';
            document.getElementById('item-description').value = '';

            alert('Item adicionado com sucesso!');
            
            smoothCRUDOperation();
        }
    });
}

function deleteItem(itemKey) {
   
    database.ref(`party-items/${itemKey}`).remove();
}

function smoothCRUDOperation() {
   
    readPartyItems(); 
}

document.addEventListener('DOMContentLoaded', function () {
    readPartyItems();
});
