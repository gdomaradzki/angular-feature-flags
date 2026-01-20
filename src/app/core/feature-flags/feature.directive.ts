import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FeatureFlagsService } from './feature-flags.service';
import { NestedPaths, WorkspaceFeatures } from './feature-flags.types';

@Directive({
  selector: '[feature]',
})
export class FeatureDirective<T = WorkspaceFeatures>
  implements OnInit, OnDestroy
{
  @Input() feature!: NestedPaths<T>;
  @Input() featureElse?: TemplateRef<unknown>;

  private destroy$ = new Subject<void>();
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private featureFlags: FeatureFlagsService<T>,
  ) {}

  ngOnInit(): void {
    this.featureFlags
      .isEnabled$(this.feature)
      .pipe(takeUntil(this.destroy$))
      .subscribe((enabled) => this.updateView(enabled));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateView(enabled: boolean): void {
    if (enabled && !this.hasView) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!enabled && this.hasView) {
      this.viewContainer.clear();
      if (this.featureElse) {
        this.viewContainer.createEmbeddedView(this.featureElse);
      }
      this.hasView = false;
    } else if (!enabled && !this.hasView && this.featureElse) {
      this.viewContainer.createEmbeddedView(this.featureElse);
    }
  }
}
