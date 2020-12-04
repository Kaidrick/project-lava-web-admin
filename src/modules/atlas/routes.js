// import MapControl from "./components/MapControl";

const MapControl = () => import('./components/MapControl');

export default [
    { path: '/atlas', name: 'Atlas', component: MapControl },
]
