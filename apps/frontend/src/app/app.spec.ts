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

  it('should display Essensplaner branding', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Essensplaner');
  });

  it('should have 6 menu items with German labels', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.menuItems.length).toBe(6);
    const labels = app.menuItems.map((item) => item.label);
    expect(labels).toEqual([
      'Essensplan',
      'Rezepte',
      'Geschäfte',
      'Angebote',
      'Einkaufsliste',
      'Zutaten',
    ]);
  });

  it('should have correct route links', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const routerLinks = app.menuItems.map((item) => item.routerLink);
    expect(routerLinks).toEqual([
      '/meal-plan',
      '/recipes',
      '/shops',
      '/offers',
      '/shopping-list',
      '/ingredients',
    ]);
  });

  it('should have PrimeIcons for each menu item', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const icons = app.menuItems.map((item) => item.icon);
    expect(icons).toEqual([
      'pi pi-calendar',
      'pi pi-book',
      'pi pi-shop',
      'pi pi-tag',
      'pi pi-shopping-cart',
      'pi pi-list',
    ]);
  });
});
