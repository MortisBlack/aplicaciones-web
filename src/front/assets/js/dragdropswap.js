function allowDrop(ev) {
	ev.preventDefault();  // default is not to allow drop
}

function dragStart(ev) {
	// The 'text/plain' is referring the Data Type (DOMString) 
	// of the Object being dragged.
	// ev.target.id is the id of the Object being dragged
	ev.dataTransfer.setData("text/plain", ev.target.id);
}

function dropIt(ev) {
	ev.preventDefault();  // default is not to allow drop
	let sourceId = ev.dataTransfer.getData("text/plain");
	let sourceIdEl = document.getElementById(sourceId);
	let sourceIdParentEl = sourceIdEl.parentElement;
	// ev.target.id here is the id of target Object of the drop
	let targetEl = document.getElementById(ev.target.id);
	let targetParentEl = targetEl.parentElement;

	let card = sourceIdEl.parentElement;

	// Compare List names to see if we are going between lists
	// or within the same list

	// # TODO: parece que esto no funciona porque hay que hacer otro parentElement
	if (targetParentEl.id !== sourceIdParentEl.id) {
		// If the source and destination have the same 
		// className (card), then we risk dropping a Card in to a Card
		// That may be a cool feature, but not for us!
		if (targetEl.className === sourceIdEl.className) {
			// Append to parent Object (list), not to a 
			// Card in the list
			// This is in case you drag and drop a Card on top 
			// of a Card in a different list
			targetParentEl.appendChild(card);

		} else {
			if (targetEl.id !== sourceIdParentEl.parentElement.id && targetEl.id == 'list-3'){
				Swal.fire({
					title: 'Estas seguro que quieres terminar la tarea?',
					showDenyButton: true,
					confirmButtonText: 'Terminar',
					denyButtonText: `Cancelar`,
				}).then((result) => {
					if (result.isConfirmed){
						console.log(targetEl.id,sourceIdParentEl.parentElement.id)
						// Append to the list
						targetEl.appendChild(card);
						const columnId = targetEl.id.split('-')[1]
						putCard(sourceIdEl.id, columnId).then(()=> {
							Swal.fire({
								icon: 'success',
								title: 'Tarea terminada',
								text: 'La tarea se terminó correctamente',
							})
						})
					}
				})
			} else {
				console.log(targetEl.id,sourceIdParentEl.parentElement.id)
				// Append to the list
				targetEl.appendChild(card);
				const columnId = targetEl.id.split('-')[1]
				putCard(sourceIdEl.id, columnId).then(()=> {
					Swal.fire({
						icon: 'success',
						title: 'Tarea movida',
						text: 'La tarea se movió exitosamente',
					})
				})
			}
		}

	} else {
		// Same list. Swap the text of the two cards
		// Just like swapping the values in two variables

		// Temporary holder of the destination Object
		let holder = targetEl;
		// The text of the destination Object. 
		// We are really just moving the text, not the Card
		let holderText = holder.textContent;
		// Replace the destination Objects text with the sources text
		targetEl.textContent = sourceIdEl.textContent;
		// Replace the sources text with the original destinations
		sourceIdEl.textContent = holderText;
		holderText = '';
	}

}