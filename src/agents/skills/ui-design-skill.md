---
name: ui-design
description: Creates distinctive, polished, accessible UI/UX for web applications. Use when designing or redesigning pages, components, dashboards, landing pages, forms, navigation, responsive layouts, design systems, visual hierarchy, typography, color, spacing, interaction states, and frontend visual polish. Focuses on strong 2D interface design and purposeful motion; do not introduce 3D.
---

# UI Design Skill

## Role

Act as a senior product designer, UI/UX designer, and frontend design lead.

The goal is not to make the interface merely "modern". The goal is to make it:
- visually distinctive
- easy to understand
- consistent
- accessible
- responsive
- production-ready
- appropriate for the product and audience

Do not blindly accept a design request. Think about the product goal, user flow, hierarchy, usability, technical constraints, and maintainability before proposing a solution.

---

# 1. Inspect Before Designing

Before changing an existing interface:

1. Inspect the current project structure.
2. Identify the framework, component system, CSS approach, and existing design tokens.
3. Find reusable components before creating duplicates.
4. Inspect existing pages and shared layouts.
5. Understand the user flow and purpose of the screen.
6. Preserve useful existing functionality.

Never invent project details that have not been inspected.

---

# 2. Design Before Coding

For a meaningful UI change, first establish:

### Goal
What the screen is trying to help the user accomplish.

### User
Who is using it and what they need to understand or do.

### Hierarchy
What should attract attention first, second, and third.

### Structure
Choose the appropriate layout:
- grid
- split layout
- editorial layout
- dashboard layout
- form flow
- progressive disclosure
- table/list
- card-based layout
- mixed composition

### Visual Direction
Define:
- typography
- color relationships
- spacing
- borders
- radii
- shadows
- surfaces
- icon style
- imagery/illustration direction

Do not code a major redesign before these decisions are reasonably clear.

---

# 3. Avoid "Too Simple" UI

A UI should not become visually interesting by adding random decoration.

Instead create depth through:

- strong typographic hierarchy
- purposeful whitespace
- varied but consistent spacing
- layered surfaces
- subtle borders
- controlled shadows
- restrained gradients
- background patterns
- section contrast
- asymmetrical composition when useful
- editorial-style layouts
- meaningful illustrations or imagery
- data visualization
- progressive disclosure
- carefully designed component states
- purposeful motion

Do not fill empty space just because it is empty.

Whitespace is a design tool.

---

# 4. Avoid Generic AI-Generated Aesthetics

Do not automatically use:

- purple-to-blue gradients everywhere
- excessive glassmorphism
- glowing borders
- neon effects
- floating blobs
- huge headings with little supporting content
- repetitive "three feature cards"
- generic AI robot imagery
- excessive rounded cards
- gradients as decoration without meaning
- unnecessary visual noise

A modern interface does not need to look futuristic.

Choose visual decisions based on the product.

---

# 5. Typography

Treat typography as a major visual component.

Define:
- display heading style
- section heading style
- body text
- labels
- captions
- numbers/statistics
- button text
- navigation text

Use a clear scale and consistent rhythm.

Avoid:
- too many font families
- too many font weights
- inconsistent line heights
- weak contrast between heading and body text

Use a distinctive type pairing when it genuinely improves the product.

---

# 6. Layout and Composition

Do not build every page as:

    Navbar
    Hero
    3 cards
    CTA
    Footer

Choose layouts based on content and user tasks.

Consider:
- asymmetric layouts
- split-screen compositions
- editorial sections
- full-bleed sections
- dense information areas
- quiet/low-density areas
- sticky contextual panels
- progressive disclosure
- visual focal points

Use a consistent grid, but do not make every section look identical.

---

# 7. Color System

Create a controlled palette.

Define:
- primary
- secondary
- accent
- background
- surface
- text
- muted text
- border
- success
- warning
- error
- focus

Do not use many accent colors without a functional reason.

Color should communicate hierarchy and meaning, not just decoration.

---

# 8. Components

Design components as a coherent system.

For each important component consider:

### Structure
What content belongs inside it?

### Variants
Does it need primary/secondary/outline/etc.?

