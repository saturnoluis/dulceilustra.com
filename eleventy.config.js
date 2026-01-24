import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";

// Gallery categories for collections
const CATEGORIES = {
	digitalArt: "digital-art",
	paintings: "paintings",
	drawings: "drawings",
	comics: "comics",
};

export default async function(eleventyConfig) {
	/**	******************** Passthrough Copy ******************** **/
	eleventyConfig.addPassthroughCopy({ "_includes/css": "css" });
	eleventyConfig.addPassthroughCopy({ "_includes/images": "images" });
	eleventyConfig.addPassthroughCopy({ "_includes/media": "media" });
	eleventyConfig.addPassthroughCopy(
		"_content/gallery/**/*.{png,jpg,jpeg,gif,webp}",
	);

	// Root files
	eleventyConfig.addPassthroughCopy("CNAME");
	eleventyConfig.addPassthroughCopy("robots.txt");

	/**	******************** Plugins and Libraries ******************** **/

	// Markdown configuration
	const markdownLib = markdownIt({ html: true }).use(markdownItAttrs);
	eleventyConfig.setLibrary("md", markdownLib);

	// Filter for rendering markdown from front matter
	eleventyConfig.addFilter("markdown", function(content) {
		if (!content) return "";
		return markdownLib.render(content);
	});

	/**	******************** Layouts ******************** **/

	// Layout aliases
	eleventyConfig.addLayoutAlias("main", "layouts/main.html");
	eleventyConfig.addLayoutAlias("home", "layouts/pages/home.html");
	eleventyConfig.addLayoutAlias("gallery", "layouts/pages/gallery.html");
	eleventyConfig.addLayoutAlias("artwork", "layouts/embeds/artwork.html");

	/**	******************** Collections ******************** **/

	// Collections for each gallery category

	for (const categoryKey in CATEGORIES) {
		const category = CATEGORIES[categoryKey];

		// Collection to get all items in the category
		// (e.g., digitalArt, paintings, drawings, comics)
		eleventyConfig.addCollection(categoryKey, function(collectionApi) {
			const galleryItems = collectionApi
				.getAllSorted()
				.filter(isGalleryItem(category))
				.reverse();

			return galleryItems.map(insertUrlHash);
		});

		// Collection to get the latest item in the category
		// (e.g., digitalArtLatest, paintingsLatest, drawingsLatest, comicsLatest)
		eleventyConfig.addCollection(
			`${categoryKey}Latest`,
			function(collectionApi) {
				const galleryItems = collectionApi
					.getAllSorted()
					.filter(isGalleryItem(category))
					.reverse();

				const latestItem = galleryItems.length > 0 ? [galleryItems[0]] : [];

				return latestItem.map(insertUrlHash);
			},
		);
	}

	// Collections to get all gallery items across categories

	/* newArt:
	 * Latest 2 items from the gallery (excluding comics) */
	eleventyConfig.addCollection("newArt", function(collectionApi) {
		const limit = 2;
		const galleryItems = collectionApi
			.getAllSorted()
			.filter(isGalleryItem())
			.filter(isNot(CATEGORIES.comics))
			.reverse()
			.slice(0, limit);

		return galleryItems.map(insertUrlHash);
	});
}

/** ******************** Util Functions ******************** **/

function isGalleryItem(category = null) {
	return (item) => {
		const isNotIndex = !item.inputPath?.includes("/gallery/index.md");
		const target = category ? `/gallery/${category}/` : `/gallery/`;

		return item.url?.startsWith(target) && isNotIndex;
	};
}

function isNot(category) {
	return (item) => {
		const target = `/gallery/${category}/`;
		return !item.url?.startsWith(target);
	};
}

function insertUrlHash(item) {
	const urlHash = item.url.replaceAll("/", "+").replace(/^\++|\++$/g, "");
	item.urlHash = urlHash;

	return item;
}

/** ******************** Config export ******************** **/

export const config = {
	dir: {
		input: "_content",
		includes: "../_includes",
		output: "docs",
	},
};
