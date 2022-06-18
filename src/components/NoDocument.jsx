import AddDocument from '../img/document-add.svg';
const NoDocument = () => {
    return (
        <div className="no-document">
            <img src={AddDocument} alt="add-documentF" />
            <h2>Создайте новый полис страхования</h2>
            <p>
                После успешного создания полиса информация о нём будет<br/> отображатся на этой странице
            </p>
            <button className="btn btn-gold">
                Создать новый
            </button>
        </div>
    );
}

export default NoDocument;