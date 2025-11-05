import markdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';

export default async function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({ '_includes/assets': 'assets' });
	eleventyConfig.addPassthroughCopy({ '_includes/css': 'css' });

	eleventyConfig.addPassthroughCopy('CNAME');
	eleventyConfig.addPassthroughCopy('robots.txt');

	const markdownLib = markdownIt({ html: true }).use(markdownItAttrs);
	eleventyConfig.setLibrary('md', markdownLib);

	eleventyConfig.addCollection("gallery", function (collectionApi) {
		const galleryItems = collectionApi.getAll().filter((item) => {
			return item.filePathStem?.startsWith('/gallery/');
		}).reverse();
		return galleryItems;
	});

	eleventyConfig.addCollection("newArt", function (collectionApi) {
		const limit = 2;
		const galleryItems = collectionApi.getAll().filter((item) => {
			return item.filePathStem?.startsWith('/gallery/');
		}).reverse().slice(0, 2);
		return galleryItems;
	});
}

export const config = {
	dir: {
		input: '_content',
		includes: '../_includes',
		output: 'docs',
	},
};
