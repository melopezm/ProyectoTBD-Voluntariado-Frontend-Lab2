<template>
    <div class="container">
<div>

<ul>
        <div class="col">       
        <li class="list-group-item">
                <div class="col">
                   
                    <button v-on:click="getUsers" class="btn btn-primary" >Tareas en Emergencias Activas</button>


                </div>
        </li>
        </div>
        <div class="col">
            <div class="row">
        <th scope="col">Nombre   </th> 
        <th scope="col">Descripcion tarea  </th>
        <th scope="col">Id emergencia  </th>
        <th scope="col">Longitud  </th>
        <th scope="col">Latitud</th>
            </div>
    <table class="table">
    
        
    <li v-for="item in searchActive" class="list-group-item" :key="item">
                 
      <ul v-for="item2 in searchName" class="list-group-item" :key="item2"> 
             <row v-if="item.id == item2.id">
             <td>{{item2.nombre}}</td>
               <td >{{item2.descrip}}</td>
                 <td >{{item2.id_emergencia}}</td>
                   <td >{{item2.longitude}}</td>
                     <td >{{item2.latitude}}</td>

             </row>
       
      </ul>
      
    </li>

    </table>
        </div>
</ul>
</div></div>





</template>





<script>
   import axios from "axios";

       export default {
  
        name: 'FiltroDescripcion',
        
        data(){
          return{
            
              lists: [],
               listaIds: '1', 
              lists2:[],
              ListId:[],
              listaTareaEmergencia:[],
              laux:[],
              Lconcat: [],
              descripcion: '',
              nombre: '',
              fecha_de_creacion: '',
            }
            
          },
      
         methods:{
            getUsers: function () {
                var urlUsers =    'http://localhost:8081/emergency';
                   var UrlUsers2= 'http://localhost:8081/tasks';
                axios.get(urlUsers).then(response => {
                    this.lists = response.data
                })
    
                 axios.get(UrlUsers2).then(response => {
                    this.lists2 = response.data
                })
                this.Lconcat= this.lists.concat(this.lists2)

            },
          


        },
     
        computed: {
            searchActive: function () {
                return this.lists.filter((item) => item.id_estado ==1);

            },
         searchName: function () {
                return this.lists2.filter((item) => ((item.id_emergencia == 0) || (item.id_emergencia == 1) || (item.id_emergencia == 2) || (item.id_emergencia == 3) || (item.id_emergencia == 4) || (item.id_emergencia == 5) ));

            },

            
            
             

           
          

        }};
  
</script>
