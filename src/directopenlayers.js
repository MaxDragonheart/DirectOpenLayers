/* Based on OpenLayers 6 */
import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import {fromLonLat} from 'ol/proj';




export function MapInizialized(mapTarget) {
  /*
  This function initialize the map
  mapTarget: string. It is the id of the div that contain the map.
  */
  map = new Map({
    target: mapTarget
  });

  return map;
};

let view;
export function MapSetView(longitude, latitude, zoomLevel, setMaxZoom, setMinZoom) {
  /*
  This function define the initial view of the map.
  longitude: decimal. It is the longitude of the initial center of the map.
  latitude: decimal. It is the latitude of the initial center of the map.
  zoomLevel: decimal. It is the inizial zoom of the map.
  setMaxZoom: decimal. It is the max zoom of the map.
  setMinZoom: decimal. It is the min zoom of the map.
  */

  view = new View({
    center: fromLonLat([longitude, latitude]),
    zoom: zoomLevel,
    maxZoom: setMaxZoom,
    minZoom: setMinZoom
  });
  map.setView(view);

  return view;
};

export function BaseMapLayer(baseMapName) {
  /*
  This function define the base map.
  It is possibile to create an empty map or a Tile based on OSM.
  baseMapName: string. It is the name of the Tile.
  */

  this.baseMapName = baseMapName;

  let empty;
  let osm;

  return {

    'createEmpty': function() {
      const empty = new ol.layer.Tile({
        title: 'Empty Map',
        source: new XYZ(),
        zIndex: 0
      });
      return empty;
    },

    'createOSMStandard': function() {
      let osm = new TileLayer({
        title: baseMapName,
        source: new OSM(),
        zIndex: 0
      });
      return osm;
    }

  }
};
