import { RouteConfig } from "vue-router";
import EmployeesView from "@/views/employees/EmployeesView.vue";
import NotFoundView from "@/views/notFound/NotFoundView.vue";

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    redirect: "/employees",
  },
  {
    path: "/employees",
    name: "employees",
    component: EmployeesView,
    redirect: "/employees/list",
    children: [
      {
        path: "create",
        name: "employeesCreate",
        component: () => import("../views/employees/pages/Create.vue"),
      },
      {
        path: "edit/:id(\\d+)",
        name: "employeesEdit",
        component: () => import("../views/employees/pages/Edit.vue"),
      },
      {
        path: "list",
        name: "employeesList",
        component: () => import("../views/employees/pages/List.vue"),
      },
    ],
  },

  {
    path: "*",
    name: "notFound",
    component: NotFoundView,
  },
];

export default routes;
