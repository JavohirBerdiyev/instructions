import React, { useState, Suspense, lazy } from 'react'
import { Tabs } from 'components/ui'
import { AdaptableCard, Container } from 'components/shared'
import { useNavigate } from 'react-router-dom'
// import ChangeEmail from "./components/ChangeEmail";
import {t} from "i18next";

// const Profile = lazy(() => import('./components/Profile'))
const Password = lazy(() => import('./components/Password'))


const { TabNav, TabList } = Tabs

const settingsMenu = {
	password: { label: `${t('profile_settings.change_password')}`, path: 'password' },
	// changeEmail: { label: `${t('profile_settings.change_email')}`, path: 'change-email' },
}

const Settings = () => {

	const [currentTab, setCurrentTab] = useState('profile')


	const navigate = useNavigate()



	const onTabChange = val => {
		setCurrentTab(val)
		navigate(`/app/account/settings/${val}`)
	}


	return (
		<Container>
			<AdaptableCard>
				<Tabs value={currentTab} onChange={val => onTabChange(val)}>
					<TabList>
						{
							Object.keys(settingsMenu).map(key =>
								<TabNav key={key} value={key}>{settingsMenu[key].label}</TabNav>
							)
						}
					</TabList>
				</Tabs>
				<div className="px-4 py-6">
					<Suspense fallback={<></>}>
						{ currentTab === 'password' && <Password /> }
						{/*{ currentTab === 'changeEmail' && <ChangeEmail  /> }*/}
					</Suspense>
				</div>
			</AdaptableCard>
		</Container>
	)
}

export default Settings