import { Component, OnInit } from '@angular/core';
import { FeatureFlagsService, WorkspaceFeatureKey } from '@core/feature-flags';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'feature-flags-test';
  redButton: WorkspaceFeatureKey = 'home/red_button';
  blueButton: WorkspaceFeatureKey = 'home/blue_button';

  constructor(private featureFlags: FeatureFlagsService) {}

  ngOnInit(): void {
    console.log('red_button:', this.featureFlags.isEnabled('home/red_button'));
    console.log('blue_button:', this.featureFlags.isEnabled('home/blue_button'));
  }
}
