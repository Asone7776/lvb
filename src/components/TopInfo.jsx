import React from "react";
import BackIcon from './Icons/BackIcon'
const TopInfo = ({ title, titleNew = 'Сохранить', onNewPressed, onCancelPressed, onBackPressed }) => {
    return (
        <div className="row info-top-header">
            {!onNewPressed && !onCancelPressed && !onBackPressed ? (
                <div className="col-12">
                    
                    <h3 className="default-heading">
                        {title}
                    </h3>
                </div>
            ) : (
                <>
                    <div className="col-8 d-flex">
                        {onBackPressed ? (
                            <button onClick={onBackPressed} className="back-btn">
                                <BackIcon />
                            </button>
                        ) : null}
                        <h3 className="default-heading">
                            {title}
                        </h3>
                    </div>
                    <div className="col-4 text-right">
                        {onNewPressed && (
                            <button className="btn btn-primary" onClick={onNewPressed}>
                                {titleNew}
                            </button>
                        )}
                        {onCancelPressed && (
                            <button className="btn btn-gray" onClick={onCancelPressed}>
                                Отменить
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default TopInfo;