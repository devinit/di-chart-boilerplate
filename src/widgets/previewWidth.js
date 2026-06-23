export default class PreviewWidth {
  constructor() {
    this.widths = {
      mobile: '300px',
      tablet: '820px',
      desktop: '1400px',
    };
  }

  getWidth(view) {
    return this.widths[view];
  }
}
