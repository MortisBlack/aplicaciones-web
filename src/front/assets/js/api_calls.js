const BASE_URL = 'http://127.0.0.1:3000';
const startCard = document.getElementById('list1');
let cardNum = 6;
const addCardBtn = document.getElementById('add_card');


window.onload = async ()=> {
    await fillCards(1)
    await fillCards(2)
    await fillCards(3)
}

addCardBtn.addEventListener('click', async (e) => {
	await createCard('');
});

input.addEventListener('change', changeCardTittle);


function createCardElement(id, text) {
	// Create a new card
	let card = document.createElement('input');
	card.className = 'card';
	card.setAttribute('draggable', 'true');
	card.setAttribute('ondragstart', 'dragStart(event)');
	card.setAttribute('ondrop', 'dropIt(event)');
	card.setAttribute('ondragover', 'allowDrop(event)');
	card.value = text;
	// cardNum++;
	card.id = id;
	card.placeholder = '...';
    return card
	

    // Do something here paul
}

async function createCard(text) {
	// Make api call to create card in database
	let response = await createCardAPICall();

	if(response !== undefined){
        console.log(response)
		let card = createCardElement(response.result._id, response.result._title);
        startCard.appendChild(card);
	}
	else{
		// Fire sweet alert
		Swal.fire({
			icon: 'error',
			title: 'Error!',
			text: 'No se pudó crear la tarea',
		})
	}
	
}


async function changeCardTittle(e){

    const id = e.target.id;
    const title = e.target.value;
    const column = e.target.parentElement.id;
    
    
    // Make api call to create card in database
	let response = await changeCardAPICall(id, title, column);

	if(response === undefined){
		// Fire sweet alert
		Swal.fire({
			icon: 'error',
			title: 'Error!',
			text: 'No se pudó crear la tarea',
		})
	}
}


async function fillCards(columnId){
    const result = await fetch(`${BASE_URL}/columns/${columnId}/cards`)
    const columnInput = document.getElementById(`list-${columnId}`)
    const cards = await result.json()
    cards.result.map((value, index) => {
        const card = createCardElement(value._id, value._title)
        columnInput.appendChild(card)
    })
}


const createCardAPICall = async () => {
    // Al crear una tarjeta se asigna a la columna 1 por defecto
    const title = document.getElementsByName('title')[0].value;
    if(title === ''){
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'No se pudó crear la tarea',
        })
        return
    }
    const description = '';
    const column = 1;

    let response = await fetch(`${BASE_URL}/cards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description: description,
            column: column,
            deadline_date: undefined,
        })
    });

    let result = await response.json();

    if (response.status == 200) {
        return result;
    }else{
        return undefined;
    }
};

const changeCardAPICall = async (id, title, column) => {
    if(id !== undefined){
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'La tarea no existe',
        });
        return
    }
    const description = '';

    let response = await fetch(`${BASE_URL}/cards/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description: description,
            column: column,
            deadline_date: undefined,
        })
    });

    let result = await response.json();

    if (response.status == 200) {
        return result;
    }else{
        return undefined;
    }
};

// TODO: move function to other file
async function putCard(cardId, columnId){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "column": `${columnId}`
    })

    const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw
    }
    
	const result = await fetch(`${BASE_URL}/cards/${cardId}`, requestOptions)
	const response = await result.json()
    console.log(response)
}
