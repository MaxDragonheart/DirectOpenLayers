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

## Examples

- [Quick Start](https://maxdragonheart.github.io/DirectOpenLayers/docs/1-quick-start/index.html)
- [Full Screen and Scale Line](https://maxdragonheart.github.io/DirectOpenLayers/docs/2-fullscreen-and-scaleline/index.html)
- [Vectors](https://maxdragonheart.github.io/DirectOpenLayers/docs/3-add-vectors/index.html)
- [Zoom on vector source](https://maxdragonheart.github.io/DirectOpenLayers/docs/4-zoom-on-vector-source/index.html)
- [Lock to extent](https://maxdragonheart.github.io/DirectOpenLayers/docs/5-lock-to-extent/index.html)
- [Points' clusters](https://maxdragonheart.github.io/DirectOpenLayers/docs/6-points-clusters/index.html)
- [Manage WMS Source](https://maxdragonheart.github.io/DirectOpenLayers/docs/7-wms-source/index.html)

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
