import { Box, Button, Flex, Image, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { format } from 'date-fns'
import Link from 'next/link'
import type { Detail } from '../../pages/account'

import styles from '../../styles/Table.module.scss';
import { useAuth } from '../atom'
import { accountName } from '../util';

type Props = {
  detailList: Detail[],
  type: string,
  onOpenModal: (detail: {}) => void,
}


export const TableReports = ({ detailList, type, onOpenModal }: Props) => {
  // Recoilのログイン状態
  const user = useAuth();

  return (
    <>
      <Box marginBottom='45px'>
        <Box display={{ base: "block", md: "none" }}>
          {detailList.map((detail: any) => {
            const detailInfo = {
              id: detail.id,
              accountDebit: detail.accountDebit,
              accountCredit: detail.accountCredit,
              type: detail.type, pl: detail.pl,
              payment: detail.payment,
              price: detail.price,
              priceDebit: detail.priceDebit,
              priceCredit: detail.priceCredit,
              priceTaxDebit: detail.priceTaxDebit,
              priceTaxCredit: detail.priceTaxCredit,
              date: format(detail.date.toDate(), 'yyyy-MM-dd'),
              client: detail.client,
              note: detail.note,
              file: detail.file,
              activeDebit: detail.activeactiveDebit as boolean,
              activeCredit: detail.activeCredit as boolean,
              taxDebit: detail.taxDebit,
              taxCredit: detail.taxCredit
            };
            if (type === 'all') {
              return (
                user !== null && (
                  <Box key={detail.id} paddingTop='8px' paddingBottom='8px' borderBottom='1px solid #c9c9c9'>
                    <Flex justifyContent='space-between'>
                      <Box>
                        <Box fontSize='14px' color='#c9c9c9' fontWeight='600'>{accountName.credit}：{detail.accountDebit}<br />
                          {accountName.debit}：{detail.accountCredit}</Box>
                        <Box fontSize='12px' color='#c9c9c9' marginTop='15px' >{format(detail.date.toDate(), 'yyyy年M月d日')}</Box>
                      </Box>
                      <Flex fontSize='14px'>
                        <Box marginRight='25px'>
                          {detail.type === '収入' && (
                            <Box color='#00536C' fontWeight='600'>{detail.type}</Box>
                          )}
                          {detail.type === '支出' && (
                            <Box color='#E53E3E' fontWeight='600'>{detail.type}</Box>
                          )
                          }
                          {detail.payment === 'true' && (
                            <Box></Box>
                          )}
                          {detail.payment === 'false' && (
                            <Box color='#E53E3E' fontWeight='600'><Image src="/check.svg" w='1em' h='1em' alt="" /></Box>
                          )
                          }
                        </Box>
                        <Box fontSize='16px' fontWeight='600' marginTop='auto'> {
                          detail.type === '収入' && (
                            <Box>+{Number(detail.price).toLocaleString()}円</Box>
                          )
                        }
                          {
                            detail.type === '支出' && (
                              <Box>-{Number(detail.price).toLocaleString()}円</Box>
                            )
                          }</Box>
                      </Flex>
                    </Flex>
                    <Box textAlign='right'>
                      <Button onClick={() => onOpenModal(detail)} display='inline-block' h='auto' p='8px 7px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>詳細</Button>
                      <Link
                        as={`/account/${detail.id}`}
                        href={{ pathname: `/account/[id]`, query: detailInfo }}
                      >
                        <Button display='inline-block' h='auto' p='8px 7px' marginLeft='8px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>編集</Button>
                      </Link>
                    </Box>
                  </Box>
                )
              )
            } else if (type === '収入') {
              return (
                user !== null && (
                  '収入' === detail.type && (
                    <Box key={detail.id} paddingTop='8px' paddingBottom='8px' borderBottom='1px solid #c9c9c9'>
                      <Flex justifyContent='space-between'>
                        <Box>
                          <Box fontSize='14px' color='#c9c9c9' fontWeight='600'>{accountName.credit}：{detail.accountDebit}<br />
                            {accountName.debit}：{detail.accountCredit}</Box>
                          <Box fontSize='12px' color='#c9c9c9' marginTop='15px' >{format(detail.date.toDate(), 'yyyy年M月d日')}</Box>
                        </Box>
                        <Flex fontSize='14px'>
                          <Box marginRight='25px'>
                            {detail.type === '収入' && (
                              <Box color='#00536C' fontWeight='600'>{detail.type}</Box>
                            )}
                            {detail.type === '支出' && (
                              <Box color='#E53E3E' fontWeight='600'>{detail.type}</Box>
                            )
                            }
                            {detail.payment === 'true' && (
                              <Box></Box>
                            )}
                            {detail.payment === 'false' && (
                              <Box color='#E53E3E' fontWeight='600'><Image src="/check.svg" w='1em' h='1em' alt="" /></Box>
                            )
                            }
                          </Box>
                          <Box fontSize='16px' fontWeight='600' marginTop='auto'> {
                            detail.type === '収入' && (
                              <Box>+{Number(detail.price).toLocaleString()}円</Box>
                            )
                          }
                            {
                              detail.type === '支出' && (
                                <Box>-{Number(detail.price).toLocaleString()}円</Box>
                              )
                            }</Box>
                        </Flex>
                      </Flex>
                      <Box textAlign='right'>
                        <Button onClick={() => onOpenModal(detail)} display='inline-block' h='auto' p='8px 7px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>詳細</Button>
                        <Link
                          as={`/account/${detail.id}`}
                          href={{ pathname: `/account/[id]`, query: detailInfo }}
                        >
                          <Button display='inline-block' h='auto' p='8px 7px' marginLeft='8px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>編集</Button>
                        </Link>
                      </Box>
                    </Box>
                  )
                )
              )
            } else if (type === '支出') {
              return (
                user !== null && (
                  '支出' === detail.type && (
                    <Box key={detail.id} paddingTop='8px' paddingBottom='8px' borderBottom='1px solid #c9c9c9'>
                      <Flex justifyContent='space-between'>
                        <Box>
                          <Box fontSize='14px' color='#c9c9c9' fontWeight='600'>{accountName.credit}：{detail.accountDebit}<br />
                            {accountName.debit}：{detail.accountCredit}</Box>
                          <Box fontSize='12px' color='#c9c9c9' marginTop='15px' >{format(detail.date.toDate(), 'yyyy年M月d日')}</Box>
                        </Box>
                        <Flex fontSize='14px'>
                          <Box marginRight='25px'>
                            {detail.type === '収入' && (
                              <Box color='#00536C' fontWeight='600'>{detail.type}</Box>
                            )}
                            {detail.type === '支出' && (
                              <Box color='#E53E3E' fontWeight='600'>{detail.type}</Box>
                            )
                            }
                            {detail.payment === 'true' && (
                              <Box></Box>
                            )}
                            {detail.payment === 'false' && (
                              <Box color='#E53E3E' fontWeight='600'><Image src="/check.svg" w='1em' h='1em' alt="" /></Box>
                            )
                            }
                          </Box>
                          <Box fontSize='16px' fontWeight='600' marginTop='auto'> {
                            detail.type === '収入' && (
                              <Box>+{Number(detail.price).toLocaleString()}円</Box>
                            )
                          }
                            {
                              detail.type === '支出' && (
                                <Box>-{Number(detail.price).toLocaleString()}円</Box>
                              )
                            }</Box>
                        </Flex>
                      </Flex>
                      <Box textAlign='right'>
                        <Button onClick={() => onOpenModal(detail)} display='inline-block' h='auto' p='8px 7px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>詳細</Button>
                        <Link
                          as={`/account/${detail.id}`}
                          href={{ pathname: `/account/[id]`, query: detailInfo }}
                        >
                          <Button display='inline-block' h='auto' p='8px 7px' marginLeft='8px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>編集</Button>
                        </Link>
                      </Box>
                    </Box>
                  )
                )
              )
            }
          })}
        </Box>
        <TableContainer display={{ base: "none", md: "block" }} maxWidth='100%' whiteSpace='pre-wrap' className={styles.table}>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th className={styles.table_first}></Th>
                <Th>{accountName.settlement}</Th>
                <Th>{accountName.debit}</Th>
                <Th>{accountName.credit}</Th>
                <Th>{accountName.price}</Th>
                <Th>{accountName.remarks}</Th>
                <Th>{accountName.credit}</Th>
                <Th>{accountName.date}</Th>
                <Th className={styles.table_last}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {detailList.map((detail: any) => {
                const detailInfo = {
                  id: detail.id,
                  accountDebit: detail.accountDebit,
                  accountCredit: detail.accountCredit,
                  type: detail.type, pl: detail.pl,
                  payment: detail.payment,
                  price: detail.price,
                  priceDebit: detail.priceDebit,
                  priceCredit: detail.priceCredit,
                  priceTaxDebit: detail.priceTaxDebit,
                  priceTaxCredit: detail.priceTaxCredit,
                  date: format(detail.date.toDate(), 'yyyy-MM-dd'),
                  client: detail.client,
                  note: detail.note,
                  file: detail.file,
                  activeDebit: detail.activeDebit as boolean,
                  activeCredit: detail.activeCredit as boolean,
                  taxDebit: detail.taxDebit,
                  taxCredit: detail.taxCredit
                };
                if (type === 'all') {
                  return (
                    user !== null && (
                      <Tr key={detail.id}>
                        {detail.type === '収入' && (
                          <Td className={styles.table_first} color='#00536C' fontWeight='600' >{detail.type}</Td>
                        )}
                        {detail.type === '支出' && (
                          <Td className={styles.table_first} color='#E53E3E' fontWeight='600' >{detail.type}</Td>
                        )
                        }
                        {detail.payment === 'true' && (
                          <Td color='#00536C' fontWeight='600' w='1em' h='1em'></Td>
                        )}
                        {detail.payment === 'false' && (
                          <Td className={styles.table_payment} color='#E53E3E' fontWeight='600' ><Image src="/check.svg" w='1em' h='1em' alt="" /></Td>
                        )
                        }
                        <Td >{detail.accountDebit}</Td>
                        <Td >{detail.accountCredit}</Td>
                        {
                          detail.type === '収入' && (
                            <Td>+{Number(detail.price).toLocaleString()}円</Td>
                          )
                        }
                        {
                          detail.type === '支出' && (
                            <Td>-{Number(detail.price).toLocaleString()}円</Td>
                          )
                        }
                        < Td w='20.3%' fontSize='xs' > {detail.note}</Td>
                        <Td>{detail.client}</Td>
                        <Td>{format(detail.date.toDate(), 'yyyy年M月d日')}</Td>
                        <Td isNumeric w='12%' className={styles.table_last_list}>
                          <Button onClick={() => onOpenModal(detail)} display='inline-block' h='auto' p='8px 7px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>詳細</Button>
                          <Link
                            as={`/account/${detail.id}`}
                            href={{ pathname: `/account/[id]`, query: detailInfo }}
                          >
                            <Button display='inline-block' h='auto' p='8px 7px' marginLeft='8px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>編集</Button>
                          </Link>
                        </Td>
                      </Tr>
                    )
                  )
                } else if (type === '収入') {
                  return (
                    user !== null && (
                      '収入' === detail.type && (
                        <Tr key={detail.id}>
                          {detail.type === '収入' && (
                            <Td className={styles.table_first} color='#00536C' fontWeight='600' >{detail.type}</Td>
                          )}
                          {detail.type === '支出' && (
                            <Td className={styles.table_first} color='#E53E3E' fontWeight='600' >{detail.type}</Td>
                          )
                          }
                          {detail.payment === 'true' && (
                            <Td color='#00536C' fontWeight='600' w='1em' h='1em'></Td>
                          )}
                          {detail.payment === 'false' && (
                            <Td className={styles.table_payment} color='#E53E3E' fontWeight='600' ><Image src="/check.svg" w='1em' h='1em' alt="" /></Td>
                          )
                          }
                          <Td >{detail.accountDebit}</Td>
                          <Td >{detail.accountCredit}</Td>
                          {
                            detail.type === '収入' && (
                              <Td>+{Number(detail.price).toLocaleString()}円</Td>
                            )
                          }
                          {
                            detail.type === '支出' && (
                              <Td>-{Number(detail.price).toLocaleString()}円</Td>
                            )
                          }
                          < Td w='20.3%' fontSize='xs' > {detail.note}</Td>
                          <Td>{detail.client}</Td>
                          <Td>{format(detail.date.toDate(), 'yyyy年M月d日')}</Td>
                          <Td isNumeric w='12%' className={styles.table_last_list}>
                            <Button onClick={() => onOpenModal(detail)} display='inline-block' h='auto' p='8px 7px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>詳細</Button>
                            <Link
                              as={`/account/${detail.id}`}
                              href={{ pathname: `/account/[id]`, query: detailInfo }}
                            >
                              <Button display='inline-block' h='auto' p='8px 7px' marginLeft='8px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>編集</Button>
                            </Link>
                          </Td>
                        </Tr>
                      )
                    )
                  )
                } else if (type === '支出') {
                  return (
                    user !== null && (
                      '支出' === detail.type && (
                        <Tr key={detail.id}>
                          {detail.type === '収入' && (
                            <Td className={styles.table_first} color='#00536C' fontWeight='600' >{detail.type}</Td>
                          )}
                          {detail.type === '支出' && (
                            <Td className={styles.table_first} color='#E53E3E' fontWeight='600' >{detail.type}</Td>
                          )
                          }
                          {detail.payment === 'true' && (
                            <Td color='#00536C' fontWeight='600' w='1em' h='1em'></Td>
                          )}
                          {detail.payment === 'false' && (
                            <Td className={styles.table_payment} color='#E53E3E' fontWeight='600' ><Image src="/check.svg" w='1em' h='1em' alt="" /></Td>
                          )
                          }
                          <Td >{detail.accountDebit}</Td>
                          <Td >{detail.accountCredit}</Td>
                          {
                            detail.type === '収入' && (
                              <Td>+{Number(detail.price).toLocaleString()}円</Td>
                            )
                          }
                          {
                            detail.type === '支出' && (
                              <Td>-{Number(detail.price).toLocaleString()}円</Td>
                            )
                          }
                          < Td w='20.3%' fontSize='xs' > {detail.note}</Td>
                          <Td>{detail.client}</Td>
                          <Td>{format(detail.date.toDate(), 'yyyy年M月d日')}</Td>
                          <Td isNumeric w='12%' className={styles.table_last_list}>
                            <Button onClick={() => onOpenModal(detail)} display='inline-block' h='auto' p='8px 7px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>詳細</Button>
                            <Link
                              as={`/account/${detail.id}`}
                              href={{ pathname: `/account/[id]`, query: detailInfo }}
                            >
                              <Button display='inline-block' h='auto' p='8px 7px' marginLeft='8px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>編集</Button>
                            </Link>
                          </Td>
                        </Tr>
                      )
                    )
                  )
                }
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}
