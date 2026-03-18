import { readdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

// Find all HTML files recursively
async function findHtmlFiles(dir) {
  const results = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !['node_modules', '.git', 'temporary screenshots', 'brand_assets', 'rewrite', 'scripts'].includes(entry.name)) {
      results.push(...await findHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

// Image dimension manifest (from resize script output)
const MANIFEST = {
  "Canopy Trimming ready.webp": { width: 3424, height: 1248 },
  "Lot Clearing.webp": { width: 2400, height: 1792 },
  "Tree Planting.webp": { width: 2400, height: 1792 },
  "Tree Removal.webp": { width: 2400, height: 1792 },
  "Tree pruing.webp": { width: 2400, height: 1792 },
  "Tree Trimming Project.webp": { width: 1664, height: 2560 },
  "Stump Grinding.webp": { width: 2400, height: 1792 },
  "Aerial-Tree-Cutting.webp": { width: 1024, height: 1024 },
  "Equipment-Closeup.webp": { width: 2048, height: 2048 },
  "Backyard-Tree-Trimming.webp": { width: 2400, height: 1792 },
  "Crew-With-Truck.webp": { width: 2400, height: 1792 },
  "Arborist-Climbing-Trim.webp": { width: 1792, height: 2400 },
  "Before-After-Backyard-Cleanup.webp": { width: 2912, height: 1440 },
  "Stump-And-Log-Hauling.webp": { width: 2400, height: 1792 },
  "Shaped-Tree-Branch-Cleanup.webp": { width: 2048, height: 2048 },
  "Dead-Tree-Removal-Powerlines.webp": { width: 1792, height: 2400 },
  "Before-After-Dead-Tree-Removal.webp": { width: 2912, height: 1440 },
  "emergency-tree-service-boise-hero.webp": { width: 3392, height: 1248 },
  "tree-removal-boise-hero.webp": { width: 3392, height: 1248 },
  "tree-trimming-boise-hero.webp": { width: 3392, height: 1248 },
  "tree-service-meridian-hero.webp": { width: 3392, height: 1248 },
  "tree-service-caldwell-hero.webp": { width: 3392, height: 1248 },
  "tree-service-garden-city-hero.webp": { width: 3392, height: 1248 },
  "tree-service-eagle-hero.webp": { width: 3392, height: 1248 },
  "tree-service-nampa-hero.webp": { width: 3392, height: 1248 },
  "about-crew-photo.webp": { width: 2752, height: 1536 },
};

function getScaledDims(fileName, targetW) {
  const m = MANIFEST[fileName];
  if (!m) return null;
  const ratio = targetW / m.width;
  return { width: targetW, height: Math.round(m.height * ratio) };
}

// Analytics script blocks to extract and move
const GTM_ASYNC_TAG = `<script defer src="https://www.googletagmanager.com/gtag/js?id=G-X3CW5HT1Z5"></script>`;
const GTM_CONFIG = `<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-X3CW5HT1Z5');
</script>`;
const CLARITY_SCRIPT = `<script>
  (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "vxfansa76s");
</script>`;

function applyFixes(html, filePath) {
  const fileName = path.basename(filePath);
  const isGallery = filePath.includes('gallery');
  const isHomepage = filePath.endsWith('website\\index.html') || filePath.endsWith('website/index.html');

  // Determine if this page has a hero image
  let heroImageName = null;
  const heroMatch = html.match(/src=["'](?:\.\.\/)?(?:\.\/)?(?:\/)?images\/([\w\s-]+-hero\.webp)["']/);
  if (heroMatch) {
    heroImageName = heroMatch[1];
  }

  // ===== PRIORITY 3: Move analytics to bottom of <body> =====
  // Strip ALL analytics-related script tags and comments from the entire document
  // Use a simple approach: find and remove each script block by its unique content marker

  // Remove GTM loader tag (async or defer)
  html = html.replace(/<script (?:async|defer) src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-X3CW5HT1Z5"><\/script>\n?/g, '');

  // Remove any script block containing gtag('config', 'G-X3CW5HT1Z5')
  // Use [^<]* to avoid crossing into other tags
  html = html.replace(/<script>(?:[^<]|<(?!\/script>))*gtag\('config',\s*'G-X3CW5HT1Z5'\)(?:[^<]|<(?!\/script>))*<\/script>\n?/g, '');

  // Remove any script block containing clarity.ms
  html = html.replace(/<script[^>]*>(?:[^<]|<(?!\/script>))*clarity\.ms(?:[^<]|<(?!\/script>))*<\/script>\n?/g, '');

  // Remove analytics comments
  html = html.replace(/\s*<!--\s*Google Analytics 4[^>]*-->\s*/g, '');
  html = html.replace(/\s*<!--\s*Microsoft Clarity\s*-->\s*/g, '');
  html = html.replace(/\s*<!-- Analytics -->\s*/g, '');

  // Insert analytics once, just before </body>
  const analyticsBlock = `\n<!-- Analytics -->\n${GTM_ASYNC_TAG}\n${GTM_CONFIG}\n${CLARITY_SCRIPT}\n`;
  html = html.replace('</body>', `${analyticsBlock}</body>`);

  // Clean up any empty lines left behind
  html = html.replace(/\n{3,}/g, '\n\n');

  // ===== RENDER BLOCKING: Replace Tailwind CDN with static CSS =====
  // Remove Tailwind CDN script tag
  html = html.replace(/\s*<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>\s*/g, '\n');

  // Remove inline tailwind.config script block
  html = html.replace(/<script>\s*\n\s*tailwind\.config(?:[^<]|<(?!\/script>))*<\/script>\s*/g, '');

  // Add static CSS with async preload pattern (if not already present)
  if (!html.includes('/styles.css')) {
    // Insert after the preconnect/fonts block or after viewport meta
    const cssTag = `  <link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">\n  <noscript><link rel="stylesheet" href="/styles.css"></noscript>\n`;

    if (html.includes('fonts.gstatic.com')) {
      // Insert after the Google Fonts line
      html = html.replace(
        /(<link href="https:\/\/fonts\.googleapis\.com\/css2[^>]*>)\s*\n/,
        `$1\n${cssTag}`
      );
    } else {
      // Fallback: insert before </head>
      html = html.replace('</head>', `${cssTag}</head>`);
    }
  }

  // ===== RENDER BLOCKING: Async-load Google Fonts =====
  // Replace blocking stylesheet with preload pattern
  html = html.replace(
    /<link href="(https:\/\/fonts\.googleapis\.com\/css2[^"]*)" rel="stylesheet">/,
    '<link rel="preload" href="$1" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">\n  <noscript><link rel="stylesheet" href="$1"></noscript>'
  );

  // ===== FIX 2: Footer h4 -> p =====
  html = html.replace(
    /<h4 style="font-family:'Zilla Slab',Georgia,serif;font-size:16px;font-weight:700;color:#FAF0E6;margin-bottom:16px;[^"]*">(Services|Service Areas|Company|Contact)<\/h4>/g,
    (match, label) => `<p style="font-family:'Zilla Slab',Georgia,serif;font-size:16px;font-weight:700;color:#FAF0E6;margin-bottom:16px;letter-spacing:0.02em;">${label}</p>`
  );

  // ===== FIX 3: stump-grinding "In This Article" h4 -> p =====
  html = html.replace(
    /<h4>In This Article<\/h4>/g,
    `<p style="font-family:'Zilla Slab',Georgia,serif;font-weight:700;font-size:16px;color:#1A531A;margin-bottom:8px;">In This Article</p>`
  );

  // ===== FIX 4: Touch targets =====
  html = html.replace(
    /class="md:hidden p-2 text-charcoal/g,
    'class="md:hidden p-3 min-w-[48px] min-h-[48px] text-charcoal'
  );
  html = html.replace(
    /width:34px;height:34px;border:1px solid rgba\(250,240,230,0\.2\)/g,
    'width:48px;height:48px;border:1px solid rgba(250,240,230,0.35)'
  );
  html = html.replace(
    /\.dropdown-link \{[^}]*display:\s*(?:block|flex)[^}]*padding:\s*10px 18px;[^}]*\}/,
    '.dropdown-link { display: flex; align-items: center; padding: 10px 18px; min-height: 48px; font-size: 14px; color: #363636; text-decoration: none; transition: background-color 0.2s, color 0.2s, opacity 0.2s; outline: none; }'
  );
  html = html.replace(
    /class="dropdown-link"(\s+style="[^"]*")+/g,
    'class="dropdown-link"'
  );
  html = html.replace(
    /style="background:none;border:none;cursor:pointer;font-family:'Inter',sans-serif;font-weight:500;font-size:14px;letter-spacing:0\.04em;text-transform:uppercase;color:#363636;display:flex;align-items:center;gap:4px;padding:0;"/g,
    'style="background:none;border:none;cursor:pointer;font-family:\'Inter\',sans-serif;font-weight:500;font-size:14px;letter-spacing:0.04em;text-transform:uppercase;color:#363636;display:flex;align-items:center;gap:4px;padding:8px 0;min-height:48px;"'
  );
  if (isGallery) {
    html = html.replace(
      /\.filter-btn \{\s*\n\s*padding: 8px 20px;/,
      '.filter-btn {\n      padding: 12px 20px;\n      min-height: 48px;'
    );
    html = html.replace(
      /(\.filter-btn \{[^}]*?)transition: all 0\.2s;/,
      '$1transition: background-color 0.2s, color 0.2s, border-color 0.2s;'
    );
  }

  // ===== FIX 5: Color contrast =====
  html = html.replace(
    /font-size:13px;color:rgba\(250,240,230,0\.4\)/g,
    'font-size:13px;color:rgba(250,240,230,0.7)'
  );
  html = html.replace(
    /border-top:1px solid rgba\(250,240,230,0\.4\)/g,
    'border-top:1px solid rgba(250,240,230,0.5)'
  );
  html = html.replace(
    /border: 1\.5px solid rgba\(250,240,230,0\.4\)/g,
    'border: 1.5px solid rgba(250,240,230,0.5)'
  );

  // ===== PRIORITY 1 & 2 & 4: Responsive images with LCP optimization =====
  // Process all <img> tags with local image references
  html = html.replace(
    /<img\s([^>]*?)src=["']((?:\.\.\/|\.\/|\/)?images\/([\w\s-]+)\.webp)["']([^>]*?)>/g,
    (match, before, fullSrc, baseName, after) => {
      const fileName = baseName + '.webp';
      const dims = MANIFEST[fileName];
      if (!dims) return match;

      const isHero = fileName.includes('-hero');
      const isAboutCrew = fileName === 'about-crew-photo.webp';
      const pathPrefix = fullSrc.replace(fileName, '');

      // Build srcset
      const srcset = `${pathPrefix}${baseName}-400.webp 400w, ${pathPrefix}${baseName}-800.webp 800w, ${pathPrefix}${baseName}-1600.webp 1600w`;

      // Determine sizes
      let sizes;
      if (isHero) {
        sizes = '100vw';
      } else if (isGallery) {
        sizes = '(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw';
      } else if (isAboutCrew) {
        sizes = '(max-width: 768px) 100vw, 50vw';
      } else {
        sizes = '(max-width: 768px) 100vw, 33vw';
      }

      // For gallery, use 400w src for grid thumbnails
      let newSrc = fullSrc;
      if (isGallery && !isHero) {
        newSrc = `${pathPrefix}${baseName}-400.webp`;
      }

      // Width/height
      let widthHeight = '';
      const hasWidth = before.includes('width=') || after.includes('width=');
      const hasHeight = before.includes('height=') || after.includes('height=');
      let displayW, displayH;
      if (isGallery && !isHero) {
        const scaled = getScaledDims(fileName, 400);
        displayW = scaled ? scaled.width : dims.width;
        displayH = scaled ? scaled.height : dims.height;
      } else {
        const scaled = getScaledDims(fileName, 1600);
        displayW = scaled ? scaled.width : dims.width;
        displayH = scaled ? scaled.height : dims.height;
      }
      if (!hasWidth) widthHeight += ` width="${displayW}"`;
      if (!hasHeight) widthHeight += ` height="${displayH}"`;

      // data-full for gallery lightbox
      let dataFull = '';
      if (isGallery && !isHero) {
        dataFull = ` data-full="${pathPrefix}${baseName}-1600.webp"`;
      }

      // Clean existing srcset/sizes/loading/fetchpriority/decoding to rebuild fresh
      let cleanBefore = before
        .replace(/\s*srcset="[^"]*"/g, '')
        .replace(/\s*sizes="[^"]*"/g, '')
        .replace(/\s*loading="[^"]*"/g, '')
        .replace(/\s*fetchpriority="[^"]*"/g, '')
        .replace(/\s*decoding="[^"]*"/g, '');
      let cleanAfter = after
        .replace(/\s*srcset="[^"]*"/g, '')
        .replace(/\s*sizes="[^"]*"/g, '')
        .replace(/\s*loading="[^"]*"/g, '')
        .replace(/\s*fetchpriority="[^"]*"/g, '')
        .replace(/\s*decoding="[^"]*"/g, '');

      // Hero images: fetchpriority=high, loading=eager, decoding=async
      // Non-hero images: loading=lazy
      let loadingAttrs;
      if (isHero) {
        loadingAttrs = ' fetchpriority="high" loading="eager" decoding="async"';
      } else {
        loadingAttrs = ' loading="lazy"';
      }

      return `<img ${cleanBefore}src="${newSrc}" srcset="${srcset}" sizes="${sizes}"${loadingAttrs}${widthHeight}${dataFull}${cleanAfter}>`;
    }
  );

  // ===== PRIORITY 2 continued: Add loading="lazy" to ALL non-local images that don't have it =====
  // Match img tags that DON'T reference local /images/ (external URLs, brand_assets, etc.)
  html = html.replace(
    /<img\s([^>]*?)>/g,
    (match, attrs) => {
      // Skip if already has loading attribute
      if (attrs.includes('loading=')) return match;
      // Skip if has fetchpriority (it's a hero)
      if (attrs.includes('fetchpriority=')) return match;
      // Add loading="lazy"
      return `<img ${attrs} loading="lazy">`;
    }
  );

  // ===== PRIORITY 1a: Hero image preload with fetchpriority =====
  // Remove any existing preload tags (for idempotency)
  html = html.replace(/\s*<link rel="preload" as="image"[^>]*>/g, '');

  if (heroImageName) {
    const heroBase = heroImageName.replace('.webp', '');
    // Place preload BEFORE any CSS/JS — right after <meta viewport>
    const preloadTag = `\n  <link rel="preload" as="image" href="/images/${heroImageName}" fetchpriority="high" imagesrcset="/images/${heroBase}-400.webp 400w, /images/${heroBase}-800.webp 800w, /images/${heroBase}-1600.webp 1600w" imagesizes="100vw">`;

    // Insert right after the viewport meta tag (before any scripts or CSS)
    html = html.replace(
      /(<meta name="viewport"[^>]*>)/,
      `$1${preloadTag}`
    );
  }

  return html;
}

async function run() {
  const rootDir = path.resolve('.');
  const htmlFiles = await findHtmlFiles(rootDir);

  console.log(`Found ${htmlFiles.length} HTML files\n`);

  for (const filePath of htmlFiles) {
    const original = await readFile(filePath, 'utf-8');
    const fixed = applyFixes(original, filePath);

    if (fixed !== original) {
      await writeFile(filePath, fixed, 'utf-8');
      console.log(`UPDATED: ${path.relative(rootDir, filePath)}`);
    } else {
      console.log(`  (no changes): ${path.relative(rootDir, filePath)}`);
    }
  }

  console.log('\nDone!');
}

run().catch(err => { console.error(err); process.exit(1); });
