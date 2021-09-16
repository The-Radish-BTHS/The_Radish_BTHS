## How to add an icon here

1. Download an icon as svg and open it in your text editor of choice.
2. Copy the below code into a new js file named `YourJSFile.js`

```js
import React from "react"
import "./Icons.css"

export default function YourJSFile() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox=""
      width=""
      className=""
      fill="var(--text-color)"
    >
      <path d=""/>
    </svg>
  )
}
```

3. Replace the svg with the svg you downloaded and edit to add a className if you want.
4. Add an export for the js file in `index.js`
