import { Routes } from '@angular/router';
import { FaceSnapListComponent } from './face-snap-list/face-snap-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SingleFaceSnapComponent } from './single-face-snap/single-face-snap.component';

export const routes: Routes = [
  {
    // Les  :id  spécifient que ce qui se trouvera après  facesnaps/  correspondra à un paramètre qui s'appellera  id.
    path: 'facesnaps/:id',
    component: SingleFaceSnapComponent,
  },
  {
    path: 'facesnaps',
    component: FaceSnapListComponent,
  },
  {
    path: '',
    component: LandingPageComponent,
  },
];
