/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from 'styled-components'
import Heading from './Heading'
import GlobalStyles from '../styles/GlobalStyles'
import { HiOutlineBellAlert } from 'react-icons/hi2'
import Button from './Button'

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: 'Sono';
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`

const HeadingText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <GlobalStyles />
      <StyledErrorFallback>
        <Box>
          <Heading as="h1">
            <HeadingText>
              Something went wrong <HiOutlineBellAlert />
            </HeadingText>
          </Heading>
          <p>{error.message}</p>
          <Button size="large" onClick={resetErrorBoundary}>
            Try again
          </Button>
        </Box>
      </StyledErrorFallback>
    </>
  )
}

export default ErrorFallback
