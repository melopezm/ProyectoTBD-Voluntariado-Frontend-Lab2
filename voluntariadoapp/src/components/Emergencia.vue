
<template>

<div class="container">
  <h1>Registro de emergencias</h1>
  <div class="form-group">
    <input type="text" id="nombre" name="nombre" placeholder="Nombre de la emergencia.." v-model='nombre'> <br>
    <input type="text" id="descripcion" name="descripcion" placeholder="Descripcion de la emergencia.." v-model='descripcion'><br>
    <h6>Inicio<date-picker v-model="finicio" value-type="format" ></date-picker> 
     Termino<date-picker v-model="ffin" value-type="format" ></date-picker> <br>
    <div class="row">
    <input type="radio" id="Institucion 1" value="1" v-model="id_institucion">Institucion 1<br>
    <input type="radio" id="Institucion 2" value="2" v-model="id_institucion">Institucion 2<br>
    <input type="radio" id="Institucion 3" value="3" v-model="id_institucion">Institucion 3<br>
    <input type="radio" id="Institucion 4" value="4" v-model="id_institucion">Institucion 4<br> <br> <br>
    <input type="radio" id="Institucion 5" value="5" v-model="id_institucion">Institucion  5<br>
    <br> <br>
    </div></h6>
    
       
   



  

    
    
      
  
  
  </div>
  <div style="height: 500px; width: 100%">
    <div style="height: 200px overflow: auto;">
     <!-- <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p> -->
     
     

     
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
     <h6><p>Coordenadas ingresadas ({{ currentCenter.lat}}, {{ currentCenter.lng}}) Con un zoom de: {{ currentZoom }}</p>
      </h6>
      
      <button class="btn btn-primary" v-on:click="register">Registrar emergencia</button>
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
      id_estado:'0',
    



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
              longitude: this.currentCenter.lng,
              latitude:this.currentCenter.lat,
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

<style scoped >
html{
  font-size: 150px;
}


input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

label {
  font : .8em "typewriter", sans-serif;
}

input, textarea {
  font    : .9em/1.5em "handwriting", sans-serif;

  border  : none;
  padding : 0 10px;
  margin  : 0;
  width   : 240px;

  background: none;
}
input:focus, textarea:focus {
  background   : rgba(0,0,0,.1);
  border-radius: 5px;
  outline      : none;
}

input {
    height: 2.5em; /* for IE */
    vertical-align: middle; /* This is optional but it makes legacy IEs look better */
}

textarea {
  display : block;

  padding : 10px;
  margin  : 10px 0 0 -10px;
  width   : 340px;
  height  : 360px;

  resize  : none;
}
</style>