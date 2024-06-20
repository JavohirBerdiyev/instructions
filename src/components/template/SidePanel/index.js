import React from 'react'
import classNames from 'classnames'
import { Drawer } from 'components/ui'
import { HiOutlineCog } from 'react-icons/hi'
import SidePanelContent from './SidePanelContent'
import withHeaderItem from 'utils/hoc/withHeaderItem'
import { setPanelExpand } from 'store/theme/themeSlice'
import { useSelector, useDispatch } from 'react-redux'
import {Tooltip} from "../../ui";
import {t} from "i18next";
export const SidePanel = props => {

	const dispatch = useDispatch()

	const { className, ...rest } = props

	const panelExpand = useSelector((state) => state.theme.panelExpand)

	const direction = useSelector((state) => state.theme.direction)

	const openPanel = () => {
		dispatch(setPanelExpand(true))
	}

	const closePanel = () => {
		dispatch(setPanelExpand(false))
		const bodyClassList = document.body.classList
		if (bodyClassList.contains('drawer-lock-scroll')) {
			bodyClassList.remove('drawer-lock-scroll', 'drawer-open')
		}
	}

	return (
		<>
			<Tooltip title={t('tooltip.settings')} placement="bottom">
				<div className={classNames('text-2xl', className)} onClick={openPanel} {...rest}>
					<HiOutlineCog />
				</div>
			</Tooltip>
			<Drawer
				title="Theme Config"
				isOpen={panelExpand}
				onClose={closePanel}
				onRequestClose={closePanel}
				placement={direction === 'rtl' ? 'left' : 'right'}
				width={375}
			>
				<SidePanelContent callBackClose={closePanel} />
			</Drawer>
		</>
	)
}

export default withHeaderItem(SidePanel)
