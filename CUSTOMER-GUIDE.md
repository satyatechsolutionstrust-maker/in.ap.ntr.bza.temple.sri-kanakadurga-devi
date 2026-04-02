# 🙏 Your Website - Quick Guide

## How to Update Your Website

### 🖼️ Change Images:
1. Use the Image Compressor tool (open `image-compressor.html`)
2. Compress your images to JPG format (avoid WebP for old browser support)
3. Place in the correct folder:
   - Logo: `assets/images/logo.png` (200x200 px, PNG)
   - Carousel: `assets/images/carousel/` (1920x700 px, JPG)
   - Gallery: `assets/images/gallery/{category}/` (800x600 px, JPG)
   - About: `assets/images/about.jpg` (800x600 px, JPG)
   - Owner photo: `assets/images/owner.jpg` (400x500 px, JPG)
   - QR Code: `assets/images/` (500x500 px, PNG)
   - Watermark: `assets/branding/` (200x200 px, JPG/PNG)
   - Partner logos: `assets/images/` (150x60 px, PNG)
   - Before/After: `assets/images/` (400x250 px, JPG)

### 📝 Change Text/Content:
1. Open `admin.html` in your browser
2. Select the section you want to edit
3. Make changes
4. Click "Generate" → "Copy"
5. Open the config file mentioned → Paste → Save

### 📞 Change Phone/WhatsApp:
Edit `site-config.js`:
- `phone: "your number"`
- `whatsapp: "91your number"`

### 🎵 Change Audio:
Replace `assets/audio/mantra.mp3` with your audio file (keep the same name).

### 📸 Add Gallery Photos:
1. Create a folder in `assets/images/gallery/` (e.g., `weddings`)
2. Put photos in it
3. Open `gallery-config.js` and add the folder name + filenames

### 🛕 Add Shop Products:
Open `shop-config.js` and add:
```
{ name: "Product Name", img: "image URL", url: "product URL", cat: "category" }
```

### 📅 Add Events:
Open `events-config.js` and add your event with date, type, and description.

### 💰 Update Donation Details:
Open `donate-config.js` and update QR images, UPI IDs, and bank details.

---

## Need Help?
Contact: Satya Tech Solutions
