# Vectors

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
          MapScaleLine, MapFullScreen, vectorsLayer
        } from './directopenlayers';

        MapInizialized('map');
        MapSetView(14.3505090717191, 40.9230084648239, 13);
        MapScaleLine();
        MapFullScreen();
        const basemap = new BaseMapLayer('Test');
        const osm = basemap.createOSMStandard();
        map.addLayer(osm);
        const polygonData = new vectorsLayer(
          'polygon',
          'https://massimilianomoraca.it/api/geomedia/istat/',
          'Polygons'
        );
        const renderPolygonData = polygonData.createVector('rgba(49,130,189,1.0)', null, null, 4, 'rgba(255,0,0,0.5)');
        map.addLayer(renderPolygonData)
