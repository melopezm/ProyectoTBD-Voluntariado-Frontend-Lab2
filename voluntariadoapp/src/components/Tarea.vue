<template>

<div class="container">
    <h1>Registro de tareas</h1>
  <div class="form-group">
    <input type="text" id="nombre" name="nombre" placeholder="Nombre de la tarea.." v-model='nombre'> <br>
    <input type="text" id="descripcion" name="descripcion" placeholder="Descripcion de la tarea.." v-model='descripcion'><br>    
    <input type="number" id="n_voluntarios" name="n_voluntarios" placeholder="Numero de voluntarios" min="1" v-model="nvoluntarios"> <br>
    
   <h6> Inicio <date-picker v-model="finicio" value-type="format" ></date-picker> 
        Termino<date-picker v-model="ffin" value-type="format" ></date-picker> <br><br>
        
       
   
     <!--   <div class="row">
     <input type="radio" id="emergencia 0" value="0" v-model="id_emergencia">Emergencia 0<br>        
    <input type="radio" id="emergencia 1" value="1" v-model="id_emergencia">Emergencia 1<br>
    <input type="radio" id="emergencia 2" value="2" v-model="id_emergencia">Emergencia 2<br>
    <input type="radio" id="emergencia 3" value="3" v-model="id_emergencia">Emergencia 3<br>
    <input type="radio" id="emergencia 4" value="4" v-model="id_emergencia">Emergencia 4<br> <br> <br>
    <input type="radio" id="emergencia 5" value="5" v-model="id_emergencia">Emergencia 5<br> <br> <br>
    <br> <br>

        <input type="radio" id="Estado 0" value="0" v-model="id_estado">Estado 0
        <input type="radio" id="Estado 1" value="1" v-model="id_estado">Estado 1
        <input type="radio" id="Estado 3" value="2" v-model="id_estado">Estado 2
    <br> <br>


    </div>
    -->
    </h6>
      
  
  
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
         
        </l-popup>
      </l-marker>
      <l-marker :lat-lng="withTooltip">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          <div @click="innerClick">
           
          
          </div>
        </l-tooltip>
      </l-marker>
    </l-map>
     <h6><p>Coordenadas ingresadas ({{ currentCenter.lat}}, {{ currentCenter.lng}}) Con un zoom de: {{ currentZoom }}</p>
      </h6>
      
      <button class="btn btn-primary" v-on:click="register">Registrar tarea</button>
     
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
      nvoluntarios:null,
      id_estado:'0',
      id_emergencia:'1',
      ninscritos:'0',
    



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
            axios.post('http://localhost:8081/tasks', {
              longitude: this.currentCenter.lat,
              latitude:this.currentCenter.lng,
              nombre:this.nombre,
              descrip:this.descripcion,
              finicio:this.finicio,
              ffin:this.ffin,
              cant_vol_requeridos:this.nvoluntarios,
              cant_vol_inscritos:this.ninscritos,  
              id_estado:this.id_estado,
              id_emergencia:this.id_emergencia

            
        
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

<style scoped>
input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid rgb(184, 171, 171);
  border-radius: 4px;
  box-sizing: border-box;
}
input[type=number], select {
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
a{
    color:black
}
</style>