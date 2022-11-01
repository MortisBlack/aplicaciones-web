const BASE_URL = 'http://127.0.0.1:3000';

const createCardAPICard = async () => {
    // Al crear una tarjeta se asigna a la columna 1 por defecto
    const title = '';
    const description = '';
    const column = 1;

    let response = await fetch(`http://127.0.0.1:3000/cards`, {
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
        alert(result.message);
    }
};