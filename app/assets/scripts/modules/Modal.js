// modal.js w app/assets/scripts/modules
import $ from 'jquery'; 

class Modal{
	constructor(){
		// zaznaczenia:
		this.openModalButton = $('.open-modal'); //przycisk otwierający modal ("Get in touch")
		this.modal = $('.modal'); //sam modal
		this.closeModalButton = $('.modal__close'); //przycisk X zamykający modal
		this.events();
	}

	events(){
		// klikanie przycisku otwierania modal
		this.openModalButton.click(this.openModal.bind(this)); 
			//bind po to żeby wewnątrz metody openModal this było tym samym, co tutaj

		// kliknięcie przycisku X
		this.closeModalButton.click(this.closeModal.bind(this));
			// bind j.w.

		// kliknięcie dowolnego klawisza 
		$(document).keyup(this.keyPressHandler.bind(this));
	}

	keyPressHandler(e){
		if(e.keyCode == 27){
		// jeśli przyciśnięto klawisz ESC
			this.closeModal();
		}
	}

	openModal(){
		this.modal.addClass("modal--is-visible");
		return false; //zapobiegnięcie domyślnemu przejściu na górę strony (bo href="#")
	}

	closeModal(){
		this.modal.removeClass("modal--is-visible");
	}

}

export default Modal;