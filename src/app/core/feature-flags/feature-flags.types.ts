type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}/${P}`
    : never
  : never;

export type NestedPaths<T, Depth extends number = 5> = [Depth] extends [0]
  ? never
  : T extends object
  ? {
      [K in keyof T]: K extends string | number
        ? T[K] extends boolean
          ? K
          : T[K] extends object
          ? K | Join<K, NestedPaths<T[K], [-1, 0, 1, 2, 3, 4][Depth]>>
          : K
        : never;
    }[keyof T]
  : never;

export interface WorkspaceFeatures {
  home: {
    red_button: boolean;
    blue_button: boolean;
  };
  fi_listing: boolean;
  test: {
    nested: {
      wow: boolean;
    }
  }
}

export interface FeatureRouteData<T = WorkspaceFeatures> {
  feature: NestedPaths<T>;
  featureFallback?: string;
}

export interface FeatureRoute<T = WorkspaceFeatures> {
  path: string;
  component?: any;
  loadChildren?: () => Promise<any>;
  canActivate?: any[];
  canLoad?: any[];
  data: FeatureRouteData<T>;
  children?: FeatureRoute<T>[];
}

export type WorkspaceFeatureKey = NestedPaths<WorkspaceFeatures>;
