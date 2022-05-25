// svg plugin
// https://github.com/hiasinho/Leaflet.vector-markers

const baseTileLayerUrl = 'https://tiles.arcgis.com/tiles/TNoJFjk1LsD45Juj/arcgis/rest/services/Hybrid_Raster_tile_Map/MapServer';
const railLinesLayer = 'https://tiles.arcgis.com/tiles/TNoJFjk1LsD45Juj/arcgis/rest/services/Hybrid_Vector_tile_Map/VectorTileServer';



const apiKey = "AAPKc66f8690d8d2454d963dd7c12cdab9e8c5dqRerctjfPU5vLx9roiusqv3FdffU1X3eU934Ynqc8mUXiFrY_Ku9efOhg7j6X";

const map = L.map("map", {
    minZoom: 2
}).setView([33.97, -118.365], 13);

const icon = L.icon({
    iconUrl: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
    iconSize: [18, 18]
    });

L.esri.tiledMapLayer({
    url: baseTileLayerUrl
}).addTo(map);

L.esri.Vector.vectorBasemapLayer(railLinesLayer,{
  "apiKey": apiKey
})
.addTo(map);

let kline = L.esri
    .featureLayer({
        url: "https://services8.arcgis.com/TNoJFjk1LsD45Juj/arcgis/rest/services/Crenshaw_LAX/FeatureServer/0",
        style: (feature) => {
          return {
            color: "#E470AA",
            weight: "10",
          };
        }
    })
    .addTo(map);

const kline_stations = L.esri
    .featureLayer({
      url: "https://services8.arcgis.com/TNoJFjk1LsD45Juj/arcgis/rest/services/K_Line_Stations/FeatureServer/0",
      pointToLayer: (geojson, latlng) => {
        let station_icon = "https://raw.githubusercontent.com/LACMTA/engagement-tool/main/svg/station-01-ec-ws.svg"
        return L.marker(latlng, {
          icon: new L.DivIcon({
            html: `<div></div>`
            })
        });
      }
    })
    .addTo(map);


// Colort icon:
// Width: 6
// color:   #e470aa
// :Expo/Crensha w station
// https://raw.githubusercontent.com/LACMTA/engagement-tool/main/svg/station-01-ec-ws.svg
// */

