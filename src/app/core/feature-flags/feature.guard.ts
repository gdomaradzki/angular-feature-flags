import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { FeatureFlagsService } from './feature-flags.service';
import { VisionNextFeatureKey } from './feature-flags.types';

@Injectable({ providedIn: 'root' })
export class FeatureGuard implements CanActivate {
  constructor(
    private featureFlags: FeatureFlagsService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const feature = route.data['feature'] as VisionNextFeatureKey;
    const fallbackRoute = route.data['featureFallback'] as string | undefined;

    if (!feature) {
      console.warn('FeatureGuard: No feature specified in route data');
      return true;
    }

    const enabled = this.featureFlags.isEnabled(feature);

    if (!enabled && fallbackRoute) {
      this.router.navigate([fallbackRoute]);
    }

    return enabled;
  }
}
