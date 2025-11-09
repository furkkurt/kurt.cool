# kurt.cool - Y2K Aesthetic Portfolio & Blog

A Hugo-based portfolio and blog website embracing the early 2000s Y2K aesthetic with neon colors, grid backgrounds, and retro-futuristic design elements.

## Features

- 🎨 **2000s Y2K Aesthetic**: Neon cyan, pink, and green colors with animated effects
- ✨ **Interactive Elements**: Glitch effects, sparkles, and animated backgrounds
- 📱 **Responsive Design**: Looks great on all devices
- 🌙 **Dark Theme**: Easy on the eyes with vibrant neon accents
- 🎯 **Portfolio & Blog**: Showcase your work and share your thoughts

## Getting Started

### Prerequisites

- [Hugo](https://gohugo.io/) installed (extended version recommended)

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd kurt
```

2. Run the development server:
```bash
hugo server
```

3. Open your browser to `http://localhost:1313`

### Building for Production

```bash
hugo
```

The static site will be generated in the `public/` directory.

## Project Structure

```
.
├── content/          # Markdown content files
│   ├── blog/        # Blog posts
│   └── portfolio/   # Portfolio projects
├── layouts/         # HTML templates
├── static/          # CSS, JS, and other static files
│   ├── css/        # Stylesheets
│   └── js/         # JavaScript
└── hugo.toml       # Hugo configuration
```

## Customization

### Colors

Edit the CSS variables in `static/css/main.css`:

```css
:root {
    --neon-cyan: #00ffff;
    --neon-pink: #ff00ff;
    --neon-green: #00ff00;
    --neon-yellow: #ffff00;
}
```

### Adding Content

- **Blog posts**: Create `.md` files in `content/blog/`
- **Portfolio projects**: Create `.md` files in `content/portfolio/`

### Menu

Edit the menu in `hugo.toml`:

```toml
[menu]
  [[menu.main]]
    identifier = "home"
    name = "Home"
    url = "/"
```

## License

This project is open source and available under the MIT License.

## Credits

Inspired by the Y2K aesthetic and early 2000s web design. Built with Hugo, pure CSS, and vanilla JavaScript.
