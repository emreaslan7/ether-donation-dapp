import { Box, Link } from '@chakra-ui/react'
import React from 'react'


function Footer() {
  return (
    <Box

    position="fixed"
    bottom="0"
    left="0"
    w={'100%'}>
    <Box bg={"gray.900"} p={1.85} color='white' fontSize={'xs'} align="center" justify="center">
    Made with ❤️ by&nbsp;
    <Link href='https://twitter.com/blockenddev' isExternal>
      Emre Aslan
    </Link>
  </Box>
  </Box>
  )
}

export default Footer