# Assets Folder - How to Add Your Files

This folder is where you can add your custom photo and audio files for the birthday card.

## 📸 Adding a Photo

1. **File Name**: `hui-mun-photo.jpg` (or `.png`, `.jpeg`, `.webp`)
2. **Location**: Place the file in the `public/` folder
3. **Size**: Recommended 400x400 pixels or larger (will be automatically resized to fit the frame)
4. **Format**: JPG, PNG, JPEG, or WebP

### Example:
```
public/hui-mun-photo.jpg
```

The photo will automatically appear in the decorative frame on the birthday card!

## 🎵 Adding Background Music

1. **File Name**: `birthday-music.mp3`
2. **Location**: Place the file directly in this `src/components/` folder
3. **Format**: MP3 format only
4. **Duration**: Any length (will loop automatically)
5. **Volume**: Will be set to 50% automatically

### Example:
```
src/components/birthday-music.mp3
```

The music will automatically start playing when the birthday card loads and loop continuously!

## 🔧 Technical Notes

- **Photo**: The PhotoFrame component will automatically load images from the `public/` folder
- **Audio**: The BirthdayCard component will automatically detect and load `birthday-music.mp3` from the `src/components/` folder
- **Fallback**: If files are not found, placeholder content will be shown
- **Hot Reload**: After adding files, the page will automatically refresh to show your content

## 📁 Current File Structure

```
public/
├── hui-mun-photo.jpg (add your photo here)
└── other static files...

src/components/
├── README.md (this file)
├── birthday-music.mp3 (add your audio here)
├── BirthdayCard.tsx
├── PhotoFrame.tsx
├── GiftBox.tsx
├── CountdownPage.tsx
└── WaitingScreen.tsx
```

## 🎉 That's it!

Just drop your files in this folder and refresh the page to see your personalized birthday card!
