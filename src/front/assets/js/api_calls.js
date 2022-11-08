const BASE_URL = 'http://127.0.0.1:3000';
const startCard = document.getElementById('list-1');
let cardNum = 6;
const addCardBtn = document.getElementById('add_card');
const trash = document.getElementById('trash_delite');


window.onload = async ()=> {
    await fillCards(1)
    await fillCards(2)
    await fillCards(3)
}

addCardBtn.addEventListener('click', async (e) => {
	await createCard('');
    
});

const deleteCardEvent = async (e) => {
	//await deliteCardAPICall();
    console.log(e.target)
    let targetEl = document.getElementById(e.target.id)
    console.log(targetEl.id)
};

//input.addEventListener('change', changeCardTittle);


function createCardElement(id, text) {
    let card = document.createElement('textarea');
	card.className = 'card ';
	// card.setAttribute('draggable', 'true');
	// card.setAttribute('ondragstart', 'dragStart(event)');
	// card.setAttribute('ondrop', 'dropIt(event)');
	// card.setAttribute('ondragover', 'allowDrop(event)');
	card.value = text;

    let icon=document.createElement('i');
    icon.classList.add('fa-solid');
    icon.classList.add('fa-trash-can');
    icon.classList.add('color');

    
    let div_icon = document.createElement('a');
    div_icon.className= 'icon';
    div_icon.appendChild(icon);
    div_icon.id="trash-"+id;
    //div_icon.addEventListener('click', deleteCardEvent);
    div_icon.setAttribute("onclick",`onClickTrash(${id})`);
    


    let div = document.createElement('div');
    div.className= 'backgorund-input';
    div.setAttribute('draggable', 'true');
	div.setAttribute('ondragstart', 'dragStart(event)');
	div.setAttribute('ondrop', 'dropIt(event)');
	div.setAttribute('ondragover', 'allowDrop(event)');
    div.appendChild(card);
    div.appendChild(div_icon);
	// cardNum++;
	div.id = id;
    return div
	

    // Do something here paul
}

async function createCardAPICall(){
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



async function onClickTrash(id){
    const result = await Swal.fire({
        title: '¿Estas seguro que quieres eliminar la tarea?',
        showDenyButton: true,
        confirmButtonText: 'Eliminar',
        denyButtonText: `Cancelar`,
    })

    if (result.isConfirmed){
        console.log('eliminando...')
        deliteCardAPICall(id);
    }
}



// CHECAR ESTA MADRE, LO HIZO LA MAVELY CON EL PAUL Y PUEDE TENER ERRORES (pa ti fajardo)
async function deliteCardAPICall (id) {
     
    let response = await fetch(`${BASE_URL}/cards/${id}`, {
        method: 'DELETE',
        
    });

    let result = await response.json();

    if (response.status == 200) {
        await Swal.fire({
			icon: 'success',
			title: 'Éxito!',
			text: 'La tarea se eliminó correctamente',
		})
        window.location.reload();
    }else{
        await Swal.fire({
			icon: 'error',
			title: 'Error!',
			text: 'Hubo un error inesperado',
		})
        
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
