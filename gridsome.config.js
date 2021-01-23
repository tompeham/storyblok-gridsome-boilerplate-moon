const { resolve } = require('path')

// use it to load the variables into all vue files
function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        resolve(__dirname, './src/assets/sass/variables.scss')
      ]
    })
}

module.exports = {
  siteName: 'Thomas Peham Marketing Expert',
  siteDescription: 'This is the personal website of Thomas Peham, SaaS marketing expert.',
  siteUrl: 'https://demo.storyblok.com',
  plugins: [
    {
      use: 'gridsome-source-storyblok',
      options: {
        client: {
          accessToken: 'h7tTYNZKAj8GBHMSMb5uAwtt' // Your_Access_Token_Here
        },
        version: 'published',
        downloadImages: true,
        imageDirectory: 'assets/images',
        types: {
          story: {
            params: {
              resolve_relations: 'blog-post.next_post'
            }
          }
        }
      }
    }
  ],
  chainWebpack (config) {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    types.forEach(type => {
      addStyleResource(config.module.rule('sass').oneOf(type))
    })

    // or if you use scss
    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
	}
}
