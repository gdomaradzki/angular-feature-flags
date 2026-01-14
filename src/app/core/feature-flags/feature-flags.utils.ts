import { Route } from '@angular/router';
import { FeatureGuard } from './feature.guard';
import { NestedPaths, WorkspaceFeatures } from './feature-flags.types';

export function featureRoute<T = WorkspaceFeatures>(config: {
  path: string;
  component?: any;
  loadChildren?: () => Promise<any>;
  feature: NestedPaths<T>;
  featureFallback?: string;
  children?: Route[];
}): Route {
  return {
    path: config.path,
    component: config.component,
    loadChildren: config.loadChildren,
    canActivate: [FeatureGuard],
    data: {
      feature: config.feature,
      featureFallback: config.featureFallback,
    },
    children: config.children,
  };
}
