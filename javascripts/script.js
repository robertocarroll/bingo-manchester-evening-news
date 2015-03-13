(function() {

	$(function() {
		var bingo_data =[
				[
					{ text:"Champagne" },
					{ text:"Shopping" },
					{ text:"Botox" },
					{ text:"Leanne's dancing" },
					{ text:"Cosmetic surgery" }
				],
				[
					{ text:"Pampered pets" },
					{ text:"Ampika's salon" },
					{ text:"Nannies" },
					{ text:"Polished granite kitchen" },
					{ text:"**An extra one**" }
				],
				[
					{ text:"Ombre hair" },
					{ text:"Posing for photos" },
					{ text:"Bentley", image: "images/trips.jpg" },
					{ text:"Darby's singing" },
					{ text:"Vampire facials" }
				],
				[
					{ text:"Half-naked butlers" },
					{ text:"Sunglasses on head" },
					{ text:"Diamonds" },
					{ text:"Lauren's marriage" },
					{ text:"Al fresco lunch" }
				],
				[
					{ text:"Boxing" },
					{ text:"Frozen pizza" },
					{ text:"She poked me" },
					{ text:"Chat in the toilets" },
					{ text:"Tanya's book" }
				]
			],
			bingo_options = {
				count: 'all'
			},
			bingo,
			$body = $('body');

		function setDOM(){
			//polyfill on mobile speeds up touch events and prefers click over hover on touch event
			FastClick.attach(document.body);

			//bind modal backdrop for bingo to close
			$body.on('click', '.modal-backdrop', function(e) {
				$(this).parent().modal('hide');
			});

			$("#full-modal").on('hidden.bs.modal', function (e) {
    		    $("#full-modal iframe").attr("src", $("#full-modal iframe").attr("src"));
    		});
		}

		bingo = new Bingo(bingo_data, bingo_options);

		setDOM();

	});

	socialRiser.create({
		text	: "Watching the Academy Awards? Play WSJ's #Oscars Bingo:"
	});

})();
