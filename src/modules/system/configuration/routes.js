import SystemConfigView from "./views/SystemConfigView";
import NavMenuConfigView from "@/modules/system/configuration/views/NavMenuConfigView";

export default [
    { path: '/config', name: 'SystemConfigView', component: SystemConfigView },
    { path: '/config/nav_menu', name: 'NavMenuConfigView', component: NavMenuConfigView },
]
