## SOFL

Making it easier to store date, functions, and objects in local/sessionStorge
```bash
npm install sofl
```
Or just copy the codes from [index.js](https://github.com/KhayKhun/sofl/blob/main/index.js)
#### Import
```javascript
import SOFL from 'sofl';
```
#### Set item
```javascript
SOFL.localStorage.stringifyAndSetItem("myitem",value);
```
```javascript
SOFL.sessionStorage.stringifyAndSetItem("myitem",value);
```
#### Get item
```javascript
SOFL.localStorage.getItemAndParse("myitem");
```
```javascript
SOFL.sessionStorage.getItemAndParse("myitem");
```
#### Example usage
```javascript
import SOFL from "sofl";

const exampleData = {
  string: "John",
  number: 17,
  date: new Date(),
  sumFunc: (x, y) => {
    console.log(x + y);
  },
};

// stringify and set item
const stringifiedResult = SOFL.localStorage.stringifyAndSetItem("foo", exampleData);
console.log(stringifiedResult);

// get item and parse
const result = SOFL.localStorage.getItemAndParse("foo");
console.log(result);
result.sumFunc(2, 5); // 7
```
#### Support nested objects
```javascript
import SOFL from "sofl";

const randomObject = {
  nested1: {
    date: new Date(),
    bool: true,
    nested2: {
      string: "foo",
      nested3: [
        {
          nested4: () => {
            console.log("Hi mom!");
          },
        },
      ],
    },
  },
};

// stringify and set item
const stringifiedData = SOFL.localStorage.stringifyAndSetItem("foo", randomObject);
// get item and parse
const result = SOFL.localStorage.getItemAndParse("foo");

// try it out yourself ;)
console.log(result);
result.nested1.nested2.nested3[0].nested4();
```