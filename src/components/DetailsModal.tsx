import {
  Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text,
  Image,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import React from 'react'
import { ButtonPrimary } from './ButtonPrimary'
import { ContainerBox } from './ContainerBox'
import { SubText } from './SubText'


type Props = {
  isOpen: boolean,
  onClose: () => void,
  modalDetail: any,
}

export const DetailsModal = ({ isOpen, onClose, modalDetail }: Props) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={{ base: "95%", md: "auto" }} marginLeft={{ base: "2.5%", md: "auto" }} marginRight={{ base: "2.5%", md: "auto" }} maxW='1024px' marginTop='55px'>
          <ModalHeader>仕訳詳細</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ContainerBox>
              <Flex marginBottom='30px' flexWrap={{ base: "wrap", md: "nowrap" }}>
                <Box w={{ base: "40%", md: "auto" }} marginBottom={{ base: "25px", md: "0" }} marginRight='25px'>
                  <SubText marginBottom='10px'>
                    日付
                  </SubText>
                  <Text minW={{ base: "auto", md: "210px" }} minH='38px' fontSize='15px' color='#65748A' padding='8px 16px' border='#AAE2CF 1px solid' borderRadius='5px'>{modalDetail.date && format(modalDetail.date.toDate(), 'yyyy年M月d日')}</Text>
                </Box>
                <Box w={{ base: "39%", md: "auto" }} marginRight='25px'>
                  <SubText marginBottom='10px'>
                    収支
                  </SubText>
                  <Text minW={{ base: "auto", md: "75px" }} minH='38px' fontSize='15px' color='#65748A' padding='8px 16px' border='#AAE2CF 1px solid' borderRadius='5px'>{modalDetail.type}</Text>
                </Box>
                <Box w={{ base: "100%", md: "auto" }} marginRight={{ base: "0", md: "25px" }} marginBottom={{ base: "25px", md: "0" }}>
                  <SubText marginBottom='10px'>
                    取引先
                  </SubText>
                  <Text minW={{ base: "auto", md: "210px" }} minH='38px' fontSize='15px' color='#65748A' padding='8px 16px' border='#AAE2CF 1px solid' borderRadius='5px'>{modalDetail.client}</Text>
                </Box>
                <Box w={{ base: "26%", md: "auto" }} marginRight='25px'>
                  <SubText marginBottom='10px'>
                    損益
                  </SubText>
                  <Text minW={{ base: "auto", md: "75px" }} minH='38px' fontSize='15px' color='#65748A' padding='8px 16px' border='#AAE2CF 1px solid' borderRadius='5px'>
                    {modalDetail.pl === "true"
                      ?
                      '計算する'
                      :
                      '計算しない'
                    }
                  </Text>
                </Box>
                <Box w={{ base: "20%", md: "auto" }} >
                  <SubText marginBottom='10px'>
                    決済
                  </SubText>
                  <Text minW={{ base: "auto", md: "75px" }} minH='38px' fontSize='15px' color='#65748A' padding='8px 16px' border='#AAE2CF 1px solid' borderRadius='5px'>
                    {modalDetail.payment === "true"
                      ?
                      '完了'
                      :
                      '未完了'
                    }
                  </Text>
                </Box>
              </Flex>

              <Flex justify='space-between' align='flex-start' flexWrap={{ base: "wrap", md: "nowrap" }} marginBottom='30px'>
                <Box w={{ base: "100%", md: "auto" }} marginRight={{ base: "0", md: "25px" }}>
                  <SubText marginBottom='10px'>
                    借方
                  </SubText>
                  <Flex marginBottom='15px'>
                    <Text minW={{ base: "auto", md: "210px" }} minH='38px' fontSize='15px' color='#65748A' padding='8px 16px' border='#AAE2CF 1px solid' borderRadius='5px' marginRight='25px'>{modalDetail.accountDebit}</Text>
                    <Text minW={{ base: "auto", md: "210px" }} minH='38px' fontSize='15px' color='#65748A' padding='8px 16px' border='#AAE2CF 1px solid' borderRadius='5px'>{modalDetail.priceDebit}</Text>

                  </Flex>
                  <Flex justifyContent='space-between'>
                    <Flex align='center'>
                      <SubText>
                        税率
                      </SubText>
                      {modalDetail.taxDebit === '10%'
                        &&
                        <>
                          <Button disabled={true} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor='#3AA796' color='#fff' opacity='1 !important' fontSize='12px' textAlign='center'>10%</Button>
                          <Button disabled={true} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor='#fff' color='#3AA796' border='1px solid #3AA796' opacity='1 !important' fontSize='12px' textAlign='center'>なし</Button>
                        </>
                      }
                      {modalDetail.taxDebit === '0%'
                        &&
                        <>
                          <Button disabled={true} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor='#fff' color='#3AA796' border='1px solid #3AA796' opacity='1 !important' fontSize='12px' textAlign='center'>10%</Button>
                          <Button disabled={true} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor='#3AA796' color='#fff' opacity='1 !important' fontSize='12px' textAlign='center'>なし</Button>
                        </>
                      }
                    </Flex>
                    <Box>
                      <Flex align='center' justifyContent='space-between'>
                        <SubText>
                          税率
                        </SubText>
                        <Text>¥{Number(modalDetail.priceTaxDebit).toLocaleString()}</Text>
                      </Flex>
                      <Flex align='center' justifyContent='space-between'>
                        <SubText>
                          合計
                        </SubText>
                        <Text>¥{Number(modalDetail.priceDebit).toLocaleString()}</Text>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>

                <Box w={{ base: "100%", md: "auto" }}>
                  <SubText marginBottom='10px'>
                    貸方
                  </SubText>
                  <Flex marginBottom='15px'>
                    <Text minW={{ base: "auto", md: "210px" }} minH='38px' fontSize='15px' color='#65748A' padding='8px 16px' border='#AAE2CF 1px solid' borderRadius='5px' marginRight='25px'>{modalDetail.accountCredit}</Text>
                    <Text minW={{ base: "auto", md: "210px" }} minH='38px' fontSize='15px' color='#65748A' padding='8px 16px' border='#AAE2CF 1px solid' borderRadius='5px'>{modalDetail.priceCredit}</Text>
                  </Flex>
                  <Flex justifyContent='space-between'>
                    <Flex align='center'>
                      <SubText>
                        税率
                      </SubText>
                      {modalDetail.taxCredit === '10%'
                        &&
                        <>
                          <Button disabled={true} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor='#3AA796' color='#fff' opacity='1 !important' fontSize='12px' textAlign='center'>10%</Button>
                          <Button disabled={true} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor='#fff' color='#3AA796' border='1px solid #3AA796' opacity='1 !important' fontSize='12px' textAlign='center'>なし</Button>
                        </>
                      }
                      {modalDetail.taxCredit === '0%'
                        &&
                        <>
                          <Button disabled={true} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor='#fff' color='#3AA796' border='1px solid #3AA796' opacity='1 !important' fontSize='12px' textAlign='center'>10%</Button>
                          <Button disabled={true} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor='#3AA796' color='#fff' opacity='1 !important' fontSize='12px' textAlign='center'>なし</Button>
                        </>
                      }
                    </Flex>
                    <Box>
                      <Flex align='center' justifyContent='space-between'>
                        <SubText>
                          税率
                        </SubText>
                        <Text>¥{Number(modalDetail.priceTaxCredit).toLocaleString()}</Text>
                      </Flex>
                      <Flex align='center' justifyContent='space-between'>
                        <SubText>
                          合計
                        </SubText>
                        <Text>¥{Number(modalDetail.priceCredit).toLocaleString()}</Text>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              </Flex>

              <Box marginBottom='30px'>
                <SubText marginBottom='10px'>
                  書類データ
                </SubText>
                <Image w={{ base: "100%", md: "60%" }} src={modalDetail.file} alt="" display='block' h='auto' objectFit='cover' />
              </Box>


              <Box marginBottom='30px'>
                <SubText marginBottom='10px'>
                  備考
                </SubText>
                <Text minW='210px' minH='38px' fontSize='15px' color='#65748A' padding='8px 16px' border='#AAE2CF 1px solid' borderRadius='5px'>{modalDetail.note}</Text>
              </Box>

            </ContainerBox>
          </ModalBody>
          <ModalFooter>
            <ButtonPrimary onClick={onClose}>閉じる</ButtonPrimary>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
