import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'meal-plan',
    loadComponent: () =>
      import('./pages/meal-plan/meal-plan.component').then((m) => m.MealPlanComponent),
  },
  {
    path: 'recipes',
    loadComponent: () =>
      import('./pages/recipes/recipes.component').then((m) => m.RecipesComponent),
  },
  {
    path: 'shops',
    loadComponent: () =>
      import('./pages/shops/shops.component').then((m) => m.ShopsComponent),
  },
  {
    path: 'offers',
    loadComponent: () =>
      import('./pages/offers/offers.component').then((m) => m.OffersComponent),
  },
  {
    path: 'shopping-list',
    loadComponent: () =>
      import('./pages/shopping-list/shopping-list.component').then(
        (m) => m.ShoppingListComponent,
      ),
  },
  {
    path: 'ingredients',
    loadComponent: () =>
      import('./pages/ingredients/ingredients.component').then((m) => m.IngredientsComponent),
  },
  {
    path: '',
    redirectTo: 'meal-plan',
    pathMatch: 'full',
  },
];
