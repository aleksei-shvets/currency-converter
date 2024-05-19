import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { modalSelectors, ratesSelectors } from '../store/selectors.js';
import { hidden } from '../store/modalSlice.js';
import { resetErr } from '../store/ratesSlice.js';

const ErrorModal = () => {
  const dispatch = useDispatch();
  const modalStatus = useSelector(modalSelectors.getModalStatus);
  const { t } = useTranslation();
  const err = useSelector(ratesSelectors.getErr);
  const errorMessage = t(`errMessages.${err}`);

  const handleHidden = () => {
    dispatch(hidden());
    dispatch(resetErr(null));
  };

  return (
    <Modal
      show={modalStatus}
      onHide={handleHidden}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('headers.error')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage}
      </Modal.Body>
    </Modal>
  );
};

export default ErrorModal;
