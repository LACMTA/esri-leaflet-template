// svg plugin
// https://github.com/hiasinho/Leaflet.vector-markers

const apiKey = "AAPKc66f8690d8d2454d963dd7c12cdab9e8c5dqRerctjfPU5vLx9roiusqv3FdffU1X3eU934Ynqc8mUXiFrY_Ku9efOhg7j6X";

// https://lametro.maps.arcgis.com/home/item.html?id=3e8ed9ba7e8b47d2a4adbad44c9fa635
const vectorBasemapId = '3e8ed9ba7e8b47d2a4adbad44c9fa635';
const vectorBasemap = 'https://tiles.arcgis.com/tiles/TNoJFjk1LsD45Juj/arcgis/rest/services/Hybrid_Vector_tile_Map/VectorTileServer';

// https://lametro.maps.arcgis.com/home/item.html?id=9cdfb642ece140f79cca0b85fd44ede6
const rasterBaseMap = 'https://tiles.arcgis.com/tiles/TNoJFjk1LsD45Juj/arcgis/rest/services/basemap_1/MapServer';

// https://lametro.maps.arcgis.com/home/item.html?id=533d93cc415e48ac9cc179461cf4e9b0
const railLinesLayer = 'https://tiles.arcgis.com/tiles/TNoJFjk1LsD45Juj/arcgis/rest/services/Hybrid_Raster_tile_Map/MapServer';

// https://lametro.maps.arcgis.com/home/item.html?id=1d5f6c3de4d7488d8381508d725f6944
const kLineLayer = 'https://services8.arcgis.com/TNoJFjk1LsD45Juj/arcgis/rest/services/Crenshaw_LAX/FeatureServer/1';

// https://lametro.maps.arcgis.com/home/item.html?id=999c86a275854e71b00e5787f6e8df6d&sublayer=0
const kLineStationsLayer = 'https://services8.arcgis.com/TNoJFjk1LsD45Juj/arcgis/rest/services/K_Line_Stations/FeatureServer/0';

const map = L.map("map", {
    minZoom: 2
}).setView([33.97, -118.365], 13);

const icon = L.icon({
    iconUrl: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
    iconSize: [18, 18]
    });

L.esri.tiledMapLayer({url: rasterBaseMap}).addTo(map);

// This vector layer is triggering mapbox-gl errors
// L.esri.Vector.vectorBasemapLayer(baseVectorLayerId, {
//   apiKey: apiKey
// })
// .addTo(map);

// L.esri.tiledMapLayer({
//   url: railLinesLayer
// }).addTo(map);

let kline = L.esri
    .featureLayer({
        url: kLineLayer,
        style: (feature) => {
          // let color = feature.properties.Name == "K Line" ? feature.properties.Color : "#888888";
          let color = feature.properties.Color;
          let weight = feature.properties.Weight;
          let dashArray = feature.properties.LinePattern;
          
          // this is a hack to get the line to be dashed because the line pattern is not working
          if (dashArray == "4 1"){
            dashArray = "4 10"
          } 
          return {
            color: color,
            weight: weight,
            dashArray: `${dashArray}`
          };
        }
    })
    .addTo(map);

const kline_stations = L.esri
    .featureLayer({
      url: kLineStationsLayer,
      pointToLayer: (geojson, latlng) => {
        return L.marker(latlng, {
          icon: new L.DivIcon({
            className: 'station-icon',
            iconSize: null,
            html: `
            <div class="station-icon-wrapper">
              <div class="station-label">${geojson.properties.Station}</div>
              <svg id="svgelem" height="15" width="15" stroke="black" fill="white" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="7" r="5" stroke-width="2.5"/>
              </svg>
            </div>
            `,
            })
        });
      }
    })
    .addTo(map);

