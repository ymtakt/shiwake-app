import { Box, Button, Flex, Image, Input, Select, Text, Textarea } from '@chakra-ui/react'
import Link from 'next/link'
import React, { RefObject, SetStateAction } from 'react'
import { ButtonPrimary } from './ButtonPrimary'
import { Buttonsecondary } from './Buttonsecondary'
import { SubText } from './SubText'

import styles from '../../styles/Select.module.scss';
import { accountName } from '../util'
import { assets, cost, earnings, liabilities, netWorth } from '../account'
import { AccountSelectOptions } from './AccountSelectOptions'

type Props = {
  date: string,
  setDate: (value: SetStateAction<string>) => void,
  type: string,
  setType: (value: SetStateAction<string>) => void,
  client: string,
  setClient: (value: SetStateAction<string>) => void,
  pl: string,
  setPl: (value: SetStateAction<string>) => void,
  payment: string,
  setPayment: (value: SetStateAction<string>) => void,
  accountDebit: string,
  setAccountDebit: (value: SetStateAction<string>) => void,
  price: string,
  changePrice: (e: React.ChangeEvent<HTMLInputElement>) => void,
  activeDebit: boolean,
  activeCredit: boolean,
  classToggleDebit: () => void,
  accountCredit: string,
  setAccountCredit: (value: SetStateAction<string>) => void,
  classToggleCredit: () => void,
  inputRef: RefObject<HTMLInputElement>,
  handleChangePhotoURL: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onButtonClick: () => void,
  onDeleteClick: () => void,
  src: string,
  note: string,
  setNote: (value: SetStateAction<string>) => void,
}

