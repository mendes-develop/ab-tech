import * as elements from 'typed-html';

type Route = {
  path: string;
  name: string;
  icon: () => string;
}

const HomeSVG = () => (
  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
    </path>
  </svg>
)

const MessagesSVG = () => (
  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9m10-4h3a2 2 0 0 1 2 2v2H5V7a2 2 0 0 1 2-2h3"></path></svg>
)

const ROUTES = [
  { path: '/', name: 'Home', icon: HomeSVG },
  { path: '/messages', name: 'Messages', icon: MessagesSVG },
] as const

const NavItem = ({ route, name, activeRoute, SVG }: {
  route: string,
  name: string,
  activeRoute: string,
  SVG: typeof HomeSVG | typeof MessagesSVG
}) => (
  <a href={route}
    class={`flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-orange-200 ${activeRoute === route ? "bg-orange-300" : undefined}`}>
    <SVG />
    <span>{name}</span>
  </a>
)

export const NavBar = ({ route }: { route: string }) => (
  <nav class="border-r border-gray-300 p-4 flex flex-col gap-2">
    {ROUTES.map((r) =>
      <NavItem
        SVG={r.icon}
        name={r.name}
        route={r.path}
        activeRoute={route}
      />)}
  </nav>
)