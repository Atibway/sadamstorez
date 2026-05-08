# Modern E-commerce Frontend UI Redesign Prompt

## Color Scheme Proposal

### Primary Colors (Modern, Elegant, Professional)
- **Primary Brand Color**: `#1a1a2e` (Deep Navy Blue) - Professional, trustworthy
- **Secondary Brand Color**: `#16213e` (Dark Slate Blue) - Sophisticated
- **Accent Color**: `#0f4c75` (Ocean Blue) - Modern, clean
- **Highlight Color**: `#3282b8` (Sky Blue) - Fresh, energetic

### Neutral Colors
- **Background**: `#ffffff` (Pure White) - Clean, minimalist
- **Secondary Background**: `#f8f9fa` (Light Gray) - Subtle contrast
- **Text Primary**: `#1a1a1a` (Almost Black) - High readability
- **Text Secondary**: `#6c757d` (Medium Gray) - Hierarchy
- **Border Color**: `#e9ecef` (Light Gray) - Subtle separation

### Action Colors
- **Primary Button**: `#3282b8` (Sky Blue) - Clear call-to-action
- **Primary Button Hover**: `#1a5f8c` (Darker Blue)
- **Secondary Button**: `#ffffff` (White with border)
- **Success**: `#28a745` (Green)
- **Warning**: `#ffc107` (Amber)
- **Error**: `#dc3545` (Red)

### Dark Mode Colors
- **Background**: `#0f172a` (Deep Blue-Black)
- **Card Background**: `#1e293b` (Slate Blue)
- **Text Primary**: `#f1f5f9` (Light Gray)
- **Text Secondary**: `#94a3b8` (Medium Gray)
- **Border**: `#334155` (Slate)

---

## Page-by-Page UI Specifications

### 1. Home Page (`/frontend`)

**Layout Structure:**
- **Header**: Sticky navigation bar with logo, search, cart icon, user account dropdown
- **Hero Section**: Full-width hero carousel with featured products, gradient overlays, compelling headlines
- **Category Sidebar**: Left sidebar with collapsible category tree (desktop only)
- **Main Content Area**: 
  - Flash sales section with countdown timer
  - Featured products grid
  - New arrivals section
  - Trending products section
- **Footer**: Multi-column footer with links, newsletter signup, social media icons

**Hero Section Design:**
- Large hero carousel (1200x400px)
- Smooth transitions with fade/slide effects
- Product images with gradient overlays (dark to transparent)
- Bold typography: "Discover Your Style" / "Premium Quality"
- CTA buttons: "Shop Now" (primary), "Explore Collections" (secondary)
- Progress indicator dots

**Flash Sales Section:**
- Section header with countdown timer
- Product cards in horizontal scroll or grid
- Discount badges (e.g., "30% OFF")
- Price comparison (original price crossed out)
- Limited-time urgency indicators

**Featured Products Grid:**
- 4-column grid (desktop), 2-column (tablet), 1-column (mobile)
- Product cards with hover effects (lift animation, shadow)
- Quick view button on hover
- Add to cart button
- Wishlist heart icon
- Rating stars

**Design Elements:**
- Generous white space (24px-32px margins)
- Subtle shadows on cards (box-shadow: 0 4px 6px rgba(0,0,0,0.1))
- Rounded corners (border-radius: 8px-12px)
- Smooth transitions (transition: all 0.3s ease)
- Micro-interactions on hover

---

### 2. Product Detail Page (`/frontend/product/[productId]`)

**Layout Structure:**
- **Breadcrumb Navigation**: Home > Category > Subcategory > Product Name
- **Two-Column Layout**:
  - **Left Column (60%)**: Image gallery
  - **Right Column (40%)**: Product information
- **Related Products Section**: Below main content
- **Reviews Section**: Below related products

**Image Gallery:**
- Main product image (large, 600x600px)
- Thumbnail gallery (4-6 images below main image)
- Zoom functionality on hover
- Lightbox gallery on click
- Image navigation arrows
- Active thumbnail indicator

