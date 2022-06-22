import { PaginationItem } from "./PaginationItem"

interface PaginationProps {
  totalCountOfRegisters: number
  registerPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

function generatePageArray (from: number, to: number) {
  return Array.from({ length: to - from }, (_, index) => {
    return from + index + 1
  })
}

const siblingsCount = 1

export function Pagination ({
  totalCountOfRegisters,
  registerPerPage = 10,
  currentPage = 1,
  onPageChange
}: PaginationProps) {

  const lastPage = Math.ceil(totalCountOfRegisters / registerPerPage)
  const previousPage = currentPage > 1 ?
    generatePageArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : []
  const nextPage = currentPage < lastPage ?
    generatePageArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []

  return (
    <div className='flex items-center justify-between w-full'>
      <div className='text-sm'>
        <strong>{currentPage}</strong>
        <strong> - {registerPerPage}</strong>
        <span> de </span>
        <strong>{totalCountOfRegisters}</strong>
      </div>
      <div className='flex gap-2 text-xs'>
        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > (2 + siblingsCount) && <span className='w-8 h-8 flex items-center justify-center'>...</span>}
          </>
        )}

        {previousPage.length > 0 && previousPage.map(page => (
          <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        ))}

        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />

        {nextPage.length > 0 && nextPage.map(page => (
          <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        ))}

        {(currentPage + siblingsCount) < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && <span className='w-8 h-8 flex items-center justify-center'>...</span>}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </div>
    </div>
  )
}
