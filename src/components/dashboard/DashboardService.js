const URL = {
  REACT: 'https://api.github.com/repos/facebook/react',
  ANGULARJS: 'https://api.github.com/repos/angular/angular.js',
  EMBER: 'https://api.github.com/repos/emberjs/ember.js'
}

const GitHubService = {
  fetchData: (url) => {
    return fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(response.error)
      }
      return response.json()
    })
  },

  fetchAllGitHubData: () => {
    return Promise.all([
      GitHubService.fetchData(URL.REACT),
      GitHubService.fetchData(URL.ANGULARJS),
      GitHubService.fetchData(URL.EMBER)
    ])
  }
}

export default GitHubService
