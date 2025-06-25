import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useSearchParams } from 'react-router-dom'
import { getStaysAfterDate } from '../../services/apiBookings'

export function useRecentStays() {
  const [serachParams] = useSearchParams()
  const numDays = !serachParams.get('last')
    ? 7
    : Number(serachParams.get('last'))

  const queryDate = subDays(new Date(), numDays).toISOString()

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ['stays', `last-${numDays}`],
  })
  const confirmedStays = stays?.filter(
    (stay) => stay.status === 'checked-in' || stay.status === 'checked-out'
  )
  return { isLoading, confirmedStays, numDays }
}
