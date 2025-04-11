# Frontend-dokumentation

## Översikt
*En kort beskrivning av frontend-delen av projektet, dess huvudsyfte och huvudfunktionalitet. Beskriv också hur den kopplas till API:et.*

## Teknologier

- HTML5 - Struktur och innehåll
- [SCSS/Sass](https://sass-lang.com/) - CSS-preprocessor för förbättrad styling
- JavaScript (ES6+) - Interaktivitet och API-integration


## Kodstruktur och arkitektur
BE-WEBSHOP-2025-FE/
│
├── documentation/                    
│   ├── popup-documentation.md
│   └── API-documentation.md
│
├── pages/                   
│   ├── admin.html            
│   ├── checkout.html            
│   ├── index.html
│   └── login.html        
│
├── partials/
│   ├── _mixins.scss
│   └── _variables.scss
│
├── src/
│   ├── scripts/
│   │   ├── admin.js
│   │   ├── checkout.js
│   │   └── index.js
│   │
│   └── utils/
│       ├── addCustomer.js
│       ├── api.js
│       ├── checkIfSignedIn.js
│       ├── isUserAdmin.js
│       └── signin.js
│
└── styles/
    ├── admin/
    │   ├── admin.css
    │   ├── admin.css.map
    │   └── admin.scss
    │
    ├── checkout/
    │   ├── checkout.css
    │   ├── checkout.css.map
    │   └── checkout.scss
    │
    ├── footer/
    │   ├── footer.css
    │   ├── footer.css.map
    │   └── footer.scss
    │
    ├── index/
    │   ├── index.css
    │   ├── index.css.map
    │   └── index.scss
    │
    ├── login/
    │   ├── login.css
    │   ├── login.css.map
    │   └── login.scss
    │
    └── navbar/
        ├── navbar.css
        ├── navbar.css.map
        └── navbar.scss




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

### API-anrop
API-funktioner finns samlade i `api.js` för att enkelt hantera kommunikation med backend.

- `getBaseUrl()` - Returnerar bas-URL för API-anrop (https://webshop-2025-be-g8.vercel.app/)
- `fetchProducts(endpoint)` - Hämtar produktdata från angiven endpoint (standard är "api/products")
- `addProduct(productData)` - Lägger till en ny produkt i databasen
- `deleteProduct(productId)` - Tar bort en produkt baserat på ID
- `updateProduct(productId, productData)` - Uppdaterar en befintlig produkt
- `signIn(userData)` - Autentiserar användare och lagrar token i localStorage
- `addCustomer(customerData)` - Registrerar en ny kund
- `getUserProfile()` - Hämtar inloggad användares profilinformation
- `updateUserInfo(userData)` - Uppdaterar användarens profilinformation

Viktigt att notera:
- Autentisering sker via tokens som lagras i localStorage
- Kundvagn sparas också i localStorage för att bibehållas mellan sessioner

## Förbättringspunkter
*Lista över områden där koden skulle kunna förbättras i framtiden.*

## Kända problem
I checkout fungerar inte Varukorg eller Mina sidor
-
-
-
-
## API-integration

- **Basendpoint**: `https://webshop-2025-be-g8.vercel.app/`

- **Autentisering**: 
  - Använder JWT-tokens som lagras i localStorage med nyckeln 'token'
  - Token sparas automatiskt vid inloggning och skickas med i Authorization-header för skyddade endpoints
  - För att logga ut tas token bort från localStorage

- **Produkthantering**:
  - GET `/api/products` - Hämta alla produkter
  - POST `/api/products` - Lägg till ny produkt
  - PUT `/api/products/{id}` - Uppdatera produkt
  - DELETE `/api/products/{id}` - Ta bort produkt

- **Användarhantering**:
  - POST `/api/auth/login` - Logga in användare
  - POST `/api/auth/register` - Registrera ny användare
  - GET `/api/minasidor` - Hämta användarens profil (kräver token)
  - PUT `/api/minasidor` - Uppdatera användarens profil (kräver token)

- **Kundvagnshantering**:
  - Kundvagn lagras lokalt i localStorage med nyckeln 'cart'
  - Innehåller produktinformation med antal
  - Finns kvar mellan sessioner

- **Felhantering**: 
  - API-funktioner hanterar fel genom att returnera null eller false vid misslyckande
  - Vissa funktioner använder try/catch för att fånga och logga fel
  - Inloggningsfel visas för användaren via alert

---

*Dokumentationen skapad av [Grupp 8 FEND24]*
