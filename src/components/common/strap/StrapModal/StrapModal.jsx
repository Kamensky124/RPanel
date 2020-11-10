import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

/*
 * state props:
 * className    -   имя класса модального окна
 * modalHeader  -   заголовок модального окна
 * modalText    -   текст модального окна
 * showModal    -   маркер показа модального окна(true/false)
 * 
 * dispatch props:
 * closeModal   -   колбэк закрытия(нажатие на "Нет") модального окна
 * yesAction    -   колбэк действия при нажатии на "Да" в модальном окне
 */

const StrapModal = (props) => {
  const {    
    className, modalHeader, modalContent, showModal,
    modalButtons
  } = props;

  return (
    <div>      
      <Modal isOpen={showModal} className={className}>
        <ModalHeader>{modalHeader}</ModalHeader>
        <ModalBody>
            {modalContent}
        </ModalBody>
        {modalButtons &&
            <ModalFooter>
              {
                modalButtons.map((button, i) =>
                    <Button color={button.color} 
                            onClick={() => {button.onClick()}}
                            key={'modalbutton_'+i}>
                        {button.text}
                    </Button>
                )
              }          
            </ModalFooter>
        }
      </Modal>
    </div>
  );
}

export default StrapModal;