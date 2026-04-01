// ============================================
// GALLERY CONFIG
// ============================================
//
// HOW IT WORKS:
// 1. Create a folder inside assets/images/gallery/ (e.g. "temple", "festivals")
// 2. Drop your images into that folder
// 3. Add the folder and filenames below
// 4. Done! The gallery page auto-builds everything.
//
// - Each folder = one category = one filter button
// - Folder name becomes the button label (auto-capitalized)
// - File name becomes the caption (underscores/hyphens replaced with spaces)
// - No limit on folders or images
// - Recommended image size: 800 x 600 px, JPG/WEBP, under 200KB
//
// EXAMPLE:
//   Folder: assets/images/gallery/temple/
//   Files:  main-entrance.jpg, interior.jpg, gopuram.jpg
//
//   Config:
//   { folder: "temple", images: ["main-entrance.jpg", "interior.jpg", "gopuram.jpg"] }

var GALLERY_FOLDERS = [

  {
    folder: "temple",
    images: [
      "main-entrance.jpg",
      "interior.jpg",
      "surroundings.jpg",
      "garden-view.jpg",
      "temple-at-dawn.jpg",
      "sacred-grounds.jpg",
      "temple-pathway.jpg"
    ]
  },

  {
    folder: "festivals",
    images: [
      "navaratri.jpg",
      "deepavali.jpg",
      "ugadi.jpg",
      "cultural-program.jpg",
      "dussehra-night.jpg",
      "ganesh-chaturthi.jpg",
      "sankranti-rangoli.jpg"
    ]
  },

  {
    folder: "poojas",
    images: [
      "special-abhishekam.jpg",
      "evening-maha-aarti.jpg",
      "sacred-homa.jpg",
      "morning-pooja.jpg",
      "kumkum-archana.jpg",
      "durga-saptashati-path.jpg"
    ]
  },

  {
    folder: "annadanam",
    images: [
      "daily-annadanam.jpg",
      "prasadam-distribution.jpg",
      "festival-feast.jpg",
      "community-kitchen.jpg",
      "seva-volunteers.jpg"
    ]
  }

  // -----------------------------------------------
  // ADD NEW CATEGORY - just copy this block:
  // -----------------------------------------------
  // ,{
  //   folder: "weddings",       <-- create this folder in assets/images/gallery/
  //   images: [
  //     "wedding1.jpg",         <-- drop these files in that folder
  //     "wedding2.jpg",
  //     "wedding3.jpg"
  //   ]
  // }

];
