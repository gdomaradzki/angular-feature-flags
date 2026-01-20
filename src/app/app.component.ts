import { Component, OnInit } from '@angular/core';
import { FeatureFlagsService } from '@core/feature-flags';
import { FeatureFlagsBase } from '@core/feature-flags/feature-flags.base';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends FeatureFlagsBase implements OnInit {
  title = 'feature-flags-test';

  constructor(private featureFlags: FeatureFlagsService) {
    super();
  }

  ngOnInit(): void {
    console.log('red_button:', this.featureFlags.isEnabled('home/red_button'));
    console.log(
      'blue_button:',
      this.featureFlags.isEnabled('home/blue_button'),
    );
  }
}
