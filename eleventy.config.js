import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";

export default async function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({ "_includes/css": "css" });
    eleventyConfig.addPassthroughCopy({ "_includes/images": "images" });
    eleventyConfig.addPassthroughCopy({ "_includes/media": "media" });
    eleventyConfig.addPassthroughCopy(
        "_content/gallery/**/*.{png,jpg,jpeg,gif,webp}",
    );

    eleventyConfig.addPassthroughCopy("CNAME");
    eleventyConfig.addPassthroughCopy("robots.txt");

    const markdownLib = markdownIt({ html: true }).use(markdownItAttrs);
    eleventyConfig.setLibrary("md", markdownLib);

    // Add markdown filter for rendering markdown strings from front matter
    eleventyConfig.addFilter("markdown", function (content) {
        if (!content) return "";
        return markdownLib.render(content);
    });

    // Layout aliases
    eleventyConfig.addLayoutAlias("main", "layouts/main.html");
    eleventyConfig.addLayoutAlias("home", "layouts/pages/home.html");
    eleventyConfig.addLayoutAlias("gallery", "layouts/pages/gallery.html");
    eleventyConfig.addLayoutAlias("artwork", "layouts/embeds/artwork.html");

    /** Collections **/

    /* newArt */
    eleventyConfig.addCollection("newArt", function (collectionApi) {
        const limit = 2;
        const galleryItems = collectionApi
            .getAllSorted()
            .filter(isGalleryItem())
            .reverse()
            .slice(0, limit);

        return galleryItems;
    });

    /* digitalArt */
    eleventyConfig.addCollection("digitalArt", function (collectionApi) {
        const galleryItems = collectionApi
            .getAllSorted()
            .filter(isGalleryItem("digital-art"))
            .reverse();

        return galleryItems;
    });

    /* comics */
    eleventyConfig.addCollection("comics", function (collectionApi) {
        console.log({ ...collectionApi });
        const galleryItems = collectionApi
            .getAllSorted()
            .filter(isGalleryItem("comics"))
            .reverse();

        return galleryItems;
    });
}

/** ******************** Util Functions ******************** **/

// Check if the given item is part of the art gallery.
function isGalleryItem(category = null) {
    return (item) => {
        const isNotIndex = !item.inputPath?.includes("/gallery/index.md");
        const target = category ? `/gallery/${category}/` : `/gallery/`;

        return item.url?.startsWith(target) && isNotIndex;
    };
}

// Check if an item belongs to a given tag name.
function hasTag(tagName) {
    return function (item) {
        return item?.data?.tags?.includes(tagName);
    };
}

/** ******************** Config export ******************** **/

export const config = {
    dir: {
        input: "_content",
        includes: "../_includes",
        output: "docs",
    },
};
