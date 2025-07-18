import React from 'react';
import { useSelector } from 'react-redux'; 
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Icon from '../../../components/icon/Icon';
import DailyRecruiterWidget from '../../_common/CRMDashboard/DailyRecruiterWidget';
import TotalInfluencersWidget from '../../_common/CRMDashboard/TotalInfluencersWidget';
import SearchByCityCountryWidget from '../../_common/CRMDashboard/SearchByCityCountryWidget';


const DashboardPage = () => {
	const user = useSelector((state: any) => state.auth?.user);
	// FORZAR usuario admin PARA DEBUG (esto es solo para pruebas rápidas)
	// const user = { roles: [{ name: 'admin' }] };
	// console.log('USER DEBUG:', user);
	
	const hasAdminRole = user?.roles?.includes('ROLE_ADMIN');
	// console.log('ROLES DEBUG:', user?.roles);

	if (!hasAdminRole) {
		return <div className="text-center mt-5">Acceso restringido: solo para administradores.</div>;
	}

	return (
		<PageWrapper title='Dashboadrd'>
			<SubHeader>
				<SubHeaderLeft>
					<Icon icon='Info' className='me-2' size='2x' />
					<span className='text-muted'>Revisa las ultimas actualizaciones.</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<span className='text-muted'>{new Date().toLocaleDateString()}</span>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row align-items-stretch'>
					<div className='col-lg-4'>
						<div className='dashboard-card'>
							<DailyRecruiterWidget />
						</div>
					</div>
					<div className='col-lg-4'>
						<div className='dashboard-card'>
							<TotalInfluencersWidget />
						</div>
					</div>
					<div className='col-lg-4'>
						<div className='dashboard-card'>
							<SearchByCityCountryWidget />
						</div>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default DashboardPage;
