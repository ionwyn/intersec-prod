const fuseSettingsConfig = {
  layout: {
    style: 'layout1',
    config: {
      scroll: 'content',
      navbar: {
        display: true,
        folded: true,
        position: 'left'
      },
      toolbar: {
        display: true,
        style: 'fixed',
        position: 'below'
      },
      footer: {
        display: false,
        style: 'fixed',
        position: 'below'
      },
      mode: 'fullwidth'
    }
  },
  customScrollbars: true,
  theme: {
    main: 'default',
    navbar: 'mainThemeDark',
    toolbar: 'mainThemeDark',
    footer: 'mainThemeDark'
  }
};

export default fuseSettingsConfig;
