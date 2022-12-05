
import TopInfo from '../../components/TopInfo';
import { useNavigate } from 'react-router-dom';
import PackagesWrapper from '../../components/PackagesWrapper';

const PackagesList = () => {
    const navigate = useNavigate();

    return (
        <div className="information list-wrapper">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-9">
                        <TopInfo title={"Защита бизнеса. Пакеты"} titleNew={'Создать новый'} onBackPressed={() => {
                            navigate('/admin/packages');
                        }}
                        />
                        <PackagesWrapper />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PackagesList;
