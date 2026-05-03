---
name: Vital Harvest
colors:
  surface: '#f9faf6'
  surface-dim: '#dadad7'
  surface-bright: '#f9faf6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f1'
  surface-container: '#eeeeeb'
  surface-container-high: '#e8e8e5'
  surface-container-highest: '#e2e3e0'
  on-surface: '#1a1c1a'
  on-surface-variant: '#414844'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f0f1ee'
  outline: '#717973'
  outline-variant: '#c1c8c2'
  surface-tint: '#3f6653'
  primary: '#012d1d'
  on-primary: '#ffffff'
  primary-container: '#1b4332'
  on-primary-container: '#86af99'
  inverse-primary: '#a5d0b9'
  secondary: '#7d5800'
  on-secondary: '#ffffff'
  secondary-container: '#ffb702'
  on-secondary-container: '#6b4b00'
  tertiary: '#1b2637'
  on-tertiary: '#ffffff'
  tertiary-container: '#303c4e'
  on-tertiary-container: '#9aa7bc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1ecd4'
  primary-fixed-dim: '#a5d0b9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#274e3d'
  secondary-fixed: '#ffdea9'
  secondary-fixed-dim: '#ffba27'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5e4100'
  tertiary-fixed: '#d7e3fa'
  tertiary-fixed-dim: '#bbc7dd'
  on-tertiary-fixed: '#101c2c'
  on-tertiary-fixed-variant: '#3c475a'
  background: '#f9faf6'
  on-background: '#1a1c1a'
  surface-variant: '#e2e3e0'
typography:
  h1:
    fontFamily: Epilogue
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h2:
    fontFamily: Epilogue
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Epilogue
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin: 32px
---

## Brand & Style

The brand personality of this design system is rooted in the vitality of the earth and the optimism of a bountiful harvest. It is designed to bridge the gap between traditional agriculture and modern digital commerce, evoking a sense of growth, trust, and sun-drenched energy. The target audience includes both health-conscious consumers and professional producers who value quality and transparency.

The visual direction follows a **High-Contrast / Modern** movement. It utilizes bold, saturated colors against warm, organic surfaces to create a "fresh-from-the-farm" aesthetic. The interface is clean and structured but avoids the sterility of typical corporate SaaS by incorporating organic shapes and a vibrant, energetic color application that communicates life and movement.

## Colors

The palette is anchored by **Forest Green**, representing stability and the deep hues of healthy crops. This is balanced by **Sunflower Yellow**, used strategically for calls-to-action and highlights to inject energy and optimism into the user journey. **Stone Gray** serves as the functional neutral for secondary text and UI borders, ensuring the interface feels grounded.

Surfaces do not use pure white. Instead, a **Warm Cream** is utilized for all primary backgrounds to maintain a natural, approachable feel that reduces eye strain and reinforces the organic nature of the products. High contrast is maintained by using deep Forest Green or pure white text depending on the background luminance.

## Typography

This design system employs a pairing that balances character with legibility. **Epilogue** is used for headlines; its slightly geometric yet expressive nature provides a modern, distinctive voice that feels both professional and contemporary. 

For body text and functional UI elements, **Inter** provides maximum readability across various screen sizes. Headlines should utilize tighter letter spacing and bold weights to emphasize the "Vibrant" brand pillar, while body text maintains generous line heights to ensure a clean, airy reading experience.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** system for desktop (12 columns, 1200px max-width) and a fluid, single-column system for mobile. A strict 8px spatial rhythm governs all padding and margins to ensure visual harmony.

Layouts should prioritize whitespace to reflect "freshness." Content is grouped into distinct vertical sections with generous "xl" spacing between them to allow the products to breathe. Internal component spacing (gutters) is kept consistent at 24px to maintain a clean, organized structure.

## Elevation & Depth

To maintain the "clean lines" directive, this design system avoids heavy shadows. Depth is primarily communicated through **Tonal Layers** and **Low-Contrast Outlines**. 

Elements like cards and containers sit on the warm cream surface with a subtle 1px border in a lightened Stone Gray. When interaction occurs, a soft, diffused "Ambient Shadow" (colored with a hint of Forest Green) may be applied to simulate the element lifting off the page. This creates a tactile feel without cluttering the interface with artificial gradients or heavy skeuomorphism.

## Shapes

The shape language is defined by **Medium Roundness**. A base corner radius of 12px (0.75rem) is applied to all primary containers, cards, and buttons. This specific radius is chosen to feel approachable and "organic" without becoming overly juvenile or "bubbly."

Icons should follow a modern, outlined style with slightly rounded terminals to match the component radius. Images of produce and farms should also utilize the 12px radius when windowed, creating a consistent visual frame across the e-commerce experience.

## Components

### Buttons
Primary buttons use the Forest Green background with white text for high contrast. Secondary "action" buttons use the Sunflower Yellow to draw immediate attention to conversion points like "Add to Cart." Both utilize the 12px corner radius and bold Inter labels.

### Cards
Product cards use a white background to pop against the warm cream surface. They feature a 1px Stone Gray border and use the Forest Green for price points and Sunflower Yellow for "Sale" or "Fresh" badges.

### Input Fields
Fields are clean with a Stone Gray outline that shifts to Forest Green on focus. Labels are placed above the field in a bold, smaller Inter font for clarity.

### Chips & Tags
Used for categories (e.g., "Organic," "Local," "Seasonal"). These use a desaturated version of the primary green or yellow with dark text to provide information without competing with primary buttons.

### Progressive Components
- **Freshness Indicator:** A custom-styled progress bar or badge using a vibrant green gradient.
- **Farmer Profiles:** Small, circular-avatar cards that highlight the human element of the agricultural source.