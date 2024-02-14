// app/page.tsx
'use client'
import { Link } from '@chakra-ui/next-js'
import { Box, Button, ButtonGroup, Input } from '@chakra-ui/react'
export default function Page() {
  return (
    <>
      <Link href='/dashboard' color='blue.400' _hover={{ color: 'red.500', cursor: 'pointer' }} >
        About
      </Link>
      <Box m={'10%'}>
        <Button variant={'solid'}>Button</Button>
        <Input variant='filled' placeholder='Filled' />
      </Box >
    </>
  )
}