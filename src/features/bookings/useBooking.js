import { useParams } from 'react-router-dom'
import { getBooking } from '../../services/apiBookings'
import { useQuery } from '@tanstack/react-query'

function useBooking() {
  const { bookingId } = useParams()
  const { isLoading, data = {} } = useQuery({
    queryKey: ['booking'],
    queryFn: () => getBooking(bookingId),
    retry: false,
  })
  return { isLoading, data }
}

export default useBooking
