import { useRouter } from "next/router";
import Link from "next/link";
import { Box, Text, Flex, Select, Input, Textarea, Button } from '@chakra-ui/react'

import { Layout } from '../../src/components/Layout'
import { ContainerBox } from "../../src/Parts/ContainerBox";
import { HeadSecond } from "../../src/Parts/HeadSecond";

import { SubText } from "../../src/Parts/SubText";
import { Buttonsecondary } from "../../src/Parts/Buttonsecondary";
import { ButtonPrimary } from "../../src/Parts/ButtonPrimary";


const Id = () => {
  const router = useRouter();

  return (
    <>
      <Layout>
        <Box w='100%'>
          <HeadSecond>{router.query.id}の仕訳編集</HeadSecond>
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

            <Box textAlign='right'>
              <Link href={'/account'}>
                <Buttonsecondary>キャンセル</Buttonsecondary>
              </Link>
              <Link href={'/account/register'}>
                <ButtonPrimary>登録</ButtonPrimary>
              </Link>
            </Box>

          </ContainerBox>
        </Box>
      </Layout>
    </>
  );
};


export default Id