import TopInfo from "../../components/TopInfo";
import CreateForm from "../../components/CreateForm";
const CreatePolicy = () => {
    return (
        <div className="information">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-8">
                        <TopInfo title={"Новый полис: ID1234566"} onNewPressed={() => { }} onCancelPressed={() => { }} />
                        <CreateForm/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePolicy;