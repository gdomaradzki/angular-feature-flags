import { Injectable, Optional, SkipSelf } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NestedPaths, WorkspaceFeatures } from './feature-flags.types';

@Injectable()
export class FeatureFlagsService<T = WorkspaceFeatures> {
  private flags$ = new BehaviorSubject<Partial<T>>({});

  constructor(
    @Optional() @SkipSelf() private parent?: FeatureFlagsService<T>
  ) {}

  setFlags(flags: Partial<T>): void {
    const parentFlags = this.parent?.getSnapshot() ?? {};
    this.flags$.next({ ...parentFlags, ...flags });
  }

  getFlags(): Observable<Partial<T>> {
    return this.flags$.asObservable();
  }

  getSnapshot(): Partial<T> {
    return this.flags$.getValue();
  }

  isEnabled<Path extends NestedPaths<T>>(feature: Path): boolean {
    return this.resolveFlag(this.getSnapshot(), feature);
  }

  isEnabled$<Path extends NestedPaths<T>>(feature: Path): Observable<boolean> {
    return this.flags$.pipe(map((flags) => this.resolveFlag(flags, feature)));
  }

  private resolveFlag<Path extends NestedPaths<T>>(
    flags: Partial<T>,
    feature: Path
  ): boolean {
    const path = (feature as string).split('/');
    let current: unknown = flags;

    for (const key of path) {
      if (
        current === null ||
        current === undefined ||
        typeof current !== 'object'
      ) {
        return false;
      }
      current = (current as Record<string, unknown>)[key];
    }

    return Boolean(current);
  }
}
