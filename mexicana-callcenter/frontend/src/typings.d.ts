// This code declares a TypeScript module for importing CSS files, defining
// the shape of the CSS class names object for better type safety.
declare module "*.css" {
  // Interface defining the shape of the CSS class names object
  interface IClassNames {
    [className: string]: string;
  }
   // Declare the classNames object which will contain the CSS class names
  const classNames: IClassNames;
  export = classNames;
}
