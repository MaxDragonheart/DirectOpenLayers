# DirectOpenLayers

## Introduction

This library is a small project usefull to simplify the way to create a map based on [OpenLayers](https://openlayers.org/).

As example, below the comparison between quick start from OpenLayers and DirectOpenLayers:

**OpenLayers**

      import 'ol/ol.css';
      import {Map, View} from 'ol';
      import TileLayer from 'ol/layer/Tile';
      import OSM from 'ol/source/OSM';

      const map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: [0, 0],
          zoom: 0
        })
      });

**DirectOpenLayers**

      import './style.css';
      import {MapInizialized, MapSetView, BaseMapLayer} from './directopenlayers';

      const mapCanvas = new MapInizialized('map');
      const mapCanvasView = new MapSetView(0.0, 0.0, 0);

      const basemap = new BaseMapLayer('Test');
      const osm = basemap.createOSMStandard();
      mapCanvas.addLayer(osm);

[DirectOpenLayers](src/directopenlayers.js) now is in beta version. His [license](LICENSE) is inheritaded from OL.
Who would like to contribute to the maintance of this library is welcome :)

## Example

- [Quick Start](https://maxdragonheart.github.io/DirectOpenLayers/docs/1-quick-start/index.html)
- [Full Screen and Scale Line](docs/guide/2-fullscreen-scaleline.md)
- [Vectors](docs/guide/3-vectors.md)
- [Zoom to](docs/guide/4-zoom-to.md)

## Dependencies

    npm init
    npm install webpack webpack-cli --save-dev
    npm install --save-dev style-loader css-loader
    npm install --save-dev html-webpack-plugin
    npm install --save-dev clean-webpack-plugin
    npm install --save-dev webpack-dev-server
    npm install ol

### Try it!

Use the code from example and past it on `index.js` and `template.html`
Start server with `npm start`
