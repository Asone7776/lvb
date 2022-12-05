const InfoItem = ({ title, subTitle, info, link }) => {
    return (
        <div className="info-item">
            {title ? (
                <h4>{title}</h4>
            ) : null}
            {subTitle && subTitle ? (
                <span>{subTitle}</span>
            ) : null}
            {link ? (
                <div className='info-link'>
                    <a href={link} target="_blank">
                        {link}
                    </a>
                </div>
            ) : (
                <h3>{info}</h3>
            )}
        </div>
    );
}

export default InfoItem;