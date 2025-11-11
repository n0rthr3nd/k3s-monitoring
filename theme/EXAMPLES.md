# K3S Admin Theme - Usage Examples

Quick reference guide with copy-paste examples.

## Quick Start

### 1. Installation

```scss
// In your src/styles.scss
@use '../theme/styles/k3s-admin-theme.scss';
```

### 2. Your First Component

```html
<div class="card">
  <h3 class="gradient-primary-text">Hello World</h3>
  <button class="btn btn-primary">Click Me</button>
</div>
```

## Common Patterns

### Dashboard Card with Stats

```html
<div class="card">
  <div class="card-header">
    <h3>Server Statistics</h3>
    <span class="badge badge-success">Online</span>
  </div>
  <div class="card-body">
    <div class="grid grid-cols-2 gap-md">
      <div class="glass p-md rounded-lg text-center">
        <p class="text-muted text-xs">CPU Usage</p>
        <h2 class="gradient-info-text">45%</h2>
      </div>
      <div class="glass p-md rounded-lg text-center">
        <p class="text-muted text-xs">Memory</p>
        <h2 class="gradient-success-text">2.1GB</h2>
      </div>
    </div>
  </div>
</div>
```

### Action Buttons Group

```html
<div class="flex gap-sm">
  <button class="btn btn-primary">
    <svg class="icon">...</svg>
    Save
  </button>
  <button class="btn btn-danger">
    <svg class="icon">...</svg>
    Delete
  </button>
  <button class="btn btn-outline-primary">Cancel</button>
</div>
```

### Status Badges

```html
<div class="flex gap-sm flex-wrap">
  <span class="badge badge-success">Running</span>
  <span class="badge badge-warning">Pending</span>
  <span class="badge badge-danger">Failed</span>
  <span class="badge badge-info">Info</span>
  <span class="badge badge-light">Draft</span>
</div>
```

### Grid Layout

```html
<div class="grid-auto-fit gap-lg">
  <div class="card">
    <h4>Card 1</h4>
    <p class="text-muted">Content</p>
  </div>
  <div class="card">
    <h4>Card 2</h4>
    <p class="text-muted">Content</p>
  </div>
  <div class="card">
    <h4>Card 3</h4>
    <p class="text-muted">Content</p>
  </div>
</div>
```

### Glass Card with Gradient Background

```html
<div class="gradient-primary p-xl rounded-2xl">
  <div class="glass p-lg rounded-xl">
    <h3 class="text-white mb-md">Premium Feature</h3>
    <p class="text-white">Unlock exclusive content</p>
    <button class="btn btn-outline-primary mt-md">Learn More</button>
  </div>
</div>
```

### Table with Hover

```html
<div class="card">
  <div class="card-header">
    <h3>Users</h3>
  </div>
  <div class="card-body">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="font-semibold">John Doe</td>
          <td>john@example.com</td>
          <td><span class="badge badge-success">Active</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### Form Layout

```html
<div class="card">
  <div class="card-header">
    <h3>Create User</h3>
  </div>
  <div class="card-body">
    <div class="flex flex-column gap-md">
      <div>
        <label class="text-sm font-medium text-secondary">Name</label>
        <input type="text" class="input-base" placeholder="Enter name">
      </div>

      <div>
        <label class="text-sm font-medium text-secondary">Email</label>
        <input type="email" class="input-base" placeholder="Enter email">
      </div>

      <div class="flex gap-sm mt-md">
        <button class="btn btn-primary flex-1">Create</button>
        <button class="btn btn-outline-primary">Cancel</button>
      </div>
    </div>
  </div>
</div>
```

### Hero Section

```html
<div class="gradient-bg-purple p-3xl rounded-2xl text-center">
  <h1 class="text-white text-4xl font-bold mb-md">
    Welcome to K3S Admin
  </h1>
  <p class="text-white text-lg mb-xl">
    Manage your Kubernetes cluster with ease
  </p>
  <div class="flex flex-center gap-md">
    <button class="btn btn-primary btn-lg">Get Started</button>
    <button class="btn btn-outline-primary btn-lg">Learn More</button>
  </div>
</div>
```

### Animated Card Grid

```html
<div class="grid-auto-fit gap-lg">
  <div class="card hover-lift fade-in">
    <div class="gradient-primary p-md rounded-lg mb-md">
      <svg class="icon text-white">...</svg>
    </div>
    <h4 class="mb-sm">Feature 1</h4>
    <p class="text-muted text-sm">Description goes here</p>
  </div>

  <div class="card hover-lift fade-in" style="animation-delay: 0.1s">
    <div class="gradient-success p-md rounded-lg mb-md">
      <svg class="icon text-white">...</svg>
    </div>
    <h4 class="mb-sm">Feature 2</h4>
    <p class="text-muted text-sm">Description goes here</p>
  </div>

  <div class="card hover-lift fade-in" style="animation-delay: 0.2s">
    <div class="gradient-info p-md rounded-lg mb-md">
      <svg class="icon text-white">...</svg>
    </div>
    <h4 class="mb-sm">Feature 3</h4>
    <p class="text-muted text-sm">Description goes here</p>
  </div>