**Product Information Panel:**
- Product name (H1, large, bold)
- Brand name (subtitle, gray)
- Rating display (stars + review count)
- Price (large, bold, primary color)
- Original price (crossed out, if discounted)
- Discount badge (if applicable)
- Color selection (color swatches)
- Size selection (size buttons)
- Quantity selector (+/- buttons)
- Stock status indicator
- Add to cart button (large, prominent)
- Wishlist button (heart icon)
- Share buttons (social media icons)

**Product Description:**
- Tabbed interface: Description | Specifications | Reviews
- Rich text description
- Bullet points for key features
- Product specifications table
- Customer reviews with ratings

**Related Products:**
- "You may also like" section header
- 4-column grid of related products
- Product cards with image, name, price
- Quick view functionality

**Design Elements:**
- Sticky right panel on scroll (desktop)
- Smooth animations for image transitions
- Color swatches with selection indicator
- Size buttons with hover effects
- Clear visual hierarchy
- Trust badges (quality guarantee, free shipping, etc.)

---

### 3. Cart Page (`/frontend/cart`)

**Layout Structure:**
- **Header**: "Shopping Cart" title with item count
- **Two-Column Layout**:
  - **Left Column (70%)**: Cart items
  - **Right Column (30%)**: Order summary
- **Continue Shopping Button**: Below cart items
- **Recommended Products**: Below main content

**Cart Items List:**
- Each item card:
  - Product image (thumbnail, 100x100px)
  - Product name (link to product page)
  - Variant details (color, size)
  - Price
  - Quantity selector (+/- buttons)
  - Remove button (trash icon)
  - Subtotal
- Bulk actions (select all, remove selected)
- Empty cart state with "Continue Shopping" CTA

**Order Summary Panel:**
- Subtotal calculation
- Shipping cost (free shipping threshold indicator)
- Tax calculation
- Discount code input field
- Apply discount button
- Total (large, bold)
- Proceed to checkout button (large, primary)
- Secure checkout badges

**Recommended Products:**
- "You might like" section
- 4-column grid
- Product cards with quick add to cart

**Design Elements:**
- Clean, organized layout
- Clear price breakdown
- Progress bar for free shipping
- Subtle dividers between items
- Mobile-responsive (stacked layout on mobile)
- Loading states for actions

---

### 4. Cart Checkout Page (`/frontend/cart/checkout`)

**Layout Structure:**
- **Header**: "Checkout" with progress indicator
- **Multi-Step Form**:
  - Step 1: Shipping Information
  - Step 2: Payment Method
  - Step 3: Review Order
- **Order Summary Sidebar**: Sticky on right (desktop)

**Progress Indicator:**
- Horizontal progress bar
- Step numbers with labels
- Active step highlighted
- Completed steps marked with checkmark

**Shipping Information Form:**
- Full name input
- Email input
- Phone input
- Address input
- City input
- State/Province dropdown
- ZIP/Postal code input
- Country dropdown
- Save for future checkbox
- Continue to payment button

**Payment Method Section:**
- Credit card option (selected by default)
- PayPal option
- Apple Pay option
- Credit card form:
  - Card number input with card type icon
  - Expiry date input (MM/YY)
  - CVV input
  - Cardholder name input
- Secure payment badges

**Order Review Section:**
- Order items summary
- Shipping address display
- Payment method display
- Price breakdown
- Terms and conditions checkbox
- Place order button (large, primary)
- Order confirmation modal

**Design Elements:**
- Clean form design with clear labels
- Input validation with error messages
- Loading states for form submission
- Secure checkout indicators
- Back button to previous steps
- Mobile-responsive (full width on mobile)

---

### 5. Cart Order Confirmation Page (`/frontend/cart/order-confirmation`)

**Layout Structure:**
- **Header**: "Order Confirmed" with success animation
- **Centered Content**:
  - Success icon/checkmark
  - Thank you message
  - Order number
  - Order details summary
  - Estimated delivery date
- **Action Buttons**: Continue shopping, Track order
- **Order Details Section**: Below main content

**Success Message:**
- Large checkmark icon (animated)
- "Thank you for your order!" headline
- Order number (prominently displayed)
- "We'll send you an email with order details"
- Estimated delivery date

**Order Summary:**
- Order items list
- Shipping address
- Payment method
- Total amount paid
- Download receipt button

