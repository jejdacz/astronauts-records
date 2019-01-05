## Description:

### Back End

Back End aplikace běží v Node.js.
Jako web framework byl použit Express, který také zajišťuje přístup k statickým souborům a směrování dotazů na middleware GraphQL. Pro provedení všech dotazů, kromě přihlášení uživatele je nutná autentizace, která je řešena pomocí JSON web tokenu (jwt). Záznamy jsou uloženy v dokumentové databázi MongoDB, modelování a správa dokumentů i validace dat je provedena pomocí Mongoose.
Web server běží v režimu CORS.

### Front End

Front End aplikace je postaven na frameworku React. Základ aplikace byl vytvořen pomocí create-react-app modulu.

###### Redux

Správa stavu aplikace je řešena technologií Redux a pro řešení asynchronních akcí byl použit middleware Redux Thunk.

###### React Router

Směrování do jednotlivých částí aplikace je zajištěno modulem React-Router. Pro cesty vyžadující autentizaci je provedeno ověření uživatele. Pro opakovatelné využití komponent byla snaha tvořit komponenty vyššího řádu, zapouzdřující kýženou funkcionalitu.

###### CSS

K stylování komponent je použita technika CSS modulů umožňující kombinovat části (třídy a hodnoty) stylů definované v různých souborech. Například opakované použití stejných tříd pro animace různých elementů. Design aplikace je responzivní.

###### Formuláře

Základní funkce a vlastnosti formuláře byly izolovány do samostatných komponent vyššího řádu. Pro usnadnění správy stavu mezi komponenty formulářů a jejich součástmi byla použita technika kontextu. Stav formulářů byl řešen pouze jako lokální stav v komponentě a nebyl zahrnut do úložiště Redux store.Data formulářů jsou během zadávání validována a pole formulářů poskytují uživateli okamžitou odezvu. Pro Front End i Back End byl k validaci použit totožný lokální modul.

###### Ovládací prvky

Funkci tlačítka i odkazu v aplikaci zastupuje stejná komponenta, která k vykreslení zvolí vhodný element pro konkrétní situaci. Tímto způsobem je použití i vzhled unifikován. Tlačítka akcí vyžadujících potvrzení jako například mazání po prvním kliknutí změní svůj text na předdefinovaný text např. s dotazem "Určitě?". Po druhém kliknutí je akce provedena. Pokud prvek ztratí focus změní se text zpět na původní.

###### Chybové hlášení

Chybové hlášení operací prováděných na straně serveru je provedeno dialogovým oknem se zprávou, komponenty v pozadí jsou překryty clonou. Pro případný pád samotné aplikace jsou její komponenty uzavřeny v Error boundary.

###### Čekaní na odpověď serveru

Se zobrazuje také dialogovým oknem s clonou ,ale jen v případě ,že čekání přesáhne stanovený časový limit, konkrétně 800ms. Což v případě rychlé odezvy serveru a dobré konektivity, vede k plynulejšímu používání aplikace.

### Testování

Testy byly napsány pro klíčové funkce aplikace, např. autentizace, CRUD operace ,komponenty formuláře, utility atd. Pro Back End byl použit Mocha + Chai, pro Front End pak Jest + Enzyme.

### Vývoj

Vývoj probíhal na PC s operačním systémem Ubuntu s pomocí vývojářských nástrojů Chrome. Kód byl napsán v editoru Atom. Pro správu verzí byl použit Git.

### Nasazení

Aplikace byla nasazena na server Heroku.

### Problémy a Pasti

Prvotním problémem bylo nastavení produkčního prostředí. Jelikož se jednalo o moji první full stack aplikaci, neměl jsem předsavu jak rozumně oddělit frontend a backend pro separátní vývoj, ale zároveň ponechat kompletní aplikaci na jednom repozitáři a mít možnost ji jako celek spouštět, ladit, testovat a na závěr nasadit na Heroku. Pro první pokusy jsem instaloval a nastavoval react i webpack. Nakonec jsem jako základ pro celý frontend použil create-react-app, který v sobě zahrnuje i server pro vývoj, čímž se dal frontend vyvíjet samostatně. Dotazy na API backendu byly přesměrovány na jiný port kde běžel vývojový server backendu a nebo byl použit falešný modul simulující odpovědi backendu. Na backendu jsem měl problém s řízením chybových hlášení, situaci významně komplikovalo i to, že kód je asynchronní. Na straně frontendu jsem bojoval s rozhodnutím jakou techniku stylování použít. Myslím ,že nejvhodnější by bylo provést řízení stylů pomocí JS ,ale zde bohužel není podpora včech vychytávek CSS jako MediaQueries nebo pseudo třídy.
Rozdělení funkcionality do jednotlivých částí a komponent frontendu byl pro mne také tvrdý oříšek. Jako nápovědu jsem využíval dokumentací, prací jiných vývojářů, fór a odborných článků.
