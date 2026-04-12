# Todo Chrome Extension

A lightweight Chrome extension built using React and Vite that allows users to manage tasks directly from the browser popup.

---

## Overview

This extension provides a simple interface for creating, updating, and managing tasks. It uses the Chrome Storage API to persist data and is designed for fast performance with minimal UI complexity.

---

## Features

* Add, edit, and delete tasks
* Persistent storage using Chrome Storage API
* Responsive and minimal user interface

---

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd chrome-extension
npm install
```

---

## Development

Start the development server:

```bash
npm run dev
```

---

## Build

Generate a production build:

```bash
npm run build
```

The build output will be available in the `dist/` directory.

---

## Load the Extension in Chrome

1. Run the build command:

```bash
npm run build
```

2. Open Chrome and navigate to:

```
chrome://extensions
```

3. Enable Developer Mode.

4. Click "Load unpacked".

5. Select the `dist/` folder.

---

## Testing

This project uses Jest and React Testing Library.

Run tests using:

```bash
npm test
```

### Coverage includes:

* Popup UI rendering
* Custom hook logic (`useTasks`)
* Background script initialization
* Chrome API mocking

---

## Project Structure

```
├── README.md
├── __mocks__/
│   └── chrome.js
├── babel.config.cjs
├── jest.config.cjs
├── jest.setup.js
├── package.json
├── package-lock.json
├── public/
│   ├── icons/
│   └── manifest.json
├── src/
│   ├── background/
│   │   ├── background.js
│   │   └── background.test.js
│   ├── popup/
│   │   ├── Popup.jsx
│   │   ├── Popup.test.jsx
│   │   ├── hooks/
│   │   │   ├── useTasks.js
│   │   │   └── useTasks.test.js
│   ├── styles/
│   └── utils/
│       ├── storage.js
│       └── storage.test.js (recommended)
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── index.html
```

---

## Scripts

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start development server       |
| `npm run build`   | Build extension for production |
| `npm run preview` | Preview production build       |
| `npm test`        | Run test suite                 |

---

## Contributing

Contributions are welcome. Please fork the repository and submit a pull request with your changes.

---

## Tech Stack

* React
* Vite
* Tailwind CSS
* Jest
* React Testing Library