**Action Buttons:**
- "Continue Shopping" (primary)
- "Track Order" (secondary)
- "Download Receipt" (link)

**Design Elements:**
- Celebratory animation
- Clean, minimalist design
- Clear order information
- Trust indicators
- Mobile-responsive

---

### 6. Category Page (`/frontend/category/[categoryId]`)

**Layout Structure:**
- **Header**: Category name with breadcrumb
- **Filter Sidebar**: Left side (desktop) or drawer (mobile)
- **Main Content Area**: Product grid
- **Pagination**: Bottom of page

**Category Header:**
- Large category name (H1)
- Category description (if available)
- Category banner image
- Product count display
- Sort dropdown (Relevance, Price Low-High, Price High-Low, Newest)

**Filter Sidebar:**
- Price range slider
- Color filter (color swatches)
- Size filter (checkbox buttons)
- Brand filter (checkboxes)
- Rating filter (star ratings)
- Availability filter (in stock, out of stock)
- Apply filters button
- Clear filters button
- Active filter tags display

**Product Grid:**
- 4-column grid (desktop), 2-column (tablet), 1-column (mobile)
- Product cards with:
  - Product image
  - Product name
  - Brand name
  - Price
  - Rating stars
  - Quick view button
  - Add to cart button
  - Wishlist heart icon

**Pagination:**
- Page numbers
- Previous/Next buttons
- "Showing X-Y of Z products" text

**Design Elements:**
- Sticky filter sidebar on scroll (desktop)
- Filter drawer with slide-in animation (mobile)
- Active filter indicators
- Loading skeletons for products
- Smooth transitions

---

### 7. Category Page with Subcategories (`/frontend/category/[categoryId]/[subcategoryId]`)

**Layout Structure:**
- **Header**: Category > Subcategory breadcrumb
- **Subcategory Tabs**: Horizontal tabs for subcategories
- **Filter Sidebar**: Same as category page
- **Main Content Area**: Product grid
- **Pagination**: Bottom of page

**Subcategory Tabs:**
- Horizontal scrollable tabs
- Active tab highlighted
- All subcategories listed
- Tab icons (optional)

**Rest of Layout**: Same as Category Page

**Design Elements:**
- Tab navigation with smooth transitions
- Active tab indicator
- Mobile-responsive (horizontal scroll)

---

### 8. Favorites/Wishlist Page (`/frontend/favorites`)

**Layout Structure:**
- **Header**: "My Wishlist" with item count
- **Main Content**: Product grid
- **Empty State**: When no items in wishlist

**Wishlist Grid:**
- 4-column grid (desktop), 2-column (tablet), 1-column (mobile)
- Product cards with:
  - Product image
  - Product name
  - Brand name
  - Price
  - Rating stars
  - Add to cart button
  - Remove from wishlist button (trash icon)
  - Move to cart button

**Empty State:**
- Empty wishlist icon
- "Your wishlist is empty" message
- "Start adding products you love" subtext
- "Continue Shopping" button

**Design Elements:**
- Heart icon as remove button
- Quick add to cart functionality
- Loading states
- Mobile-responsive

---

### 9. Search Page (`/frontend/search`)

**Layout Structure:**
- **Header**: Search bar with query display
- **Filter Sidebar**: Left side
- **Main Content Area**: Search results grid
- **No Results State**: When no products found

**Search Header:**
- Large search input field
- Search query display ("Search results for 'query'")
- Result count
- Sort dropdown
- Filter button (mobile)

**Search Results Grid:**
- Same layout as Category page product grid
- Highlighted search terms in product names
- "Did you mean?" suggestions

**No Results State:**
- "No products found" message
- Search suggestions
- "Try different keywords"
- "Browse our categories" button

**Design Elements:**
- Prominent search bar
- Real-time search suggestions
- Search history
- Loading skeletons
- Mobile-responsive

---

### 10. Settings Page (`/frontend/settings`)

**Layout Structure:**
- **Header**: "Account Settings"
- **Sidebar Navigation**: Left side
- **Main Content Area**: Settings panels

**Sidebar Navigation:**
- Profile Settings
- Address Book
- Payment Methods
- Order History
- Wishlist
- Notifications
- Privacy Settings
- Account Security

