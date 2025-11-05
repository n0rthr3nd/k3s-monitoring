import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { K8sApiService } from '../../services/k8s-api.service';
import { Service, Namespace } from '../../models/kubernetes.models';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <div class="page-header">
        <h2 class="page-title">Services</h2>
        <div class="header-actions">
          <select [(ngModel)]="selectedNamespace" (change)="onNamespaceChange()" class="select">
            @for (ns of namespaces(); track ns.name) {
              <option [value]="ns.name">{{ ns.name }}</option>
            }
          </select>
          <button (click)="loadServices()" class="btn primary">Refresh</button>
        </div>
      </div>

      <div class="grid">
        @for (service of services(); track service.name) {
          <div class="card">
            <div class="card-header">
              <h3>{{ service.name }}</h3>
              <span class="badge">{{ service.type }}</span>
            </div>
            <div class="card-body">
              <div class="detail-row"><span>Namespace:</span><span>{{ service.namespace }}</span></div>
              <div class="detail-row"><span>Cluster IP:</span><span>{{ service.clusterIP }}</span></div>
              <div class="detail-row"><span>External IP:</span><span>{{ service.externalIP || 'None' }}</span></div>
              <div class="detail-row"><span>Ports:</span><span>{{ service.ports }}</span></div>
              <div class="detail-row"><span>Age:</span><span>{{ service.age }}</span></div>
            </div>
            <div class="card-actions">
              <button (click)="deleteService(service)" class="btn small danger">Delete</button>
            </div>
          </div>
        }
        @if (services().length === 0) {
          <div class="no-data">No services found</div>
        }
      </div>
    </div>
  `,
  styleUrls: ['../shared-styles.css']
})
export class ServicesComponent implements OnInit {
  private k8sService = inject(K8sApiService);
  services = signal<Service[]>([]);
  namespaces = signal<Namespace[]>([]);
  selectedNamespace = 'default';

  ngOnInit() {
    this.k8sService.getNamespaces().subscribe({
      next: (data) => this.namespaces.set(data),
      error: (err) => console.error(err)
    });
    this.loadServices();
  }

  loadServices() {
    this.k8sService.getServices(this.selectedNamespace).subscribe({
      next: (data) => this.services.set(data),
      error: (err) => console.error(err)
    });
  }

  onNamespaceChange() {
    this.loadServices();
  }

  deleteService(service: Service) {
    if (confirm(`Delete service "${service.name}"?`)) {
      this.k8sService.deleteService(service.namespace, service.name).subscribe({
        next: () => this.loadServices(),
        error: (err) => console.error(err)
      });
    }
  }
}
