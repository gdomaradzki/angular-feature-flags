import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RedComponent } from './red/red.component';
import { BlueComponent } from './blue/blue.component';
import { featureRoute } from '@core/feature-flags/feature-flags.utils';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  featureRoute({
    path: 'new-dashboard',
    component: RedComponent,
    feature: 'home/red_button',
    featureFallback: '/home',
  }),

  featureRoute({
    path: 'experimental',
    component: BlueComponent,
    feature: 'home/blue_button',
    featureFallback: '/home',
  }),
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