export const RegisterForm = ({ date, setDate, type, setType, client, setClient,
  pl, setPl, payment, setPayment, accountDebit, activeCredit, setAccountDebit, price, changePrice, activeDebit, classToggleDebit,
  accountCredit, setAccountCredit, classToggleCredit, inputRef, handleChangePhotoURL, onButtonClick, onDeleteClick,
  src, note, setNote }: Props) => {
  return (
    <>
      <Flex marginBottom='30px' flexWrap={{ base: "wrap", md: "nowrap" }}>
        <Box w={{ base: "40%", md: "auto" }} marginRight='25px' marginBottom={{ base: "25px", md: "0" }}>
          <SubText marginBottom='10px'>
            {accountName.date}
          </SubText>
          <Input
            type='date'
            color='#65748A'
            borderColor='#AAE2CF'
            display='block'
            cursor='pointer'
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </Box>
        <Box w={{ base: "39%", md: "auto" }} marginRight='25px'>
          <SubText marginBottom='10px'>
            {accountName.payments}
          </SubText>
          <Select
            borderColor='#AAE2CF'
            color='#65748A'
            fontWeight={'bold'}
            cursor='pointer'
            value={type}
            onChange={e => setType(e.target.value)}
          >
            <option value='null'>選択してください</option>
            <option value='収入'>収入</option>
            <option value='支出'>支出</option>
          </Select>
        </Box>
        <Box w={{ base: "100%", md: "auto" }} marginRight={{ base: "0", md: "25px" }} marginBottom={{ base: "25px", md: "0" }}>
          <SubText marginBottom='10px'>
            {accountName.client}
          </SubText>
          <Input
            type='text'
            placeholder="取引先"
            color='#65748A'
            borderColor='#AAE2CF'
            marginRight='10px'
            value={client}
            onChange={e => setClient(e.target.value)}
          />
        </Box>
        <Box w={{ base: "26%", md: "auto" }} marginRight='25px'>
          <SubText marginBottom='10px'>
            {accountName.pl}
          </SubText>
          <Select
            borderColor='#AAE2CF'
            color='#65748A'
            fontWeight={'bold'}
            cursor='pointer'
            value={pl}
            onChange={e => setPl(e.target.value)}
          >
            <option value='true'>計算する</option>
            <option value='false'>計算しない</option>
          </Select>
        </Box>
        <Box w={{ base: "20%", md: "auto" }}>
          <SubText marginBottom='10px'>
            {accountName.settlement}
          </SubText>
          <Select
            borderColor='#AAE2CF'
            color='#65748A'
            fontWeight={'bold'}
            cursor='pointer'
            value={payment}
            onChange={e => setPayment(e.target.value)}
          >
            <option value='true'>完了</option>
            <option value='false'>未完了</option>
          </Select>
        </Box>
      </Flex>

      <Flex justify='space-between' align='flex-start' flexWrap={{ base: "wrap", md: "nowrap" }} marginBottom='30px'>
        <Box w={{ base: "100%", md: "auto" }} marginRight={{ base: "0", md: "25px" }}>
          <SubText marginBottom='10px'>
            {accountName.debit}
          </SubText>
          <Flex marginBottom='15px'>
            <Select className={styles.select} borderColor='#AAE2CF' marginRight='10px' color='#65748A' fontWeight={'bold'} placeholder="勘定科目" cursor='pointer' value={accountDebit}
              onChange={e => setAccountDebit(e.target.value)}>
              <AccountSelectOptions />
            </Select>
            <Input
              type='number'
              placeholder="金額"
              color='#65748A'
              borderColor='#AAE2CF'
              value={price}
              onChange={e => changePrice(e)}
            />
          </Flex>
          <Flex justifyContent='space-between'>
            <Flex align='center'>
              <SubText>
                税率
              </SubText>
              <Button onClick={classToggleDebit} className={activeDebit ? "tax" : ""} disabled={activeDebit ? true : false} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor={activeDebit ? '#3AA796' : '#fff'} color={activeDebit ? '#fff' : '#3AA796'} border={activeDebit ? 'none' : '1px solid #3AA796'} opacity='1 !important' fontSize='12px' textAlign='center'>10%</Button>
              <Button onClick={classToggleDebit} className={activeDebit ? "" : "tax"} disabled={activeDebit ? false : true} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor={activeDebit ? '#fff' : '#3AA796'} color={activeDebit ? '#3AA796' : '#fff'} border={activeDebit ? '1px solid #3AA796' : 'none'} opacity='1 !important' fontSize='12px' textAlign='center'>なし</Button>                  </Flex>
            <Box>
              <Flex align='center' justifyContent='space-between'>
                <SubText>
                  税率
                </SubText>
                <Text>¥
                  {activeDebit
                    ? Math.floor(Number(price) * 0.1).toLocaleString()
                    : 0
                  }
                </Text>
              </Flex>
              <Flex align='center' justifyContent='space-between'>
                <SubText>
                  合計
                </SubText>
                <Text>¥
                  {Number(price).toLocaleString()}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Box>

        <Box w={{ base: "100%", md: "auto" }} >
          <SubText marginBottom='10px'>
            {accountName.credit}
          </SubText>
          <Flex marginBottom='15px'>
            <Select borderColor='#AAE2CF' marginRight='10px' color='#65748A' fontWeight={'bold'} placeholder="勘定科目" cursor='pointer' value={accountCredit}
              onChange={e => setAccountCredit(e.target.value)}>
              <AccountSelectOptions />
            </Select>
            <Input
              type='number'
              placeholder="金額"
              color='#65748A'
              borderColor='#AAE2CF'
              value={price}
              onChange={e => changePrice(e)}
            />
          </Flex>
          <Flex justifyContent='space-between'>
            <Flex align='center'>
              <SubText>
                税率
              </SubText>
              <Button onClick={classToggleCredit} className={activeCredit ? "tax" : ""} disabled={activeCredit ? true : false} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor={activeCredit ? '#3AA796' : '#fff'} color={activeCredit ? '#fff' : '#3AA796'} border={activeCredit ? 'none' : '1px solid #3AA796'} opacity='1 !important' fontSize='12px' textAlign='center'>10%</Button>
              <Button onClick={classToggleCredit} className={activeCredit ? "" : "tax"} disabled={activeCredit ? false : true} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor={activeCredit ? '#fff' : '#3AA796'} color={activeCredit ? '#3AA796' : '#fff'} border={activeCredit ? '1px solid #3AA796' : 'none'} opacity='1 !important' fontSize='12px' textAlign='center'>なし</Button>
            </Flex>
            <Box>
              <Flex align='center' justifyContent='space-between'>
                <SubText>
                  税率
                </SubText>
                <Text>¥
                  {activeCredit
                    ? Math.floor(Number(price) * 0.1).toLocaleString()
                    : 0
                  }
                </Text>
              </Flex>
              <Flex align='center' justifyContent='space-between'>
                <SubText>
                  合計
                </SubText>
                <Text>¥
                  {/* {active
                          ? Math.floor(Number(price) * 0.1 + Number(price)).toLocaleString()
                          : Number(price).toLocaleString()
                        } */}
                  {Number(price).toLocaleString()}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>

      <Box marginBottom='30px'>
        <SubText marginBottom='10px'>
          {accountName.image}
        </SubText>
        <Flex flexWrap={{ base: "wrap", md: "nowrap" }}>
          <Input
            id="image"
            ref={inputRef}
            hidden
            multiple
            type="file"
            accept="image/png,image/jpeg,image/gif/,application/pdf"
            onChange={handleChangePhotoURL}
          />
          <Box marginBottom={{ base: "25px", md: "0" }}>
            <Button
              onClick={onButtonClick}
              display='block'
              w='330px'
              borderColor='#AAE2CF'
            >
              ファイルを選択
            </Button>
            {src &&
              <Button
                onClick={onDeleteClick}
                w='250px'
                borderColor='#AAE2CF'
                display='block'
                marginTop='35px'
              >
                削除
              </Button>
            }
          </Box>
          <Image w={{ base: "100%", md: "48%" }} src={src} alt="" display='block' h='auto' marginLeft='auto' objectFit='cover' />
        </Flex>
      </Box>

      <Box marginBottom='30px'>
        <SubText marginBottom='10px'>
          {accountName.remarks}
        </SubText>
        <Textarea
          borderColor='#AAE2CF'
          placeholder="例：取引の相手先や販売数量など"
          value={note}
          onChange={e => setNote(e.target.value)}
        />
      </Box>

    </>
  )
}
