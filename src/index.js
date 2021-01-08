import './style.css';
import {
  MapInizialized, MapSetView, BaseMapLayer,
  wfsLayer
} from './directopenlayers';

const mapCanvas = new MapInizialized('map');
const mapCanvasView = new MapSetView(0, 90, 4);
const basemap = new BaseMapLayer('OSM');
const osm = basemap.createOSMStandard();
mapCanvas.addLayer(osm);

const wfsData = new wfsLayer(
  'POLYGON',
  'Buildings'
);
const vector = wfsData.createWFSLayer(
  'https://gis.massimilianomoraca.it/geoserver/MassimilianoMoraca/wfs',
  'geomedia_edificicasalnuovo',
  'rgba(0, 0, 255, 1.0)',
  null,
  null,
  0.5,
  'rgba(0, 255, 0, 1.0)'
);
mapCanvas.addLayer(vector);
wfsData.zoomToExtent(50, 50, 50, 50, 5000);
