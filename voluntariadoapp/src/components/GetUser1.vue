<template>
<div>
<button v-on:click="getUsers" class="btn btn-primary" v-if="!lists.length">Ver Voluntarios</button>
    <ul class="list-group" v-else>
    <li class="list-group-item">
        <input type="text" placeholder="Buscar" class="form-control" v-model="fnacimiento">
       
    </li>
    <li v-for="item in searchUser" class="list-group-item" :key="item">
        {{ item.fnacimiento }}
    </li>
    
</ul>
</div>
</template>


<script>
   import axios from "axios";
       export default {
        name: 'FormularioVoluntario',
        data(){
          return{
             lists: [],
            fnacimiento: '',
            }
            
          },
      
         methods:{
            getUsers: function () {
                var urlUsers = 'http://localhost:8081/volunteers';
                axios.get(urlUsers).then(response => {
                    this.lists = response.data
                })
            }
        },
     
        computed: {
            searchUser: function () {
                return this.lists.filter((item) => item.fnacimiento.includes(this.fnacimiento));

            }
        }};
  
</script>


