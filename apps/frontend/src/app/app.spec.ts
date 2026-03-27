import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have menu items', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.menuItems.length).toBeGreaterThan(0);
    expect(app.menuItems[0].label).toBe('Projects');
  });
});
