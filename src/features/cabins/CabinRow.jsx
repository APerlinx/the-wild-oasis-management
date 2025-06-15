/* eslint-disable no-unused-vars */
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useState } from 'react'
import CreateCabinForm from './CreateCabinForm'

import { useDeleteCabin } from './useDeleteCabin'
import { useCreateCabin } from './useCreateCabin'

import ConfirmDelete from '../../ui/ConfirmDelete'
import Modal from '../../ui/Modal'
import { formatCurrency } from '../../utils/helpers'
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`

const NoDiscount = styled.span`
  text-align: center;
`

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin()
  const { isCreating, createCabin } = useCreateCabin()
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  } = cabin

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    })
  }
  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <NoDiscount>&mdash;</NoDiscount>
        )}
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />
              <Menus.List id={cabinId}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open opensWindowName="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opensWindowName="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="cabins"
                  onConfirm={() => deleteCabin(cabinId)}
                  disabled={isDeleting}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  )
}

CabinRow.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired, // ISO timestamp
    name: PropTypes.string.isRequired,
    maxCapacity: PropTypes.number.isRequired,
    regularPrice: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
}

export default CabinRow
