import React, { Component } from 'react';
import { GoogleApiWrapper, Marker } from 'google-maps-react';
import CurrentLocation from './components/Map';
import InfoWindowEx from './components/InfoWindowEx';
import Nome from './Nome';

export class MapContainer extends Component {
     
    getRandomName() {
        const pokeNames = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "nidoran♀", "nidorina", "nidoqueen", "nidoran♂", "nidorino", "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbro", "magnemite", "magneton", "farfetch’d", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu", "starmie", "mr. mime", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew", "chikorita", "bayleef", "meganium", "cyndaquil", "quilava", "typhlosion", "totodile", "croconaw", "feraligatr", "sentret", "furret", "hoothoot", "noctowl", "ledyba", "ledian", "spinarak", "ariados", "crobat", "chinchou", "lanturn", "pichu", "cleffa", "igglybuff", "togepi", "togetic", "natu", "xatu", "mareep", "flaaffy", "ampharos", "bellossom", "marill", "azumarill", "sudowoodo", "politoed", "hoppip", "skiploom", "jumpluff", "aipom", "sunkern", "sunflora", "yanma", "wooper", "quagsire", "espeon", "umbreon", "murkrow", "slowking", "misdreavus", "unown", "wobbuffet", "girafarig", "pineco", "forretress", "dunsparce", "gligar", "steelix", "snubbull", "granbull", "qwilfish", "scizor", "shuckle", "heracross", "sneasel", "teddiursa", "ursaring", "slugma", "magcargo", "swinub", "piloswine", "corsola", "remoraid", "octillery", "delibird", "mantine", "skarmory", "houndour", "houndoom", "kingdra", "phanpy", "donphan", "porygon2", "stantler", "smeargle", "tyrogue", "hitmontop", "smoochum", "elekid", "magby", "miltank", "blissey", "raikou", "entei", "suicune", "larvitar", "pupitar", "tyranitar", "lugia", "ho-oh", "celebi", "treecko", "grovyle", "sceptile", "torchic", "combusken", "blaziken", "mudkip", "marshtomp", "swampert", "poochyena", "mightyena", "zigzagoon", "linoone", "wurmple", "silcoon", "beautifly", "cascoon", "dustox", "lotad", "lombre", "ludicolo", "seedot", "nuzleaf", "shiftry", "taillow", "swellow", "wingull", "pelipper", "ralts", "kirlia", "gardevoir", "surskit", "masquerain", "shroomish", "breloom", "slakoth", "vigoroth", "slaking", "nincada", "ninjask", "shedinja", "whismur", "loudred", "exploud", "makuhita", "hariyama", "azurill", "nosepass", "skitty", "delcatty", "sableye", "mawile", "aron", "lairon", "aggron", "meditite", "medicham", "electrike", "manectric", "plusle", "minun", "volbeat", "illumise", "roselia", "gulpin", "swalot", "carvanha", "sharpedo", "wailmer", "wailord", "numel", "camerupt", "torkoal", "spoink", "grumpig", "spinda", "trapinch", "vibrava", "flygon", "cacnea", "cacturne", "swablu", "altaria", "zangoose", "seviper", "lunatone", "solrock", "barboach", "whiscash", "corphish", "crawdaunt", "baltoy", "claydol", "lileep", "cradily", "anorith", "armaldo", "feebas", "milotic", "castform", "kecleon", "shuppet", "banette", "duskull", "dusclops", "tropius", "chimecho", "absol", "wynaut", "snorunt", "glalie", "spheal", "sealeo", "walrein", "clamperl", "huntail", "gorebyss", "relicanth", "luvdisc", "bagon", "shelgon", "salamence", "beldum", "metang", "metagross", "regirock", "regice", "registeel", "latias", "latios", "kyogre", "groudon", "rayquaza", "jirachi", "deoxys", "turtwig", "grotle", "torterra", "chimchar", "monferno", "infernape", "piplup", "prinplup", "empoleon", "starly", "staravia", "staraptor", "bidoof", "bibarel", "kricketot", "kricketune", "shinx", "luxio", "luxray", "budew", "roserade", "cranidos", "rampardos", "shieldon", "bastiodon", "burmy", "wormadam", "mothim", "combee", "vespiquen", "pachirisu", "buizel", "floatzel", "cherubi", "cherrim", "shellos", "gastrodon", "ambipom", "drifloon", "drifblim", "buneary", "lopunny", "mismagius", "honchkrow", "glameow", "purugly", "chingling", "stunky", "skuntank", "bronzor", "bronzong", "bonsly", "mime jr.", "happiny", "chatot", "spiritomb", "gible", "gabite", "garchomp", "munchlax", "riolu", "lucario", "hippopotas", "hippowdon", "skorupi", "drapion", "croagunk", "toxicroak", "carnivine", "finneon", "lumineon", "mantyke", "snover", "abomasnow", "weavile", "magnezone", "lickilicky", "rhyperior", "tangrowth", "electivire", "magmortar", "togekiss", "yanmega", "leafeon", "glaceon", "gliscor", "mamoswine", "porygon-z", "gallade", "probopass", "dusknoir", "froslass", "rotom", "uxie", "mesprit", "azelf", "dialga", "palkia", "heatran", "regigigas", "giratina", "cresselia", "phione", "manaphy", "darkrai", "shaymin", "arceus", "victini", "snivy", "servine", "serperior", "tepig", "pignite", "emboar", "oshawott", "dewott", "samurott", "patrat", "watchog", "lillipup", "herdier", "stoutland", "purrloin", "liepard", "pansage", "simisage", "pansear", "simisear", "panpour", "simipour", "munna", "musharna", "pidove", "tranquill", "unfezant", "blitzle", "zebstrika", "roggenrola", "boldore", "gigalith", "woobat", "swoobat", "drilbur", "excadrill", "audino", "timburr", "gurdurr", "conkeldurr", "tympole", "palpitoad", "seismitoad", "throh", "sawk", "sewaddle", "swadloon", "leavanny", "venipede", "whirlipede", "scolipede", "cottonee", "whimsicott", "petilil", "lilligant", "basculin", "sandile", "krokorok", "krookodile", "darumaka", "darmanitan", "maractus", "dwebble", "crustle", "scraggy", "scrafty", "sigilyph", "yamask", "cofagrigus", "tirtouga", "carracosta", "archen", "archeops", "trubbish", "garbodor", "zorua", "zoroark", "minccino", "cinccino", "gothita", "gothorita", "gothitelle", "solosis", "duosion", "reuniclus", "ducklett", "swanna", "vanillite", "vanillish", "vanilluxe", "deerling", "sawsbuck", "emolga", "karrablast", "escavalier", "foongus", "amoonguss", "frillish", "jellicent", "alomomola", "joltik", "galvantula", "ferroseed", "ferrothorn", "klink", "klang", "klinklang", "tynamo", "eelektrik", "eelektross", "elgyem", "beheeyem", "litwick", "lampent", "chandelure", "axew", "fraxure", "haxorus", "cubchoo", "beartic", "cryogonal", "shelmet", "accelgor", "stunfisk", "mienfoo", "mienshao", "druddigon", "golett", "golurk", "pawniard", "bisharp", "bouffalant", "rufflet", "braviary", "vullaby", "mandibuzz", "heatmor", "durant", "deino", "zweilous", "hydreigon", "larvesta", "volcarona", "cobalion", "terrakion", "virizion", "tornadus", "thundurus", "reshiram", "zekrom", "landorus", "kyurem", "keldeo", "meloetta", "genesect", "chespin", "quilladin", "chesnaught", "fennekin", "braixen", "delphox", "froakie", "frogadier", "greninja", "bunnelby", "diggersby", "fletchling", "fletchinder", "talonflame", "scatterbug", "spewpa", "vivillon", "litleo", "pyroar", "flabébé", "floette", "florges", "skiddo", "gogoat", "pancham", "pangoro", "furfrou", "espurr", "meowstic", "honedge", "doublade", "aegislash", "spritzee", "aromatisse", "swirlix", "slurpuff", "inkay", "malamar", "binacle", "barbaracle", "skrelp", "dragalge", "clauncher", "clawitzer", "helioptile", "heliolisk", "tyrunt", "tyrantrum", "amaura", "aurorus", "sylveon", "hawlucha", "dedenne", "carbink", "goomy", "sliggoo", "goodra", "klefki", "phantump", "trevenant", "pumpkaboo", "gourgeist", "bergmite", "avalugg", "noibat", "noivern", "xerneas", "yveltal", "zygarde", "diancie", "hoopa", "volcanion", "rowlet", "dartrix", "decidueye", "litten", "torracat", "incineroar", "popplio", "brionne", "primarina", "pikipek", "trumbeak", "toucannon", "yungoos", "gumshoos", "grubbin", "charjabug", "vikavolt", "crabrawler", "crabominable", "oricorio", "cutiefly", "ribombee", "rockruff", "lycanroc", "wishiwashi", "mareanie", "toxapex", "mudbray", "mudsdale", "dewpider", "araquanid", "fomantis", "lurantis", "morelull", "shiinotic", "salandit", "salazzle", "stufful", "bewear", "bounsweet", "steenee", "tsareena", "comfey", "oranguru", "passimian", "wimpod", "golisopod", "sandygast", "palossand", "pyukumuku", "type: null", "silvally", "minior", "komala", "turtonator", "togedemaru", "mimikyu", "bruxish", "drampa", "dhelmise", "jangmo-o", "hakamo-o", "kommo-o", "tapu koko", "tapu lele", "tapu bulu", "tapu fini", "cosmog", "cosmoem", "solgaleo", "lunala", "nihilego", "buzzwole", "pheromosa", "xurkitree", "celesteela", "kartana", "guzzlord", "necrozma", "magearna", "marshadow", "poipole", "naganadel", "stakataka", "blacephalon", "zeraora", "meltan", "melmetal", "grookey", "thwackey", "rillaboom", "scorbunny", "raboot", "cinderace", "sobble", "drizzile", "inteleon", "skwovet", "greedent", "rookidee", "corvisquire", "corviknight", "blipbug", "dottler", "orbeetle", "nickit", "thievul", "gossifleur", "eldegoss", "wooloo", "dubwool", "chewtle", "drednaw", "yamper", "boltund", "rolycoly", "carkol", "coalossal", "applin", "flapple", "appletun", "silicobra", "sandaconda", "cramorant", "arrokuda", "barraskewda", "toxel", "toxtricity", "sizzlipede", "centiskorch", "clobbopus", "grapploct", "sinistea", "polteageist", "hatenna", "hattrem", "hatterene", "impidimp", "morgrem", "grimmsnarl", "obstagoon", "perrserker", "cursola", "sirfetch’d", "mr. rime", "runerigus", "milcery", "alcremie", "falinks", "pincurchin", "snom", "frosmoth", "stonjourner", "eiscue", "indeedee", "morpeko", "cufant", "copperajah", "dracozolt", "arctozolt", "dracovish", "arctovish", "duraludon", "dreepy", "drakloak", "dragapult", "zacian", "zamazenta", "eternatus", "kubfu", "urshifu", "zarude"];
        var id = Math.floor((Math.random() * pokeNames.length) + 1);
        return pokeNames[id];
    }

    generateRamdomLatLng(lat, lng) {

        var rand = Math.floor(Math.random() * 51) - 25
        var newLat = lat + (rand / 100);

        rand = Math.floor(Math.random() * 51) - 25
        var newLng = lng + (rand / 100);

        return { lat: newLat, lng: newLng };
    }

    componentDidMount() {
        document.title = "Pokemon Kafka Demo"
        alert("Bem vindo! Não se esqueça de passar na Localiza Labs e informar seu nome!")

        var lat = CurrentLocation.defaultProps.initialCenter.lat;
        var lng = CurrentLocation.defaultProps.initialCenter.lng;

        var array = [];

        for (var i = 0; i < 50; i++) {
            var newLocation = this.generateRamdomLatLng(lat, lng);

            var ramdomPokemonId = Math.floor((Math.random() * 800) + 1);

            var thisPoke = this.getPokemon(ramdomPokemonId);
            while (thisPoke.img === null) {
                //console.log("buscar novamente");
                ramdomPokemonId = Math.floor((Math.random() * 800) + 1);
                thisPoke = this.getPokemon(ramdomPokemonId);
            }

            array.push({
                "pokemonId": ramdomPokemonId,
                "name": thisPoke.name,
                "img": thisPoke.img,
                "lat": newLocation.lat,
                "lng": newLocation.lng
            });

        }

        this.setState({
            pokemons: array
        });
    }

    publicar(nome, pontos, previousLat, previousLng, currentLat, currentLng) {
        var xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            console.log(`API result: ${xhr.status}`);
        })

        var body = `{
            "PlayerName" : "${nome}",
            "ScoredPoints" : ${pontos},
            "Origem" : {
                "lat" : ${previousLat},
                "lng" : ${previousLng}
            },
            "Destino" : {
                "lat" : ${currentLat},
                "lng" : ${currentLng}
            }
        }`

        console.log(body);

        xhr.open('POST', 'https://kafka-demo-producer-fn.azurewebsites.net/api/kafka_demo_producer?code=1JShTXR0oFHw32AFPwmeCDxdxdPqavQH2WwOPc8EqUSZpmeNjYpvZg==')//'https://run.mocky.io/v3/71737401-c68d-4a7d-b51e-e20ffb1bf131')
        xhr.send(body)
    }

    getPokemon(id) {
        try {
            var xhr = new XMLHttpRequest()
            xhr.open('GET', `https://pokeapi.co/api/v2/pokemon/${id}`, false)
            xhr.send()

            var result = JSON.parse(xhr.responseText);
            return { "name": result.name, "img": result.sprites.back_default };
        }
        catch {
            console.log("Ops. erro ao buscar pokémon na API.");
        }
    }

    displayMarkers = () => {

        console.log("displayMarkers disparado");

        return this.state.pokemons.map((item, index) => {
            return <Marker icon={require("./assets/pokeball_small.png")} width="24" height="24" name={item.name} key={index} id={index} position={{
                lat: item.lat,
                lng: item.lng
            }}
                pokeimg={item.img}
                onClick={this.onMarkerClick} />
        })
    }

    onMarkerClick = (props, marker, e) => {

        console.log("onMarkerClick disparado");

        if (this.state.showingInfoWindow) {
            console.log("clicou em outro sem fechar, salvando posicao anterior")
            this.setState({
                previousLocation: { name: this.state.activeMarker.name, lat: this.state.activeMarker.position.lat(), lng: this.state.activeMarker.position.lng() }
            });

            if (this.state.activeMarker !== null) {
                this.removerPokemon(this.state.activeMarker.name);
            }
        }

        this.setState({
            acertou : null
        })

        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
        });
    }
    
    removerPokemon(pokemonName) {

        console.log("removerPokemon disparado");

        for (var i = 0; i < this.state.pokemons.length; i++) {
            if (pokemonName === this.state.pokemons[i].name) {
                this.state.pokemons.splice(i, 1);
                break;
            }
        }
    }

    onClose = props => {
        
        console.log("onClose disparado");
        
        if (this.state.activeMarker !== null) {
            this.removerPokemon(this.state.activeMarker.name);
        }

        this.setState({
            acertou: null,
            previousLocation: { name: this.state.activeMarker.name, lat: this.state.activeMarker.position.lat(), lng: this.state.activeMarker.position.lng() },
            showingInfoWindow: false,
            activeMarker: null
        });
    };

    onVotouErrado = (props, sender) => {
        console.log(this.state.playerName, "errou");
        this.publicar(this.state.playerName, 0, this.state.previousLocation.lat, this.state.previousLocation.lng, this.state.activeMarker.position.lat(), this.state.activeMarker.position.lng())
        this.setState({ acertou: true });
    };

    onVotouCorreto = (props) => {

        if (JSON.stringify(this.state.previousLocation) !== '{}') {
            console.log(`anterior => name: ${this.state.previousLocation.name}, lat: ${this.state.previousLocation.lat}, lng: ${this.state.previousLocation.lng}`);
        }

        console.log(`atual => name: ${this.state.activeMarker.name}, lat: ${this.state.activeMarker.position.lat()}, lng: ${this.state.activeMarker.position.lng()}`);

        console.log(this.state.playerName, "acertou", "local anterior", this.state.previousLocation, "local atual", this.state.activeMarker.position.lat(), this.state.activeMarker.position.lng());
        
        this.setState({ acertou: false });

        this.publicar(this.state.playerName, 1, this.state.previousLocation.lat, this.state.previousLocation.lng, this.state.activeMarker.position.lat(), this.state.activeMarker.position.lng())
    }

    onAlterouNome(arg) {
        this.setState({ playerName: arg });
        this.onClose();
    }

    constructor(props) {
        
        super(props);

        this.state = {
            acertou: null,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            pokemons: [],
            previousLocation: { name: "Petenussi", lat: CurrentLocation.defaultProps.initialCenter.lat, lng: CurrentLocation.defaultProps.initialCenter.lng },
            playerName: "Petenussi",

        }
    }

    render() {
        return (
            
            <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
                <Marker onClick={this.onMarkerClick} name="Localiza Labs" icon={require("./assets/labs-peq.png")} width="15" height="15"/>

                <InfoWindowEx
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        {/* Banner resposta errada */}
                        {this.state.acertou === true &&
                            <span>
                                <center>
                                    <h2>Oh não!<br />
                                    Você perdeu um {this.state.activeMarker?.name}!</h2>
                                    <img src={this.state.activeMarker?.pokeimg} alt="Venha me pegar" />
                                </center>
                            </span>
                        }
                        {/* Banner resposta certa */}
                        {this.state.acertou === false &&
                            <span>
                                <center>
                                    <h2>Isso aí!<br/>
                                    Este {this.state.activeMarker?.name} agora é seu!</h2>
                                    <img src={this.state.activeMarker?.pokeimg} alt="Venha me pegar" />
                                </center>
                            </span>
                        }
                        {/* Banner pergunta */}
                        {(this.state.acertou === null && this.state.activeMarker?.name !== 'Localiza Labs') &&
                            <span>
                                <h2>Que Pokémon é esse?</h2>
                                <table>
                                    <thead />
                                    <tbody>
                                        <tr><td><img src={this.state.activeMarker?.pokeimg} alt="Venha me pegar" /></td>
                                            <td>
                                                <table>
                                                    <thead />
                                                    <tbody>
                                                        <tr>
                                                            <td><button onClick={() => this.onVotouErrado(this.state.activeMarker?.name, this)}>{this.getRandomName()}</button></td>
                                                        </tr>
                                                        <tr>
                                                            <td><button onClick={this.onVotouCorreto}>{this.state.activeMarker?.name}</button></td>
                                                        </tr>
                                                        <tr>
                                                            <td><button onClick={() => this.onVotouErrado(this.state.activeMarker?.name)}>{this.getRandomName()}</button></td>
                                                        </tr>
                                                    </tbody>
                                                    <tfoot />
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </span>
                        }
                        {/* Banner Localiza */}
                        {this.state.activeMarker?.name === 'Localiza Labs' &&
                            <span>
                                <center><img src={require("./assets/labs.png")} width="60" height="60" alt="Nossa casa"></img><h2>Pokemon Headquarters</h2>
                                </center>
                                <span>Clique nas localizades no mapa, para testar<br />
                                seus conhecimentos e provar que é um verdadeiro<br />
                                Mestre Pokémon!</span><br />
                                <Nome playerName="michael" nomeChanched={this.onAlterouNome.bind(this)} />
                            </span>
                        }
                        <br />
                    </div>
                </InfoWindowEx>

                {this.displayMarkers()}
            </CurrentLocation>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDolDILV98X9HQT2H_S-OE3gN3Q5tjwntw'
})(MapContainer);