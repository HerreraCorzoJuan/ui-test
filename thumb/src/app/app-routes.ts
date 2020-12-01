import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";

export const ROUTES: Routes = [
    { path: "home", pathMatch: "full", component: HomeComponent },
    { path: "**", pathMatch: "full", redirectTo: "home" }
]
export const APP_ROUTING = RouterModule.forRoot(ROUTES);