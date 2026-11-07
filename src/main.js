import './styles/main.css';
import { SITE } from './config/site.js';
import { renderSite } from './scripts/render.js';
import { initBackground } from './scripts/background.js';

renderSite(SITE);
initBackground();
