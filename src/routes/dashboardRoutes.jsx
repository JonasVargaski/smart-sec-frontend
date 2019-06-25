import Dashboard from "../views/Dashboard/Dashboard";
import UserProfile from "../views/UserProfile/UserProfile";
import TableList from "../views/TableList/TableList";
import Controllers from "../views/Controller/Controller";
import Log from  '../views/Logs/Log'
const dashboardRoutes = [
  {
    path: "/app/dashboard",
    name: "Dashboard",
    icon: "chalkboard-teacher",
    code: 'SMT001',
    component: Dashboard
  },
  {
    path: "/app/relatorio",
    name: "Relatórios",
    icon: "file-pdf",
    code: 'SMT002',
    component: TableList
  },
  {
    path: "/app/usuario",
    name: "Usuário",
    icon: "user",
    code: 'SMT003',
    component: UserProfile
  },
  {
    path: "/app/controlador",
    name: "Controladores",
    icon: "wave-square",
    code: 'SMT004',
    component: Controllers
  },
  {
    path: "/app/controlador/config",
    name: "Ajuste Controlador",
    icon: "tools",
    code: 'SMT005',
    component: Controllers
  },
  {
    path: "/app/acesso",
    name: "Controle de acesso",
    icon: "users-cog",
    code: 'TCH001',
    component: Controllers
  },
  {
    path: "/app/configuracao",
    name: "Configurações",
    icon: "cogs",
    code: 'TCH002',
    component: Controllers
  },
  {
    path: "/app/log",
    name: "Log's",
    icon: "folder-open",
    code: 'TCH003',
    component: Log
  },
];


export default dashboardRoutes;
