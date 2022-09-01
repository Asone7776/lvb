import React from "react";
import Modal from 'react-modal';
import { formatPrice } from "../ functions";
Modal.setAppElement('#root');
const CustomCardSafeModal = ({ modalIsOpen, onClose, onSaveClick, onDelete, policeData }) => {
    console.log(policeData);
    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={onClose}
                className="custom-modal"
                overlayClassName="custom-modal-overlay"
            >
                <div className="row">
                    <div className="col-4">
                        <div className="form-group">
                            <label>Страхователь</label>
                            <h5>{policeData && policeData.order ? `${policeData.order.insurer}` : null}</h5>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>ИНН</label>
                            <h5>{policeData && policeData.order && policeData.order.form ? policeData.order.form.inn : null}</h5>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>КПП</label>
                            <h5>{policeData && policeData.order && policeData.order.form ? policeData.order.form.kpp : null}</h5>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label>Номер телефона</label>
                            <h5>{policeData && policeData.order && policeData.order.phone ? policeData.order.phone : null}</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <h5>{policeData && policeData.order && policeData.order.email ? policeData.order.email : null}</h5>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label>Сумма страхования</label>
                            <h5>{policeData && policeData.order.limit_amount ? `${formatPrice(policeData.order.limit_amount)}₽` : null}</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>Стоимость полиса</label>
                            <div className="pre-price">
                                <h5>{policeData && policeData.order && policeData.order.amount ? `${formatPrice(policeData.order.amount)}₽` : null}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="row mb-3">
                    <div className="col-6">
                        {policeData && policeData.order && policeData.order.policy_url ? (
                            <a target={'_blank'} href={policeData.order.policy_url} download className="btn btn-blue">
                                Черновик полиса
                            </a>
                        ) : null}
                    </div>
                    <div className="col-6">
                        {policeData && policeData.order && policeData.order.invoice_url ? (
                            <a target={'_blank'} href={policeData.order.invoice_url} download className="btn btn-blue">
                                Счёт на оплату
                            </a>
                        ) : null}
                    </div>
                </div>
                <div className="divider"></div>
                <div className="row">
                    <div className="col-6">
                        <button className="btn btn-primary-transparent" onClick={() => {
                            if (policeData && policeData.order && policeData.order.id) {
                                onDelete(policeData.order.id);
                            }
                        }}>
                            Редактировать
                        </button>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-primary" onClick={() => {
                            if (policeData && policeData.order && policeData.order.id) {
                                onSaveClick(policeData.order.id);
                            }
                        }}>
                            Отправить страхователю
                        </button>
                    </div>
                </div>
            </Modal>
        </div>

    );
}

export default CustomCardSafeModal;