import './style.css';
import {
  MapInizialized, MapSetView, BaseMapLayer,
  MapFullScreen, MapScaleLine, vectorsLayer
} from './directopenlayers';

const mapCanvas = new MapInizialized('map');
const mapCanvasView = new MapSetView(14.350, 40.905, 5);
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
  20, 4, 13
);
mapCanvas.addLayer(renderPointData);
pointData.lockToExtent(100, 100, 100, 100);
