# Tips

## Using well known modules

Angular uses many well knowns npm modules which you may have used with other libraries so, you can import and use them here as well.
Some of them are as follows:

- `lodash`
- `date-fns`

## CSS tips

- Don't make component's styles global, ie, don't use `ViewEncapsulation.None` in order to override 3rd party styles instead use `::ng-deep` wrapped in a custom unique class-name

Link - [Component styling best practices](https://angular.io/guide/component-styles#component-styling-best-practices)

## SSR tips

- Never allow execution of `setTimeout()` without platform check while running the code on server side in SSR.
