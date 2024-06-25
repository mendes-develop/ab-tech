import * as elements from 'typed-html';
import { NavBar } from './todos/components/Navigation';

export const HTML = (props: elements.Children) => `
  <html>
    <head>
      <title>htmx server</title>
      <link rel="icon" type="image/x-icon" href="/public/albert.ico">
      <script src="https://unpkg.com/htmx.org/dist/htmx.js"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
      <link rel="stylesheet" href="/public/css/styles.css">

      <script>
        document.addEventListener('DOMContentLoaded', (event) => {
          document.body.addEventListener('htmx:beforeSend', (evt) => {
            console.log(evt)
          })

          document.body.addEventListener('htmx:beforeSwap', (evt) => {
            console.log(evt)
            evt.detail.shouldSwap = true;
            evt.detail.isError = false;
          })
        })
      </script>
    </head>
      ${props.children}
`

export const Layout = (props: elements.Children) => {
  return (
    <HTML>
      <body class={`h-screen`}>
        <div class="border h-full border-gray-300 rounded-md flex flex-row gap-4 overflow-y-scroll overflow-x-hidden bg-blue-1">
          <NavBar />
          {props.children}
        </div>
      </body>
    </HTML>
  )
}