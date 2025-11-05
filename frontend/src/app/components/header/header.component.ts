import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { K8sApiService } from '../../services/k8s-api.service';
import { ResourceMetrics } from '../../models/kubernetes.models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="header-content">
        <div class="logo-section">
          <svg class="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2"/>
          </svg>
          <h1 class="logo-text">K3S Admin</h1>
        </div>

        <div class="metrics-section">
          <div class="metric-card">
            <div class="metric-icon nodes-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/>
                <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/>
                <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/>
                <rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <div class="metric-info">
              <span class="metric-label">Nodes</span>
              <span class="metric-value">{{ metrics?.nodeCount || 0 }}</span>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-icon pods-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="12" r="3" fill="currentColor"/>
              </svg>
            </div>
            <div class="metric-info">
              <span class="metric-label">Pods</span>
              <span class="metric-value">{{ metrics?.podCount || 0 }}</span>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-icon cpu-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" stroke-width="2"/>
                <path d="M9 2V6M15 2V6M9 18V22M15 18V22M2 9H6M2 15H6M18 9H22M18 15H22" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <div class="metric-info">
              <span class="metric-label">CPU</span>
              <span class="metric-value">{{ metrics?.cpuUsage || 'N/A' }}</span>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-icon memory-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" stroke-width="2"/>
                <path d="M8 10H16M8 14H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="metric-info">
              <span class="metric-label">Memory</span>
              <span class="metric-value">{{ metrics?.memoryUsage || 'N/A' }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .logo-icon {
      width: 40px;
      height: 40px;
      color: #667eea;
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 0;
    }

    .metrics-section {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .metric-card {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
      border-radius: 12px;
      transition: all 0.3s ease;
    }

    .metric-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .metric-icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
    }

    .metric-icon svg {
      width: 100%;
      height: 100%;
    }

    .nodes-icon {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .pods-icon {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
    }

    .cpu-icon {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
    }

    .memory-icon {
      background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
      color: white;
    }

    .metric-info {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
    }

    .metric-label {
      font-size: 0.75rem;
      color: #6c757d;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .metric-value {
      font-size: 1.125rem;
      font-weight: 700;
      color: #2d3748;
    }

    @media (max-width: 1024px) {
      .header-content {
        flex-direction: column;
        gap: 1rem;
      }

      .metrics-section {
        width: 100%;
        justify-content: center;
      }
    }

    @media (max-width: 768px) {
      .header-content {
        padding: 1rem;
      }

      .logo-text {
        font-size: 1.25rem;
      }

      .logo-icon {
        width: 32px;
        height: 32px;
      }

      .metrics-section {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        width: 100%;
        gap: 0.5rem;
      }

      .metric-card {
        padding: 0.5rem 0.75rem;
      }

      .metric-icon {
        width: 32px;
        height: 32px;
      }

      .metric-value {
        font-size: 1rem;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  private k8sService = inject(K8sApiService);
  metrics: ResourceMetrics | null = null;

  ngOnInit() {
    this.loadMetrics();
    // Refresh metrics every 30 seconds
    setInterval(() => this.loadMetrics(), 30000);
  }

  private loadMetrics() {
    this.k8sService.getMetrics().subscribe({
      next: (data) => this.metrics = data,
      error: (err) => console.error('Failed to load metrics:', err)
    });
  }
}
