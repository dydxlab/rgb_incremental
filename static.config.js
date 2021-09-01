// static.config.js
export default {
  paths: {
    root: process.cwd(), // The root of your project. Don't change this unless you know what you're doing.
    src: 'src', // The source directory. Must include an index.js entry file.
    temp: 'tmp', // Temp output directory for build files not to be published.
    dist: 'dist', // The production output directory.
    devDist: 'tmp/dev-server', // The development scratch directory.
    public: 'public', // The public directory (files copied to dist during build)
    assets: 'dist', // The output directory for bundled JS and CSS
    buildArtifacts: 'artifacts', // The output directory for generated (internal) resources
  },
}
