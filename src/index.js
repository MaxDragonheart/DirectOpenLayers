import './style.css';
import {
  MapInizialized, MapSetView, BaseMapLayer,
  wmsLayer
} from './directopenlayers';

const mapCanvas = new MapInizialized('map');
const mapCanvasView = new MapSetView(14.425, 40.825, 13);
const basemap = new BaseMapLayer('OSM');
const osm = basemap.createOSMStandard();
mapCanvas.addLayer(osm);

const wmsTestSource = new wmsLayer(
  'Sentinel 2, B12',
  'https://gis.massimilianomoraca.it/geoserver/MassimilianoMoraca/wms'
);
const wmsTest = wmsTestSource.createWMSLayer(
  'wildfires_20170712',
  null,
  16,
  10,
  0
);
mapCanvas.addLayer(wmsTest);
