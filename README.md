## SOFL

Making easier to store functions and js objects with functions in local/sessionStorge
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
  name: "John",
  age: 17,
  sum: (x,y) => {
    console.log(x+y);
  },
};

// stringify and set item
SOFL.localStorage.stringifyAndSetItem("foo", exampleData);

// get item and parse
const result = SOFL.localStorage.getItemAndParse("foo");

// it works! :)
result.sum(2,5);
```