import { Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { auth } from '../firebase'
import { ButtonPrimary } from './ButtonPrimary'
import { Buttonsecondary } from './Buttonsecondary'

type Props = {
  isOpen: boolean,
  onClose: () => void,
}

export const ModalResetPassword = ({ onClose, isOpen }: Props) => {
  const [email, setEmail] = useState("");

  const router = useRouter();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  //パスワードリセットイベント
  const handleResetPassword = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('メールを送信しました')
        router.push("/login")
        onClose();
      })
      .catch((err => {
        console.log(err)
      }))
    setEmail("");
  }


  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>パスワード再設定</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type='email'
              placeholder='メールアドレス'
              w='330px'
              borderColor='#AAE2CF'
              value={email}
              onChange={handleChangeEmail}
            />
          </ModalBody>

          <ModalFooter  >
            <ButtonPrimary onClick={() => handleResetPassword(email)}>パスワード再設定メールを送る</ButtonPrimary>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
