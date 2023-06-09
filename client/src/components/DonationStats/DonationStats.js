import React from 'react'
import { Box, Card, CardBody, Image, Text, Stack, CardFooter, Flex, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons'

function DonationStats(props) {
    const { totalDonate } = props;
    return (
      <Box>
        <Card maxW="sm" mx={2}>
          <CardBody>
            <Stack mt="6" mb={'2'} spacing="3">
              <Flex fontSize={'3xl'} color={'red.600'} mx={'auto'}>
                <Text fontWeight={'extrabold'}>Donation</Text>
                <Text fontWeight={'normal'}>Stats</Text>
              </Flex>
              
              <Text textAlign={'center'}>
              Together, we are stronger and can change more lives.
              </Text>
              <Link isTruncated isExternal color={'red.600'} fontSize={'xs'} fontWeight={'bold'} 
              href='https://goerli.etherscan.io/address/0x3fbca885fdc8b565e37dfa09094951efe7c9920c'
              textAlign={'center'}>
                0x3fbca885fdc8b565e37dfa09094951efe7c9920c <ExternalLinkIcon mx='2px' /></Link>
            </Stack>
          </CardBody>
          <CardFooter justifyContent={'space-around'} alignItems={'center'}>
                <Text>Total Donation:</Text>
                <Flex alignItems={'center'} justifyContent={'center'}>
                    <Text fontSize={'2xl'} fontWeight={'bold'} color={'red.700'}>
                        {totalDonate}
                    </Text>
                <Image src='/assets/ethereum-eth-logo.png' w={6} h={6}/>
        </Flex>
          </CardFooter>
        </Card>
      </Box>
    );
}

export default DonationStats