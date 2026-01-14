import { NgModule, ModuleWithProviders } from '@angular/core';
import { FeatureDirective } from './feature.directive';
import { FeatureFlagsService } from './feature-flags.service';
import { WorkspaceFeatures } from './feature-flags.types';

@NgModule({
  declarations: [FeatureDirective],
  exports: [FeatureDirective],
})
export class FeatureFlagsModule {
  static forRoot<T = WorkspaceFeatures>(
    initialFlags?: Partial<T>
  ): ModuleWithProviders<FeatureFlagsModule> {
    return {
      ngModule: FeatureFlagsModule,
      providers: [
        {
          provide: FeatureFlagsService,
          useFactory: () => {
            const service = new FeatureFlagsService<T>();
            if (initialFlags) {
              service.setFlags(initialFlags);
            }
            return service;
          },
        },
      ],
    };
  }

  // For child modules/components that want to override flags
  static forChild(): ModuleWithProviders<FeatureFlagsModule> {
    return {
      ngModule: FeatureFlagsModule,
      providers: [FeatureFlagsService],
    };
  }
}