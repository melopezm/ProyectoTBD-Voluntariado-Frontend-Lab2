import Vue from 'vue'
import VueRouter from 'vue-router'
//import { components } from 'vue/types/umd'
import Home from '../views/Home.vue'
import VistaRegistro from '../views/VistaRegistro.vue'
import Formulario from '../views/Formulario.vue'
import FiltroFecha from '../components/FiltroFecha.vue'
import FiltroDescripcion from '../components/FiltroDescripcion.vue'
import Emergencia from '../components/Emergencia.vue'
import Map from '../components/Map.vue'
import TareaEmergencia from '../components/TareaEmergencia.vue'
import Tarea from '../components/Tarea.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/vistaRegistro',
    name:'vistaRegistro',
    component: VistaRegistro
  },
  {
    path: '/formulario',
    name: 'formulario',
    component: Formulario
  },
  {
    path: '/FiltroFecha',
    name: 'filtroFecha',
    component: FiltroFecha
  },
  {
    path: '/map',
    name: 'map',
    component: Map
  },
  { path:'/emergencia',
    name:'emergencia',
    component: Emergencia

  },
  { path:'/tarea',
    name:'tarea',
    component: Tarea

  },
  { path:'/tareaemergencia',
  name:'tareaemergencia',
  component: TareaEmergencia

},



  {
    path: '/FiltroDescripcion',
    name: 'filtroDescripcion',
    component: FiltroDescripcion
  }
 
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router; 