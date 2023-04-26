import React from 'react'
import { Box, Card, CardBody, Image, Text, Divider, Stack, Heading, CardFooter, ButtonGroup, Button, Flex } from '@chakra-ui/react';
import {
  Slider,
  Tooltip,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react'

function SliderThumbWithTooltip(props) {
  const [showTooltip, setShowTooltip] = React.useState(false)
  return (
    <Slider
      id='slider'
      defaultValue={1}
      min={0.01}
      max={10}
      step={0.01}
      onChange={(v) => props.setSliderValue(v)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SliderMark value={1} mt='1' ml='-2.5' fontSize='sm'>
        <Flex alignItems={'center'}>
        1<Image src='/assets/ethereum-eth-logo.png' w={4} h={4}/>
        </Flex>
       
      </SliderMark>
      <SliderMark value={3} mt='1' ml='-2.5' fontSize='sm'>
      <Flex alignItems={'center'}>
        3<Image src='/assets/ethereum-eth-logo.png' w={4} h={4}/>
        </Flex>
      </SliderMark>
      <SliderMark value={5} mt='1' ml='-2.5' fontSize='sm'>
      <Flex alignItems={'center'}>
        5<Image src='/assets/ethereum-eth-logo.png' w={4} h={4}/>
        </Flex>
      </SliderMark>
      <SliderMark value={7} mt='1' ml='-2.5' fontSize='sm'>
      <Flex alignItems={'center'}>
        7<Image src='/assets/ethereum-eth-logo.png' w={4} h={4}/>
        </Flex>
      </SliderMark>
      <SliderMark value={9} mt='1' ml='-2.5' fontSize='sm'>
      <Flex alignItems={'center'}>
        9<Image src='/assets/ethereum-eth-logo.png' w={4} h={4}/>
        </Flex>
      </SliderMark>
      <SliderTrack bg={'red.100'}>
        <SliderFilledTrack  bg={'red.500'}/>
      </SliderTrack>
      <Tooltip
        hasArrow
        bg='red.600'
        color='white'
        placement='top'
        isOpen={showTooltip}
        label={`${props.sliderValue} ETH`}
      >
        <SliderThumb boxSize={6}>
          <Image src='/assets/hearthHue_hearth_icons.png' w={4} h={4}/>
        </SliderThumb>
      </Tooltip>
    </Slider>
  )
}

function DonateEth(props) {

  const [sliderValue, setSliderValue] = React.useState("1")
  const {sendDonation} = props;
  return (
    <Box>
      <Card maxW="sm" mx={2}>
        <CardBody>
          <Stack mt="6" mb={'9'} spacing="3">
            <Flex fontSize={'3xl'} color={'red.600'} mx={'auto'}>
              <Text fontWeight={'extrabold'}>Hearth</Text>
              <Text fontWeight={'normal'}>Hue</Text>
            </Flex>
            
            <Text>
            By donating Ether, you can make a real difference in the world by dedicating a part of your life to others. 
            <br />Remember, a small step can make a big impact.
            </Text>
          </Stack>
          <SliderThumbWithTooltip setSliderValue={setSliderValue} sliderValue={sliderValue}/>
        </CardBody>
        <CardFooter justifyContent={'space-between'}>
        <Flex alignItems={'center'} justifyContent={'center'}>
          <Text fontSize={'2xl'} fontWeight={'bold'} color={'red.700'}>
            {sliderValue}
          </Text>
          <Image src='/assets/ethereum-eth-logo.png' w={6} h={6}/>
        </Flex>
          <ButtonGroup spacing="2">
            <Button
              onClick={() => sendDonation(String(sliderValue))}
              boxShadow={'dark-xl'}
              color="white"
              variant="solid"
              _hover={{}}
              bgGradient="linear(155deg, rgba(255, 0, 0, 1) 0%, rgba(255, 192, 203, 1) 100%)">
              DONATE
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Box>
  );
}

export default DonateEth