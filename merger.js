const path = require('path');

const mergePdfs = async (p1, p2) => {
    const PDFMerger = (await import('pdf-merger-js')).default;
    const merger = new PDFMerger();

    await merger.add(p1);  // Merge all pages of the first PDF
    await merger.add(p2);  // Merge all pages of the second PDF

    await merger.save(path.join('public', 'merged.pdf'));
};

module.exports = { mergePdfs };

