# Todo Chrome Extension

A simple **Todo Chrome Extension** built with **React** and **Vite**.
This extension allows users to manage their tasks directly from the browser popup.

---

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

---

## Development

Start the development server:

```bash
npm run dev
```

Vite will start a local development server and provide a preview URL.

---

## Build

To create a production build:

```bash
npm run build
```

The optimized extension build will be generated in the **`dist`** folder.

---

## Load the Extension in Chrome

1. Build the project:

```bash
npm run build
```

2. Open Chrome and go to:

```
chrome://extensions
```

3. Enable **Developer Mode** (top right).

4. Click **Load unpacked**.

5. Select the **`dist`** folder.

The extension will now appear in your browser.

---

## Project Structure

```
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── icons
│   │   ├── todoIcon128.png
│   │   ├── todoIcon24.png
│   │   ├── todoIcon48.png
│   │   └── todoicon128Full.jpg
│   └── manifest.json
├── src
│   ├── background
│   │   └── background.js
│   ├── main.jsx
│   ├── popup
│   │   ├── Popup.jsx
│   │   ├── components
│   │   ├── constants
│   │   └── hooks
│   ├── styles
│   │   └── globals.css
│   └── utils
│       └── storage.js
├── structure.txt
├── tailwind.config.js
└── vite.config.js


```

---

## Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Starts the Vite development server  |
| `npm run build`   | Builds the extension for production |
| `npm run preview` | Preview the production build        |
| `npm run format`  | Format the code                     |

---

## Contributing

Contributions are welcome.
Feel free to fork the repository and submit a pull request with improvements.
