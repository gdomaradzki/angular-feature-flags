import { Directive } from '@angular/core';
import { flag } from './feature-flags.utils';

@Directive()
export abstract class FeatureFlagsBase {
  flag = flag;
}
