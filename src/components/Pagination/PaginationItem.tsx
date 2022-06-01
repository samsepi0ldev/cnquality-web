interface PaginationItemProps {
  number: number
  isCurrent?: boolean
  onPageChange: (page: number) => void
}

export function PaginationItem ({ number, isCurrent, onPageChange }: PaginationItemProps) {
  if (isCurrent) {
    return (
      <button disabled={true} className='transition-colors w-8 h-8 flex items-center justify-center disabled:opacity-100 disabled:cursor-default bg-green-600 text-zinc-100 rounded-md'>
        {number}
      </button>
    )
  }
  return (
    <button onClick={() => onPageChange(number)} className='transition-colors w-8 h-8 flex items-center justify-center bg-zinc-200 hover:bg-green-600 hover:text-zinc-100 rounded-md'>
      {number}
    </button>
  )
}
