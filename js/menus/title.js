gA.title.run = (function() {
  "use strict";

  var menu = function() {
    this.done = false;
    this.fade = false;
    this.called = false;
    this.state = { home: true, stats: false, credits: false };
    this.A = 0;

    this.cursor = new gA.cursor.state(gA.title.home.list, gA.title.home.shared, this);
    this.intro = new gA.intro.init();

    this.update = function() {
      if(this.intro.update()) this.done = true;

      if(this.state.home) gA.title.home.update.bind(this)();
      else if(this.state.stats) gA.title.stats.update.bind(this)();
      else if(this.state.credits) gA.title.credits.update.bind(this)();
    };
    this.render = function() {
      this.intro.render();

      if(this.state.home) gA.title.home.render.bind(this)();
      else if(this.state.stats) gA.title.stats.render();
      else if(this.state.credits) gA.title.credits.render();
    };
  };

  return { menu: new menu() };

})();
