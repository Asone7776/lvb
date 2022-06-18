import React from "react";
const TopInfo = ({ title, onNewPressed, onCancelPressed }) => {
    return (
        <div className="row info-top-header">
            <div className="col-6">
                <h3 className="default-heading">
                    {title}
                </h3>
            </div>
            <div className="col-6 text-right">
                {onNewPressed && (
                    <button className="btn btn-gold" onClick={onNewPressed}>
                        Создать новый
                    </button>
                )}
                {onCancelPressed && (
                    <button className="btn btn-cancel" onClick={onCancelPressed}>
                        Отмена
                    </button>
                )}
            </div>
        </div>
    );
}

export default TopInfo;