# Frontend-dokumentation

## Översikt
Som frontend-utvecklare har vår roll i detta projekt varit att skapa det användargränssnitt som både Hakims kunder och Hakim själv kommer att interagera med. 
Vi har alltså haft i fokus att utveckla en användarvänlig samt responsiv webbshop för Hakims livsmedelsbutik.



Parallellt bygga ett generellt CMS-system som kan återanvändas för framtida webbshoppar
Arbeta tätt tillsammans med backend-teamet för att integrera frontend med backend-funktionalitet
## Teknologier

- HTML5 - Struktur och innehåll
- [SCSS/Sass](https://sass-lang.com/) - CSS-preprocessor för förbättrad styling
- JavaScript (ES6+) - Interaktivitet och API-integration

# Projektstruktur
``` 
BE-WEBSHOP-2025-FE/
│
├── documentation/                    # Projektdokumentation
│   ├── popup-documentation.md        # Beskrivning av popup-funktionalitet
│   └── API-documentation.md          # API-referens och användning
│
├── pages/                            # HTML-sidor
│   ├── admin.html                    # Administratörsgränssnitt
│   ├── checkout.html                 # Kassasida för beställning
│   ├── index.html                    # Huvudsida/Produktlistning
│   └── login.html                    # Inloggningssida
│
├── partials/                         # SCSS-hjälpfiler
│   ├── _mixins.scss                  # Återanvändbara SCSS-mixins
│   └── _variables.scss               # Globala variabler för färger, storlekar etc.
│
├── src/                              # Källkod
│   ├── scripts/                      # Sidspecifika JavaScript
│   │   ├── admin.js                  # Adminsidefunktionalitet
│   │   ├── checkout.js               # Kassafunktionalitet
│   │   └── index.js                  # Huvudsidefunktionalitet
│   │
│   └── utils/                        # Hjälpfunktioner
│       ├── addCustomer.js            # Kundregistrering
│       ├── api.js                    # Funktioner för API-kommunikation
│       ├── checkIfSignedIn.js        # Kontroll av inloggningsstatus
│       ├── isUserAdmin.js            # Verifiering av administratörsbehörighet
│       └── signin.js                 # Inloggningsfunktionalitet
│
└── styles/                           # CSS och SCSS-filer
├── admin/                        # Adminsidans stilar (CSS, CSS.map, SCSS)
├── checkout/                     # Kassasidans stilar
├── footer/                       # Sidfotens stilar
├── index/                        # Huvudsidans stilar
├── login/                        # Inloggningssidans stilar
└── navbar/                       # Navigationsmenyns stilar
```

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
- Skapa en mer logisk kodstruktur med mindre upprepning
- Slå ihop liknande funktioner till återanvändbara komponenter
- Förbättra mappstrukturen för enklare underhåll
- Konsolidera CSS-filer för att minska duplicering av stilar
- Implementera bättre felhantering för API-anrop

## Kända problem
- I checkout fungerar inte Varukorg eller Mina sidor.
- Orderhistorik sparas i localStorage. Backendarna måste göra så att det går att spara informationen från deras håll.
- Isac är utbränd han behöver 3 veckor golf semester.
- Orderhistoriken visas endast för admin. Kunden kan inte få ett kvitto eller se sin orderbekräftelse ännu.
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
