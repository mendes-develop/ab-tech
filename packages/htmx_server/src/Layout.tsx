import * as elements from 'typed-html';

export const Layout = (props: elements.Children) => `
  <html>
    <head>
      <title>htmx server</title>
       <link rel="icon" type="image/x-icon" href="/public/albert.ico">
      <script src="https://unpkg.com/htmx.org/dist/htmx.js"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    </head>
      ${props.children}
`