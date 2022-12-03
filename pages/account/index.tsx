import { NextPage } from "next/types";
import Link from "next/link";
import {
  Box, TableContainer, Table, Thead, Tbody, Th, Td, Tr, Button, Flex, Select, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Text,
  Textarea
} from '@chakra-ui/react'

import { Layout } from '../../src/components/Layout'
import { ContainerBox } from "../../src/Parts/ContainerBox";
import { HeadSecond } from "../../src/Parts/HeadSecond";
import { SubText } from "../../src/Parts/SubText";

import styles from '../../styles/Table.module.scss';
import { ButtonPrimary } from "../../src/Parts/ButtonPrimary";


const Mypage: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Layout>
        <Box w='100%'>
          <HeadSecond>仕訳一覧</HeadSecond>
          <ContainerBox>
            <Flex marginBottom='45px'>
              <Box marginRight='25px'>
                <SubText marginBottom='10px'>
                  期間
                </SubText>
                <Select borderColor='#3AA796' color='#3AA796' fontWeight={'bold'}>
                  <option value='option1'>2022年1月</option>
                  <option value='option2'>2022年2月</option>
                  <option value='option3'>2022年3月</option>
                </Select>
              </Box>
              <Box>
                <SubText marginBottom='10px'>
                  カテゴリー
                </SubText>
                <Select borderColor='#3AA796' color='#3AA796' fontWeight={'bold'}>
                  <option value='option1'>全て</option>
                  <option value='option2'>収入</option>
                  <option value='option3'>支出</option>
                </Select>
              </Box>
            </Flex>

            <Box marginBottom='45px'>
              <TableContainer className={styles.table}>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th className={styles.table_first}></Th>
                      <Th >登録内容</Th>
                      <Th>金額</Th>
                      <Th>摘要</Th>
                      <Th>取引先</Th>
                      <Th>取引日</Th>
                      <Th className={styles.table_last}></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td className={styles.table_first} color='#00536C' fontWeight='600'>収入</Td>
                      <Td >通信費</Td>
                      <Td>+100,000</Td>
                      <Td>+100,000</Td>
                      <Td>+100,000</Td>
                      <Td>2022/11/24</Td>
                      <Td isNumeric className={styles.table_last}>
                        <Button onClick={onOpen} display='inline-block' h='auto' p='8px 7px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>詳細</Button>
                        <Link href={'/account/id1'}>
                          <Button display='inline-block' h='auto' p='8px 7px' marginLeft='8px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>編集</Button>
                        </Link>
                      </Td>
                    </Tr>

                    <Tr>
                      <Td className={styles.table_first} color='#00536C' fontWeight='600'>収入</Td>
                      <Td >通信費</Td>
                      <Td>+100,000</Td>
                      <Td>+100,000</Td>
                      <Td>+100,000</Td>
                      <Td>2022/11/24</Td>
                      <Td isNumeric className={styles.table_last}>
                        <Button display='inline-block' h='auto' p='8px 7px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>詳細</Button>
                        <Button display='inline-block' h='auto' p='8px 7px' marginLeft='8px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>編集</Button>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td className={styles.table_first} color='#00536C' fontWeight='600'>収入</Td>
                      <Td >通信費</Td>
                      <Td>+100,000</Td>
                      <Td>+100,000</Td>
                      <Td>+100,000</Td>
                      <Td>2022/11/24</Td>
                      <Td isNumeric className={styles.table_last}>
                        <Button display='inline-block' h='auto' p='8px 7px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>詳細</Button>
                        <Button display='inline-block' h='auto' p='8px 7px' marginLeft='8px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>編集</Button>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td className={styles.table_first} color='#00536C' fontWeight='600'>収入</Td>
                      <Td >通信費</Td>
                      <Td>+100,000</Td>
                      <Td>+100,000</Td>
                      <Td>+100,000</Td>
                      <Td>2022/11/24</Td>
                      <Td isNumeric className={styles.table_last}>
                        <Button display='inline-block' h='auto' p='8px 7px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>詳細</Button>
                        <Button display='inline-block' h='auto' p='8px 7px' marginLeft='8px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>編集</Button>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td className={styles.table_first} color='#00536C' fontWeight='600'>収入</Td>
                      <Td >通信費</Td>
                      <Td>+100,000</Td>
                      <Td>+100,000</Td>
                      <Td>+100,000</Td>
                      <Td>2022/11/24</Td>
                      <Td isNumeric className={styles.table_last}>
                        <Button display='inline-block' h='auto' p='8px 7px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>詳細</Button>
                        <Button display='inline-block' h='auto' p='8px 7px' marginLeft='8px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>編集</Button>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td className={styles.table_first} color='#00536C' fontWeight='600'>収入</Td>
                      <Td >通信費</Td>
                      <Td>+100,000</Td>
                      <Td>+100,000</Td>
                      <Td>+100,000</Td>
                      <Td>2022/11/24</Td>
                      <Td isNumeric className={styles.table_last}>
                        <Button display='inline-block' h='auto' p='8px 7px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>詳細</Button>
                        <Button display='inline-block' h='auto' p='8px 7px' marginLeft='8px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>編集</Button>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td className={styles.table_first} color='#00536C' fontWeight='600'>収入</Td>
                      <Td >通信費</Td>
                      <Td>+100,000</Td>
                      <Td>+100,000</Td>
                      <Td>+100,000</Td>
                      <Td>2022/11/24</Td>
                      <Td isNumeric className={styles.table_last}>
                        <Button display='inline-block' h='auto' p='8px 7px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>詳細</Button>
                        <Button display='inline-block' h='auto' p='8px 7px' marginLeft='8px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>編集</Button>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td className={styles.table_first} color='#00536C' fontWeight='600'>収入</Td>
                      <Td >通信費</Td>
                      <Td>+100,000</Td>
                      <Td>+100,000</Td>
                      <Td>+100,000</Td>
                      <Td>2022/11/24</Td>
                      <Td isNumeric className={styles.table_last}>
                        <Button display='inline-block' h='auto' p='8px 7px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>詳細</Button>
                        <Button display='inline-block' h='auto' p='8px 7px' marginLeft='8px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>編集</Button>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td className={styles.table_first} color='#00536C' fontWeight='600'>収入</Td>
                      <Td >通信費</Td>
                      <Td>+100,000</Td>
                      <Td>+100,000</Td>
                      <Td>+100,000</Td>
                      <Td>2022/11/24</Td>
                      <Td isNumeric className={styles.table_last}>
                        <Button display='inline-block' h='auto' p='8px 7px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>詳細</Button>
                        <Button display='inline-block' h='auto' p='8px 7px' marginLeft='8px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>編集</Button>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td className={styles.table_first} color='#00536C' fontWeight='600'>収入</Td>
                      <Td >通信費</Td>
                      <Td>+100,000</Td>
                      <Td>+100,000</Td>
                      <Td>+100,000</Td>
                      <Td>2022/11/24</Td>
                      <Td isNumeric className={styles.table_last}>
                        <Button display='inline-block' h='auto' p='8px 7px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>詳細</Button>
                        <Button display='inline-block' h='auto' p='8px 7px' marginLeft='8px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>編集</Button>
                      </Td>
                    </Tr>

                  </Tbody>

                </Table>
              </TableContainer>
            </Box>

            <nav style={{ textAlign: 'center' }}>
              <Box>
                <Link href={'/'} style={{ display: 'inline-block', width: '35px', padding: '5px', marginRight: '10px', fontSize: '13px', border: '1px solid #707070', borderRadius: '3px' }}>前</Link>
                <Box as="span" style={{ display: 'inline-block', width: '35px', padding: '5px', marginRight: '10px', fontSize: '13px', background: '#898F9C', border: '1px solid #707070', borderRadius: '3px' }}>1</Box>
                <Link href={'/'} style={{ display: 'inline-block', width: '35px', padding: '5px', marginRight: '10px', fontSize: '13px', border: '1px solid #707070', borderRadius: '3px' }}>2</Link>
                <Link href={'/'} style={{ display: 'inline-block', width: '35px', padding: '5px', fontSize: '13px', border: '1px solid #707070', borderRadius: '3px' }}>後</Link>
              </Box>
            </nav>
          </ContainerBox>
        </Box>
      </Layout>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW='1024px' marginTop='55px'>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ContainerBox>
              <Flex marginBottom='30px'>
                <Box marginRight='25px'>
                  <SubText marginBottom='10px'>
                    日付
                  </SubText>
                  <Input
                    type='date'
                    color='#65748A'
                    borderColor='#AAE2CF'
                  />
                </Box>
                <Box marginRight='25px'>
                  <SubText marginBottom='10px'>
                    収支
                  </SubText>
                  <Select borderColor='#AAE2CF' color='#65748A' fontWeight={'bold'}>
                    <option value='option1'>全て</option>
                    <option value='option2'>収入</option>
                    <option value='option3'>支出</option>
                  </Select>
                </Box>
                <Box>
                  <SubText marginBottom='10px'>
                    取引先
                  </SubText>
                  <Select borderColor='#AAE2CF' color='#65748A' fontWeight={'bold'}>
                    <option value='option1'>全て</option>
                    <option value='option2'>収入</option>
                    <option value='option3'>支出</option>
                  </Select>
                </Box>
              </Flex>

              <Flex justify='space-between' align='flex-start' marginBottom='30px'>
                <Box marginRight='25px'>
                  <SubText marginBottom='10px'>
                    借方
                  </SubText>
                  <Flex marginBottom='15px'>
                    <Input
                      type='text'
                      placeholder="勘定科目"
                      color='#65748A'
                      borderColor='#AAE2CF'
                      marginRight='10px'
                    />
                    <Input
                      type='text'
                      placeholder="金額"
                      color='#65748A'
                      borderColor='#AAE2CF'
                    />
                  </Flex>
                  <Flex justifyContent='space-between'>
                    <Flex align='center'>
                      <SubText>
                        税率
                      </SubText>
                      <Button display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>8%</Button>
                      <Button display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>10%</Button>
                      <Button display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>なし</Button>
                    </Flex>
                    <Box>
                      <Flex align='center' justifyContent='space-between'>
                        <SubText>
                          税率
                        </SubText>
                        <Text>¥0</Text>
                      </Flex>
                      <Flex align='center' justifyContent='space-between'>
                        <SubText>
                          合計
                        </SubText>
                        <Text>¥0</Text>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>

                <Box>
                  <SubText marginBottom='10px'>
                    借方
                  </SubText>
                  <Flex marginBottom='15px'>
                    <Input
                      type='text'
                      placeholder="勘定科目"
                      color='#65748A'
                      borderColor='#AAE2CF'
                      marginRight='10px'
                    />
                    <Input
                      type='text'
                      placeholder="金額"
                      color='#65748A'
                      borderColor='#AAE2CF'
                    />
                  </Flex>
                  <Flex justifyContent='space-between'>
                    <Flex align='center'>
                      <SubText>
                        税率
                      </SubText>
                      <Button display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>8%</Button>
                      <Button display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>10%</Button>
                      <Button display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>なし</Button>
                    </Flex>
                    <Box>
                      <Flex align='center' justifyContent='space-between'>
                        <SubText>
                          税率
                        </SubText>
                        <Text>¥0</Text>
                      </Flex>
                      <Flex align='center' justifyContent='space-between'>
                        <SubText>
                          合計
                        </SubText>
                        <Text>¥0</Text>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              </Flex>

              <Box marginBottom='30px'>
                <SubText marginBottom='10px'>
                  書類データ
                </SubText>
                <Input
                  type='file'
                // value='ファイルを選択'
                // borderColor='#AAE2CF'
                />
              </Box>


              <Box marginBottom='30px'>
                <SubText marginBottom='10px'>
                  取引先
                </SubText>
                <Textarea borderColor='#AAE2CF' placeholder="例：取引の相手先や販売数量など" />
              </Box>

            </ContainerBox>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <ButtonPrimary>閉じる</ButtonPrimary>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default Mypage;