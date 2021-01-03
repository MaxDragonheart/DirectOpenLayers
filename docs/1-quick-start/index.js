import './style.css';
import {MapInizialized, MapSetView, BaseMapLayer} from './directopenlayers';

const mapCanvas = new MapInizialized('map');
const mapCanvasView = new MapSetView(0.0, 0.0, 0);

const basemap = new BaseMapLayer('OSM');
const osm = basemap.createOSMStandard();
mapCanvas.addLayer(osm);
