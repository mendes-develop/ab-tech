import { useSearchParams } from "next/navigation"
export const usePopoverState = () => {
  const searchParams = useSearchParams()

  function openPopover() {
    const params = new URLSearchParams(searchParams.toString())
    params.set('popover-open', 'true')

    window.history.pushState(null, '', `?${params.toString()}`)
  }

  function closePopover() {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('popover-open')

    window.history.pushState(null, '', `?${params.toString()}`)
  }

  return {
    isPopoverOpen: searchParams.get('popover-open') === 'true',
    openPopover,
    closePopover,
  }
}

