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

function applyFixes(html, filePath) {
  const fileName = path.basename(filePath);
  const isGallery = filePath.includes('gallery');
  const isHomepage = filePath.endsWith('website\\index.html') || filePath.endsWith('website/index.html');

  // Determine if this page has a hero image (for preload)
  let heroImageName = null;
  const heroMatch = html.match(/src=["'](?:\.\.\/)?(?:\.\/)?(?:\/)?images\/([\w\s-]+-hero\.webp)["']/);
  if (heroMatch) {
    heroImageName = heroMatch[1];
  }

  // ===== FIX 1: Defer analytics =====
  // Wrap GTM inline config
  html = html.replace(
    /(<script>)\s*\n\s*window\.dataLayer\s*=\s*window\.dataLayer\s*\|\|\s*\[\];\s*\n\s*function gtag\(\)\{dataLayer\.push\(arguments\);\}\s*\n\s*gtag\('js',\s*new Date\(\)\);\s*\n\s*gtag\('config',\s*'G-X3CW5HT1Z5'\);\s*\n\s*(<\/script>)/,
    `$1\n    window.addEventListener('load', function() {\n      window.dataLayer = window.dataLayer || [];\n      function gtag(){dataLayer.push(arguments);}\n      gtag('js', new Date());\n      gtag('config', 'G-X3CW5HT1Z5');\n    });\n  $2`
  );

  // Wrap Clarity
  html = html.replace(
    /(<script type="text\/javascript">)\s*\n\s*\(function\(c,l,a,r,i,t,y\)\{\s*\n\s*c\[a\]=c\[a\]\|\|function\(\)\{\(c\[a\]\.q=c\[a\]\.q\|\|\[\]\)\.push\(arguments\)\};\s*\n\s*t=l\.createElement\(r\);t\.async=1;t\.src="https:\/\/www\.clarity\.ms\/tag\/"\+i;\s*\n\s*y=l\.getElementsByTagName\(r\)\[0\];y\.parentNode\.insertBefore\(t,y\);\s*\n\s*\}\)\(window,\s*document,\s*"clarity",\s*"script",\s*"vxfansa76s"\);\s*\n\s*(<\/script>)/,
    `$1\n    window.addEventListener('load', function() {\n      (function(c,l,a,r,i,t,y){\n          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};\n          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;\n          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);\n      })(window, document, "clarity", "script", "vxfansa76s");\n    });\n  $2`
  );

  // ===== FIX 2: Footer h4 -> p =====
  // Match both patterns (with and without letter-spacing)
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
  // Mobile menu button: p-2 -> p-3 with min dimensions
  html = html.replace(
    /class="md:hidden p-2 text-charcoal/g,
    'class="md:hidden p-3 min-w-[48px] min-h-[48px] text-charcoal'
  );

  // Footer social icons: 34px -> 48px
  html = html.replace(
    /width:34px;height:34px;border:1px solid rgba\(250,240,230,0\.2\)/g,
    'width:48px;height:48px;border:1px solid rgba(250,240,230,0.35)'
  );

  // Fix dropdown-link style definition to include min-height
  html = html.replace(
    /\.dropdown-link \{[^}]*display:\s*(?:block|flex)[^}]*padding:\s*10px 18px;[^}]*\}/,
    '.dropdown-link { display: flex; align-items: center; padding: 10px 18px; min-height: 48px; font-size: 14px; color: #363636; text-decoration: none; transition: background-color 0.2s, color 0.2s, opacity 0.2s; outline: none; }'
  );

  // Clean up any duplicate style attributes on dropdown-link elements
  html = html.replace(
    /class="dropdown-link"(\s+style="[^"]*")+/g,
    'class="dropdown-link"'
  );

  // Nav dropdown toggle buttons: add padding and min-height
  html = html.replace(
    /style="background:none;border:none;cursor:pointer;font-family:'Inter',sans-serif;font-weight:500;font-size:14px;letter-spacing:0\.04em;text-transform:uppercase;color:#363636;display:flex;align-items:center;gap:4px;padding:0;"/g,
    'style="background:none;border:none;cursor:pointer;font-family:\'Inter\',sans-serif;font-weight:500;font-size:14px;letter-spacing:0.04em;text-transform:uppercase;color:#363636;display:flex;align-items:center;gap:4px;padding:8px 0;min-height:48px;"'
  );

  // Gallery filter buttons (only in gallery page)
  if (isGallery) {
    html = html.replace(
      /\.filter-btn \{\s*\n\s*padding: 8px 20px;/,
      '.filter-btn {\n      padding: 12px 20px;\n      min-height: 48px;'
    );
    // Remove transition-all from filter-btn
    html = html.replace(
      /(\.filter-btn \{[^}]*?)transition: all 0\.2s;/,
      '$1transition: background-color 0.2s, color 0.2s, border-color 0.2s;'
    );
  }

  // ===== FIX 5: Color contrast =====
  // Footer copyright text: 0.4 -> 0.7
  html = html.replace(
    /font-size:13px;color:rgba\(250,240,230,0\.4\)/g,
    'font-size:13px;color:rgba(250,240,230,0.7)'
  );

  // Footer border divider: 0.4 -> 0.5
  html = html.replace(
    /border-top:1px solid rgba\(250,240,230,0\.4\)/g,
    'border-top:1px solid rgba(250,240,230,0.5)'
  );
  html = html.replace(
    /border: 1\.5px solid rgba\(250,240,230,0\.4\)/g,
    'border: 1.5px solid rgba(250,240,230,0.5)'
  );

  // ===== FIX 6: Responsive images (srcset, sizes, loading, width/height) =====
  // Process all <img> tags with local image references
  html = html.replace(
    /<img\s([^>]*?)src=["']((?:\.\.\/|\.\/|\/)?images\/([\w\s-]+)\.webp)["']([^>]*?)>/g,
    (match, before, fullSrc, baseName, after) => {
      const fileName = baseName + '.webp';
      const dims = MANIFEST[fileName];
      if (!dims) return match; // skip unknown images

      const isHero = fileName.includes('-hero');
      const isAboutCrew = fileName === 'about-crew-photo.webp';

      // Determine the path prefix from the original src
      const pathPrefix = fullSrc.replace(fileName, '');

      // Build srcset
      const srcset = `${pathPrefix}${baseName}-400.webp 400w, ${pathPrefix}${baseName}-800.webp 800w, ${pathPrefix}${baseName}-1600.webp 1600w`;

      // Determine sizes based on context
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

      // Determine loading attribute
      let loading = '';
      if (!isHero) {
        // Check if loading="lazy" already exists
        if (!before.includes('loading=') && !after.includes('loading=')) {
          loading = ' loading="lazy"';
        }
      }

      // For gallery, use 400w src for grid thumbnails
      let newSrc = fullSrc;
      if (isGallery && !isHero) {
        newSrc = `${pathPrefix}${baseName}-400.webp`;
      }

      // Check if width/height already exist
      let widthHeight = '';
      const hasWidth = before.includes('width=') || after.includes('width=');
      const hasHeight = before.includes('height=') || after.includes('height=');

      // For gallery thumbnails, use 400w dimensions
      let displayW, displayH;
      if (isGallery && !isHero) {
        const scaled = getScaledDims(fileName, 400);
        displayW = scaled ? scaled.width : dims.width;
        displayH = scaled ? scaled.height : dims.height;
      } else {
        // Use 1600 as the reference size
        const scaled = getScaledDims(fileName, 1600);
        displayW = scaled ? scaled.width : dims.width;
        displayH = scaled ? scaled.height : dims.height;
      }

      if (!hasWidth) widthHeight += ` width="${displayW}"`;
      if (!hasHeight) widthHeight += ` height="${displayH}"`;

      // Add data-full for gallery images (lightbox needs full size)
      let dataFull = '';
      if (isGallery && !isHero) {
        dataFull = ` data-full="${pathPrefix}${baseName}-1600.webp"`;
      }

      // Remove any existing srcset/sizes to avoid duplicates
      let cleanBefore = before.replace(/\s*srcset="[^"]*"/g, '').replace(/\s*sizes="[^"]*"/g, '');
      let cleanAfter = after.replace(/\s*srcset="[^"]*"/g, '').replace(/\s*sizes="[^"]*"/g, '');

      return `<img ${cleanBefore}src="${newSrc}" srcset="${srcset}" sizes="${sizes}"${loading}${widthHeight}${dataFull}${cleanAfter}>`;
    }
  );

  // ===== FIX 7: Hero image preload =====
  // First remove any existing preload tags (for idempotency)
  html = html.replace(/\s*<link rel="preload" as="image"[^>]*imagesrcset[^>]*>/g, '');

  if (heroImageName) {
    const heroBase = heroImageName.replace('.webp', '');
    const preloadTag = `\n  <link rel="preload" as="image" href="/images/${heroImageName}" imagesrcset="/images/${heroBase}-400.webp 400w, /images/${heroBase}-800.webp 800w, /images/${heroBase}-1600.webp 1600w" imagesizes="100vw">`;

    // Insert after <link rel="canonical"> or before <script src="tailwindcss">
    if (html.includes('<link rel="canonical"')) {
      html = html.replace(
        /(<link rel="canonical"[^>]*>)/,
        `$1${preloadTag}`
      );
    } else {
      html = html.replace(
        /(<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>)/,
        `${preloadTag}\n  $1`
      );
    }
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
