<template>
    <div class="container">
<div>

<ul>
        <div class="col">       
        <li class="list-group-item">
                <div class="col">
                   
                    <button v-on:click="getUsers" class="btn btn-primary" >Emergencias Activas</button>


                </div>
        </li>
        </div>
        <div class="col">

 
    <table class="table">
    

    <li v-for="item in searchActive" class="list-group-item" :key="item">

      <tbody>
       
             <tr>
                
                  id<td scope="col">{{item.id}}</td>
                 estado <td scope="col">{{item.id_estado}}</td>
                 id_emergencia <td scope="col">{{item.id_emergencia}}</td>
           
             </tr>
       
      </tbody>
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

            filtrarTareaEmergencia: function(){
               var listaux = this.lists.filter((item) => item.id_estado ==1).slice();
               var varLid;
               listaux.forEach(element => varLid.push(element) );    
                return varLid
              
                
                
            }
            
             

           
          

        }};
  
</script>
