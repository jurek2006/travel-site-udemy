// RevealOnScroll.js w /app/assets/scripts/modules
import $ from 'jquery';

class RevealOnScroll{
	constructor(){
		this.itemsToReveal = $(".feature-item");
		this.hideInitially();
	}

	hideInitially(){
		this.itemsToReveal.addClass("reveal-item");
	}
}

export default RevealOnScroll;