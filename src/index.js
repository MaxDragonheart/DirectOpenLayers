import './style.css';
import {MapInizialized, MapSetView, BaseMapLayer} from './directopenlayers';

MapInizialized('map');
MapSetView(0.0, 0.0, 0);

const basemap = new BaseMapLayer('Test');
const osm = basemap.createOSMStandard();
map.addLayer(osm);
