# 🎉 Birthday Wishing Website

A beautiful, interactive birthday website built with Next.js, React, and Framer Motion. This website features a countdown timer, interactive gift box, and a stunning birthday card with confetti animations.

## ✨ Features

- **Countdown Timer**: 10-second countdown with elegant time display cards
- **Interactive Gift Box**: Animated gift box that shakes and responds to hover
- **Smooth Transitions**: Beautiful page transitions between countdown, waiting screen, and birthday card
- **Confetti Animation**: Celebratory confetti effects on the birthday card page
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Beautiful Color Palette**: Soft pinks to vibrant pink and deep purple gradients
- **Audio Effects**: Simple celebratory sound using Web Audio API

## 🎨 Design

The website uses a carefully selected color palette:
- Soft Pink: `#FFE4E1`
- Light Pink: `#FFB6C1`
- Vibrant Pink: `#FF69B4`
- Medium Slate Blue: `#9370DB`
- Blue Violet: `#8A2BE2`

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [VSCode](https://code.visualstudio.com/) (recommended editor)

### Installation & Setup

1. **Clone or download the project**
   ```bash
   # If you have the project files, navigate to the birthday-website directory
   cd birthday-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - The website will automatically reload when you make changes

### Running in VSCode

1. **Open the project in VSCode**
   ```bash
   code .
   ```

2. **Install recommended extensions** (optional but helpful):
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - TypeScript Importer

3. **Use the integrated terminal**
   - Press `Ctrl + `` (backtick) to open the terminal
   - Run `npm run dev` in the terminal
   - Click on the localhost link that appears

## 📁 Project Structure

```
birthday-website/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and custom animations
│   │   ├── layout.tsx           # Root layout component
│   │   └── page.tsx             # Main page with state management
│   └── components/
│       ├── CountdownPage.tsx    # Countdown timer page
│       ├── WaitingScreen.tsx    # Interactive gift box page
│       ├── GiftBox.tsx          # Reusable gift box component
│       └── BirthdayCard.tsx     # Final birthday card with confetti
├── public/                      # Static assets
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🎯 How It Works

1. **Countdown Page**: Shows a 10-second countdown timer with animated time cards and a decorative gift box
2. **Waiting Screen**: After countdown ends, displays a larger, interactive gift box with sparkle effects
3. **Birthday Card**: When the gift box is clicked, reveals the birthday card with confetti and celebratory animations

## 🛠️ Technologies Used

- **Next.js 15**: React framework with App Router
- **React 18**: UI library with hooks
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for smooth transitions
- **React Confetti**: Confetti animation effects

## 🎵 Audio

The website includes a simple celebratory sound effect generated using the Web Audio API. No external audio files are required.

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🔧 Customization

### Changing the Countdown Time
Edit the initial state in `src/components/CountdownPage.tsx`:
```typescript
const [timeLeft, setTimeLeft] = useState(10); // Change this number
```

### Modifying Colors
Update the gradient classes in the component files or add new colors to the Tailwind configuration.

### Adding Your Own Audio
Replace the Web Audio API code in `BirthdayCard.tsx` with your own audio file:
```typescript
// Add an audio file to the public folder and reference it
<audio ref={audioRef} autoPlay loop>
  <source src="/your-music.mp3" type="audio/mpeg" />
</audio>
```

## 🚀 Building for Production

```bash
npm run build
npm start
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎁 Perfect For

- Birthday surprises
- Special occasions
- Gift reveals
- Celebration websites
- Learning React animations

---

Made with ❤️ for special celebrations!
