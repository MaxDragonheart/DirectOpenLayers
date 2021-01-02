# Full Screen and Scale Line

## HTML
        <!doctype html>
        <html lang="en">
          <head>
          </head>
          <body>
            <div id="map" class="map"></div>
          <script src="main.js"></script></body>
        </html>


## JavaScript
        import './style.css';
        import {
          MapInizialized, MapSetView, BaseMapLayer,
          MapFullScreen, MapScaleLine
        } from './directopenlayers';

        const mapCanvas = new MapInizialized('map');
        const mapCanvasView = new MapSetView(0.0, 0.0, 0);
        const fullScreen = new MapFullScreen();
        const scaleLine = new MapScaleLine();
        const basemap = new BaseMapLayer('Test');
        const osm = basemap.createOSMStandard();
        mapCanvas.addLayer(osm);
