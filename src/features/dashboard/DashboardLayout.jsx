import styled from 'styled-components'
import { useRecentBookings } from './useRecentBookings'
import Spinner from '../../ui/Spinner'
import { useRecentStays } from './useRecentStays'
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`

function DashboardLayout() {
  const { isLoading: isLoadingBookings, bookings } = useRecentBookings()
  const { isLoading: isLoadingStays, stays, confirmedStays } = useRecentStays()
  if (isLoadingBookings || isLoadingStays) return <Spinner />
  return (
    <StyledDashboardLayout>
      <div>Statistic</div>
      <div>Today{"'"}s activity</div>
      <div>Chart 1</div>
      <div>Chart 2</div>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
