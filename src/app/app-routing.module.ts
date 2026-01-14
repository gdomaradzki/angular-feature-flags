import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureGuard } from '@core/feature-flags';
import { HomeComponent } from './home/home.component';
import { RedComponent } from './red/red.component';
import { BlueComponent } from './blue/blue.component';

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
  {
    path: 'red',
    component: RedComponent,
    canActivate: [FeatureGuard],
    data: {
      feature: 'home/red_button',
      featureFallback: '/home',
    },
  },
  {
    path: 'blue',
    component: BlueComponent,
    canActivate: [FeatureGuard],
    data: {
      feature: 'home/blue_button',
      featureFallback: '/home',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
