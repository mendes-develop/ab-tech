import * as elements from 'typed-html';

export const NavBar = () => (
  <nav class="space-y-2 px-4">
    <a href="/messages" class="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-200">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      <span>Home</span>
    </a>
    <a href="/messages" class="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-200">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9m10-4h3a2 2 0 0 1 2 2v2H5V7a2 2 0 0 1 2-2h3"></path></svg>
      <span>Explore</span>
    </a>
  </nav>
)