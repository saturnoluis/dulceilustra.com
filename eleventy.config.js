import markdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';

export default async function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({ '_includes/assets': 'assets' });
	eleventyConfig.addPassthroughCopy({ '_includes/css': 'css' });

	eleventyConfig.addPassthroughCopy('CNAME');
	eleventyConfig.addPassthroughCopy('robots.txt');

	const markdownLib = markdownIt({ html: true }).use(markdownItAttrs);
	eleventyConfig.setLibrary('md', markdownLib);
}

export const config = {
	dir: {
		input: '_content',
		includes: '../_includes',
		output: 'docs',
	},
};
