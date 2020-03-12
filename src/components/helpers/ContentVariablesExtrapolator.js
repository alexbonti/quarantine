
export const CVE = string => {
  if (typeof string !== "string") {
    return null;
  } else {
    let x =  string.match(/\{+\w+\}\B/g);
    if(x !== null && x.length > 0){
        return x[0].slice(1,-1);
    }else return null
  }
};
