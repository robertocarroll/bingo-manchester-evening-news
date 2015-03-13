(function() {

	$(function() {
		var bingo_data = [
			    [
					{ text:"Boxing workout" },
					{ text:"Magali's free ticket request", image: "images/magali.jpg" },
					{ text:"Diamonds" },
					{ text:"Darby's singing career" },
					{ text:"Padded gilet" },
					{ text:"Champagne" },
					{ text:"Ampika's salon", image: "images/ampika.jpg" },
					{ text:"Aerial shot of a Cheshire mansion" },
					{ text:"Someone has a vampire facial" },
					{ text:"Mention of Dawn's eggs" },
					{ text:"Frozen pizza" },
					{ text:"Bentley" },
					{ text:"Gossip in the toilets" }
			    ],[
					{ text:"Polished granite kitchen" },
					{ text:"Half naked butlers" },
					{ text:"Sunglasses on the head" },
					{ text:"Poke-gate" },
					{ text:"Lauren's marriage", image: "images/lauren.jpg" },
					{ text:"Royston and Nick" },
					{ text:"Al Fresco Cheshire lunch" },
					{ text:"Row over private schools" },
					{ text:"Range Rover" },
					{ text:"Ombre hair extension" },
					{ text:"Leanne's dancing" },
					{ text:"Tanya's book", image: "images/tanya.jpg" },
					{ text:"Celebrity cameo" }
			    ],[
					{ text:"I've got it all" },
					{ text:"My husband's a footballer'" },
					{ text:"She's more than just a PA to me" },
					{ text:"Wes Brown" },
					{ text:"Ashley Ward" },
					{ text:"Dean Gorre" },
					{ text:"Ampika's ex-husband Mark" },
					{ text:"Phil Bardsley" },
					{ text:"Lauren's husband Paul" },
					{ text:"Showjumping event" },
					{ text:"I want another baby" },
					{ text:"Peckforton Castle" },
					{ text:"Shopping" }
			    ],[
					{ text:"You're like a hoover" },
					{ text:"Pelvic floor exercises" },
					{ text:"Personal trainer" },
					{ text:"Ampika's mystery man" },
					{ text:"Ampika should get back with Mark" },
					{ text:"More champagne" },
					{ text:"My marriage is nobody's business" },
					{ text:"Dawn rows with Lauren" },
					{ text:"Ampika rows with Dawn" },
					{ text:"Tanya rows with Dawn" },
					{ text:"Leanne rows with Magali", image: "images/leanne.jpg" },
					{ text:"Biological clock reference" },
					{ text:"Real Cheshire" }
			    ],[
					{ text:"Dressing up for night out" },
					{ text:"Racy lingerie talk" },
					{ text:"Someone getting their hair done" },
					{ text:"Beauty treatment" },
					{ text:"'It's all kicking off'" },
					{ text:"Dawn swears", image: "images/dawn.jpg" },
					{ text:"Dawn mentions trying for a baby" },
					{ text:"It's all for charity" },
					{ text:"'How rude'" },
					{ text:"Yet more champagne" },
					{ text:"Night out with all the girls" },
					{ text:"My kids are the most important thing to me" },
					{ text:"These are my best friends" }
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

})();
