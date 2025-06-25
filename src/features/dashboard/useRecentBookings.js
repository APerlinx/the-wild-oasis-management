import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useSearchParams } from 'react-router-dom'
import { getBookingsAfterDate } from '../../services/apiBookings'

export function useRecentBookings() {
  const [serachParams] = useSearchParams()
  const numDays = !serachParams.get('last')
    ? 7
    : Number(serachParams.get('last'))

  const queryDate = subDays(new Date(), numDays).toISOString()

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ['bookings', `last-${numDays}`],
  })
  return { isLoading, bookings }
}
