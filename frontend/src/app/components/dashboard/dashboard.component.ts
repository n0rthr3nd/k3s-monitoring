import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { K8sApiService } from '../../services/k8s-api.service';
import { Pod, Deployment, Service, Node } from '../../models/kubernetes.models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h2 class="page-title">Dashboard Overview</h2>

      <div class="stats-grid">
        <div class="stat-card pods">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
              <circle cx="12" cy="12" r="3" fill="currentColor"/>
            </svg>
          </div>
          <div class="stat-content">
            <h3 class="stat-value">{{ pods().length }}</h3>
            <p class="stat-label">Total Pods</p>
            <p class="stat-detail">{{ runningPods() }} running</p>
          </div>
        </div>

        <div class="stat-card deployments">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="stat-content">
            <h3 class="stat-value">{{ deployments().length }}</h3>
            <p class="stat-label">Deployments</p>
            <p class="stat-detail">Active workloads</p>
          </div>
        </div>

        <div class="stat-card services">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="5" r="2" stroke="currentColor" stroke-width="2"/>
              <circle cx="5" cy="19" r="2" stroke="currentColor" stroke-width="2"/>
              <circle cx="19" cy="19" r="2" stroke="currentColor" stroke-width="2"/>
              <path d="M12 7V12M12 12L5 17M12 12L19 17" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="stat-content">
            <h3 class="stat-value">{{ services().length }}</h3>
            <p class="stat-label">Services</p>
            <p class="stat-detail">Network endpoints</p>
          </div>
        </div>

        <div class="stat-card nodes">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" stroke-width="2"/>
              <rect x="14" y="3" width="7" height="7" rx="2" stroke="currentColor" stroke-width="2"/>
              <rect x="3" y="14" width="7" height="7" rx="2" stroke="currentColor" stroke-width="2"/>
              <rect x="14" y="14" width="7" height="7" rx="2" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="stat-content">
            <h3 class="stat-value">{{ nodes().length }}</h3>
            <p class="stat-label">Cluster Nodes</p>
            <p class="stat-detail">{{ readyNodes() }} ready</p>
          </div>
        </div>
      </div>

      <div class="content-grid">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Recent Pods</h3>
            <span class="badge">{{ pods().length }}</span>
          </div>
          <div class="card-body">
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Namespace</th>
                    <th>Status</th>
                    <th>Ready</th>
                  </tr>
                </thead>
                <tbody>
                  @for (pod of pods().slice(0, 5); track pod.name) {
                    <tr>
                      <td class="pod-name">{{ pod.name }}</td>
                      <td><span class="namespace-badge">{{ pod.namespace }}</span></td>
                      <td><span class="status-badge" [class]="'status-' + pod.status.toLowerCase()">{{ pod.status }}</span></td>
                      <td>{{ pod.ready }}</td>
                    </tr>
                  }
                  @if (pods().length === 0) {
                    <tr>
                      <td colspan="4" class="no-data">No pods found</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Deployments</h3>
            <span class="badge">{{ deployments().length }}</span>
          </div>
          <div class="card-body">
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Namespace</th>
                    <th>Ready</th>
                    <th>Available</th>
                  </tr>
                </thead>
                <tbody>
                  @for (deployment of deployments().slice(0, 5); track deployment.name) {
                    <tr>
                      <td class="deployment-name">{{ deployment.name }}</td>
                      <td><span class="namespace-badge">{{ deployment.namespace }}</span></td>
                      <td>{{ deployment.ready }}</td>
                      <td>{{ deployment.available }}</td>
                    </tr>
                  }
                  @if (deployments().length === 0) {
                    <tr>
                      <td colspan="4" class="no-data">No deployments found</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      animation: fadeIn 0.5s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .page-title {
      font-size: 2rem;
      font-weight: 700;
      color: #2d3748;
      margin: 0 0 2rem 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      border-radius: 16px;
      padding: 1.5rem;
      display: flex;
      gap: 1rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--gradient-start), var(--gradient-end));
    }

    .stat-card.pods {
      --gradient-start: #667eea;
      --gradient-end: #764ba2;
    }

    .stat-card.deployments {
      --gradient-start: #f093fb;
      --gradient-end: #f5576c;
    }

    .stat-card.services {
      --gradient-start: #4facfe;
      --gradient-end: #00f2fe;
    }

    .stat-card.nodes {
      --gradient-start: #43e97b;
      --gradient-end: #38f9d7;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
      color: white;
      flex-shrink: 0;
    }

    .stat-icon svg {
      width: 32px;
      height: 32px;
    }

    .stat-content {
      flex: 1;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: #2d3748;
      margin: 0;
      line-height: 1;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #718096;
      margin: 0.5rem 0 0.25rem 0;
      font-weight: 500;
    }

    .stat-detail {
      font-size: 0.75rem;
      color: #a0aec0;
      margin: 0;
    }

    .content-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 1.5rem;
    }

    .card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .card:hover {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    .card-header {
      padding: 1.5rem;
      border-bottom: 2px solid #f7fafc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
    }

    .card-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0;
    }

    .badge {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .card-body {
      padding: 1.5rem;
    }

    .table-container {
      overflow-x: auto;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th {
      text-align: left;
      padding: 0.75rem 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: #718096;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 2px solid #e2e8f0;
    }

    .data-table td {
      padding: 1rem;
      border-bottom: 1px solid #f7fafc;
      font-size: 0.875rem;
      color: #4a5568;
    }

    .data-table tbody tr {
      transition: background-color 0.2s ease;
    }

    .data-table tbody tr:hover {
      background-color: rgba(102, 126, 234, 0.05);
    }

    .pod-name, .deployment-name {
      font-weight: 600;
      color: #2d3748;
    }

    .namespace-badge {
      background: #edf2f7;
      color: #4a5568;
      padding: 0.25rem 0.5rem;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: capitalize;
    }

    .status-running {
      background: #c6f6d5;
      color: #22543d;
    }

    .status-pending {
      background: #feebc8;
      color: #7c2d12;
    }

    .status-failed, .status-error {
      background: #fed7d7;
      color: #742a2a;
    }

    .no-data {
      text-align: center;
      color: #a0aec0;
      padding: 2rem !important;
      font-style: italic;
    }

    @media (max-width: 1024px) {
      .content-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .page-title {
        font-size: 1.5rem;
      }

      .stats-grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
      }

      .stat-card {
        flex-direction: column;
        text-align: center;
      }

      .stat-icon {
        width: 48px;
        height: 48px;
      }

      .stat-value {
        font-size: 1.5rem;
      }

      .card-header {
        padding: 1rem;
      }

      .card-body {
        padding: 1rem;
      }

      .data-table th,
      .data-table td {
        padding: 0.5rem;
        font-size: 0.75rem;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  private k8sService = inject(K8sApiService);

  pods = signal<Pod[]>([]);
  deployments = signal<Deployment[]>([]);
  services = signal<Service[]>([]);
  nodes = signal<Node[]>([]);

  runningPods = signal(0);
  readyNodes = signal(0);

  ngOnInit() {
    this.loadData();
    // Refresh data every 30 seconds
    setInterval(() => this.loadData(), 30000);
  }

  private loadData() {
    this.k8sService.getPods('default').subscribe({
      next: (data) => {
        this.pods.set(data);
        this.runningPods.set(data.filter(p => p.status.toLowerCase() === 'running').length);
      },
      error: (err) => console.error('Failed to load pods:', err)
    });

    this.k8sService.getDeployments('default').subscribe({
      next: (data) => this.deployments.set(data),
      error: (err) => console.error('Failed to load deployments:', err)
    });

    this.k8sService.getServices('default').subscribe({
      next: (data) => this.services.set(data),
      error: (err) => console.error('Failed to load services:', err)
    });

    this.k8sService.getNodes().subscribe({
      next: (data) => {
        this.nodes.set(data);
        this.readyNodes.set(data.filter(n => n.status.toLowerCase() === 'ready').length);
      },
      error: (err) => console.error('Failed to load nodes:', err)
    });
  }
}
