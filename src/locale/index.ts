const NGLang: any = {};

const targetConfig = {
  多语言: ['project_dyy', ''],
  dyy: ['project_dyy', '多语言'],
};
const langType = (() => {
  if (window.Proxy) {
    return new window.Proxy(targetConfig, {
      get(target, p) {
        const val = target[p] || [p];
        return NGLang[val[0]] || val[1] || p;
      },
    });
  }
  Object.keys(targetConfig).forEach(key => {
    const val = targetConfig[key] || [key];
    Object.defineProperty(targetConfig, key, {
      get() {
        return NGLang[val[0]] || val[1] || key;
      }
    });
  });
  return targetConfig;
})();

export default langType;
