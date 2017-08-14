// RevealOnScroll.js w /app/assets/scripts/modules
import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll{
	constructor(){
		this.itemsToReveal = $(".feature-item");
		this.hideInitially();
		this.createWaypoints();
	}

	hideInitially(){
		this.itemsToReveal.addClass("reveal-item");
	}

	createWaypoints(){
		// this.itemsToReveal jest kolekcją czterech elementów i tworzymy waypoint dla kaźdego z tych elementów
		this.itemsToReveal.each(function(){
			const currentItem = this;
			new Waypoint({
				element: currentItem,
				handler: function(){
					$(currentItem).addClass("reveal-item--is-visible");
				},
				offset: "85%"
			});
		});
	}
}

export default RevealOnScroll;