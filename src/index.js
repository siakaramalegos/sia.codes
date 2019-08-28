import './style.css'
import './images/siacodes.png'

// Require all files in the favicon directory
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./favicons/', true, /\.(png|xml|ico|json)$/));
