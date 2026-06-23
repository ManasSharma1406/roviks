import fs from 'fs';

const files = [
  'src/App.tsx',
  'src/components/ShopPage.tsx',
  'src/components/CollectionPage.tsx',
  'src/components/SearchPage.tsx',
  'src/components/ProductDetailPage.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Regex to match the old div exactly (handles both card and item)
  const regex = /<div className="w-full overflow-hidden relative">\s*<img\s*src=\{([^}]+)\}\s*alt=\{([^}]+)\}\s*className="w-full h-auto transition-transform duration-700 group-hover:scale-105 object-cover"\s*\/>\s*<span className="absolute top-3 left-3 bg-\[#e53e3e\] text-white font-bold text-\[11px\] px-2\.5 py-0\.5 rounded-full z-10">30%<\/span>\s*<button className="absolute -bottom-4 right-3 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform z-10 text-gray-800">\s*<ShoppingBag className="w-4 h-4" \/>\s*<\/button>\s*<\/div>/g;

  const newMarkup = `<div className="w-full relative">
                      <div className="w-full overflow-hidden">
                        <img
                          src={$1}
                          alt={$2}
                          className="w-full h-auto transition-transform duration-700 group-hover:scale-105 object-cover"
                        />
                      </div>
                      <span className="absolute top-3 left-3 bg-[#e53e3e] text-white font-bold text-[11px] px-2.5 py-0.5 rounded-full z-10">30%</span>
                      <button className="absolute -bottom-4 right-3 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-20 text-gray-800">
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>`;

  if (regex.test(content)) {
    content = content.replace(regex, newMarkup);
    fs.writeFileSync(file, content);
    console.log('Fixed:', file);
  } else {
    console.log('Not found in:', file);
  }
});
