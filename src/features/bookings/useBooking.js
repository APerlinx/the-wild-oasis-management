import { useParams } from 'react-router-dom'
import { getBooking } from '../../services/apiBookings'
import { useQuery } from '@tanstack/react-query'

export function useBooking() {
  const { bookingId } = useParams()
  const { isLoading, data = {} } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  })
  return { isLoading, data }
}
