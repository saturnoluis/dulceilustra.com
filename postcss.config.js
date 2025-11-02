export default {
    plugins: {
        cssnano: {
            preset: [
                "default",
                {
                    discardComments: { removeAll: true },
                    normalizeWhitespace: true,
                    colorMin: true,
                    minifyFontValues: true,
                    minifySelectors: true,
                },
            ],
        },
    },
};
