//jQuery Url Plugin |  Author: Matthias JÃ¤ggli | URL: http://ajaxcssblog.com/jquery/url-read-get-variables/
(function($){$.url={};$.extend($.url,{_params:{},init:function(){var paramsRaw="";try{paramsRaw=(document.location.href.split("?",2)[1]||"").split("#")[0].split("&")||[];for(var i=0;i<paramsRaw.length;i++){var single=paramsRaw[i].split("=");if(single[0])this._params[single[0]]=unescape(single[1]);}}catch(e){alert(e);}},param:function(name){return this._params[name]||"";},paramAll:function(){return this._params;}});$.url.init();})(jQuery);
// end JQuery Url Plugin
if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  };
}

var Bingo = function(data, options) {

    var FREE = 12,//count squares across from top left
        FREEROW = 2,
        FREECOL = 2,
        CARDSIZE = 5,
        storage_key = 'wsj-oscars-bingo-key',
        key,//url encoding of saved card
        card_template,//handlebars template
        bingo=0,
        base_url = 'http://graphics.wsj.com/oscar-bingo-2015/',//sharing
        printable = false,
        lowercase = "a".charCodeAt(0),
        card_template_string = ''
            + '{{#each .}}'
            + '    <div class="row">'
            + '      {{#each .}}'
            + '        <div class="square {{chip}} col-xs-15" id="square-{{row}}-{{col}}">'
            + '            <div class="square-bg">'
            + '                <div class="square-text">'
            + '                     {{#if image}}<img src="{{image}}" alt="{{#if alt}}{{alt}}{{/if}}" />{{/if}}'
            + '                     {{#if textsm}}'
            + '                         <div class="square-text-wide">{{{text}}}</div>'
            + '                         <div class="square-text-narrow">{{{textsm}}}</div>'
            + '                     {{else}}'
            + '                         <div>{{{text}}}</div>'
            + '                     {{/if}}'
            + '                </div>'
            + '                <div class="square-chip"></div>'
            + '            </div>'
            + '        </div>'
            + '      {{/each}}'
            + '    </div>'
            + '{{/each}}',
        $window = $(window),
        $bingo = $('.bingo'),
        $squares = $bingo.find('.square'),
        share_text = {
            "bingo"     : "BINGO! Check out my #Oscars Bingo board or get your own:",
            "nobingo"   : "Working on my #Oscars Bingo card, but no luck yet. Play along:"
        },
        $bingo_social = $('.share-card'),
        $bingo_social_email = $bingo_social.find('.social-link-email'),
        $bingo_social_url = $bingo_social.find('.social-link-url'),
        //object creation passes in data and optionally options
        dataset = data,
        default_options = {
            "count" : "all" //show bingo for first or all
        }
        options = _.defaults(options, default_options);

    // Return true if square has chip by checking if placement in key is uppercase
    function has_chip(row, col) {
        var index = parseInt(row * CARDSIZE, 10);
        index += parseInt(col, 10);
    
        if(key[index] === key[index].toUpperCase()) {
            return true;
        }
        return false;
    }


    //// CHECK FOR BINGO ////
    
    // Return true if \ = bingo
    function check_bingo_diag_top() {
        for(var i = 0; i < CARDSIZE; i++) {
            if(!(has_chip(i, i))) {
                if(i != FREEROW) {
                    return false;
                }
            }
        }
        return true;
    }
    
    // Return true if / = bingo
    function check_bingo_diag_bottom() {
        for(var i = 0; i < CARDSIZE; i++) {
            row = i;
            col = CARDSIZE - i -1;
            if(!(has_chip(row, col))) {
                if(row != FREEROW || col != FREECOL) {
                    return false;
                }
            }
        }
        return true;
    }
    
    // Return true if row = bingo
    function check_bingo_row(row) {
        for(var col = 0; col < CARDSIZE; col++) {
            if(!(has_chip(row, col))) {
                if(row != FREEROW || col != FREECOL) {
                    return false;
                }
            }
        }
        return true;
    }
    
    // Return true if col = bingo
    function check_bingo_col(col) {
        for(var row = 0; row < CARDSIZE; row++) {
            if(!(has_chip(row, col))) {
                if(row != FREEROW || col != FREECOL) {
                    return false;
                }
            }
    
        }
        return true;
    }
    
    // Return true if there is a bingo on the board
    function check_bingo_first() {
        if(check_bingo_diag_bottom() || check_bingo_diag_top()) {
            // return true if either diagonal has bingo
            return true;
        } else {
            //return true if any row or column has bingo
            for(var i =0; i < CARDSIZE; i++) {
                if(check_bingo_row(i) || check_bingo_col(i)) {
                    return true;
                }
            }
        }
        return false;
    }

    // Return number of bingos on the board
    function check_bingo_all() {
        var b = 0;
        b += +check_bingo_diag_bottom();
        b += +check_bingo_diag_top();

        //return true if any row or column has bingo
        for(var i =0; i < CARDSIZE; i++) {
            b += +check_bingo_row(i);
            b += +check_bingo_col(i);
        }
        return b;
    }

    function key_to_string() {
        return _.reduce(key, function (sum,n) {return sum + n;})
    }
    
    // Add key to this board to URL
    function link_to_card() {
        return base_url + '?key=' +  key_to_string();
    }

    // Checks for bingo and handles event if do/don't have it
    // don't show modal if bingo is loaded from url
    function update_bingo(saved_card) {
        var updated_bingo;
        //get bingo count based on type
        if(options.count === 'all') {
            updated_bingo = check_bingo_all();
        } else if (options.count === 'first') {
            updated_bingo = check_bingo_first();
        }
        //if bingo loaded from url, make updated = previous (aka don't show modal)
        if(saved_card) {
            bingo = updated_bingo;
        }

        // if bingo is new
        if(options.count === 'first' && !bingo && updated_bingo) {
            //show_bingo();
            report_bingo();
        } else if (bingo != updated_bingo && $('.chip').not('.free').length === 24) {
            //if had and still have bingo, may as well check for full board of chips
            //show full board modal
            $('#full-modal').modal('show');
        } else if (options.count === 'all' && (updated_bingo > bingo)) {
            report_bingo();
        }

        bingo = updated_bingo;

        // update localstorage
        if(Modernizr.localstorage) {
            localStorage.setItem(storage_key, key_to_string());
        }
        // update sharing links
        socialRiser.update({
          container    : '.bingo-social-links',
          text         : bingo ? share_text.bingo : share_text.nobingo,
          url          : link_to_card()
        });
        $bingo_social_email.attr('href','mailto:?subject=Oscars%20Bingo!&body=' + (bingo ? share_text.bingo : share_text.nobingo) + '%20' + link_to_card());
        $bingo_social_url.val(link_to_card());
    }

    //// HANDLE CHANGES TO CARD ////
    
    // change key, class on clicked square
    function add_chip(row, col) {
        var squareid = '#square-' + row + '-' + col,
            $square = $(squareid),
            index = parseInt(row * CARDSIZE, 10);
        index += parseInt(col, 10);
    
        key[index] = key[index].toUpperCase();
        $square.addClass('chip');
    }
    
    // change key, class on clicked square
    function remove_chip(row, col) {
        var squareid = '#square-' + row + '-' + col,
            $square = $(squareid),
            index = parseInt(row * CARDSIZE, 10);
        index += parseInt(col, 10);
    
        key[index] = key[index].toLowerCase();
        $square.removeClass('chip');
    }
    
    //triggered when a square is clicked
    function toggle_chip(row, col) {
        if(has_chip(row, col)) {
            remove_chip(row,col);
        } else {
            add_chip(row, col);
        }
        update_bingo();
    }
    
    
    //// MAKE A NEW CARD ////
    
    // key is an index of each cell in appropriate column as a letter
    // letter is capitalized if there's a chip on it
    // always run card off of key so process is the same whether saved or new
    function make_random_key() {
        var key = [];
        //looping through columns.
        _.forEach(dataset, function(column_data, column_index) {
            //name number array length of column, shuffle and select first 5 values
            var indices = _.chain(column_data.length)
                .range()
                .shuffle()
                .slice(0, 5)
                .value();
            //loop through items in column (row), calculate position in grid count
            //assign letter based on value, starting at value of a
            _.forEach(dataset, function(row_data, row_index) {
                key[row_index * CARDSIZE + column_index] = String.fromCharCode(indices[row_index] + lowercase);
            });
        });
        return key;
    }
    
    // Make new card
    function make_card(random) {
        // If random, don't check saved key
        random = random || false;
        var url_key = $.url.param("key"),
            // initialive structure for card
            card = [[],[],[],[],[]],
            saved_card = false;

        if(random) {
            key = make_random_key();
        } else if (url_key) {
            // get saved card from URL
            // don't show modal
            key = url_key.split("");
            saved_card = true;
        } else if (Modernizr.localstorage && !_.isNull(localStorage.getItem(storage_key))) {
            key = localStorage.getItem(storage_key).split("");
            saved_card = true;
        } else {
            key = make_random_key();
        }

        _.forEach(key, function(letter, i) {
            //decode key to find associated data
            var row = Math.floor (i / CARDSIZE),
                col = i % CARDSIZE,
                ascii = letter.toLowerCase().charCodeAt(0),
                chip = (letter == letter.toUpperCase()) ? 'chip' : '';
    
            var index = ascii - lowercase;
    
            if(row == FREEROW && col == FREECOL) {
                //at middle square, fill with free data
                card[row][col] = {
                    text: '',
                    image: 'images/free.jpg',
                    alt: 'Free space',
                    chip: 'free ' + chip,
                    row: row,
                    col: col
                };
            } else {
                //fill with data from index as decoded from key
                card[row][col] = _.merge(dataset[col][index], {
                        chip: chip,
                        row: row,
                        col: col
                    }
                );
            }
        });
    
        $('.card').html(card_template(card));
    
        // Set squares now that cards are rendered
        setSquareHeights();
        // if reading saved card, there could be a bingo
        // if it has a key, update social buttons
        // if there's a bingo, show modal unless key came from URL
        update_bingo(saved_card);
    
    }
    
    // called on new bingo
    function report_bingo() {
        $('#bingo-modal').modal('show');
        return true;
    }

    // Reset square heights to equal widths
    function setSquareHeights() {
        // set square height = square width
        // add extra height for narrow windows
        var mobile_height = $window.width() < 450 ? 25 : 0,
            $squares = $('.square'),
            square_width = $squares.first().width();
        $squares.height(square_width+mobile_height);
    }
    
    //// SET DOM EVENTS ////
    function setDOM() {
        //clicks on squares
        $bingo.on('click', '.square', function(){
            var squareid = $(this).attr('id');
            var splitid = squareid.split("-");
            toggle_chip(splitid[1], splitid[2]);
        });

        //new card button
        $('#new-card').on('click', function(){
            make_card(true);
        });

        $window.on('resize', _.debounce(setSquareHeights, 250));
    }

    // Initialize constructor.
    // The only function called directly in the constructor should be init()
    function init() {
        //check if instance sent data, warn and fail if not
        if(!_.isArray(dataset)) {
            console.error('Bingo requires an array of data');
            return false;
        }

        //Compile card template
        card_template = Handlebars.compile(card_template_string);
        //Build card
        make_card();
        //Bind events
        setDOM();
    }

    init();
};
