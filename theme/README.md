# K3S Admin Theme

A modern, professional, and gradient-based design system for Angular applications. Built with beautiful color palettes, smooth animations, and full Angular Material support.

![Theme Preview](https://img.shields.io/badge/Theme-K3S%20Admin-purple)
![Angular Material](https://img.shields.io/badge/Angular%20Material-Compatible-red)
![SCSS](https://img.shields.io/badge/SCSS-Based-pink)

## Features

### Design System
- 🎨 **Modern Gradient Palette**: Purple, Green, Blue, Pink, and Yellow gradients
- 🎯 **Pre-built Components**: Cards, buttons, badges, and more
- 📱 **Fully Responsive**: Mobile-first design with breakpoint mixins
- 🌓 **Dark Mode Support**: Built-in dark theme support
- ⚡ **Performance Optimized**: Minimal CSS output with SCSS
- 🔧 **Customizable**: Easy to override and extend

### Angular Material Integration
- ✅ Custom Material palettes matching the gradient theme
- ✅ Pre-styled Material components (buttons, cards, chips, etc.)
- ✅ Gradient-enhanced Material components
- ✅ Consistent design language across Material and custom components

## Installation

### Option 1: Copy Theme Folder

1. Copy the entire `theme` folder to your Angular project:
```bash
cp -r theme /path/to/your-angular-project/src/
```

2. Import the theme in your global `styles.scss`:
```scss
// For full theme with utilities
@use 'theme/styles/k3s-admin-theme.scss';

// OR for Angular Material only
@use 'theme/styles/k3s-admin-material.scss';
```

### Option 2: NPM Package (Future)

```bash
npm install @k3s-admin/theme
```

## Usage

### Basic Setup

1. **Import the theme** in your `src/styles.scss`:

```scss
@use 'theme/styles/k3s-admin-theme.scss';
```

2. **Start using utility classes** in your components:

```html
<div class="card">
  <div class="card-header">
    <h3>My Card</h3>
    <span class="badge badge-primary">New</span>
  </div>
  <div class="card-body">
    <p>Card content goes here</p>
    <button class="btn btn-primary">Click Me</button>
  </div>
</div>
```

### With Angular Material

1. **Import Material theme** in your `src/styles.scss`:

```scss
@use 'theme/styles/k3s-admin-material.scss';
```

2. **Use Material components** with automatic theming:

```html
<button mat-raised-button color="primary">Primary Button</button>
<mat-card>
  <mat-card-header>
    <mat-card-title>Card Title</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    Card content
  </mat-card-content>
</mat-card>
```

## Color Palette

### Brand Colors

```scss
// Primary (Purple/Blue)
--color-primary-start: #667eea
--color-primary-end: #764ba2

// Success (Green/Cyan)
--color-success-start: #43e97b
--color-success-end: #38f9d7

// Warning (Pink/Yellow)
--color-warning-start: #fa709a
--color-warning-end: #fee140

// Danger (Red/Pink)
--color-danger-start: #f5576c
--color-danger-end: #f093fb

// Info (Blue/Cyan)
--color-info-start: #4facfe
--color-info-end: #00f2fe
```

### Using Colors

#### CSS Variables (Recommended)
```css
.my-element {
  background: var(--gradient-primary);
  color: var(--text-primary);
  border-color: var(--border-light);
}
```

#### SCSS Variables
```scss
@use 'theme/styles/base/colors' as colors;

.my-element {
  background: colors.$gradient-primary;
  color: colors.$text-primary;
}
```

## Components

### Buttons

```html
<!-- Gradient Buttons -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-info">Info</button>

<!-- Outline Buttons -->
<button class="btn btn-outline-primary">Outline</button>

<!-- Button Sizes -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary btn-lg">Large</button>
```

### Cards

```html
<div class="card">
  <div class="card-header">
    <h3>Card Title</h3>
    <span class="badge badge-primary">Badge</span>
  </div>
  <div class="card-body">
    <p>Card content goes here</p>
  </div>
</div>

<!-- Card without hover effect -->
<div class="card card-no-hover">
  Content
</div>
```

### Badges

```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-danger">Danger</span>
<span class="badge badge-info">Info</span>
<span class="badge badge-light">Light</span>
```

### Gradients

```html
<!-- Gradient Background -->
<div class="gradient-primary p-lg rounded-xl">
  <p class="text-white">Content with gradient background</p>
</div>

<!-- Gradient Text -->
<h1 class="gradient-primary-text">Gradient Text</h1>
<h2 class="gradient-success-text">Success Gradient Text</h2>
```

## Utility Classes

### Spacing

```html
<!-- Margin -->
<div class="m-md">Margin medium</div>
<div class="mt-lg">Margin top large</div>
<div class="mx-xl">Margin horizontal extra-large</div>

<!-- Padding -->
<div class="p-sm">Padding small</div>
<div class="pt-md">Padding top medium</div>
<div class="px-lg">Padding horizontal large</div>
```

Available sizes: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`

### Typography

```html
<!-- Font Sizes -->
<p class="text-xs">Extra small</p>
<p class="text-sm">Small</p>
<p class="text-base">Base</p>
<p class="text-lg">Large</p>
<p class="text-xl">Extra large</p>
<p class="text-2xl">2X large</p>

<!-- Font Weights -->
<p class="font-normal">Normal</p>
<p class="font-medium">Medium</p>
<p class="font-semibold">Semibold</p>
<p class="font-bold">Bold</p>

<!-- Text Colors -->
<p class="text-primary">Primary</p>
<p class="text-secondary">Secondary</p>
<p class="text-muted">Muted</p>
<p class="text-white">White</p>
```

### Shadows

```html
<div class="shadow-sm">Small shadow</div>
<div class="shadow-md">Medium shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-xl">Extra large shadow</div>
<div class="shadow-primary">Primary colored shadow</div>
```

### Border Radius

```html
<div class="rounded-sm">Small radius</div>
<div class="rounded-lg">Large radius</div>
<div class="rounded-xl">Extra large radius</div>
<div class="rounded-full">Full radius (pill)</div>
```

### Flexbox

```html
<div class="flex flex-center gap-md">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<div class="flex flex-between">
  <div>Left</div>
  <div>Right</div>
</div>

<div class="flex flex-column gap-lg">
  <div>Top</div>
  <div>Bottom</div>
</div>
```

### Grid

```html
<!-- Auto-fit grid -->
<div class="grid-auto-fit gap-lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Fixed columns -->
<div class="grid grid-cols-3 gap-md">
  <div>Col 1</div>
  <div>Col 2</div>
  <div>Col 3</div>
</div>
```

### Animations

```html
<div class="fade-in">Fade in animation</div>
<div class="slide-in-left">Slide in from left</div>
<div class="hover-lift">Lift on hover</div>
<div class="hover-scale">Scale on hover</div>
```

### Effects

```html
<!-- Glassmorphism -->
<div class="glass p-lg rounded-xl">
  Glass effect
</div>

<!-- Custom Scrollbar -->
<div class="custom-scrollbar" style="height: 200px; overflow: auto;">
  Scrollable content
</div>
```

## SCSS Mixins

### Using Mixins in Your Components

```scss
@use 'theme/styles/mixins/components' as mix;
@use 'theme/styles/mixins/gradients' as grad;
@use 'theme/styles/mixins/responsive' as resp;

.my-component {
  // Apply card styling
  @include mix.card;

  .header {
    // Apply gradient
    @include grad.gradient-primary;

    h1 {
      // Gradient text
      @include grad.gradient-primary-text;
    }
  }

  .button {
    // Custom button
    @include mix.button-primary;
  }

  // Responsive
  @include resp.md {
    padding: 2rem;
  }
}
```

### Available Mixins

#### Gradient Mixins
- `gradient-primary`, `gradient-success`, `gradient-warning`, `gradient-danger`, `gradient-info`
- `gradient-primary-text`, `gradient-success-text`, etc.
- `gradient-border($gradient, $width, $radius)`
- `animated-gradient($gradient, $duration)`

#### Component Mixins
- `card($padding, $radius, $shadow)`
- `button-primary`, `button-success`, `button-danger`, etc.
- `button-outline($color)`
- `badge($bg-gradient, $color)`
- `input-base`
- `glass($blur, $opacity)`
- `scrollbar($width, $track-color, $thumb-gradient)`

#### Layout Mixins
- `flex-center`, `flex-between`, `flex-column`
- `grid-auto-fit($min-width, $gap)`
- `container($max-width, $padding)`

#### Responsive Mixins
- `sm`, `md`, `lg`, `xl`, `xxl` - Min-width breakpoints
- `sm-down`, `md-down`, `lg-down` - Max-width breakpoints
- `between($min, $max)`
- `responsive-font($mobile, $desktop)`
- `hide-sm`, `hide-md`, `show-sm-only`

## Dark Mode

The theme includes built-in dark mode support:

### Automatic (System Preference)
Dark mode activates automatically based on system preferences.

### Manual Toggle
Add the `dark-mode` class to enable dark mode:

```html
<body class="dark-mode">
  <!-- Your app -->
</body>
```

### Programmatic Toggle (Angular)

```typescript
export class AppComponent {
  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }
}
```

## Responsive Design

The theme uses mobile-first responsive design:

```scss
@use 'theme/styles/mixins/responsive' as resp;

.my-component {
  padding: 1rem;

  @include resp.md {
    padding: 2rem;
  }

  @include resp.lg {
    padding: 3rem;
  }
}
```

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Customization

### Override Variables

Create your own variables file and override defaults:

```scss
// my-theme-overrides.scss
:root {
  --color-primary-start: #your-color;
  --color-primary-end: #your-other-color;
  --radius-lg: 16px;
}

// Then import the theme
@use 'theme/styles/k3s-admin-theme.scss';
```

### Extend with Custom Components

```scss
@use 'theme/styles/base/colors' as colors;
@use 'theme/styles/mixins/components' as mix;

.my-custom-component {
  @include mix.card;
  background: colors.$gradient-info;

  &:hover {
    transform: rotate(2deg);
  }
}
```

## Examples

### Complete Component Example

```html
<div class="card fade-in">
  <div class="card-header">
    <div class="flex flex-between">
      <h3 class="gradient-primary-text">Dashboard Stats</h3>
      <span class="badge badge-success">Live</span>
    </div>
  </div>

  <div class="card-body">
    <div class="grid grid-cols-2 gap-lg">
      <div class="glass p-md rounded-lg">
        <p class="text-muted text-sm">Total Users</p>
        <h2 class="gradient-success-text">1,234</h2>
      </div>

      <div class="glass p-md rounded-lg">
        <p class="text-muted text-sm">Active Now</p>
        <h2 class="gradient-info-text">567</h2>
      </div>
    </div>

    <div class="flex gap-md mt-lg">
      <button class="btn btn-primary flex-1">View Details</button>
      <button class="btn btn-outline-primary">Export</button>
    </div>
  </div>
</div>
```

### Material Component Example

```html
<mat-card class="fade-in">
  <mat-card-header>
    <mat-card-title>User Profile</mat-card-title>
    <mat-chip class="ml-auto" color="primary">Premium</mat-chip>
  </mat-card-header>

  <mat-card-content>
    <mat-form-field appearance="outline" class="w-full">
      <mat-label>Email</mat-label>
      <input matInput type="email" />
    </mat-form-field>

    <mat-form-field appearance="outline" class="w-full">
      <mat-label>Username</mat-label>
      <input matInput />
    </mat-form-field>
  </mat-card-content>

  <mat-card-actions align="end">
    <button mat-button>Cancel</button>
    <button mat-raised-button color="primary">Save</button>
  </mat-card-actions>
</mat-card>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this theme in your projects.

## Credits

Inspired by modern gradient design trends and built for the Kubernetes community.

---

Made with ❤️ for beautiful Angular applications