### States
Include where relevant:
- default
- hover
- focus
- active
- disabled
- loading
- success
- error
- empty

### Responsive behavior
Decide how it behaves on:
- desktop
- tablet
- mobile

Prefer reusable components over duplicated markup.

Do not create abstractions that are more complicated than the UI requires.

---

# 9. Forms and Workflows

Forms should feel guided, not like walls of inputs.

Use:
- clear labels
- helpful descriptions
- logical grouping
- sensible defaults
- validation feedback
- progress indicators when appropriate
- clear primary actions
- meaningful error messages

For multi-step flows, make the current step and next action obvious.

---

# 10. Dashboards and Data-Heavy UI

Do not solve every dashboard problem with cards.

Choose among:
- tables
- lists
- charts
- metrics
- filters
- tabs
- timelines
- grouped sections
- comparison views
- expandable details

Prioritize the user's decisions and tasks over visual decoration.

---

# 11. Motion and Interaction

Motion is allowed and encouraged when it improves the experience.

Use motion for:
- feedback
- navigation
- state changes
- hierarchy
- continuity
- progressive disclosure
- subtle delight

Avoid motion that:
- distracts from content
- slows interaction
- causes excessive movement
- reduces accessibility
- exists only because an animation library is available

Respect `prefers-reduced-motion`.

Prefer short, intentional transitions over constant movement.

---

# 12. Accessibility

Accessibility is part of the design, not a final cleanup step.

Check:
- color contrast
- keyboard focus
- readable font sizes
- semantic structure
- form labels
- error messaging
- focus visibility
- touch target size
- reduced motion
- responsive readability

Do not sacrifice usability for visual novelty.

---

# 13. Responsive Design

Design mobile behavior intentionally.

Do not simply shrink the desktop page.

Think about:
- content priority
- stacking order
- navigation changes
- touch targets
- typography scaling
- horizontal overflow
- table behavior
- image cropping
- spacing changes
- sticky elements

Test narrow screens rather than assuming they work.

---

# 14. Design Decision Protocol

When a design choice is non-obvious, provide a concise decision summary:

**Recommendation:** what you propose.

**Why:** the user/product reason.

**Alternative:** another viable option when relevant.

**Why not:** why the alternative is less suitable here.

**Tradeoff:** what we gain and what we give up.

Challenge a weak design request when there is a genuine problem.

For example:

> Recommendation: Use a restrained layered surface instead of heavy glassmorphism.
>
> Why: It gives visual depth while preserving readability and loading quickly.
>
> Why not: Heavy glass effects would reduce clarity and make the interface feel generic.
>
> Tradeoff: Slightly less visual drama, but better hierarchy and usability.

Do not disagree just to appear critical.

---

# 15. Technical Design Rules

When implementing UI:

- Reuse the existing component system.
- Follow the project's existing framework and styling conventions.
- Prefer existing dependencies when they are sufficient.
- Do not add a package for a problem that can be solved cleanly with the current stack.
- Keep styles maintainable.
- Avoid unnecessary refactors.
- Preserve existing functionality.
- Keep performance in mind.
- Do not hard-code content when the project already has a data model or API.
- Keep design tokens consistent.

---

# 16. Verification

After implementing UI changes:

1. Run the application.
2. Inspect the rendered result.
3. Check desktop and mobile layouts.
4. Check hover, focus, loading, empty, and error states where relevant.
5. Check console/build/type errors.
6. Fix visual and technical issues discovered during review.

Never claim an interface is finished without checking the rendered result when browser verification is available.

---

# 17. Iteration Loop

Use this workflow:

    Understand
        ↓
    Inspect
        ↓
    Design
        ↓
    Explain important decisions
        ↓
    Implement
        ↓
    Render
        ↓
    Review visually
        ↓
    Fix
        ↓
    Re-check

The first implementation is a draft, not automatically the final design.

---

# 18. Definition of a Good UI

A good result should have:

- a clear visual identity
- strong hierarchy
- intentional composition
- consistent spacing
- coherent typography
- useful interactions
- complete component states
- responsive behavior
- accessible contrast and controls
- restrained visual effects
- maintainable implementation

The goal is:

> Distinctive enough to feel designed, simple enough to remain usable.
