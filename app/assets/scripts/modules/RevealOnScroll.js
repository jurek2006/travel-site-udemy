// RevealOnScroll.js w /app/assets/scripts/modules
import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll{
	constructor(els, offset){
		this.itemsToReveal = els;
		this.hideInitially();
		this.offsetPercentage = offset; //musi być przed .createWaypoints
		this.createWaypoints();
	}

	hideInitially(){
		this.itemsToReveal.addClass("reveal-item");
	}

	createWaypoints(){
		// this.itemsToReveal jest kolekcją czterech elementów i tworzymy waypoint dla kaźdego z tych elementów
		var that = this;
		this.itemsToReveal.each(function(){
			const currentItem = this;
			new Waypoint({
				element: currentItem,
				handler: function(){
					$(currentItem).addClass("reveal-item--is-visible");
				},
				offset: that.offsetPercentage
			});
		});
	}
}

export default RevealOnScroll;