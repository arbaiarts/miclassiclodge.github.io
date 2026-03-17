# M.I Classic Lodge - Premium Website

A modern, "dark luxury" and "anti-gravity" themed static landing page built for **M.I Classic Lodge** located in Raichur, Karnataka. The project delivers a highly visual, premium aesthetic to elevate the lodge's brand perception beyond a typical budget hotel.

## 🌟 Key Features

- **Dark Luxury Aesthetic:** Deep black/navy base palette (`#05080c`) illuminated by high-contrast primary gold (`#d4af37`) glow effects and typography.
- **Anti-Gravity Animations:** Custom CSS `@keyframes` logic giving cards and images a gentle, continuous levitation effect.
- **Interactive 3D Tilt Cards:** Vanilla JavaScript cursor tracking applies dynamic `rotateX` and `rotateY` properties to the Room Pricing cards, constructing a 3D parallax depth effect.
- **Particle System Background:** An HTML5 `<canvas>` rendering floating gold particles simulating dust motes drifting endlessly upwards.
- **Scroll Revealing:** Intersection Observers trigger smooth fade-in and float-up entrance animations as users scroll down the page.
- **Fully Responsive:** CSS Grid and Flexbox layouts paired with a custom mobile hamburger menu ensure perfect scaling from 4K desktop to 320px mobile screens.

## 🛠️ Tech Stack

- **HTML5:** Semantic architecture with `index.html`.
- **CSS3:** Custom variables, glassmorphism (`backdrop-filter`), flexbox/grid, and native CSS 3D transforms.
- **Vanilla JavaScript:** ES6+ logic for canvas rendering, DOM manipulation, 3D tilt math, and scroll observers. No jQuery or heavy libraries.
- **No Build Tools:** Pure static files. No Node.js, Webpack, or Vite required.

## 📁 Folder Structure

```
MI_Classic_Lodge/
├── index.html         # Main entry point and structural markup
├── css/
│   └── style.css      # All styling and animation logic
├── js/
│   └── script.js      # Interactive logic (Particles, 3D Tilt, Scroll Observers)
├── assets/            # Image assets
│   ├── logo.jpeg
│   ├── outer.jpeg
│   ├── rooms (1).jpeg
│   └── ...
└── README.md          # Project documentation
```

## 🚀 How to Run Locally

Because the project is entirely static and uses relative paths, it can be run instantly in any modern web browser.

1. Clone or download the repository.
2. Open the project folder.
3. Double-click `index.html` to open it in your browser (Chrome, Firefox, Safari, Edge).
   *Note: For the best experience evaluating precise scroll behaviors, running a local lightweight web server (like VS Code Live Server extension or `python -m http.server`) is recommended but not strictly required.*

## 🌐 Deploying to GitHub Pages

This project is perfectly formatted to deploy directly to GitHub Pages for free hosting:

1. Push this directory to a GitHub repository.
2. Navigate to your repository's **Settings** > **Pages**.
3. Under "Build and deployment" Source, select **Deploy from a branch**.
4. Select your main/master branch and the `/ (root)` folder, then click save.
5. In a few minutes, your site will be live at `https://[your-username].github.io/[repo-name]/`.

## 📜 Credits

- Images and brand assets provided by M.I Classic Lodge.
- Icons by [FontAwesome](https://fontawesome.com/).
- Fonts by [Google Fonts](https://fonts.google.com/) (Playfair Display, Montserrat).
