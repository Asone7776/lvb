import React from "react";
const TopInfo = ({ title, onNewPressed, onCancelPressed }) => {
    return (
        <div className="row info-top-header">
            {!onNewPressed && !onCancelPressed ? (
                <div className="col-12">
                    <h3 className="default-heading">
                        {title}
                    </h3>
                </div>
            ) : (
                <>
                    <div className="col-6">
                        <h3 className="default-heading">
                            {title}
                        </h3>
                    </div>
                    <div className="col-6 text-right">
                        {onNewPressed && (
                            <button className="btn btn-primary" onClick={onNewPressed}>
                                Создать новый
                            </button>
                        )}
                        {onCancelPressed && (
                            <button className="btn btn-gray" onClick={onCancelPressed}>
                                Отмена
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default TopInfo;