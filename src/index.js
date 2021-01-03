import './style.css';
import {
  MapInizialized, MapSetView, BaseMapLayer,
  MapFullScreen, MapScaleLine, vectorsLayer
} from './directopenlayers';

const mapCanvas = new MapInizialized('map');
const mapCanvasView = new MapSetView(14.350, 40.905, 3);
const basemap = new BaseMapLayer('OSM');
const osm = basemap.createOSMStandard();
mapCanvas.addLayer(osm);

const pointData = new vectorsLayer(
  'point',
  'https://massimilianomoraca.it/api/geomedia/random-points/',
  'Points'
);
const renderPointData = pointData.createCluster(
  50, 'rgba(192,0,0,1.0)', 'rgba(255,128,0,1.0)', 'rgba(0,128,0,1.0)',
  'rgba(0,0,255,1.0)', 'rgba(255,255,255,0.5)', 0, 0,
  5, 'rgba(255,255,255,1.0)', 18, 0,
  99
);
mapCanvas.addLayer(renderPointData);
pointData.zoomOnCluster(100, 100, 100, 100, 5000);
