const getCode = () => {
  let confirmationCode = "";
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < 25; i++) {
    confirmationCode +=
      characters[Math.floor(Math.random() * characters.length)];
  }

  return confirmationCode;
};

module.exports=getCode
