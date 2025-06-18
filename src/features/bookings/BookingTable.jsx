/* eslint-disable no-unused-vars */
import { useBookings } from './useBookings'

import BookingRow from './BookingRow'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import Spinner from '../../ui/Spinner'
import Empty from '../../ui/Empty'
import { useSearchParams } from 'react-router-dom'

function BookingTable() {
  const [searchParams] = useSearchParams()
  const { isLoading, bookings } = useBookings()
  if (!bookings?.length) return <Empty resourceName="bookings" />
  if (isLoading) return <Spinner />
  const currentFilter = searchParams.get('status')

  const filteredBookings = bookings.filter((booking) => {
    if (currentFilter === 'all') return bookings
    return booking.status === currentFilter
  })
  const sortBy = searchParams.get('sortBy') || 'startDate-asc'
  const [field, direction] = sortBy.split('-')
  const modifier = direction === 'asc' ? 1 : -1
  const sortedBookings = filteredBookings.sort(
    (a, b) => (a[field] - b[field]) * modifier
  )

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedBookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  )
}

export default BookingTable
