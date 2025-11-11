# Quick Start Guide

Get started with K3S Admin Theme in 5 minutes.

## Step 1: Copy Theme to Your Project

```bash
# From the k3s-monitoring directory
cp -r theme /path/to/your-angular-project/src/
```

## Step 2: Import Theme

### Option A: Full Theme (Recommended for new projects)

In `src/styles.scss`:

```scss
@use 'theme/styles/k3s-admin-theme.scss';
```

### Option B: Angular Material Only

In `src/styles.scss`:

```scss
@use 'theme/styles/k3s-admin-material.scss';
```

### Option C: Custom Selection

```scss
// Import only what you need
@use 'theme/styles/base/colors';
@use 'theme/styles/base/variables';
@use 'theme/styles/mixins/gradients';
@use 'theme/styles/mixins/components';
@use 'theme/styles/components/utilities';
```

## Step 3: Use in Your Components

### HTML Example

```html
<div class="card">
  <div class="card-header">
    <h3 class="gradient-primary-text">My First Card</h3>
    <span class="badge badge-success">New</span>
  </div>
  <div class="card-body">
    <p class="text-muted mb-md">
      This is a beautiful card with gradient text and a success badge.
    </p>
    <div class="flex gap-sm">
      <button class="btn btn-primary">Primary Action</button>
      <button class="btn btn-outline-primary">Secondary</button>
    </div>
  </div>
</div>
```

### SCSS Example

```scss
@use 'theme/styles/mixins/components' as mix;
@use 'theme/styles/mixins/gradients' as grad;

.my-component {
  @include mix.card;

  .header {
    @include grad.gradient-primary;
    padding: 1rem;
    border-radius: 8px;

    h1 {
      @include grad.gradient-primary-text;
    }
  }

  .button {
    @include mix.button-primary;
  }
}
```

## Step 4: Angular Material Setup (Optional)

If using Angular Material:

### 1. Install Angular Material

```bash
ng add @angular/material
```

### 2. Update styles.scss

```scss
// Remove default Material theme, use our custom theme instead
@use 'theme/styles/k3s-admin-material.scss';
```

### 3. Use Material Components

```html
<button mat-raised-button color="primary">Material Button</button>

<mat-card>
  <mat-card-header>
    <mat-card-title>Material Card</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    Content here
  </mat-card-content>
</mat-card>
```

## Step 5: Add Dark Mode (Optional)

### Automatic Dark Mode

The theme automatically detects system dark mode preference.

### Manual Toggle

```typescript
// app.component.ts
export class AppComponent {
  isDarkMode = false;

  ngOnInit() {
    // Load saved preference
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.updateDarkMode();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.updateDarkMode();
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  private updateDarkMode() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
```

```html
<!-- app.component.html -->
<button (click)="toggleDarkMode()" class="btn btn-outline-primary">
  {{ isDarkMode ? '☀️ Light' : '🌙 Dark' }}
</button>
```

## Common Patterns

### Dashboard Layout

```html
<div class="p-lg">
  <!-- Header -->
  <div class="gradient-bg-purple p-xl rounded-2xl mb-lg">
    <h1 class="text-white text-3xl font-bold">Dashboard</h1>
    <p class="text-white">Welcome back!</p>
  </div>

  <!-- Stats Grid -->
  <div class="grid-auto-fit gap-lg mb-lg">
    <div class="card text-center">
      <div class="gradient-primary p-md rounded-lg mb-md mx-auto" style="width: 64px;">
        <span class="text-white text-2xl">📊</span>
      </div>
      <h3 class="gradient-primary-text text-2xl font-bold">1,234</h3>
      <p class="text-muted">Total Users</p>
    </div>

    <div class="card text-center">
      <div class="gradient-success p-md rounded-lg mb-md mx-auto" style="width: 64px;">
        <span class="text-white text-2xl">✅</span>
      </div>
      <h3 class="gradient-success-text text-2xl font-bold">98%</h3>
      <p class="text-muted">Uptime</p>
    </div>

    <div class="card text-center">
      <div class="gradient-info p-md rounded-lg mb-md mx-auto" style="width: 64px;">
        <span class="text-white text-2xl">🚀</span>
      </div>
      <h3 class="gradient-info-text text-2xl font-bold">45</h3>
      <p class="text-muted">Active Tasks</p>
    </div>
  </div>

  <!-- Content Card -->
  <div class="card">
    <div class="card-header">
      <h3>Recent Activity</h3>
      <button class="btn btn-sm btn-primary">View All</button>
    </div>
    <div class="card-body">
      <p class="text-muted">Your content here...</p>
    </div>
  </div>
</div>
```

### Form Layout

```html
<div class="card" style="max-width: 600px; margin: 2rem auto;">
  <div class="card-header">
    <h3 class="gradient-primary-text">Create Account</h3>
  </div>
  <div class="card-body">
    <form class="flex flex-column gap-md">
      <div>
        <label class="text-sm font-medium mb-xs block">Full Name</label>
        <input type="text" class="input-base" placeholder="John Doe">
      </div>

      <div>
        <label class="text-sm font-medium mb-xs block">Email</label>
        <input type="email" class="input-base" placeholder="john@example.com">
      </div>

      <div>
        <label class="text-sm font-medium mb-xs block">Password</label>
        <input type="password" class="input-base" placeholder="••••••••">
      </div>

      <div class="flex gap-sm mt-md">
        <button type="submit" class="btn btn-primary flex-1">Sign Up</button>
        <button type="button" class="btn btn-outline-primary">Cancel</button>
      </div>
    </form>
  </div>
</div>
```

## Customization

### Override Colors

Create `src/theme-overrides.scss`:

```scss
:root {
  // Override primary color
  --color-primary-start: #ff6b6b;
  --color-primary-end: #ee5a6f;

  // Override spacing
  --spacing-md: 1.25rem;

  // Override border radius
  --radius-lg: 16px;
}
```

Then import before the theme:

```scss
@use 'theme-overrides';
@use 'theme/styles/k3s-admin-theme';
```

### Create Custom Gradient

```scss
@use 'theme/styles/mixins/gradients' as grad;

.my-custom-gradient {
  @include grad.gradient-bg(linear-gradient(135deg, #667eea 0%, #764ba2 100%));
}
```

## Troubleshooting

### Styles not applying?

1. Check import order in `styles.scss`
2. Make sure path to theme is correct
3. Clear Angular cache: `rm -rf .angular`
4. Rebuild: `ng serve --poll 2000`

### Angular Material conflicts?

Make sure you're not importing two Material themes:

```scss
// ❌ Don't do this
@use '@angular/material' as mat;
@include mat.all-component-themes(...);
@use 'theme/styles/k3s-admin-material';

// ✅ Do this instead
@use 'theme/styles/k3s-admin-material';
```

### Dark mode not working?

Check that `dark-mode` class is added to body:

```typescript
// Verify in console
console.log(document.body.classList.contains('dark-mode'));
```

## Next Steps

- Read [README.md](./README.md) for complete documentation
- Check [EXAMPLES.md](./EXAMPLES.md) for more examples
- Explore the [styles](./styles) directory for available mixins and utilities

## Need Help?

- Check the documentation files
- Review the K3S Admin app source code for real examples
- Open an issue on GitHub

---

Happy coding! 🎉
