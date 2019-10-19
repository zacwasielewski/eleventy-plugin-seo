class Canonical {
  constructor(liquidEngine) {
    this.liquidEngine = liquidEngine;
  }

  getObject() {
    return {
      parse: (tagToken, remainToken) => {
        // Store possible URL that might has been passed as argument.
        this.url = tagToken.args;
      },
      render: (scope, hash) => {
        // Get reference to site data collection.
        const site = scope.contexts[0].site;

        // Resolve possible URL passed as argument.
        var url = null;
        if (this.url !== "") {
          url = this.liquidEngine.evalValue(this.url, scope) || this.url;
        }

        // Use page data for URL if none was passed with argument.
        url = url || scope.contexts[0].page.url;

        return Promise.resolve(site.url + url);
      }
    };
  }
}

module.exports = Canonical;
