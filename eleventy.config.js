import markdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';

export default async function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({ '_includes/images': 'images' });
	eleventyConfig.addPassthroughCopy({ '_includes/css': 'css' });
	eleventyConfig.addPassthroughCopy('_content/gallery/**/*.{png,jpg,jpeg,gif,webp}');

	eleventyConfig.addPassthroughCopy('CNAME');
	eleventyConfig.addPassthroughCopy('robots.txt');

	const markdownLib = markdownIt({ html: true }).use(markdownItAttrs);
	eleventyConfig.setLibrary('md', markdownLib);

	/** Collections **/

	/* newArt */
	eleventyConfig.addCollection('newArt', function (collectionApi) {
		const limit = 2;
		const galleryItems = collectionApi
			.getAllSorted()
			.filter(isGalleryItem)
			.reverse()
			.slice(0, limit);

		return galleryItems;
	});

	/* digitalArt */
	eleventyConfig.addCollection('digitalArt', function (collectionApi) {
		const galleryItems = collectionApi
			.getAllSorted()
			.filter(isGalleryItem)
			.filter(hasTag('digital-art'))
			.reverse();

		return galleryItems;
	});
}

/** ******************** Util Functions ******************** **/

// Check if the given item is part of the art gallery.
function isGalleryItem(item) {
	/* Excluding /gallery/index.md */
	const isNotIndex = !item.inputPath?.includes('/gallery/index.md');
	return item.url?.startsWith('/gallery/') && isNotIndex;
}

// Check if an item belongs to a given tag name.
function hasTag(tagName) {
	return function (item) {
		console.log(item.data.tags, tagName, item.data.page.inputPath);
		return item?.data?.tags?.includes(tagName);
	}
}

/** ******************** Config export ******************** **/

export const config = {
	dir: {
		input: '_content',
		includes: '../_includes',
		output: 'docs',
	},
};
