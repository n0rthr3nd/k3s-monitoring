import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { K8sApiService } from '../../services/k8s-api.service';
import { Node } from '../../models/kubernetes.models';

@Component({
  selector: 'app-nodes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <div class="page-header">
        <h2 class="page-title">Cluster Nodes</h2>
        <button (click)="loadNodes()" class="btn primary">Refresh</button>
      </div>

      <div class="grid">
        @for (node of nodes(); track node.name) {
          <div class="card">
            <div class="card-header">
              <h3>{{ node.name }}</h3>
              <span class="badge" [class.badge-success]="node.status === 'Ready'">{{ node.status }}</span>
            </div>
            <div class="card-body">
              <div class="detail-row"><span>Roles:</span><span>{{ node.roles }}</span></div>
              <div class="detail-row"><span>Status:</span><span>{{ node.status }}</span></div>
              <div class="detail-row"><span>Version:</span><span>{{ node.version }}</span></div>
              <div class="detail-row"><span>Age:</span><span>{{ node.age }}</span></div>
            </div>
          </div>
        }
        @if (nodes().length === 0) {
          <div class="no-data">No nodes found</div>
        }
      </div>
    </div>
  `,
  styleUrls: ['../shared-styles.css']
})
export class NodesComponent implements OnInit {
  private k8sService = inject(K8sApiService);
  nodes = signal<Node[]>([]);

  ngOnInit() {
    this.loadNodes();
  }

  loadNodes() {
    this.k8sService.getNodes().subscribe({
      next: (data) => this.nodes.set(data),
      error: (err) => console.error(err)
    });
  }
}
