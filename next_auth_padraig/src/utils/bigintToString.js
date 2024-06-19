// src/utils/bigintToString.ts
function bigintToString(obj) {
  if (Array.isArray(obj)) {
    return obj.map(bigintToString);
  } else if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, bigintToString(value)])
    );
  } else if (typeof obj === "bigint") {
    return obj.toString();
  } else {
    return obj;
  }
}

export default bigintToString;

