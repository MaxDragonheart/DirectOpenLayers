import './style.css';
import {MapInizialized, MapSetView, BaseMapLayer, MapScaleLine, MapFullScreen} from './directopenlayers';

MapInizialized('map');
MapSetView(0.0, 0.0, 0);
MapScaleLine();
MapFullScreen();
const basemap = new BaseMapLayer('Test');
const osm = basemap.createOSMStandard();
map.addLayer(osm);