**Profile Settings Panel:**
- Profile picture upload
- Name input fields
- Email input
- Phone input
- Date of birth
- Gender selection
- Save changes button

**Address Book Panel:**
- Add new address button
- Address cards with:
  - Full address
  - Default address indicator
  - Edit button
  - Delete button
  - Set as default button

**Payment Methods Panel:**
- Add new payment method button
- Payment method cards with:
  - Card type icon
  - Card number (masked)
  - Expiry date
  - Default indicator
  - Edit button
  - Delete button

**Order History Panel:**
- Order list with:
  - Order number
  - Order date
  - Order status
  - Total amount
  - View details button
- Order detail modal

**Notifications Panel:**
- Email notifications toggles
- SMS notifications toggles
- Push notifications toggles
- Marketing emails toggle

**Privacy Settings Panel:**
- Profile visibility
- Data sharing preferences
- Cookie preferences

**Account Security Panel:**
- Change password form
- Two-factor authentication toggle
- Active sessions list
- Sign out all devices button

**Design Elements:**
- Clean tabbed interface
- Form validation
- Loading states
- Success/error toasts
- Mobile-responsive (stacked layout)

---

## Design Principles

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Headings**: Bold, 600-700 weight
- **Body Text**: Regular, 400 weight
- **Font Sizes**: 
  - H1: 32px-48px
  - H2: 24px-32px
  - H3: 18px-24px
  - Body: 14px-16px
  - Small: 12px-14px

### Spacing
- **Base Unit**: 8px
- **Component Padding**: 16px-24px
- **Section Margins**: 32px-48px
- **Grid Gaps**: 16px-24px

### Borders & Shadows
- **Border Radius**: 8px-12px
- **Box Shadow**: 0 2px 8px rgba(0,0,0,0.1)
- **Hover Shadow**: 0 4px 16px rgba(0,0,0,0.15)

### Animations
- **Transition Duration**: 0.2s-0.3s
- **Easing**: ease-in-out
- **Hover Effects**: Scale (1.02), Shadow increase
- **Loading**: Skeleton screens, spinners

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1440px

### Accessibility
- **Focus States**: Visible outline (2px, primary color)
- **Color Contrast**: WCAG AA compliant
- **Touch Targets**: Minimum 44x44px
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels, semantic HTML

---

## Component Library Requirements

### Buttons
- Primary Button (filled, primary color)
- Secondary Button (outlined)
- Ghost Button (transparent)
- Danger Button (red)
- Icon Button (with icon only)
- Loading Button (with spinner)

### Form Elements
- Text Input (with label, error message)
- Textarea (with character count)
- Select Dropdown (custom styling)
- Checkbox (custom styling)
- Radio Button (custom styling)
- Toggle Switch
- File Upload
- Date Picker
- Number Input (with +/- buttons)

### Cards
- Product Card
- Category Card
- Banner Card
- User Card
- Order Card
- Address Card

### Navigation
- Breadcrumb
- Pagination
- Tabs
- Stepper/Progress
- Sidebar Navigation
- Mega Menu

### Feedback
- Toast Notifications
- Modal/Dialog
- Tooltip
- Loading Spinner
- Skeleton Screen
- Empty State
- Error State

### Data Display
- Badge
- Tag
- Rating Stars
- Price Display
- Countdown Timer
- Progress Bar
- Avatar

---

## Additional Notes

### Performance
- Lazy loading for images
- Code splitting for routes
- Optimized assets (WebP format)
- Critical CSS inline
- Font subsetting

### SEO
- Semantic HTML structure
- Meta tags for each page
- Structured data markup
- Canonical URLs
- Open Graph tags

### Analytics
- Page view tracking
- User behavior tracking
- Conversion tracking
- A/B testing ready

### Internationalization
- Multi-language support ready
- Currency formatting
- Date/time localization
- RTL support ready

---

## Implementation Priority

1. **High Priority**: Home page, Product detail page, Cart page
2. **Medium Priority**: Category pages, Search page, Checkout flow
3. **Low Priority**: Settings page, Favorites page, Order confirmation

This redesign focuses on creating a modern, elegant, and professional e-commerce experience with attention to user experience, accessibility, and performance.
