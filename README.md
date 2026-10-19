# Weather Forecast

A simple browser-based weather app for looking up a location and viewing its daily forecast. It shows the resolved address, coordinates, a weather summary, and each day's high, low, and average temperature with a condition icon. Weather data is provided by the Visual Crossing Weather API.

## Run the app

The project uses plain HTML, CSS, and JavaScript and has no build step or package installation. Serve the project directory over HTTP (rather than opening the HTML file directly). For example, with Python installed, run:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/Index.html> in your browser. You can also use the VS Code Live Server extension.

## Use

1. Enter a city or other location in the search field.
2. Select **search** to load the location's forecast.
3. Select **Switch** to choose Celsius or Fahrenheit, then search again to fetch the forecast in the selected unit.

The page displays an error message if the location cannot be found or the request fails. An internet connection is required to load the weather data and Bootstrap stylesheet.

## API key

The Visual Crossing API key is currently embedded in `index.js`, which means it is visible to anyone using the page. Do not use a private key this way in a deployed app. Rotate the key if it should no longer be public; for production, send API requests through a server that keeps the key private.

## Project files

- `Index.html` — page structure and stylesheet/script references.
- `index.css` — page styling and layout.
- `index.js` — weather API request, forecast rendering, unit selection, and weather icons.
- `cloudy.png`, `rainy.png`, `sunny.png`, `thunder.png` — weather image assets.
