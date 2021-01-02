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

        const mapCanvas = new MapInizialized('map');
        const mapCanvasView = new MapSetView(14.350, 40.905, 15);
        const fullScreen = new MapFullScreen();
        const scaleLine = new MapScaleLine();
        const basemap = new BaseMapLayer('Test');
        const osm = basemap.createOSMStandard();
        mapCanvas.addLayer(osm);

        const pointData = new vectorsLayer(
          'point',
          'https://massimilianomoraca.it/api/geomedia/attention-points/',
          'Points'
        )
        const renderPointData = pointData.createVector(
          'rgba(255,0,0,0.5)', null, null, 2, 'rgba(49,130,189,1.0)',
          20, 14, 4
        );
        mapCanvas.addLayer(renderPointData);

        const lineData =  new vectorsLayer(
          'LINESTRING',
          'https://massimilianomoraca.it/api/geomedia/confine-casalnuovo/',
          'Lines'
        );
        const renderLineData = lineData.createVector(
          'rgba(255,0,255,1.0)', null, null, 4, null,
          13, 0, 3
        );
        mapCanvas.addLayer(renderLineData);

        const polygonData = new vectorsLayer(
          'polygon',
          'https://massimilianomoraca.it/api/geomedia/istat/',
          'Polygons'
        );
        const renderPolygonData = polygonData.createVector(
          'rgba(49,130,189,1.0)', null, null, 0.5, 'rgba(255,0,0,0.5)',
          20, 13, 2
        );
        mapCanvas.addLayer(renderPolygonData)
