export const ConvertIOStoDate = (string) => {
  var times = new Date(string);
  var a =  times.getMonth() + 1
  // return (
  //   times.getHours() +
  //   ":" +
  //   times.getMinutes() +
  //   "\t" +
  //   times.getDate() +
  //   "/" +
  //   a +
  //   "/" +
  //   times.getFullYear()
  // );
  return (
    times.getFullYear() +
    "/" +
    times.getDate() +
    "/" +
    a +
    "\t" +
    times.getHours() +
    ":" +
    times.getMinutes() 

    
  );
};
