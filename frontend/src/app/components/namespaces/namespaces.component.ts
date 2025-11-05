import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { K8sApiService } from '../../services/k8s-api.service';
import { Namespace } from '../../models/kubernetes.models';

@Component({
  selector: 'app-namespaces',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <div class="page-header">
        <h2 class="page-title">Namespaces</h2>
        <div class="header-actions">
          <button (click)="createNamespace()" class="btn success">Create Namespace</button>
          <button (click)="loadNamespaces()" class="btn primary">Refresh</button>
        </div>
      </div>

      <div class="grid">
        @for (namespace of namespaces(); track namespace.name) {
          <div class="card">
            <div class="card-header">
              <h3>{{ namespace.name }}</h3>
              <span class="badge" [class.badge-success]="namespace.status === 'Active'">{{ namespace.status }}</span>
            </div>
            <div class="card-body">
              <div class="detail-row"><span>Status:</span><span>{{ namespace.status }}</span></div>
              <div class="detail-row"><span>Age:</span><span>{{ namespace.age }}</span></div>
            </div>
            <div class="card-actions">
              <button (click)="deleteNamespace(namespace)" class="btn small danger"
                [disabled]="namespace.name === 'default' || namespace.name === 'kube-system'">
                Delete
              </button>
            </div>
          </div>
        }
        @if (namespaces().length === 0) {
          <div class="no-data">No namespaces found</div>
        }
      </div>
    </div>
  `,
  styleUrls: ['../shared-styles.css']
})
export class NamespacesComponent implements OnInit {
  private k8sService = inject(K8sApiService);
  namespaces = signal<Namespace[]>([]);

  ngOnInit() {
    this.loadNamespaces();
  }

  loadNamespaces() {
    this.k8sService.getNamespaces().subscribe({
      next: (data) => this.namespaces.set(data),
      error: (err) => console.error(err)
    });
  }

  createNamespace() {
    const name = prompt('Enter namespace name:');
    if (name) {
      this.k8sService.createNamespace(name).subscribe({
        next: () => this.loadNamespaces(),
        error: (err) => console.error(err)
      });
    }
  }

  deleteNamespace(namespace: Namespace) {
    if (namespace.name === 'default' || namespace.name === 'kube-system') {
      alert('Cannot delete system namespaces');
      return;
    }
    if (confirm(`Delete namespace "${namespace.name}"?`)) {
      this.k8sService.deleteNamespace(namespace.name).subscribe({
        next: () => this.loadNamespaces(),
        error: (err) => console.error(err)
      });
    }
  }
}
