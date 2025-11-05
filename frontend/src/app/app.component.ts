import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, DashboardComponent],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <div class="main-content">
        <app-sidebar></app-sidebar>
        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .main-content {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    .content {
      flex: 1;
      overflow-y: auto;
      padding: 2rem;
      background: #f5f7fa;
    }

    @media (max-width: 768px) {
      .content {
        padding: 1rem;
      }
    }
  `]
})
export class AppComponent {
  title = 'K3S Admin';
}
