import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';


Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/';

class LeatfletMap extends React.Component {
  render() {
    return (
      <div>
        <Map center={[0,0]} zoom={13} style={{ width: this.props.width, height: this.props.height }}>
          <HeatmapLayer
          fitBoundsOnLoad
          fitBoundsOnUpdate
          points={this.props.data}
          longitudeExtractor={m => m[1]}
          latitudeExtractor={m => m[0]}
          intensityExtractor={m => parseFloat(m[2])} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        </Map>
      </div >
      
        );
  }
}
export default LeatfletMap;

