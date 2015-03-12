(function() {

	$(function() {
		var bingo_data = [
			    [
					{ text:"Kanye West rushes the stage" },
					{ text:"Mention of lack of 'Selma' nominations", textsm:"Mention of lack of 'Selma' noms" },
					{ text:"Kim Jong-un called most powerful man in Hollywood" },
					{ text:"Wes Anderson wears velvet or corduroy suit" },
					{ text:"Oscar statuette made of Legos appears" },
					{ text:"NPH makes a 'Boyhood'-'Doogie Howser' joke" },
					{ text:"NPH in a Birdman outfit", image: "images/birdman.jpg" },
					{ text:"Inspired by 'Birdman,' someone runs onstage in tighty-whities", textsm:"Someone runs onstage in tighty-whities" },
					{ text:"Hiker with oversize backpack takes the stage" },
					{ text:"Brian Williams surfaces in scenes from a movie" },
					{ text:"Angelina Jolie sighting", image: "images/angelina-jolie.jpg" },
					{ text:"Alec Baldwin sighting", image: "images/alec-baldwin.jpg" },
					{ text:"Maggie Gyllenhaal sighting", image: "images/maggie-gyllenhaal.jpg" }
			    ],[
					{ text:"NPH carries fake baby" },
					{ text:"Kim Kardashian reference" },
					{ text:"Orchestra drummer berated for playing wrong tempo" },
					{ text:"Anyone says 'I am Groot'" },
					{ text:"Cumberbatch and Redmayne play tic-tac-toe", textsm:"Cumber-batch and Redmayne play tic-tac-toe" },
					{ text:"Shark from Katy Perry's halftime show appears" },
					{ text:"NPH raps at the end of the show" },
					{ text:"Robin Williams closes 'In Memoriam' tribute" },
					{ text:"In reference to 'Whiplash,' a drum solo" },
					{ text:"Christoph Waltz sighting", image: "images/christoph-waltz.jpg" },
					{ text:"James Corden sighting", image: "images/james-corden.jpg" },
					{ text:"Tilda Swinton sighting", image: "images/tilda-swinton.jpg" },
					{ text:"Michael Keaton's son sighting", image: "images/sean-douglas.jpg" }
			    ],[
					{ text:"Cumberbatch photo bomb", textsm:"Cumber-batch photo bomb" },
					{ text:"Someone does <em>something</em> to 'break the Internet'" },
					{ text:"'Fifty Shades of Grey' reference" },
					{ text:"Chrissy Teigen cry face" },
					{ text:"A cameo by Steve Carell's fake nose from 'Foxcatcher'" },
					{ text:"NPH banters with a star in the audience" },
					{ text:"NPH tweets in real time from the stage" },
					{ text:"Someone reads a text from their kid" },
					{ text:"Jonah Hill and Channing Tatum on-stage antics" },
					{ text:"Best animated short winner has weird glasses" },
					{ text:"Jennifer Aniston sighting", image: "images/jennifer-aniston.jpg" },
					{ text:"Prince sighting", image: "images/prince.jpg" },
					{ text:"Boy in 'Boyhood' sighting", image: "images/ellar-coltrane.jpg" }
			    ],[
					{ text:"Joke about women not being permitted to age in Hollywood" },
					{ text:"Batman Keaton reference" },
					{ text:"Fraught silence after a Cosby joke flops" },
					{ text:"NPH playing Stephen Hawking" },
					{ text:"Joke about Richard Linklater being stoned" },
					{ text:"Common thanks God" },
					{ text:"Anybody thanks God" },
					{ text:"Jennifer Lawrence trips on her dress" },
					{ text:"Hacked-email jokes" },
					{ text:"Someone trips", image: "images/trips.jpg" },
					{ text:"Taylor Swift sighting", image: "images/taylor-swift.jpg" },
					{ text:"Channing Tatum sighting", image: "images/channing-tatum.jpg" },
					{ text:"David Oyelowo sighting", image: "images/david-oyelowo.jpg" }
			    ],[
					{ text:"Nod to movie-musicals" },
					{ text:"NPH makes a 'Peter Pan Live!' joke" },
					{ text:"Musical-medley opening" },
					{ text:"Surprising winner-presenter kiss" },
					{ text:"Winner cries on stage" },
					{ text:"Orchestra cuts someone off" },
					{ text:"Winner mentions Meryl in speech" },
					{ text:"'Selma' wins Best Picture" },
					{ text:"'Boyhood' wins Best Picture" },
					{ text:"Amal Clooney sighting", image: "images/amal-clooney.jpg" },
					{ text:"Lupita Nyong'o sighting", image: "images/lupita-nyongo.jpg" },
					{ text:"Ben Affleck sighting", image: "images/ben-affleck.jpg" },
					{ text:"Naomi Watts sighting", image: "images/naomi-watts.jpg" }
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

			cheet('n p h');
			cheet('n e i l');
    		cheet.done(function () {
 				$body.addClass('nph');
			});
		}

		bingo = new Bingo(bingo_data, bingo_options);

		setDOM();

		var fm = Iframe.init(); // must be at the end of your code
	});

	socialRiser.create({
		text	: "Watching the Academy Awards? Play WSJ's #Oscars Bingo:"
	});

})();
