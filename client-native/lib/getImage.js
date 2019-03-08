export default getImage = week => {
  if (week >= 1 && week < 6) {
    return require("../assets/images/sizes/4.png");
  } else if (week === 6) {
    return require("../assets/images/sizes/6.png");
  } else if (week >= 7 && week <= 8) {
    return require("../assets/images/sizes/7.png");
  } else if (week === 9) {
    return require("../assets/images/sizes/9.png");
  } else if (week >= 10 && week <= 11) {
    return require("../assets/images/sizes/10.png");
  } else if (week === 12) {
    return require("../assets/images/sizes/12.png");
  } else if (week === 13) {
    return require("../assets/images/sizes/13.png");
  } else if (week === 14) {
    return require("../assets/images/sizes/14.png");
  } else if (week === 15) {
    return require("../assets/images/sizes/15.png");
  } else if (week === 16) {
    return require("../assets/images/sizes/16.png");
  } else if (week >= 17 && week <= 19) {
    return require("../assets/images/sizes/17.png");
  } else if (week === 20) {
    return require("../assets/images/sizes/20.png");
  } else if (week === 21) {
    return require("../assets/images/sizes/21.png");
  } else if (week === 22) {
    return require("../assets/images/sizes/22.png");
  } else if (week === 23) {
    return require("../assets/images/sizes/23.png");
  } else if (week >= 24 && week <= 25) {
    return require("../assets/images/sizes/24.png");
  } else if (week >= 26 && week <= 28) {
    return require("../assets/images/sizes/26.png");
  } else if (week === 29) {
    return require("../assets/images/sizes/29.png");
  } else if (week === 30) {
    return require("../assets/images/sizes/30.png");
  } else if (week >= 31 && week <= 32) {
    return require("../assets/images/sizes/31.png");
  } else if (week === 33) {
    return require("../assets/images/sizes/33.png");
  } else {
    return require("../assets/images/sizes/36.png");
  }
};