import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PodsComponent } from './components/pods/pods.component';
import { DeploymentsComponent } from './components/deployments/deployments.component';
import { ServicesComponent } from './components/services/services.component';
import { NamespacesComponent } from './components/namespaces/namespaces.component';
import { NodesComponent } from './components/nodes/nodes.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'pods', component: PodsComponent },
  { path: 'deployments', component: DeploymentsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'namespaces', component: NamespacesComponent },
  { path: 'nodes', component: NodesComponent },
  { path: '**', redirectTo: '/dashboard' }
];
