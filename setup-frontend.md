# Frontend Setup Guide - Tailwind CSS v4

## Resolving Tailwind CSS v4 Issues

You're using Tailwind CSS v4, which has significant changes from v3. Here's how to get it working:

### 1. Clean Install Dependencies

First, remove the existing node_modules and package-lock.json:

```bash
cd frontend
rm -rf node_modules package-lock.json
```

### 2. Current Configuration

Your setup is now configured for Tailwind CSS v4:
- **PostCSS Plugin**: `@tailwindcss/postcss`
- **Package**: `@tailwindcss/postcss` in devDependencies
- **Config**: Simplified content paths for v4

### 3. Install Dependencies

```bash
npm install
```

### 4. Tailwind CSS v4 Specific Setup

Tailwind CSS v4 requires the CSS to be imported differently. Update your `globals.css`:

```css
@import "tailwindcss";

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

### 5. Test the Setup

```bash
npm run dev
```

## Tailwind CSS v4 Changes

**Key Differences from v3:**
- Uses `@import "tailwindcss"` instead of `@tailwind` directives
- PostCSS plugin is `@tailwindcss/postcss`
- Simplified configuration structure
- Better performance and smaller bundle sizes

## Troubleshooting v4 Issues

If you still get errors:

1. **Check Node.js version**: Ensure you're using Node.js 18+
2. **Clear cache**: `npm cache clean --force`
3. **Verify PostCSS config**: Ensure `@tailwindcss/postcss` is in plugins
4. **Check import syntax**: Use `@import "tailwindcss"` in CSS

## Alternative: CSS Import Method

If the PostCSS plugin continues to cause issues, you can also try importing Tailwind directly in your CSS:

```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

## Current Status

✅ **Configured for v4**
✅ **PostCSS plugin set**
✅ **Package.json updated**
✅ **Config files updated**

**Next step**: Run `npm install` and test with `npm run dev`
