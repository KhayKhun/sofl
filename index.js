function stringifyWithUuid(input, uuid) {
  if (Array.isArray(input)) {
    return input.map((element) => stringifyWithUuid(element, uuid));
  } else if (typeof input === "object" && input !== null) {
    if (input instanceof Date) {
      return input.toISOString() + uuid;
    } else {
      const convertedObject = {};
      for (const key in input) {
        const value = input[key];
        convertedObject[key] =
          typeof value === "function"
            ? value.toString() + uuid
            : stringifyWithUuid(value, uuid);
      }
      return convertedObject;
    }
  } else if (typeof input === "function") {
    return input.toString() + uuid;
  } else {
    return input;
  }
}

function parseWithUuid(input, uuid) {
  if (Array.isArray(input)) {
    return input.map((element) => parseWithUuid(element, uuid));
  } else if (typeof input === "object" && input !== null) {
    const convertedObject = {};
    for (const key in input) {
      const value = input[key];
      convertedObject[key] =
        typeof value === "string" && value.includes(uuid)
          ? parseString(value)
          : parseWithUuid(value, uuid);
    }
    return convertedObject;
  } else if (typeof input === "string" && input.includes(uuid)) {
    return parseString(input);
  } else {
    return input;
  }
}

function parseString(str) {
  const l = str.length - 36;
  const objectStr = str.slice(0, l);
  if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(objectStr)) {
    return new Date(objectStr);
  } else {
    return new Function("return " + objectStr)();
  }
}

function generateUuid() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function storageOperation(storage, name, input) {
  const uuid = generateUuid();
  const jsonData = stringifyWithUuid(input, uuid);
  const result = JSON.stringify({ data: jsonData, uuid });

  storage.setItem(name, result);
  return result;
}

function getItemAndParse(storage, name) {
  const jsonData = JSON.parse(storage.getItem(name));
  return parseWithUuid(jsonData.data, jsonData.uuid);
}

export default {
  localStorage: {
    stringifyAndSetItem: (name, input) =>
      storageOperation(localStorage, name, input),
    getItemAndParse: (name) => getItemAndParse(localStorage, name),
  },
  sessionStorage: {
    stringifyAndSetItem: (name, input) =>
      storageOperation(sessionStorage, name, input),
    getItemAndParse: (name) => getItemAndParse(sessionStorage, name),
  },
};
