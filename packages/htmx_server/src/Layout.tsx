import * as elements from 'typed-html';

export const Layout = (props: elements.Children) => `
  <html>
    <head>
      <title>htmx server</title>
       <link rel="icon" type="image/x-icon" href="/public/albert.ico">
      <script src="https://unpkg.com/htmx.org/dist/htmx.js"></script>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
      ${props.children}
`