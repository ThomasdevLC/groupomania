let exp = {
  getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
  },
  setCookie(cname, value, expiration = null) {
    if (expiration) {
      let date = new Date(Date.now() + expiration); //86400000ms = 1 jour
      date = date.toUTCString();
      document.cookie = cname + "=" + value + "; path=/; expires=" + date;
    } else {
      document.cookie = cname + "=" + value + "; path=/;";
    }
  },
};

export default exp;
