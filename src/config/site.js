// EDIT THIS FILE to change the content of the page.
// Order of the links here is the order on the page.
export const SITE = {
  name: 'vaeso',
  tagline: 'New music, all in one place.',

  // Featured release card. Set to null to hide it.
  release: {
    title: 'Single title',
    type: 'Single',              // Single, EP, Album
    date: 'Out now',             // or 'Out Dec 5'
    cover: 'cover.jpg',          // square image placed in the public/ folder
    listenUrl: 'https://open.spotify.com/',
    presaveUrl: ''               // fill in to show a Pre-save button
  },

  links: [
    { label: 'Spotify',           url: 'https://open.spotify.com/' },
    { label: 'Apple Music',       url: 'https://music.apple.com/' },
    { label: 'YouTube',           url: 'https://youtube.com/' },
    { label: 'Instagram',         url: 'https://instagram.com/' },
    { label: 'TikTok',            url: 'https://tiktok.com/' },
    { label: 'Booking and press', url: 'mailto:you@example.com' }
  ],

  footer: '© 2026 vaeso'
};
