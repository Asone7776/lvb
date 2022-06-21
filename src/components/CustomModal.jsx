import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { formatPrice, openBase64NewTab } from "../ functions";
Modal.setAppElement('#root');
const CustomModal = ({ modalIsOpen, onClose, onSaveClick }) => {
    const policeData = useSelector((state) => state.police.createFormData);
    const [risk, setRisk] = useState('Смерть');
    useEffect(() => {
        if (policeData) {
            formatRisk(policeData['case-0'], policeData['case-1']);
        }
    }, [policeData]);
    const formatRisk = (death, invalid) => {
        if (death && !invalid) {
            setRisk('Смерть')
        }
        if (invalid && !death) {
            setRisk('Инвалидность')
        }
        if (death && invalid) {
            setRisk('Смерть,Инвалидность');
        }
        if (!death && !invalid) {
            setRisk('Не указан');
        }
    }
    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={onClose}
                className="custom-modal"
                overlayClassName="custom-modal-overlay"
            // shouldCloseOnOverlayClick={false}
            // shouldCloseOnEsc={false}
            >
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label>Страхователь</label>
                            <h5>{policeData.order && policeData.order.insurer ? policeData.order.insurer : null}</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>Тип страхования</label>
                            <h5>{policeData.holder ? policeData.holder.label : null}</h5>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label>Номер телефона</label>
                            <h5>{policeData.order && policeData.order.phone ? policeData.order.phone : null}</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <h5>{policeData.email ? policeData.email : null}</h5>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="row">
                    <div className="col-4">
                        <div className="form-group">
                            <label>Срок страхования</label>
                            <h5>{policeData.order && policeData.order.term ? `${policeData.order.term} месяцев` : null}</h5>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Сумма страхования</label>
                            <h5>{policeData.limit ? `${formatPrice(policeData.limit)}₽` : null}</h5>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Страховой риск</label>
                            <h5>{risk}</h5>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label>Ссылка для онлайн оплаты</label>
                            {policeData.url && (
                                <a href={policeData.url} target={'_blank'}>{policeData.url}</a>
                            )}
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label>Стоимость полиса</label>
                            <div className="pre-price">
                                <h5>{policeData.order && policeData.order.amount ? `${formatPrice(policeData.order.amount)}₽` : null}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        {policeData.pdf && (
                            <button className="btn btn-blue" onClick={() => {
                                openBase64NewTab(policeData.pdf);
                            }}>
                                Скачать полис
                            </button>
                        )}
                    </div>
                    <div className="col-6">
                        <button className="btn btn-blue-white" onClick={() => {
                            if (policeData.order && policeData.order.id) {
                                onSaveClick(policeData.order.id);
                            }
                        }}>
                            Сохранить
                        </button>
                    </div>
                </div>
            </Modal>
        </div>

    );
}

export default CustomModal;