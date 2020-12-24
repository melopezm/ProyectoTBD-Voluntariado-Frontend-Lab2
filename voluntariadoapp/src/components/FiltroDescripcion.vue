<template>
  <div class="container">
<div>

<button v-on:click="getUsers" class="btn btn-primary" v-if="!Lconcat.length">Filtro por descripcion</button>


    <ul class="list-group" v-else>

        <div class="col">       
        <li class="list-group-item">
                <div class="col">
                    <input type="text" placeholder="Buscar por nombre" class="form-control" v-model="nombre"> <br>
                    <input type="text" placeholder="Buscar por descripcion" class="form-control" v-model="descripcion"> <br>
                  
                    
                </div>
        </li>
        </div>
        <div class="col">

 
    <table class="table">
    
        <thead class="table-dark">
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                <th scope="col" >Descripcion</th>
                <th scope="col" >Fecha de creacion</th>
            </tr>
        </thead> 


<template v-if="this.nombre == '' ">
    <li v-for="item in searchUser" class="list-group-item" :key="item">
      <tbody>
       
             <tr>
           
                  <td scope="col">{{item.id}}</td>
                  <td scope="col">{{item.nombre}}</td>
                    <td scope="col">{{item.descrip}}</td>
                        <td scope="col">{{item.fecha_de_creacion}}</td>
           
             </tr>
       
      </tbody>
    </li>
    </template>
<template v-else-if="this.descripcion == '' ">
     <li v-for="item in searchName" class="list-group-item" :key="item">
      <tbody>
       
             <tr>
           
                  <td scope="col">{{item.id}}</td>
                  <td scope="col">{{item.nombre}}</td>
                    <td scope="col">{{item.descrip}}</td>
                        <td scope="col">{{item.fecha_de_creacion}}</td>
           
                        </tr>
                
                </tbody>
                </li>
            </template>
                
    </table>
    </div>
    
    </ul>
    </div>
    </div>
</template>


<script>
   import axios from "axios";

    import 'vue2-datepicker/index.css';



       export default {
        name: 'FiltroDescripcion',
        
        data(){
          return{
              time1: null,
              time2:null,
              lists: [],
              lists2:[],
              Lconcat: [],
              descripcion: '',
              nombre: '',
              fecha_de_creacion: '',
            }
            
          },
      
         methods:{
            getUsers: function () {
                var urlUsers = 'http://localhost:8081/logEmergencies';
                   var UrlUsers2= 'http://localhost:8081/logTasks';
                axios.get(urlUsers).then(response => {
                    this.lists = response.data
                })
    
                 axios.get(UrlUsers2).then(response => {
                    this.lists2 = response.data
                })
                this.Lconcat= this.lists.concat(this.lists2)

            }
        },
     
        computed: {
            searchUser: function () {
                return this.Lconcat.filter((item) =>(item.descrip.includes(this.descripcion) ) );

            },
         searchName: function () {
                return this.Lconcat.filter((item) =>(item.nombre.includes(this.nombre) ) );

            },
          

        }};
  
</script>

