# vaeso-links

A self-hosted link page for releases (a Linktree-style page) with an animated three.js background.
Everything you change lives in two small config files. There is no database and no server.

| | |
|---|---|
| GitHub account | Shingii |
| Repository | https://github.com/Shingii/vaeso-links |
| Live site (after deploying) | https://shingii.github.io/vaeso-links/ |

## What you get

- Centered logo, a featured release card, and a list of link buttons
- Animated, grainy gradient background made with three.js (falls back to a still image if WebGL is unavailable)
- Respects "reduce motion" settings (shows one still frame instead of animating)
- Free automatic deployment to GitHub Pages through GitHub Actions

## Folder structure

```
vaeso-links/
├── index.html                  Page skeleton (rarely needs editing)
├── package.json                Dependencies and the npm commands
├── vite.config.js              Build settings
├── README.md                   This file
├── .gitignore                  Keeps node_modules and dist out of git
├── .github/
│   └── workflows/
│       └── deploy.yml          Builds and publishes to GitHub Pages on every push to main
├── public/                     Files copied as-is to the site root
│   ├── logo.png                Your logo (white, transparent background)
│   ├── bg.jpg                  Static fallback background
│   └── cover.jpg               YOUR release artwork goes here (square). Not included yet.
└── src/
    ├── main.js                 Entry point, wires everything together
    ├── config/
    │   ├── site.js             EDIT: name, tagline, release card, links, footer
    │   └── background.js       EDIT: colors, speed, grain, mouse effect
    ├── scripts/
    │   ├── background.js       The three.js scene (canvas, uniforms, animation loop)
    │   └── render.js           Fills the page from config/site.js
    ├── shaders/
    │   ├── background.vert     Vertex shader (a full-screen plane)
    │   └── background.frag     Fragment shader (the blended color and grain)
    └── styles/
        └── main.css            All styling
```

## Requirements

- Node.js 20.19 or newer (22 recommended). Check with `node -v`. Download from https://nodejs.org
- Git, and a free GitHub account for hosting

## Run it on your computer

Do this the first time, starting from the zip file:

1. Unzip `vaeso-links.zip`. You get a folder called `vaeso-links`.
2. Open a terminal inside that folder.
   - Mac: Terminal app, then `cd ~/Downloads/vaeso-links`
   - Windows: Git Bash or PowerShell, then `cd C:\Users\YourName\Downloads\vaeso-links`
   - VS Code: open the folder, then Terminal, New Terminal (it opens in the right place)
3. Install the dependencies (one time):
   ```bash
   npm install
   ```
4. Start the local server:
   ```bash
   npm run dev
   ```

Open the address it prints (usually http://localhost:5173). Edits to any file in `src/` appear instantly.

Already pushed this to GitHub and want it on another computer? Then, and only then, use:

```bash
git clone https://github.com/Shingii/vaeso-links.git
cd vaeso-links
npm install
npm run dev
```

Other commands:

| Command | What it does |
|---|---|
| `npm run dev` | Local development server with live reload |
| `npm run build` | Creates the finished site in the `dist/` folder |
| `npm run preview` | Serves the `dist/` folder locally so you can test the real build |

## Change the content

1. Open `src/config/site.js` and edit the name, tagline, release card and links.
2. Add your square cover art as `public/cover.jpg`. If the file is missing, a blue gradient shows instead.
3. To replace the logo, overwrite `public/logo.png`. Keep the filename.
4. For a new release, update the `release` block (title, date, Spotify link). Add a `presaveUrl` to show a Pre-save button.

## Tune the animation

Open `src/config/background.js`:

| Setting | Effect |
|---|---|
| `base`, `deep`, `purple`, `teal`, `pink` | The five colors, as hex values |
| `speed` | Drift speed. 0.02 is slow, 0.12 is lively |
| `grain` | Film grain strength. 0 removes it |
| `mouseInfluence` | How far the colors shift toward the pointer. 0 turns it off |
| `maxPixelRatio` | Lower to 1 for better performance on older phones |

## Deploy to GitHub Pages (free)

1. While signed in as Shingii, create a new empty repo named `vaeso-links` (no README, no .gitignore). That gives you the address `https://shingii.github.io/vaeso-links/`. If you would rather have the shorter `https://shingii.github.io`, name the repo `Shingii.github.io` instead and use that name in the commands below.
2. Push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "First version"
   git branch -M main
   git remote add origin https://github.com/Shingii/vaeso-links.git
   git push -u origin main
   ```
3. On GitHub, open the repo, then Settings, then Pages. Under Source choose **GitHub Actions**.
4. Open the Actions tab. When the "Deploy to GitHub Pages" run turns green (about a minute), your site is live.

After that, every `git push` to `main` redeploys automatically.

### Custom domain (optional)

Buy a domain, then in Settings, Pages, enter it under Custom domain and add the DNS records GitHub shows you. HTTPS is enabled for you.

## Host somewhere else

Run `npm run build`, then upload the contents of the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, your own server). Build settings if asked: command `npm run build`, output folder `dist`.

## Troubleshooting

- **Blank page on GitHub Pages:** confirm Settings, Pages, Source is set to GitHub Actions, and that the Actions run succeeded.
- **Logo or background missing:** filenames are case sensitive. They must be exactly `logo.png` and `bg.jpg` in `public/`.
- **Background not animating:** your device may have WebGL disabled or "reduce motion" turned on. The still background is the intended fallback in both cases.
- **`npm install` fails:** update Node.js to 20.19 or newer.
- **Slow on an old phone:** set `maxPixelRatio` to 1 and `speed` lower in `src/config/background.js`.

## Starting over (remove an earlier install)

Use this if an earlier attempt left things in a bad state. Deleting these only removes copies, and your work is safe as long as you keep the zip.

**1. Delete the old local folder**
- Mac or Linux: `rm -rf ~/Downloads/vaeso-links` (change the path to wherever you unzipped it)
- Windows PowerShell: `Remove-Item -Recurse -Force C:\Users\YourName\Downloads\vaeso-links`
- Or simply drag the folder to the Trash or Recycle Bin.

**2. Delete the old GitHub repo, if it exists**
Open https://github.com/Shingii/vaeso-links, then Settings, scroll to the bottom, Delete this repository. Skip this if the repo is empty and you want to reuse it.

**3. Clear the saved GitHub login (fixes the wrong account being used)**
- Mac: open Keychain Access, search "github.com", delete the entries.
- Windows: open Credential Manager, Windows Credentials, remove the `git:https://github.com` entry.
- Check what Git thinks your identity is with `git config --global user.name` and fix it with `git config --global user.name "Shingii"`.

**4. Unzip a fresh copy and follow "Run it on your computer" and "Deploy to GitHub Pages" again.**

## Troubleshooting a 403 "permission denied" on push

This means GitHub signed you in as a different account than the one that owns the repo.
1. Confirm the remote points to the right place: `git remote -v` should show `https://github.com/Shingii/vaeso-links.git`.
2. If it does not: `git remote set-url origin https://github.com/Shingii/vaeso-links.git`
3. Clear the saved login (step 3 above) and run `git push -u origin main` again, signing in as Shingii.
4. Make sure the empty `vaeso-links` repo exists on the Shingii account.

## Licenses

three.js is MIT licensed. Add your own license for your logo and artwork.
