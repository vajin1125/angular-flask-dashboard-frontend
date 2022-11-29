import { Routes, RouterModule } from '@angular/router';

import { LogviewComponent } from './logview.component';

const routes: Routes = [
  {
    path: '',
    component: LogviewComponent
  }
];

export const routing = RouterModule.forChild(routes);