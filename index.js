function funcToStr(input, uuid) {
  if (Array.isArray(input)) {
    return input.map((element) => funcToStr(element, uuid));
  } else if (typeof input === "object" && input !== null) {
    const convertedObject = {};
    for (const key in input) {
      if (typeof input[key] === "function") {
        convertedObject[key] = input[key].toString() + uuid;
      } else {
        convertedObject[key] = funcToStr(input[key], uuid);
      }
    }
    return convertedObject;
  } else if (typeof input === "function") {
    return input.toString() + uuid;
  } else {
    return input;
  }
}

function strToFunc(input, uuid) {
  if (Array.isArray(input)) {
    return input.map((element) => strToFunc(element, uuid));
  } else if (typeof input === "object" && input !== null) {
    const convertedObject = {};
    for (const key in input) {
      if (typeof input[key] === "string" && input[key].includes(uuid)) {
        const l = input[key].length - 36;
        const functionStr = input[key].slice(0, l);
        convertedObject[key] = new Function("return " + functionStr)();
      } else {
        convertedObject[key] = strToFunc(input[key], uuid);
      }
    }
    return convertedObject;
  } else if (typeof input === "string" && input.includes(uuid)) {
    const l = input.length - 36;
    const functionStr = input.slice(0, l);
    return new Function("return " + functionStr)();
  } else {
    return input;
  }
}

function sagiLocalStorage(name, input) {
  const uuid = uuidv4();
  const jsonData = funcToStr(input, uuid);
  const result = JSON.stringify({ data: jsonData, uuid });

  localStorage.setItem(name, result);
}

function ginpLocalStorage(name) {
  const jsonData = JSON.parse(localStorage.getItem(name));
  return strToFunc(jsonData.data, jsonData.uuid);
}

function sagiSessionStorage(name, input) {
  const uuid = uuidv4();
  const jsonData = funcToStr(input, uuid);
  const result = JSON.stringify({ data: jsonData, uuid });

  sessionStorage.setItem(name, result);
}

function ginpSessionStorage(name) {
  const jsonData = JSON.parse(sessionStorage.getItem(name));
  return strToFunc(jsonData.data, jsonData.uuid);
}

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export default {
  localStorage: {
    stringifyAndSetItem: sagiLocalStorage,
    getItemAndParse: ginpLocalStorage,
  },
  sessionStorage: {
    stringifyAndSetItem: sagiSessionStorage,
    getItemAndParse: ginpSessionStorage,
  },
};
