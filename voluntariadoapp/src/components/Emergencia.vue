
<template>

<div class="container">
  <div class="form-group">
    <input type="text" id="nombre" name="nombre" placeholder="Nombre.." v-model='nombre'> <br>
    <input type="text" id="descripcion" name="descripcion" placeholder="Descripcion de la emergencia.." v-model='descripcion'><br>
    <date-picker v-model="finicio" value-type="format" ></date-picker> <br>
    <date-picker v-model="ffin" value-type="format" ></date-picker> <br><br>
    <input type="radio" id="Institucion 1" value="1" v-model="id_institucion"> Institucion 1
    <input type="radio" id="Institucion 2" value="2" v-model="id_institucion">Institucion 2
    <input type="radio" id="Institucion 3" value="3" v-model="id_institucion">Institucion 3
    <input type="radio" id="Institucion 4" value="4" v-model="id_institucion">Institucion 4
    <input type="radio" id="Institucion 5" value="5" v-model="id_institucion">Institucion 5 
    <br> <br>
    <input type="radio" id="Estado 0" value="0" v-model="id_estado">Estado 1
    <input type="radio" id="Estado 1" value="1" v-model="id_estado">Estado 2
    <input type="radio" id="Estado 3" value="2" v-model="id_estado">Estado 3
    <br> <br>
       
   



  

    
    
      
  
  
  </div>
  <div style="height: 500px; width: 100%">
    <div style="height: 200px overflow: auto;">
     <!-- <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p> -->
      <h6><p>Coordenadas ingresadas ({{ currentCenter.lat}}, {{ currentCenter.lng}}) Con un zoom de: {{ currentZoom }}</p>
      </h6>
      
      <button class="btn btn-primary" v-on:click="register">Registrar emergencia</button>
     

     
    </div>
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 80%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker :lat-lng="withPopup">
        <l-popup>
          <div @click="innerClick">
            I am a popup
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-popup>
      </l-marker>
      <l-marker :lat-lng="withTooltip">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          <div @click="innerClick">
            I am a tooltip
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import axios from "axios"
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
     DatePicker
  },
  data() {   
    return {
      nombre:'',
      descripcion:'',
      finicio:null,
      ffin:null,
      id_institucion:null,
      id_estado:null,
    



      zoom: 13,
      center: latLng(-33.2902002, -70.8917727 ),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(47.41322, -1.219482),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },

          register: function (){
            axios.post('http://localhost:8081/emergency', {
              longitude: this.currentCenter.lat,
              latitude:this.currentCenter.lng,
              nombre:this.nombre,
              descrip:this.descripcion,
              finicio:this.finicio,
              ffin:this.ffin,
              id_institucion:this.id_institucion,
              id_estado:this.id_estado
            
        
            })
            .then(Response => {
              console.log(Response.data);
            })
            .catch(err =>{
              console.log(err);
            })

          },
        innerClick() {
      alert("Click!");
    }
  }
};
</script>

