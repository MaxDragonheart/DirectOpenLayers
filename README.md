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

      MapInizialized('map');
      MapSetView(0.0, 0.0, 0);

      const basemap = new BaseMapLayer('Test');
      const osm = basemap.createOSMStandard();
      map.addLayer(osm);


## Dependencies

    npm install webpack webpack-cli --save-dev
    npm install --save-dev style-loader css-loader
    npm install --save-dev html-webpack-plugin
    npm install --save-dev clean-webpack-plugin
    npm install ol
