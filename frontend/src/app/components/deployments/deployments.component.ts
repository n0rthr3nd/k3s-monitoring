import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { K8sApiService } from '../../services/k8s-api.service';
import { Deployment, Namespace } from '../../models/kubernetes.models';

@Component({
  selector: 'app-deployments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <div class="page-header">
        <h2 class="page-title">Deployments</h2>
        <div class="header-actions">
          <select [(ngModel)]="selectedNamespace" (change)="onNamespaceChange()" class="select">
            @for (ns of namespaces(); track ns.name) {
              <option [value]="ns.name">{{ ns.name }}</option>
            }
          </select>
          <button (click)="loadDeployments()" class="btn primary">Refresh</button>
        </div>
      </div>

      <div class="grid">
        @for (deployment of deployments(); track deployment.name) {
          <div class="card">
            <div class="card-header">
              <h3>{{ deployment.name }}</h3>
              <span class="badge">{{ deployment.namespace }}</span>
            </div>
            <div class="card-body">
              <div class="detail-row"><span>Ready:</span><span>{{ deployment.ready }}</span></div>
              <div class="detail-row"><span>Up-to-date:</span><span>{{ deployment.upToDate }}</span></div>
              <div class="detail-row"><span>Available:</span><span>{{ deployment.available }}</span></div>
              <div class="detail-row"><span>Replicas:</span><span>{{ deployment.replicas }}</span></div>
              <div class="detail-row"><span>Age:</span><span>{{ deployment.age }}</span></div>
            </div>
            <div class="card-actions">
              <button (click)="scaleDeployment(deployment)" class="btn small info">Scale</button>
              <button (click)="restartDeployment(deployment)" class="btn small warning">Restart</button>
              <button (click)="deleteDeployment(deployment)" class="btn small danger">Delete</button>
            </div>
          </div>
        }
        @if (deployments().length === 0) {
          <div class="no-data">No deployments found</div>
        }
      </div>
    </div>
  `,
  styleUrls: ['../shared-styles.css']
})
export class DeploymentsComponent implements OnInit {
  private k8sService = inject(K8sApiService);
  deployments = signal<Deployment[]>([]);
  namespaces = signal<Namespace[]>([]);
  selectedNamespace = 'default';

  ngOnInit() {
    this.k8sService.getNamespaces().subscribe({
      next: (data) => this.namespaces.set(data),
      error: (err) => console.error(err)
    });
    this.loadDeployments();
  }

  loadDeployments() {
    this.k8sService.getDeployments(this.selectedNamespace).subscribe({
      next: (data) => this.deployments.set(data),
      error: (err) => console.error(err)
    });
  }

  onNamespaceChange() {
    this.loadDeployments();
  }

  scaleDeployment(deployment: Deployment) {
    const replicas = prompt(`Enter number of replicas for ${deployment.name}:`, deployment.replicas.toString());
    if (replicas) {
      this.k8sService.scaleDeployment(deployment.namespace, deployment.name, parseInt(replicas)).subscribe({
        next: () => this.loadDeployments(),
        error: (err) => console.error(err)
      });
    }
  }

  restartDeployment(deployment: Deployment) {
    if (confirm(`Restart deployment "${deployment.name}"?`)) {
      this.k8sService.restartDeployment(deployment.namespace, deployment.name).subscribe({
        next: () => this.loadDeployments(),
        error: (err) => console.error(err)
      });
    }
  }

  deleteDeployment(deployment: Deployment) {
    if (confirm(`Delete deployment "${deployment.name}"?`)) {
      this.k8sService.deleteDeployment(deployment.namespace, deployment.name).subscribe({
        next: () => this.loadDeployments(),
        error: (err) => console.error(err)
      });
    }
  }
}
