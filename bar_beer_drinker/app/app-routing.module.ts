import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelcomeComponent} from "../bar-beer-drinker/welcome/welcome.component";

const routes: Routes = [
    {
        path: 'bars',
        pathMatch: 'full',
        component: WelcomeComponent
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
