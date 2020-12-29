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
        import {MapInizialized, MapSetView, BaseMapLayer, MapScaleLine, MapFullScreen} from './directopenlayers';

        MapInizialized('map');
        MapSetView(0.0, 0.0, 0);
        MapScaleLine();
        MapFullScreen();
        const basemap = new BaseMapLayer('Test');
        const osm = basemap.createOSMStandard();
        map.addLayer(osm);
