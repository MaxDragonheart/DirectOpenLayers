import './style.css';
import {
  MapInizialized, MapSetView, BaseMapLayer,
  MapFullScreen, MapScaleLine, vectorsLayer
} from './directopenlayers';

const mapCanvas = new MapInizialized('map');
const mapCanvasView = new MapSetView(0.0, 0.0, 0);
const fullScreen = new MapFullScreen();
const scaleLine = new MapScaleLine();
const basemap = new BaseMapLayer('Test');
const osm = basemap.createOSMStandard();
mapCanvas.addLayer(osm);
const polygonData = new vectorsLayer(
  'polygon',
  'https://massimilianomoraca.it/api/geomedia/istat/',
  'Polygons'
);
const renderPolygonData = polygonData.createVector('rgba(49,130,189,1.0)', null, null, 4, 'rgba(255,0,0,0.5)');
mapCanvas.addLayer(renderPolygonData)
