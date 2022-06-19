import TopInfo from "../../components/TopInfo";
import PreCreateForm from "../../components/PreCreateForm";
const PrePolicy = () => {

    return (
        <div className="information">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-8">
                        <TopInfo title={"Предварительный расчёт стоимости полиса"} />
                        <PreCreateForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrePolicy;