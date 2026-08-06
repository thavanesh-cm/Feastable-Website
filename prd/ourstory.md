# Product Requirement Document (PRD)

## Project: "Our Story" (Brand Journey & Ethical Sourcing) Page

## 1. Overview & Goal

The objective is to build a high-impact, visually engaging, and story-driven **"Our Story"** landing page. The page chronicles the evolution of the brand from a fun, fan-centric, gamified snack company into an ethically responsible industry disruptor partnering with global fair-trade initiatives.

The page must be highly componentized, featuring bold typography, dynamic color block sectioning, scroll-driven visual assets (floating products/ingredients), and clear interactive call-to-actions (CTAs). It is designed to be fully compatible with rapid site generation and modern frontend workflows (e.g., Tailwind CSS, Next.js, and agentic UI tools like Antigravity).

## 2. Global Design System & Theme

### Typography

- **Headings (H1, H2, H3):** Ultra-bold, heavy impact display sans-serif font (e.g., Impact, Montserrat Black, or custom brand font). Must support a **solid black drop-shadow offset** (`drop-shadow-[4px_4px_0px_#000000]`) and high-contrast stroke treatments.
    
- **Body Text:** Clean, highly legible sans-serif (e.g., Inter or Roboto) with generous line-height for scannability.
    

### Color Palette & Section Blocks

- **Primary Electric Blue:** `#59CBE8` (Main background for high-energy sunburst panels)
    
- **Vibrant Bubblegum Pink:** `#E980A0` (Accent containers, text highlights, persistent banners)
    
- **Warm Cream/Off-White:** `#F7F4EB` (Textured canvas style for serious, mission-focused blocks)
    
- **Deep Shadow Black:** `#000000` (Used strictly for thick borders, heavy typography shadows, and structural separation)
    
- **Accent Ochre/Yellow:** `#F2A93B` (Highlight tags/pills)
    

### Layout Mechanics

- **Z-Index Layering:** Heavy utilization of absolute-positioned floating PNG assets (chocolate chunks, cocoa pods, product wrappers) layering over text boundaries to create a modern 2.5D depth feel.
    
- **Sunburst Background Effect:** Repeating css-gradient or vector background rays shooting outward from center coordinates on specific panels.
    

## 3. Section-by-Section Breakdown

### Section 1: The Hero Canvas ("Our Cocoa Story")

- **Visual Layout:** Full-width container with a solid Electric Blue (`#59CBE8`) background. A mosaic scatter of product packaging configurations frames the workspace.
    
- **Core Copy:** * `H1`: "OUR COCOA STORY" (Centered, massive scale, pink or white lettering with a heavy black outline).
    
- **Assets:** Scattered high-fidelity product renders overlapping the viewport borders.
    

### Section 2: The Genesis Block

- **Visual Layout:** Horizontal split or clean centering with a radial sunburst pattern.
    
- **Core Copy:**
    
    - `H2`: "FEASTABLES BEGAN AS A FUN, BETTER-FOR-YOU SNACK BRAND"
        
    - `Paragraph`: "Inspired by MrBeast's journey with Crohn's and his mission to make great-tasting, accessible snacks."
        
- **Assets:** High-resolution cut-out of the founder holding a hero-scale product variant, positioned off-center.
    

### Section 3: The First Launch Pivot

- **Visual Layout:** High-contrast color block switch. Solid Bubblegum Pink (`#E980A0`) background pane framed by sharp vertical margins.
    
- **Core Copy:**
    
    - `H2 (White Text)`: "OUR FIRST LAUNCH THE MRBEAST BAR WASN'T JUST A CHOCOLATE BAR"
        
    - `Paragraph (Black Text)`: "It was a flavor-packed adventure, complete with gamified experiences, fan engagement, and over-the-top stunts."
        
- **Assets:** Nostalgic or legacy packaging variants floating symmetrically in the top-left and bottom-right corners.
    

### Section 4: Scale & Responsibility

- **Visual Layout:** Return to Electric Blue sunburst theme to maintain brand continuity.
    
- **Core Copy:**
    
    - `H2 (Pink/White Text Stack)`: "AS WE GROW, SO DID OUR STANDARDS & OUR RESPONSIBILITY"
        
    - `Paragraph`: "for what we make and what we stand for. We reformulated our recipes for an even bigger, bolder flavor and redesigned our packaging and bars to match."
        
- **Assets:** Dynamic dynamic group of the newly reformulated product line cutting through the bottom section layout.
    

### Section 5: The Industry Hard Truth

- **Visual Layout:** Visual transition indicator. Subtle shift in tone; background utilizes a starker line pattern.
    
- **Core Copy:**
    
    - `Sub-heading`: "ALONG THE WAY WE UNCOVERED"
        
    - `H2 (Pink Text Highlight)`: "THE HARD TRUTH BEHIND THE COCOA INDUSTRY"
        
    - `Paragraph (Bold Emphasis)`: "and how cocoa is farmed in some regions. **1.5 million kids in child labor, widespread poverty, and systemic injustice.**"
        
- **Assets:** Raw, photorealistic green and processed cocoa pods flanking the left and right gutters of the viewport.
    

### Section 6: Taking a Stand

- **Visual Layout:** Asymmetrical split grid. Left side handles bold messaging over the blue burst; right side transitions into dark, textured canvas framing.
    
- **Core Copy (Left):**
    
    - `H2 (Stacked Pink/White)`: "WE KNEW WE HAD TO TAKE A STAND"
        
    - `Subtext`: "And change chocolate for good"
        
- **Core Copy (Right Overlay):**
    
    - `H3 (Yellow Display)`: "HELP US FIGHT CHILD LABOR"
        
- **Assets:** Multi-person team cut-out interacting directly with scale-busting asset wrappers, bridging the split grid partition.
    

### Section 7: The New Mission Core (Ethical Ecosystem)

- **Visual Layout:** Textured Off-White canvas (`#F7F4EB`) backdrop. The central content is housed in a sharp, solid-bordered card featuring an inner primary blue fill.
    
- **Core Copy:**
    
    - `Sub-heading`: "NOW, AT THE CORE OF"
        
    - `H2 (Stacked Pink/White)`: "FEASTABLES IS A NEW MISSION"
        
    - `Body Text`: "Eradicate child labor in the cocoa industry. Our cocoa is 100% Fairtrade certified. We pay farmers the living income reference price or the market price, whatever is higher! And we only partner with farms that actively protect children. And there's more to come."
        
- **Trust Badges & Trust Components:**
    
    - Top right corner of the card anchored with an official **Fairtrade** certification seal.
        
    - Bottom-left/bottom-right peripheral accents: **International Cocoa Initiative** emblem and **Tony's Open Chain** partner badge.
        
    - Asymmetrical "Polaroid" style photo cards showing real-world farming communities, slightly rotated for a casual, authentic look.
        

### Section 8: Final Call to Action

- **Visual Layout:** Clean termination block on the textured canvas background.
    
- **Core Copy:**
    
    - `Sub-heading`: "WE STILL BRING THE FUN - NOW WITH"
        
    - `H2`: "BOLDER FLAVOR AND A BIGGER PURPOSE"
        
    - `Paragraph`: "From chocolate bars to cups and beyond, every bite helps build a better future for the people behind it."
        
- **Interactive Element:** Centered, high-visibility CTA button: `[LEARN MORE ABOUT OUR MISSION]`. Button styling: Solid Electric Blue background, thick black border, explicit black block-shadow interaction on hover.
    
- **Assets:** Detailed cross-section render of a product piece (e.g., layered peanut butter bar) anchoring the bottom right layout.
    

## 4. Functional & Interaction Requirements

### Persistent Conversion Element

- **Sticky Bottom Bar:** A persistent, fixed bottom banner spanning 100% viewport width.
    
    - **Style:** Hot Pink background, black borders.
        
    - **Content:** Left-aligned close trigger (`✕`), centered bold text or callout, right-aligned `[JOIN THE CREW!]` CTA button.
        
    - **Behavior:** Remains pinned to the bottom viewport during scroll; easily dismissible.
        

### Animation & Motion Profiles

- **Scroll-Driven Parallax:** Floating elements (chocolate chunks, bars, pods) must translate vertically at varying rates relative to standard page scroll speed to reinforce 3D layered space.
    
- **Hover States:** All text buttons and display cards with solid black drop shadows must translate smoothly on hover (`transform: translate(-2px, -2px)`) while altering drop-shadow size properties to mimic physical click compression.
    

## 5. Technical Specification & Implementation Notes

```markdown
- Framework Compatibility: Tailored for standard atomic CSS styling definitions (Tailwind utility classing structure).
- Accessibility (a11y): High contrast safety must be maintained; heavy text overlays against complex patterns require semi-transparent black text-backing layers or solid stroke outlines to ensure readability.
- Asset Strategy: High-resolution webp images with pre-defined aspect ratios to prevent Layout Shifts (CLS) during component initialization.
```