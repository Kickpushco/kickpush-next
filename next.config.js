module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "removeViewBox",
                  active: false,
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
  images: {
    domains: ["images.ctfassets.net"],
    loader: "imgix",
    path: "/",
  },
  rewrites: async () => {
    return [
      {
        source: "/soon",
        destination: "/soon/index.html",
      },
    ];
  },
};
