'use client'
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { usePopoverState } from "./hooks"
import { deleteCookie } from "@/cookies/cookies"
import { getQueryClient } from "@repo/ui/query-provider"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
export function SignOut({ children }: { children: React.ReactNode }) {

  const { closePopover } = usePopoverState()
  const queryClient = getQueryClient();
  const router = useRouter()

  const handleSubmit = async () => {
    await deleteCookie()
    queryClient.invalidateQueries()
    closePopover()
    router.push("/")
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Sign out</h4>
            <p className="text-sm text-muted-foreground">
              Enter with another account.
            </p>
          </div>
          <div className="grid gap-2">
            <Button
              variant={"outline"}
              onClick={handleSubmit}>
              Sign out
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}