</div>
```

### Alert/Notification

```html
<div class="gradient-danger p-md rounded-lg flex flex-between">
  <div class="flex gap-sm">
    <svg class="icon text-white">⚠️</svg>
    <p class="text-white font-medium">Action required!</p>
  </div>
  <button class="btn btn-sm">Dismiss</button>
</div>
```

### Sidebar Navigation

```html
<nav class="flex flex-column gap-sm p-md">
  <a href="#" class="flex gap-sm p-sm rounded-lg hover-lift">
    <svg class="icon">📊</svg>
    <span class="font-medium">Dashboard</span>
  </a>

  <a href="#" class="gradient-primary p-sm rounded-lg flex gap-sm">
    <svg class="icon text-white">📦</svg>
    <span class="font-medium text-white">Pods</span>
  </a>

  <a href="#" class="flex gap-sm p-sm rounded-lg hover-lift">
    <svg class="icon">⚙️</svg>
    <span class="font-medium">Settings</span>
  </a>
</nav>
```

## Angular Material Examples

### Material Card

```html
<mat-card class="fade-in">
  <mat-card-header>
    <mat-card-title class="gradient-primary-text">
      User Profile
    </mat-card-title>
  </mat-card-header>

  <mat-card-content>
    <mat-form-field appearance="outline" class="w-full">
      <mat-label>Email</mat-label>
      <input matInput type="email">
    </mat-form-field>
  </mat-card-content>

  <mat-card-actions align="end">
    <button mat-button>Cancel</button>
    <button mat-raised-button color="primary">Save</button>
  </mat-card-actions>
</mat-card>
```

### Material Toolbar

```html
<mat-toolbar color="primary">
  <span class="text-xl font-bold">K3S Admin</span>
  <span class="flex-1"></span>
  <button mat-icon-button>
    <mat-icon>notifications</mat-icon>
  </button>
  <button mat-icon-button>
    <mat-icon>account_circle</mat-icon>
  </button>
</mat-toolbar>
```

### Material Chip List

```html
<mat-chip-listbox>
  <mat-chip-option color="primary">Running</mat-chip-option>
  <mat-chip-option color="accent">Pending</mat-chip-option>
  <mat-chip-option color="warn">Failed</mat-chip-option>
</mat-chip-listbox>
```

### Material Dialog

```typescript
// Component TypeScript
openDialog() {
  this.dialog.open(MyDialogComponent, {
    panelClass: 'custom-dialog'
  });
}
```

```html
<!-- Dialog Content -->
<h2 mat-dialog-title class="gradient-primary-text">Confirm Action</h2>
<mat-dialog-content>
  <p>Are you sure you want to proceed?</p>
</mat-dialog-content>
<mat-dialog-actions align="end">
  <button mat-button mat-dialog-close>Cancel</button>
  <button mat-raised-button color="primary" [mat-dialog-close]="true">
    Confirm
  </button>
</mat-dialog-actions>
```

## SCSS Component Examples

### Custom Component with Mixins

```scss
@use 'theme/styles/mixins/components' as mix;
@use 'theme/styles/mixins/gradients' as grad;
@use 'theme/styles/mixins/responsive' as resp;
@use 'theme/styles/base/colors' as colors;

.my-dashboard {
  @include mix.container;

  .stats-grid {
    @include mix.grid-auto-fit(250px);

    .stat-card {
      @include mix.card;

      .stat-icon {
        @include grad.gradient-primary;
        padding: colors.$spacing-md;
        border-radius: colors.$radius-lg;
      }

      .stat-value {
        @include grad.gradient-success-text;
        font-size: colors.$font-size-3xl;
        font-weight: colors.$font-weight-bold;
      }
    }
  }

  @include resp.md {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @include resp.lg {
    .stats-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
```

### Animated Button

```scss
@use 'theme/styles/mixins/components' as mix;
@use 'theme/styles/base/colors' as colors;

.animated-button {
  @include mix.button-primary;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(white, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:hover::before {
    width: 300px;
    height: 300px;
  }
}
```

## Tips & Tricks

### Combine Utilities

```html
<!-- Multiple utilities work together -->
<div class="card p-xl shadow-xl rounded-2xl fade-in">
  <h3 class="gradient-primary-text font-bold text-2xl mb-md">
    Combining Classes
  </h3>
  <p class="text-muted mb-lg">
    Stack utilities for powerful results
  </p>
  <button class="btn btn-primary hover-scale">
    Animated Button
  </button>
</div>
```

### Responsive Visibility

```html
<!-- Show on mobile only -->
<div class="show-sm-only">
  Mobile Menu
</div>

<!-- Hide on mobile -->
<div class="hide-sm">
  Desktop Sidebar
</div>
```

### Dark Mode Toggle

```typescript
// In your component
toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark.toString());
}

ngOnInit() {
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) {
    document.body.classList.add('dark-mode');
  }
}
```

---

For more information, see the main [README.md](./README.md)
