# Frontend-dokumentation

## Översikt
*En kort beskrivning av frontend-delen av projektet, dess huvudsyfte och huvudfunktionalitet. Beskriv också hur den kopplas till API:et.*

## Teknologier
*Lista över de viktigaste teknologier och verktyg som används i frontend-delen.*

- HTML5 - Struktur och innehåll
- [SCSS/Sass](https://sass-lang.com/) - CSS-preprocessor för förbättrad styling
- JavaScript (ES6+) - Interaktivitet och API-integration
- *Lägg till eventuella JavaScript-bibliotek som används i projektet...*

## Kodstruktur och arkitektur
*En beskrivning av hur frontend-koden är organiserad.*


### Viktiga filer
EXEMPEL
- `index.html` - Huvudsidan med grundläggande HTML-struktur
- `js/main.js` - Huvudsaklig JavaScript-fil som initierar applikationen
- `js/api.js` - Innehåller alla funktioner för API-kommunikation
- `scss/main.scss` - Huvudsaklig stilfil som importerar övriga stilar
- *Lägg till andra viktiga filer som är specifika för ert projekt...*

## Setup och installation

### Förutsättningar
- En modern webbläsare (Chrome, Firefox, Edge, etc.)
- Sass-compiler för SCSS-filer
- *Andra förutsättningar som behövs...*

### Installation
```bash
# Klona projektet (om det inte redan är gjort)
git clone [repository-url]

# Navigera till projektkatalogen
cd [project-name]
```

### Kompilera SCSS till CSS
För att kompilera SCSS-filerna till CSS kan du använda något av följande alternativ:

#### Alternativ 1: Använda Live Sass Compiler (VS Code-tillägg)
1. Installera [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass) i VS Code
2. Klicka på "Watch Sass" i statusfältet för att starta automatisk kompilering

#### Alternativ 2: Använda Node.js och npm
1. Installera Node.js och npm
2. Installera Sass: `npm install -g sass`
3. Kompilera: `sass scss/main.scss css/main.css --watch`

### Köra projektet lokalt
Öppna helt enkelt `index.html` i din webbläsare, eller använd en lokal server som Live Server (VS Code-tillägg) för att undvika CORS-problem vid API-anrop.

## Kodbibliotek & teknologier
*Detaljerad beskrivning av de JavaScript-bibliotek som eventuellt används i projektet.*

### API-kommunikation
- Fetch API - Inbyggd browser-API för att göra HTTP-anrop
- *Alternativt: [Axios](https://axios-http.com/) om det används*

## Hjälpfunktioner

### API-anrop
*Beskriv återanvändbara funktioner för API-anrop.*
EXEMPEL
- `js/api.js` - Innehåller basfunktioner för API-anrop
  - `fetchData(endpoint)` - Hämtar data från specifik endpoint
  - `postData(endpoint, data)` - Skickar data till specifik endpoint
  - `API_BASE_URL` - Konstant för API:ets basadress


## Förbättringspunkter
*Lista över områden där koden skulle kunna förbättras i framtiden.*

## Kända problem
EXEMPEL
*Lista över kända buggar eller begränsningar i frontend-implementationen.*


## API-integration
*Information om hur frontend integrerar med API:et.*

- Basendpoint: `https://api.example.com/v1`
- Autentisering: *Beskriv hur autentisering hanteras, t.ex. API-nycklar eller token*
- Rate limiting: *Om API:et har begränsningar*
- Felhantering: *Hur applikationen hanterar API-fel*

---

*Dokumentationen skapad av [Grupp 8 FEND] - [Datum]*
