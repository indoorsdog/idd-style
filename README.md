## idd-style

This is a small flexbox and dimensions-setting library written in Sass. 

Please check out the [demo page](http://indoorsdog.github.io/idd-style) for layout usage.

The CSS is in the [distribution folder](dist/css). Use what you want.

* `idd-flex.css` - utility flexbox classes.
* `idd-flex-hz.css` - horizontal (i.e. `flex-direction: row`) layout flex classes.
* `idd-flex-vt.css` - vertical (i.e. `flex-direction: column`) layout flex classes.
* `idd-height.css` - fractional, *percentage*-based height-setting classes.
* `idd-style.css` - master "include" file. includes all other listed CSS files here.
* `idd-width.css` - fractional, *percentage*-based width-setting classes.

Flexbox support, right now, is not comprehensive (e.g. no RTL layout support, no child ordering or self-alignment -- to name a few) but may be in future iterations.

If you're working in a Sass environment, feel free to extend or mixin [the source](src) -- particularly `idd-responsive.scss`, a collection of mixins for cross-browser responsive design support, including Bootstrap-defaults.
