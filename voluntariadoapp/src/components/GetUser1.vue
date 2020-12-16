<template>
    <div>hola
    <tbody>
        <tr  v-for="user_alias in UserFilter" :key="user_alias.id">
            <td>{{user_alias}}</td>
            
             </tr>
    </tbody>
    </div>

</template>


<script>
import Axios from 'axios'
export default {
    name:'user',
    data(){
        return{
            User: [],
            UserFilter:[],
        }
    },
    mounted(){
        Axios.get('http://localhost:8081/volunteers')
        .then((response) => {
            console.log(response.data);
            this.User= response.data;
            
        })
        .catch((error) => {
            console.log(error);
        });

       
    },

     verificarFecha(User){
       for(const value in User){
           this.UserFilter= value

       }

    }
}

</script>











<style scoped>

</style>