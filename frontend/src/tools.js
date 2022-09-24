let exp = {
  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
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
