import React from 'react'
import { Avatar, Dropdown } from 'components/ui'
import withHeaderItem from 'utils/hoc/withHeaderItem'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineLogout, HiOutlineCog} from 'react-icons/hi'


import {useTranslation} from "react-i18next";

import useAuth from 'utils/hooks/useAuth'
import {t} from "i18next";


const dropdownItemList = [
	{ label: `${t('account_setting')}`, path: '/app/account/settings/profile', icon: <HiOutlineCog /> },
]

export const UserDropdown = ({ className }) => {

	const { avatar,  authority, email } = useSelector((state) => state.auth.user)
	const { t } = useTranslation();
    let userName = sessionStorage.getItem('user-name')
    let userEmail = sessionStorage.getItem('user-email')

		const { signOut } = useAuth()

		const logOut = () => {
			signOut();
		}

	const UserAvatar = (
		<div className={classNames(className, 'flex items-center gap-2')}>
			<Avatar size={32} shape="circle" src={avatar} />
			<div className="hidden md:block">
				<div className="text-xs capitalize">{authority[0] || userName}</div>
			</div>
		</div>
	)

	return (
		<div>
			<Dropdown menuStyle={{minWidth: 240}} renderTitle={UserAvatar} placement="bottom-end">
				<Dropdown.Item variant="header">
					<div className="py-2 px-3 flex items-center gap-2">
						<Avatar shape="circle" src={avatar} />
						<div>
							<div className="font-bold text-gray-900 dark:text-gray-100">{userName}</div>
							<div className="text-xs">{userEmail === 'undefined' ?  'No email' : userEmail }</div>
						</div>
					</div>
				</Dropdown.Item>
				 <Dropdown.Item variant="divider" />
				{dropdownItemList.map(item => (
					<Dropdown.Item eventKey={item.label} key={item.label} className="mb-1">
						<Link className="flex gap-2 items-center w-full dark:hover:text-gray-50" to={item.path}>
							<span className="text-xl opacity-50">{item.icon}</span>
							<span>{item.label}</span>
						</Link>
					</Dropdown.Item>
				))}
				<Dropdown.Item variant="divider" />
				{/* <Dropdown.Item onClick={(e) => logOut(e)} eventKey="Log Out" className="gap-2"> */}
				<Dropdown.Item onClick={logOut}  eventKey="Log Out" className="gap-2  w-full dark:hover:text-gray-50">
					<span className="text-xl opacity-50">
						<HiOutlineLogout />
					</span>
					<span>{t('log_out')}</span>
				</Dropdown.Item>
			</Dropdown>
		</div>
	)
}

export default withHeaderItem(UserDropdown)
