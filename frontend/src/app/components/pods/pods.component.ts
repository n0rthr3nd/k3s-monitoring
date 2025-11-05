import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { K8sApiService } from '../../services/k8s-api.service';
import { Pod, Namespace } from '../../models/kubernetes.models';

@Component({
  selector: 'app-pods',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="pods-page">
      <div class="page-header">
        <h2 class="page-title">Pods Management</h2>
        <div class="header-actions">
          <select [(ngModel)]="selectedNamespace" (change)="onNamespaceChange()" class="namespace-select">
            @for (ns of namespaces(); track ns.name) {
              <option [value]="ns.name">{{ ns.name }}</option>
            }
          </select>
          <button (click)="loadPods()" class="refresh-btn">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 2V8M21 8H15M21 8L18 5.29C16.82 4.12 15.3 3.37 13.66 3.14M3 22V16M3 16H9M3 16L6 18.71C7.18 19.88 8.7 20.63 10.34 20.86M3 12C3 16.97 7.03 21 12 21M21 12C21 7.03 16.97 3 12 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <div class="pods-grid">
        @for (pod of pods(); track pod.name) {
          <div class="pod-card" [class]="'status-' + pod.status.toLowerCase()">
            <div class="pod-header">
              <div class="pod-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                  <circle cx="12" cy="12" r="3" fill="currentColor"/>
                </svg>
              </div>
              <div class="pod-info">
                <h3 class="pod-name">{{ pod.name }}</h3>
                <span class="namespace-badge">{{ pod.namespace }}</span>
              </div>
              <span class="status-badge" [class]="'status-' + pod.status.toLowerCase()">
                {{ pod.status }}
              </span>
            </div>

            <div class="pod-details">
              <div class="detail-row">
                <span class="detail-label">Ready:</span>
                <span class="detail-value">{{ pod.ready }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Restarts:</span>
                <span class="detail-value">{{ pod.restarts }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Age:</span>
                <span class="detail-value">{{ pod.age }}</span>
              </div>
              @if (pod.ip) {
                <div class="detail-row">
                  <span class="detail-label">IP:</span>
                  <span class="detail-value">{{ pod.ip }}</span>
                </div>
              }
              @if (pod.node) {
                <div class="detail-row">
                  <span class="detail-label">Node:</span>
                  <span class="detail-value">{{ pod.node }}</span>
                </div>
              }
            </div>

            <div class="pod-actions">
              <button (click)="viewLogs(pod)" class="action-btn logs-btn">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Logs
              </button>
              <button (click)="deletePod(pod)" class="action-btn delete-btn">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Delete
              </button>
            </div>
          </div>
        }
        @if (pods().length === 0) {
          <div class="no-data">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
              <path d="M12 8V12M12 16H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <p>No pods found in namespace "{{ selectedNamespace }}"</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .pods-page {
      animation: fadeIn 0.5s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .page-title {
      font-size: 2rem;
      font-weight: 700;
      color: #2d3748;
      margin: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .header-actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .namespace-select {
      padding: 0.75rem 1rem;
      border: 2px solid #e2e8f0;
      border-radius: 10px;
      font-size: 0.875rem;
      font-weight: 500;
      color: #2d3748;
      background: white;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .namespace-select:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .refresh-btn {
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
    }

    .refresh-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }

    .refresh-btn svg {
      width: 20px;
      height: 20px;
    }

    .pods-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .pod-card {
      background: white;
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .pod-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #667eea, #764ba2);
    }

    .pod-card.status-running::before {
      background: linear-gradient(90deg, #43e97b, #38f9d7);
    }

    .pod-card.status-pending::before {
      background: linear-gradient(90deg, #fa709a, #fee140);
    }

    .pod-card.status-failed::before,
    .pod-card.status-error::before {
      background: linear-gradient(90deg, #f5576c, #f093fb);
    }

    .pod-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    .pod-header {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .pod-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }

    .pod-icon svg {
      width: 24px;
      height: 24px;
    }

    .pod-info {
      flex: 1;
      min-width: 0;
    }

    .pod-name {
      font-size: 1rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 0.5rem 0;
      word-break: break-word;
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
      padding: 0.5rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: capitalize;
      white-space: nowrap;
    }

    .status-badge.status-running {
      background: #c6f6d5;
      color: #22543d;
    }

    .status-badge.status-pending {
      background: #feebc8;
      color: #7c2d12;
    }

    .status-badge.status-failed,
    .status-badge.status-error {
      background: #fed7d7;
      color: #742a2a;
    }

    .pod-details {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
      padding: 1rem;
      background: #f7fafc;
      border-radius: 10px;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .detail-label {
      font-size: 0.875rem;
      color: #718096;
      font-weight: 500;
    }

    .detail-value {
      font-size: 0.875rem;
      color: #2d3748;
      font-weight: 600;
    }

    .pod-actions {
      display: flex;
      gap: 0.5rem;
    }

    .action-btn {
      flex: 1;
      padding: 0.75rem;
      border: none;
      border-radius: 10px;
      font-weight: 600;
      font-size: 0.875rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
    }

    .action-btn svg {
      width: 16px;
      height: 16px;
    }

    .logs-btn {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
    }

    .logs-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(79, 172, 254, 0.4);
    }

    .delete-btn {
      background: linear-gradient(135deg, #f5576c 0%, #f093fb 100%);
      color: white;
    }

    .delete-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(245, 87, 108, 0.4);
    }

    .no-data {
      grid-column: 1 / -1;
      text-align: center;
      padding: 4rem 2rem;
      color: #a0aec0;
    }

    .no-data svg {
      width: 64px;
      height: 64px;
      margin-bottom: 1rem;
      color: #cbd5e0;
    }

    .no-data p {
      font-size: 1.125rem;
      margin: 0;
    }

    @media (max-width: 768px) {
      .pods-grid {
        grid-template-columns: 1fr;
      }

      .page-header {
        flex-direction: column;
        align-items: flex-start;
      }

      .header-actions {
        width: 100%;
        flex-direction: column;
      }

      .namespace-select,
      .refresh-btn {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class PodsComponent implements OnInit {
  private k8sService = inject(K8sApiService);

  pods = signal<Pod[]>([]);
  namespaces = signal<Namespace[]>([]);
  selectedNamespace = 'default';

  ngOnInit() {
    this.loadNamespaces();
    this.loadPods();
  }

  loadNamespaces() {
    this.k8sService.getNamespaces().subscribe({
      next: (data) => this.namespaces.set(data),
      error: (err) => console.error('Failed to load namespaces:', err)
    });
  }

  loadPods() {
    this.k8sService.getPods(this.selectedNamespace).subscribe({
      next: (data) => this.pods.set(data),
      error: (err) => console.error('Failed to load pods:', err)
    });
  }

  onNamespaceChange() {
    this.loadPods();
  }

  viewLogs(pod: Pod) {
    this.k8sService.getPodLogs(pod.namespace, pod.name).subscribe({
      next: (logs) => {
        console.log('Pod logs:', logs);
        alert(`Logs for ${pod.name}:\n\n${logs.map(l => `[${l.timestamp}] ${l.message}`).join('\n')}`);
      },
      error: (err) => console.error('Failed to load logs:', err)
    });
  }

  deletePod(pod: Pod) {
    if (confirm(`Are you sure you want to delete pod "${pod.name}"?`)) {
      this.k8sService.deletePod(pod.namespace, pod.name).subscribe({
        next: () => {
          console.log('Pod deleted successfully');
          this.loadPods();
        },
        error: (err) => console.error('Failed to delete pod:', err)
      });
    }
  }
}
