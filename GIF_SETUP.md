# 🎬 Adding GIF Backgrounds to Your Birthday Card

This guide explains how to add animated GIF backgrounds to your birthday card pages.

## 📁 File Structure

```
public/
├── countdown-bg.gif (optional - countdown page background)
├── birthday-bg.gif (optional - birthday card page background)
├── HUI_BDAYPICK.jpg (birthday person's photo)
├── happy-birthday-house-373134.mp3 (background music)
└── other static files...
```

## 🎨 How to Add GIF Backgrounds

### Step 1: Add Your GIF Files
1. Place your GIF files in the `public/` folder
2. Recommended names:
   - `countdown-bg.gif` - for the countdown page
   - `birthday-bg.gif` - for the birthday card page

### Step 2: Update the Configuration
Open `src/app/page.tsx` and update these lines:

```typescript
// Change from:
const countdownGif = undefined;
const birthdayGif = undefined;

// To:
const countdownGif = '/countdown-bg.gif';  // Your countdown GIF
const birthdayGif = '/birthday-bg.gif';    // Your birthday GIF
```

### Step 3: GIF Recommendations
- **File Size**: Keep under 5MB for better loading
- **Dimensions**: 1920x1080 or similar widescreen ratio
- **Duration**: 3-10 seconds (will loop automatically)
- **Style**: Soft, subtle animations work best as backgrounds

## 🎭 Supported Pages

### 🕐 Countdown Page
- **Background**: Simple cute pink (`#FFB6C1`) with floating hearts and sparkles
- **GIF Effect**: Overlay on pink background
- **Best GIFs**: Gentle animations, sparkles, floating elements

### 🎁 Gift Box Page (Waiting Screen)
- **Background**: Simple cute pink (`#FFB6C1`) with floating hearts
- **GIF Support**: Not currently enabled (focuses on gift box interaction)
- **Style**: Elegant with magical glow effects

### 🎂 Birthday Card Page
- **Background**: Simple cute pink (`#FFB6C1`) with purple hearts and stars
- **GIF Effect**: Overlay on pink background
- **Best GIFs**: Cute animations, sparkles, gentle movements

## 🎨 Current Color Palette

### Cutesy & Simple Colors:
- **Main Background**: `#FFB6C1` (Light Pink) - used on all pages
- **Text Gradients**: `#FF69B4`, `#DDA0DD`, `#E6E6FA`
- **Purple Elements**: `#9370DB`, `#8A2BE2`, `#6A5ACD`
- **Accent Colors**: `#4B0082`, `#7B68EE`

## 🚀 Quick Setup Example

1. **Add a countdown GIF**:
   ```bash
   # Copy your GIF to public folder
   cp your-countdown.gif public/countdown-bg.gif
   ```

2. **Enable it in code**:
   ```typescript
   const countdownGif = '/countdown-bg.gif';
   ```

3. **Refresh your browser** - the GIF will appear as a subtle background!

## 💡 Tips for Best Results

- **Subtle is Better**: The GIF appears with reduced opacity so it doesn't interfere with text
- **Loop Seamlessly**: Choose GIFs that loop smoothly
- **Match the Theme**: 
  - Countdown: Celebratory, anticipation
  - Birthday: Magical, joyful, space-themed
- **Test on Mobile**: Ensure GIFs look good on smaller screens

## 🎉 That's It!

Your birthday card now supports beautiful animated backgrounds while maintaining the elegant, cutesy design! 
