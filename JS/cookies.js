let cookieObj = {
  set: (o) => {
    const cookieStr =
      encodeURIComponent(o.name) + "=" + encodeURIComponent(o.value);
    if (o.expires) {
      cookieStr += ";expires=" + o.expires;
    }
    if (o.path) {
      cookieStr += ";path=" + o.path;
    }
    if (o.domain) {
      cookieStr += ";domain=" + o.domain;
    }
    if (o.secure) {
      cookieStr += ";secure";
    }
    document.cookie = cookieStr;
  },
  del: (n) => {
    const date = new Date();
    date.setHours(-1);
    this.set({
      name: n,
      expires: date,
    });
  },

  get: (n) => {
    n = encodeURIComponent(n);
    const cookieTotal = document.cookie;
    const cookies = cookieTotal.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const arr = cookies[i].split("=");
      if (n == arr[0]) {
        return decodeURIComponent(arr[1]);
      }
    }
  },
};
