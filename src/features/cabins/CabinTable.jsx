import { useCabins } from './useCabins'
import CabinRow from './CabinRow'

import Spinner from '../../ui/Spinner'
// import styled from 'styled-components'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import { useSearchParams } from 'react-router-dom'

function CabinTable() {
  const { isLoading, cabins } = useCabins()
  const [searchParams] = useSearchParams()

  if (isLoading) return <Spinner />

  const filterValue = searchParams.get('discount') || 'all'

  const filteredCabins =
    filterValue === 'all'
      ? cabins
      : filterValue === 'with-discount'
      ? cabins?.filter((cabin) => cabin.discount)
      : cabins?.filter((cabin) => !cabin.discount)

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  )
}

export default CabinTable
