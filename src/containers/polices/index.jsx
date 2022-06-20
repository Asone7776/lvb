import NoDocument from "../../components/NoDocument";
import { useNavigate } from "react-router-dom";
import Accordion from "../../components/Accordion";
import TopInfo from "../../components/TopInfo";
import { useEffect, useState } from "react";
import axios from "axios";
const PolicyPage = () => {
    const [list, setList] = useState([1,2,3]);
    const navigate = useNavigate();
    // useEffect(() => {
    //     getData();
    // }, []);
    const getData = async () => {
        try {
            const response = await axios.get('https://vsk-trust.ru/api/');

            setList(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    if (list && list.length === 0) {
        return (
            <div className="vertical-center">
                <NoDocument />
            </div>
        )
    }
    return (
        <>
            <div className="information">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-8">
                            <TopInfo title={"Полисы страхования"} onNewPressed={() => {
                                navigate('/admin/pre-create');
                            }} />
                            <Accordion />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PolicyPage;