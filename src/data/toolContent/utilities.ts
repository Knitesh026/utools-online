import type { ToolContent } from "./types";

export const utilitiesContent: Record<string, ToolContent> = {
  "/qr-code": {
    route: "/qr-code",
    name: "QR Code Generator",
    intro: [
      "A QR code is a square grid of dark and light modules that stores a short piece of text, most often a web address, a Wi-Fi login string, a phone number or a plain note. This page turns whatever you type in the Text or URL box into a PNG image that any phone camera can read. You choose the pixel size, from 128 to 512, and one of four error correction levels, then press Generate QR Code and download the result.",
      "People use QR codes wherever typing is a nuisance: table cards in a cafe, a link on a printed flyer, a product manual that points to a support page, a conference badge, or a sticker on a router that holds the guest Wi-Fi details. The value of a good generator is not the picture itself but the choices behind it, such as how much damage the code can survive and how big it must be printed to scan reliably, which the sections below explain.",
    ],
    howItWorks: [
      "QR codes use Reed-Solomon error correction, the same family of math used on CDs and in deep-space telemetry. The encoder splits your text into bytes, adds extra check bytes, and arranges everything in a grid with three large finder squares in the corners so a scanner knows the orientation. The four levels reserve different shares of the code for repair data: L recovers roughly 7 percent of damaged area, M about 15, Q about 25 and H about 30. These are the exact options labelled Low, Medium, Quartile and High on the page.",
      "Higher correction is not free. Repair data takes room, so the same text needs a denser grid at level H than at level L, and denser grids need more pixels per module to scan well. On this page the image is drawn in your browser by the open-source qrcode JavaScript library, with a margin of two modules around the symbol. The text you type is not sent to any server, so even private notes stay on your device. Remember that the finished picture is readable by anyone who scans it, so still avoid encoding secrets you would not want shown.",
    ],
    steps: [
      "Type or paste the content into the Text or URL box. The page starts with https://example.com, so replace it with your own link or message.",
      "Drag the Size slider or click one of the preset buttons (128, 256, 384 or 512) to set the image width and height in pixels.",
      "Pick an Error Correction Level: Low (7%), Medium (15%), Quartile (25%) or High (30%). Medium is selected by default and suits clean digital screens.",
      "Press Generate QR Code. The image appears in the Generated QR Code panel, and an empty box produces the message asking you to enter text or a URL.",
      "Click Download QR Code to save the file as qrcode.png, or press Reset to restore the default text, size 256 and level M.",
    ],
    example: {
      title: "Choosing a level for a printed flyer",
      text: "Suppose you encode https://example.com/menu at level M and 256 px. The result scans fine on a screen. Printed on a flyer that will be folded and scuffed, switch to level Q (25 percent) and raise the size to 384 px. The grid gets denser, so each module is smaller at the same print width, but the code now survives a crease or a coffee ring covering about a quarter of its area. Always test the final print with two different phones before ordering a batch.",
    },
    useCases: [
      {
        title: "Restaurant and event material",
        text: "Link a menu, a booking form or a schedule from a table card or poster. Use a short URL so the grid stays sparse and scans quickly from a distance.",
      },
      {
        title: "Business cards and packaging",
        text: "Point customers at a contact page or a manual. Pick level Q or H if the code sits on curved or glossy packaging where reflections hide parts of it.",
      },
      {
        title: "Classroom and training handouts",
        text: "Replace long links in printed worksheets with a scannable square so students open the right resource without mistyping a single character.",
      },
      {
        title: "Quick device sharing",
        text: "Encode a short note, a coupon code or a plain address and show it on screen so a colleague can capture it by pointing a camera instead of retyping.",
      },
    ],
    tips: [
      "Keep the content short. Every extra character adds modules, and a short URL gives larger, easier-to-scan squares than a long tracking link with many parameters.",
      "Leave a blank border, called the quiet zone, around the code. Cropping it tight or printing on a busy background is the most common reason a good code fails to scan.",
      "Use dark modules on a light background with strong contrast. Inverted or low-contrast color schemes fail on many scanner apps, so always test before printing.",
      "Print at a size that suits the scanning distance. As a rough rule, plan on a code about one tenth as wide as the distance from which people will scan it.",
      "Use a URL you control and can keep alive. The image cannot be edited once printed, so a link that later breaks leaves every printed copy pointing nowhere.",
    ],
    limitations:
      "The image is generated locally, so the page keeps working once loaded and the text never leaves your device. Only plain text is supported: there are no dedicated Wi-Fi, vCard or email forms, no colors, no logo overlay and no SVG export. Output is a raster PNG between 128 and 512 pixels, which may look soft if enlarged for large print.",
    faqs: [
      {
        question: "What do the error correction levels L, M, Q and H mean?",
        answer: "They set how much of the code can be unreadable while it still scans. L tolerates about 7 percent damage, M about 15, Q about 25 and H about 30. Higher levels add repair data, which makes the grid denser for the same text.",
      },
      {
        question: "Is my text sent to a server?",
        answer: "No. The QR image is created in your browser with the qrcode library, so the text, size and level stay on your device. Anyone who scans the printed or shared image can still read what it contains, so do not encode passwords.",
      },
      {
        question: "Why will my QR code not scan?",
        answer: "Typical causes are too little contrast, a missing blank border, a printed size that is too small for the distance, or content so long that modules become tiny. Try shorter content, a larger size and a higher correction level.",
      },
      {
        question: "Does a QR code expire?",
        answer: "A QR code itself never expires, because it simply holds the text you gave it. The link inside may stop working if the destination page is moved or deleted, so choose a stable address before you print.",
      },
      {
        question: "What size should I choose?",
        answer: "For on-screen use, 256 pixels is usually enough. For print, pick the largest size, 512, and scale it down rather than up, since enlarging a small PNG blurs the edges between modules and hurts scanning.",
      },
      {
        question: "Can I add a logo in the middle?",
        answer: "This page has no logo option. Logos work by covering part of the code and relying on error correction to fill the gap, which is why level H is used for them. You would need a different tool that supports overlays.",
      },
    ],
  },

  "/barcode-generator": {
    route: "/barcode-generator",
    name: "Barcode Generator",
    intro: [
      "Barcodes turn a short value, such as a product number or an inventory tag, into a pattern that a scanner can read quickly. This page offers three formats in a Barcode Format menu: QR Code, Code 128 and EAN-13. You type the value into the Text / Data box, press Generate and get a PNG you can download. QR output can also be copied to the clipboard.",
      "Typical users are small sellers labelling shelves, people preparing mock-ups for packaging, teachers demonstrating how scanning works, and developers who need a placeholder image for a layout. Before using a generated image for real retail work, it helps to understand what each symbology is and which rules it enforces, because the three options suit different jobs.",
    ],
    howItWorks: [
      "A linear barcode encodes data as a sequence of bars and spaces of defined widths. EAN-13 holds 13 digits: a country or prefix portion, a manufacturer and product portion, and a final check digit. The check digit is computed from the first 12 digits by multiplying digits in odd positions by 1 and digits in even positions by 3, adding the results, and choosing the number that brings the sum up to the next multiple of 10. Scanners recompute it to catch misreads. Code 128 packs the full ASCII range into very compact bars and ends with its own checksum symbol.",
      "Everything on this page is generated in your browser, and the entered text is never sent anywhere. The QR option uses the qrcode library to produce a 300 by 300 pixel image at error correction level M. The Code 128 and EAN-13 options use the JsBarcode library, which follows the published bar-width tables, and the page draws the result on a canvas and saves it as a PNG with the value printed beneath the bars.",
      "For EAN-13 you enter exactly 12 digits and the library appends the thirteenth, the check digit, automatically, so the finished code is always valid. Anything that is not 12 digits is rejected with an error message. Code 128 accepts ordinary text, including letters and punctuation, up to 100 characters, and adds its own start, checksum and stop symbols. Invalid input in either format produces an error instead of an image.",
    ],
    steps: [
      "Choose a format in the Barcode Format menu: QR Code, Code 128 or EAN-13. QR Code is the default and holds the most varied content, while Code 128 and EAN-13 give the linear bars used on labels and products.",
      "Enter your value in the Text / Data box. QR and Code 128 accept up to 100 characters, while EAN-13 needs exactly 12 digits.",
      "Press Generate. The result shows in the Generated Barcode panel, together with the format name and a count of the characters you entered.",
      "Click Download Barcode to save a PNG named after the format, for example barcode-ean13.png. For QR output you can also use Copy to Clipboard.",
      "Press Reset to clear the text, return the format to QR Code and remove the image, then start again with a new value.",
    ],
    example: {
      title: "Calculating an EAN-13 check digit by hand",
      text: "Take the 12 digits 400638133393. Multiply odd positions by 1 and even positions by 3: 4x1 + 0x3 + 0x1 + 6x3 + 3x1 + 8x3 + 1x1 + 3x3 + 3x1 + 3x3 + 9x1 + 3x3 = 4 + 0 + 0 + 18 + 3 + 24 + 1 + 9 + 3 + 9 + 9 + 9 = 89. The next multiple of 10 is 90, so the check digit is 1 and the full number is 4006381333931. On this page you type only the 12 digits and the tool appends the 1 for you, so the image encodes 4006381333931. Doing the sum by hand is a good way to confirm the result.",
    },
    useCases: [
      {
        title: "Internal inventory labels",
        text: "Use the QR option to label bins, equipment or files with an ID. Any phone camera can read it, and no special scanner hardware is needed.",
      },
      {
        title: "Packaging and layout mock-ups",
        text: "Place a barcode in a design draft so printers and reviewers see where the real one will go. Use a number you are entitled to, or a clearly fake one, while the layout is still a draft.",
      },
      {
        title: "Teaching how codes work",
        text: "Show students how a number maps to a pattern, then walk through the EAN-13 check digit calculation on paper to explain why scanners reject misread digits.",
      },
      {
        title: "Event tickets and badges",
        text: "Encode an attendee reference as a QR image and print it on a badge so staff can look the reference up quickly at the door.",
      },
    ],
    tips: [
      "Pick the symbology to suit the reader. Code 128 suits internal labels and shipping IDs, EAN-13 is for retail products carrying an assigned number, and QR Code suits phone cameras and longer content.",
      "Real EAN-13 numbers are issued by GS1 through your national member organization. Generating digits yourself does not give you ownership of a product number, and retailers will reject made-up ones.",
      "Check the 12 digits before printing, because the tool computes the check digit from whatever you type. A typo in the input still gives a valid-looking code, just for the wrong number.",
      "Keep QR content brief. Short IDs produce a sparse code with big modules that scan quickly, while long strings make a dense pattern that needs a larger print size.",
      "Print a test sheet and scan it with the actual device used in your workflow before producing a full label run.",
    ],
    limitations:
      "Only three symbologies are offered: QR Code, Code 128 and EAN-13. UPC-A, Code 39, ITF, DataMatrix and PDF417 are not available, and there are no options for bar width, height, colors or SVG export, so output is a fixed-size PNG. EAN-13 accepts exactly 12 digits and nothing else. The tool draws a valid symbol for any number but cannot tell whether that number has been assigned to you, and retailers expect product numbers issued through GS1. The QR option always uses error correction level M. Always test a printed label with your own scanner.",
    faqs: [
      {
        question: "Which formats does this barcode generator support?",
        answer: "The menu lists QR Code, Code 128 and EAN-13. All three are generated in your browser, with the qrcode library for QR and JsBarcode for the other two, and each follows its published standard so scanners can read the result.",
      },
      {
        question: "Will the EAN-13 image work at a shop?",
        answer: "The symbol is a correctly formed EAN-13 and scans like one. Whether a shop accepts it depends on the number, because retail product numbers are allocated through GS1. Made-up digits will scan but may clash with real products.",
      },
      {
        question: "How is the EAN-13 check digit calculated?",
        answer: "Add the first 12 digits with weights alternating 1 and 3, starting with 1. Subtract the total's last digit from 10, and use 0 if the result is 10. For 400638133393 the sum is 89, so the check digit is 1.",
      },
      {
        question: "Why does EAN-13 only accept 12 digits here?",
        answer: "The thirteenth digit is the check digit, which is derived from the other twelve. You type 12 digits and the page adds the thirteenth automatically, so you never need to supply it. Input of any other length shows an error.",
      },
      {
        question: "Is my data uploaded?",
        answer: "No. All three formats are drawn inside your browser, so the text stays on your device. The saved image itself shows the data to anyone who scans it, so keep confidential values out of it.",
      },
      {
        question: "Can I get my own official product barcode from this page?",
        answer: "No. Official product numbers are allocated through GS1 membership. A generator only draws a symbol for a number you already own, and it cannot register or reserve a number for you.",
      },
    ],
  },

  "/uuid-generator": {
    route: "/uuid-generator",
    name: "UUID Generator",
    intro: [
      "A UUID, or universally unique identifier, is a 128-bit value written as 32 hexadecimal digits in five groups, for example 123e4567-e89b-42d3-a456-426614174000. Developers use them as database keys, file names, request IDs and test fixtures because they can be created anywhere, with no central counter, and still be treated as unique. This page produces version 4 UUIDs on demand and lists them so you can copy one or the whole batch.",
      "The controls are minimal on purpose. Generate Single UUID adds one value to the top of the list, while Generate 5 UUIDs and Generate 10 UUIDs add a batch at once. A counter shows how many are currently listed, each row has its own copy icon, and Copy All places the entire list on your clipboard, one UUID per line, ready to paste into a script, spreadsheet or seed file.",
    ],
    howItWorks: [
      "A version 4 UUID is mostly random. Of the 128 bits, 6 are fixed by the specification: four bits mark the version, which is why the first digit of the third group is always 4, and two bits mark the variant, which is why the first digit of the fourth group is always 8, 9, a or b. That leaves 122 random bits, or about 5.3 x 10^36 possible values. The page gets each value from crypto.randomUUID(), the browser's built-in function that applies these version and variant bits for you.",
      "Collision odds follow the birthday problem. With 122 random bits, generating one billion UUIDs gives a collision probability of roughly 9 x 10^-20, and you would need around 2.7 x 10^18 values before the chance of any duplicate reached 50 percent. Those numbers assume a good random source, and crypto.randomUUID() draws from the browser's cryptographically secure generator. Even so, a UUID is meant to be an identifier, not a credential, so avoid using one as the only protection for private data. Everything runs in your browser and nothing is sent to a server.",
    ],
    steps: [
      "Leave UUID Version on Version 4 (Random). It is the only option in the menu, and every value is generated to that format.",
      "Click Generate Single UUID, or the main Generate button, to add one new identifier at the top of the list.",
      "Click Generate 5 UUIDs or Generate 10 UUIDs when you need a batch. The list keeps only the newest 20 values, and single generation keeps the newest 10.",
      "Use the copy icon next to a row to copy that one UUID, or click Copy All to copy every listed value separated by line breaks.",
      "Press Clear All to empty the list and reset the Generated Count to zero before starting a fresh set.",
    ],
    example: {
      title: "Reading the structure of a generated UUID",
      text: "Take 9b2f6a14-3c5e-4d7a-8f10-5e2c91a7b3d6. The third group starts with 4, confirming version 4. The fourth group starts with 8, which falls in the allowed variant range of 8, 9, a or b. The remaining 122 bits are random. Written without hyphens it is 32 hex characters, which is 16 bytes. If you generate ten of these, the chance that any two match is so small, around 10^-35, that you can treat each as unique for practical purposes.",
    },
    useCases: [
      {
        title: "Database primary keys",
        text: "Create row IDs in application code before inserting, so several services can generate keys independently without asking the database for the next number.",
      },
      {
        title: "Test data and fixtures",
        text: "Paste a batch of IDs into JSON seeds, API mocks or unit tests where you need realistic unique values quickly and do not care which ones.",
      },
      {
        title: "Correlation and request IDs",
        text: "Tag log lines and API calls with a UUID so you can follow one request across several services when debugging.",
      },
      {
        title: "Unique file and upload names",
        text: "Name uploaded files with a UUID to avoid clashes between two users who both upload a file called photo.jpg.",
      },
    ],
    tips: [
      "Do not treat a UUID as a password or the sole secret behind a private link. It is built for uniqueness, and the fixed version and variant bits mean 6 of its 128 bits carry no randomness.",
      "Store UUIDs in a native uuid or binary column when the database offers one. Sixteen bytes is far smaller than the 36-character text form and compares faster.",
      "Remember that random v4 values do not sort by creation time. If you need ordered keys for index performance, look at time-based formats instead of v4.",
      "Treat the hyphens as formatting only. Many systems accept both the hyphenated and plain 32-character forms, but pick one form and use it consistently to avoid failed lookups.",
      "Copy the list before you leave or reload, because the page keeps values in memory only and clears them when the tab closes.",
    ],
    limitations:
      "Only version 4 is supported, so there is no time-based v1 or v7, no name-based v3 or v5, and no nil UUID. crypto.randomUUID() needs a modern browser and a secure (HTTPS or localhost) page. The list is capped, at 10 entries for single generation and 20 for batches, and the Generated Count shows only what is currently listed. There are no options for uppercase, braces or removing hyphens, and values are not saved between visits.",
    faqs: [
      {
        question: "Which UUID version does this tool create?",
        answer: "Version 4, the random kind. The Version menu offers only that choice. You can recognise it by the digit 4 at the start of the third group, for instance xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx.",
      },
      {
        question: "Can two generated UUIDs ever be the same?",
        answer: "In theory yes, in practice almost never. With 122 random bits, one billion UUIDs carry a collision chance near 9 x 10^-20. Duplicates are far more likely to come from copying a value twice than from the generator.",
      },
      {
        question: "Are these UUIDs safe to use as secret tokens?",
        answer: "They come from the browser's secure random generator, so they are unpredictable, but they are designed as identifiers. For access tokens, prefer a purpose-built token with more random bits, generated and checked on your server.",
      },
      {
        question: "What is the difference between a UUID and a GUID?",
        answer: "They are essentially the same 128-bit identifier. GUID is the term used mostly in Microsoft environments, and UUID is the name in the standard. Both are often written in the same 8-4-4-4-12 hexadecimal layout.",
      },
      {
        question: "Why is the list limited to a few values?",
        answer: "The page keeps the newest 10 values after a single generate and the newest 20 after a batch, to keep the list manageable. Copy All before generating more if you need to keep an earlier set.",
      },
      {
        question: "Does the page send my UUIDs anywhere?",
        answer: "No. Generation uses a small script running in your browser, and the list lives only in memory for the open tab. The only clipboard action happens when you press a copy button.",
      },
    ],
  },

  "/password-generator": {
    route: "/password-generator",
    name: "Password Generator",
    intro: [
      "This page builds a random password from the character types you select. A slider sets the length from 4 to 128 characters, four checkboxes turn on Uppercase, Lowercase, Numbers and Symbols, and the Generate Password button creates a new string each time. A Copy to Clipboard button puts the result on your clipboard, and a strength label under the password gives a quick, length-based rating.",
      "People reach for a generator because humans are poor at randomness. We reuse words, add a 1 or an exclamation mark at the end and swap a for @, and attackers know all these habits. A generated string has no pattern to guess. Used together with a password manager, a different long password for every account limits the damage when one website is breached.",
    ],
    howItWorks: [
      "The generator joins the selected character sets into one pool: 26 uppercase letters, 26 lowercase letters, 10 digits and 26 symbols from the list !@#$%^&*()_+-=[]{}|;:,.<>?. With every box ticked the pool has 88 characters. For each position it reads a 32-bit number from crypto.getRandomValues, the browser's cryptographically secure generator, and uses rejection sampling: values that would make some characters slightly more likely than others are thrown away and redrawn, so every character in the pool is equally likely. The page does not force at least one character from each ticked group. Everything happens in your browser and no password is sent anywhere.",
      "Strength is measured as entropy: length multiplied by log2 of the pool size. A 12-character password from 88 characters has about 77.5 bits, and the default 16 characters gives about 103.4 bits. Every extra character adds log2(88), roughly 6.5 bits, whereas adding a whole new character group raises that per-character figure only slightly. This is why length beats complexity: going from 12 to 16 characters adds more than 25 bits, far more than adding symbols to an 8-character password. The strength label on the page looks only at the length slider, not at which groups are ticked.",
    ],
    steps: [
      "Move the Length slider to the number of characters you want. It runs from 4 to 128 and starts at 16, with the current value shown beside it.",
      "Tick or untick Uppercase (A-Z), Lowercase (a-z), Numbers (0-9) and Symbols to match the rules of the site you are signing up to.",
      "Press Generate Password. The new string appears in the Generated Password panel in a monospaced font, with a Strength label beneath it.",
      "Click Copy to Clipboard and paste straight into the sign-up form or into your password manager. The button shows Copied for two seconds.",
      "Use Reset to return to 16 characters with all four character types enabled and to remove the current password from view.",
    ],
    example: {
      title: "Entropy for two different choices",
      text: "Compare a 12-character password drawn from all 88 characters with a 20-character one drawn only from lowercase letters. The first has 12 x log2(88), about 77.5 bits. The second has 20 x log2(26), about 94.0 bits. The longer, simpler password is stronger by roughly 16 bits, which means tens of thousands of times more guesses on average. The default setting of 16 characters from 88 gives about 103.4 bits, and each extra character adds another 6.5 bits.",
    },
    useCases: [
      {
        title: "New account sign-ups",
        text: "Generate a unique password for each website so a leak at one service cannot be replayed against your email or bank.",
      },
      {
        title: "Wi-Fi and router credentials",
        text: "Create a long passphrase-like string for guest networks. Disable Symbols if a device keyboard makes them hard to type.",
      },
      {
        title: "Service and test accounts",
        text: "Produce throwaway credentials for staging servers, demo users or databases in development environments.",
      },
      {
        title: "Replacing a weak old password",
        text: "After a breach notice, replace a reused password with a fresh random one and save it in a password manager immediately.",
      },
    ],
    tips: [
      "Prefer length over exotic symbols. Sixteen or more characters is a sensible default, and 20 or more is reasonable for accounts you cannot afford to lose.",
      "Never reuse a generated password across sites. One leak then exposes every account, and attackers routinely try leaked pairs on other services.",
      "Store the result in a password manager straight away. Writing it in a notes file or sending it by chat defeats the point of a random string.",
      "If a site rejects certain characters, untick Symbols and increase the length instead of shortening the password. Extra characters recover the lost entropy.",
      "Turn on two-factor authentication for important accounts. A strong password does not help if the account is reached by phishing or a reset flow.",
    ],
    limitations:
      "The randomness is secure, but a password shown on a web page can be seen by browser extensions or shoulder surfers, so for a master password consider a dedicated manager or a passphrase you can memorize. The tool does not guarantee that every ticked character group appears, has no option to exclude look-alike characters such as O and 0, offers no passphrase mode, and cannot check whether a password has appeared in a data breach. The Strength label is based only on length: under 8 is Weak, 8 to 11 Medium, 12 and over Strong. No password can be called unbreakable.",
    faqs: [
      {
        question: "Is the generated password truly random and secure?",
        answer: "It is drawn with crypto.getRandomValues, the browser's cryptographically secure generator, using rejection sampling so each character is equally likely. That does not make an account unbreakable, since phishing and reused passwords remain risks.",
      },
      {
        question: "Is my password stored or sent online?",
        answer: "No. The string is created by a script running in your browser and held only in the page's memory. Nothing is transmitted, though anything you copy sits on your clipboard until you replace it.",
      },
      {
        question: "How long should my password be?",
        answer: "For ordinary accounts use at least 16 characters. For email, banking and password manager access, 20 or more is a reasonable choice. Each character adds about 6.5 bits when all four groups are selected.",
      },
      {
        question: "Why does length matter more than symbols?",
        answer: "Entropy is length times log2 of the pool size. Doubling the length doubles the bits, while moving from letters-only to a pool including symbols raises log2 from about 4.7 to 6.5 per character, a much smaller gain.",
      },
      {
        question: "What does the Strength label mean?",
        answer: "It only checks the slider value: below 8 shows Weak, 8 to 11 Medium and 12 or more Strong. It does not examine which character types are ticked, so treat it as a rough guide and use the entropy figures above.",
      },
      {
        question: "Why does a site reject my generated password?",
        answer: "Some sites limit length or forbid certain symbols. Untick Symbols, or shorten the length to the maximum the site allows, then generate again. Prefer a longer password without symbols over a short one that has them.",
      },
    ],
  },

  "/name-generator": {
    route: "/name-generator",
    name: "Name Generator",
    intro: [
      "The Name Generator picks random names from built-in lists so you do not have to invent them. In the Name Category menu you can choose Male Names, Female Names, Fantasy Names, Fantasy Female Names or Tech Names, then use the slider to request between 1 and 50 names. The results appear as a numbered list that you can copy to the clipboard or download as a plain text file called names.txt.",
      "Writers use it for character sketches, game masters for non-player characters, developers for placeholder users in a test database and designers for realistic-looking mock-ups. It is a sampling tool rather than a naming consultant: it gives you a quick pool of candidates to react to, and you decide which feel right for your story, product or sample data.",
    ],
    howItWorks: [
      "Each category is a fixed array of about 30 to 40 names stored inside the page. When you press Generate Names, the script shuffles a copy of the list with Math.random, then takes names from the front, so within one run no name repeats until the list is used up. Randomness here is for variety only, and no security property depends on it. All of this happens in your browser, and no request is sent to a server.",
      "Because names come from a shuffled copy, a request of up to the list size gives all different entries. The Fantasy list has 30 names and the others have 40, so asking for 50 makes the page wrap around and reuse names in the same order. The Male list also contains Frank twice, so that one name can show up twice. The Male and Female lists are common English-language given names with no surnames, the Fantasy Female list is a set of invented names, and the Tech category is made of computing words such as Cache and Kernel used as ready-made handles.",
    ],
    steps: [
      "Open the Name Category menu and pick Male Names, Female Names, Fantasy Names, Fantasy Female Names or Tech Names.",
      "Drag the Number of Names slider between 1 and 50. The label shows the current count, and it starts at 5.",
      "Press Generate Names, or the main Generate button. The Generated Names panel lists the picks as a numbered list, and the Generated Count box shows how many were produced.",
      "Click Copy All to place the list on your clipboard, or Download to save it as names.txt with one name per line.",
      "Press Clear to empty the list and counter, then generate again for a different random selection.",
    ],
    example: {
      title: "Sampling five names from the Tech category",
      text: "Choose Tech Names, leave the slider at 5 and press Generate Names. One possible result is 1. Cache, 2. Vector, 3. Kernel, 4. Socket, 5. Shell. Because the list is shuffled before names are taken, all five differ. Pressing Generate Names again reshuffles and gives a fresh set, which may share a name or two with the first. The names carry no meaning beyond being tidy, memorable words.",
    },
    useCases: [
      {
        title: "Fiction and role-playing characters",
        text: "Generate a batch of Male, Female or Fantasy names, then pick a few that suit a villain, a shopkeeper or a party member and refine them by hand.",
      },
      {
        title: "Placeholder users in software",
        text: "Download a list of first names to fill demo accounts, contact lists or screenshots without using real people's details.",
      },
      {
        title: "Mock-ups and presentations",
        text: "Add believable names to dashboards, team charts or email mock-ups so a design review focuses on layout instead of lorem ipsum.",
      },
      {
        title: "Project and server codenames",
        text: "Use the Tech category as a starting pool for internal codenames, hostnames or sprint labels, then check for clashes before adopting one.",
      },
    ],
    tips: [
      "Keep requests at or below the list size, 30 for Fantasy and 40 for the rest, if you want every name distinct. Larger counts wrap around and repeat names.",
      "Combine a result with a surname or epithet you choose yourself. First names alone are generic, and a second part makes a character memorable.",
      "Check any name you plan to publish or register. This tool is for inspiration and does not check trademarks, domains or what a name means in other languages.",
      "For test data, avoid names that resemble real customers or staff. Pair generated names with clearly fake email domains so nothing is sent by accident.",
      "Treat every list as a starting point. The fantasy and tech words are generic suggestions, so adjust spelling or combine two results to make something distinctive.",
    ],
    limitations:
      "The lists are small, 30 to 40 names per category, and requests above the list size repeat names. There are no surnames, no full-name mode, no regional or non-English categories and no gender-neutral list. This is an entertainment and inspiration tool, not a baby-name guide or a trademark or domain checker, and results are not screened for meaning or cultural suitability. Output is plain text only.",
    faqs: [
      {
        question: "Can the same name appear twice in one list?",
        answer: "Rarely. Names are taken from a shuffled copy, so a run gives different names until the list is used up (30 for Fantasy, 40 for others). Beyond that count, or for Frank in the Male list, repeats can appear.",
      },
      {
        question: "Where do the names come from?",
        answer: "They come from fixed lists written into the page, 30 to 40 per category. Nothing is fetched from a server or an online database, and the tool does not learn or add names over time.",
      },
      {
        question: "Does the generator create surnames or full names?",
        answer: "No. The Male and Female categories return first names only, and the Fantasy and Tech categories return single words. Combine two results or add your own surname to make a full name.",
      },
      {
        question: "Can I use these names for a book, game or business?",
        answer: "Use them as inspiration. The lists are short, common names and generic words are not exclusive to anyone, and nothing here checks trademarks or domains. Search for any name you plan to publish or register.",
      },
      {
        question: "How do I save the generated names?",
        answer: "Press Copy All to put the list on the clipboard, or Download to get names.txt with one name per line. The list is not saved between visits and is cleared when you press Clear or leave the page.",
      },
      {
        question: "Is the choice truly random?",
        answer: "It uses Math.random to shuffle the list, which is more than adequate for picking names, though it is not a cryptographic source. Each name has an equal chance of landing in the first positions.",
      },
    ],
  },

  "/base64-converter": {
    route: "/base64-converter",
    name: "Base64 Converter",
    intro: [
      "Base64 is a way of writing arbitrary bytes using only 64 safe, printable characters, so that binary or unusual text can travel through systems built for plain text. This converter handles text in both directions. Choose Encode (Text to Base64) or Decode (Base64 to Text), paste your input, press the action button and read the result, along with its character count and size in bytes.",
      "You will meet Base64 in email attachments, data URLs, HTTP basic authentication headers, JSON web tokens and configuration files that embed small blobs. Developers decode it to see what a header or token contains, and encode strings when an API expects them in that form. Understanding what the format does, and what it does not do, prevents some real security mistakes.",
    ],
    howItWorks: [
      "The method is simple. Base64 reads input three bytes at a time, which is 24 bits, and splits those bits into four groups of six. Each six-bit value from 0 to 63 maps to one character in the alphabet A to Z, a to z, 0 to 9, plus and slash. Three bytes therefore become four characters, which is why encoded data is about one third larger than the original. If the input length is not a multiple of three, the equals sign is used as padding: one leftover byte yields two characters plus two equals signs, and two leftover bytes yield three characters plus one equals sign.",
      "This page first converts your text to UTF-8 bytes, using encodeURIComponent together with the browser's btoa function, so accented letters, symbols and emoji encode correctly. Decoding reverses the steps with atob and then interprets the bytes as UTF-8. If the bytes are not valid text, for example when the Base64 stands for an image or a compressed file, the page shows the message Invalid base64 string. All processing runs locally in your browser and nothing is uploaded. Most importantly, Base64 is encoding, not encryption: there is no key, and anyone can reverse it instantly.",
    ],
    steps: [
      "Select a mode with the radio buttons: Encode (Text to Base64) or Decode (Base64 to Text). The label above the input box changes to match your choice.",
      "Type or paste your content into the large text area. In encode mode this is ordinary text, and in decode mode it must be a Base64 string.",
      "Press the Encode or Decode button. If the box is empty you will see the message Please enter text, and an invalid Base64 string shows Invalid base64 string.",
      "Read the result in the Result panel, where the Character Count and Size Bytes boxes show the length of the output.",
      "Click Copy Output to place the result on your clipboard, or Reset to clear the input, output and any error message.",
    ],
    example: {
      title: "Encoding the word Hello",
      text: "The string Hello is five bytes: 72, 101, 108, 108, 111. The first three bytes (Hel) become four characters, SGVs. The remaining two bytes (lo) are only 16 bits, so they produce three characters, bG8, followed by one equals sign as padding. The final output is SGVsbG8=. Pasting that back in Decode mode returns Hello. As a second check, the three-byte string Hi! encodes to exactly four characters, SGkh, with no padding at all.",
    },
    useCases: [
      {
        title: "Inspecting an Authorization header",
        text: "HTTP basic authentication sends username:password as Base64. Decoding the value shows exactly what is being transmitted, which also shows why that header needs HTTPS.",
      },
      {
        title: "Reading parts of a token",
        text: "The payload section of a JSON web token is Base64-style text. Decode it to see claims such as expiry, keeping in mind that the URL-safe variant may need minor changes first.",
      },
      {
        title: "Embedding small text in configuration",
        text: "Some configuration systems, such as Kubernetes secrets, store values as Base64. Encode a value for a manifest or decode one to check what it holds.",
      },
      {
        title: "Debugging unreadable API fields",
        text: "When a response contains a long string of letters ending in equals signs, decode it to find out whether it is text, JSON or binary data.",
      },
    ],
    tips: [
      "Never treat Base64 as protection. Passwords, API keys and personal data that are only Base64-encoded can be read by anyone who has them, so use real encryption for secrets.",
      "Watch for padding. Strings that end in one or two equals signs are normal, and stripping them can break strict decoders, although some tolerate their absence.",
      "Expect size growth of about 33 percent. Four output characters per three input bytes adds up when you embed large values in URLs or JSON.",
      "Make sure the whole string was copied, with no extra spaces or line breaks inside it. A single missing character can shift every group that follows.",
      "If decoding fails, check whether the data is URL-safe Base64, which swaps plus and slash for hyphen and underscore. Convert those characters back before decoding.",
    ],
    limitations:
      "This converter works on text only. It does not accept file uploads, so decoding the Base64 of an image, PDF or archive will fail with an Invalid base64 string message because the bytes are not valid UTF-8 text; a separate image tool is needed for that. It uses the standard alphabet with plus, slash and equals padding and has no URL-safe option. Unicode handling relies on the older escape and unescape functions combined with btoa and atob, which work in current browsers but are deprecated. There are no line-wrapping settings. Very large inputs may slow the browser, and the byte count shown reflects the output text, not the original data.",
    faqs: [
      {
        question: "Is Base64 a form of encryption?",
        answer: "No. It is a reversible encoding with no key or secret. Anyone can decode it in seconds, as this page shows. Never rely on it to hide passwords, tokens or personal information.",
      },
      {
        question: "Why does my Base64 string end with equals signs?",
        answer: "They are padding. Base64 works on groups of three bytes, so when the input length is not a multiple of three, one or two equals signs fill the final group to four characters. Hello ends with one.",
      },
      {
        question: "Why is the encoded output larger than the input?",
        answer: "Every three bytes become four characters, an increase of about one third. A 300-byte text becomes 400 characters. The extra size is the cost of using only 64 safe, printable characters.",
      },
      {
        question: "Does this tool handle accents and emoji?",
        answer: "Yes. Text is converted to UTF-8 bytes before encoding, so Cafe with an accent or an emoji round-trips correctly. For example, Café followed by a space and a coffee-cup symbol encodes to Q2Fmw6kg4piV.",
      },
      {
        question: "Why do I get Invalid base64 string?",
        answer: "The input may contain characters outside the standard alphabet, be truncated, use the URL-safe variant, or decode to bytes that are not valid text, such as an image. Check for stray characters and missing padding.",
      },
      {
        question: "Is my text uploaded when I convert it?",
        answer: "No. Encoding and decoding use functions built into your browser, so the text stays on your device. The only transfer is when you copy the result, and that goes to your own clipboard.",
      },
    ],
  },
};
