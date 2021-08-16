import React from 'react'
import {MapContainer as LeafleMap,TileLayer} from "react-leaflet";
import "./Map.css"
import {showDataOnMap} from "./util"


function Map({countries,casesType,center,zoom}) {
    return (
      <div className="map">
        <LeafleMap center={center} zoom={zoom}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {showDataOnMap(countries,casesType)}
        </LeafleMap>
      </div>
    );        
}

export default Map



//  url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
//  attribution =
//    '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';