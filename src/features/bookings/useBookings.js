/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'

export function useBookings() {
  const [searchParams] = useSearchParams()
  const filterValue = searchParams.get('status')
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue }

  const sortByValue = searchParams.get('sortBy')
  const sortBy =
    !sortByValue || sortByValue === 'all'
      ? null
      : { field: 'sortBy', value: sortByValue }
  const { isLoading, data: bookings } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  })

  return { isLoading, bookings }
}
