<template>
  <div class="container">
<div>

<button v-on:click="getUsers" class="btn btn-primary" v-if="!Lconcat.length">Ver Voluntarios</button>

    <ul class="list-group" v-else>
    <li class="list-group-item">
           <date-picker v-model="time1" range></date-picker>
        <input type="text" placeholder="Buscar" class="form-control" v-model="descripcion">
        
    </li>
  
  
<table class="table">
    <thead class="table-dark">
        <tr>
            <th scope="col">Id</th>
            <th scope="col" >Descripcion</th>
            <th scope="col" >Fecha de creacion</th>
        </tr>
    </thead>
       <li v-for="item in searchUser" class="list-group-item" :key="item">
    <tbody>
       
        <tr>
           
            <td scope="col">{{item.id}}</td>
            <td scope="col">{{item.descrip}}</td>
            <td scope="col">{{item.fecha_de_creacion}}</td>
           
        </tr>
       
    </tbody>
       </li>
  
</table>

</ul>
</div>
  </div>
</template>


<script>
   import axios from "axios";
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';



       export default {
        name: 'FormularioVoluntario',
         components: { DatePicker },
        data(){
          return{
              time1: null,
             lists: [],
             lists2:[],
             Lconcat: [],
             descripcion: '',
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
                return this.Lconcat.filter((item) => item.descrip.includes(this.descripcion));

            }
        }};
  
</script>


