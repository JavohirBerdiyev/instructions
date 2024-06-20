import React from 'react'
import { Container, DoubleSidedImage } from 'components/shared'
import {useTranslation} from "react-i18next";
const AccessDenied = () => {
	const {t} = useTranslation()
	return (
		<Container className="h-full">
			<div className="h-full flex flex-col items-center justify-center">
				<DoubleSidedImage 
					src="/img/others/img-2.png"
					darkModeSrc="/img/others/img-2-dark.png"
					alt="Access Denied!"
				/>
				<div className="mt-6 text-center">
					<h3 className="mb-2">{t("error_page.access_denided_title")}</h3>
					<p className="text-base">{t("error_page.access_denided_text")}</p>
				</div>
			</div>
		</Container>
	)
}

export default AccessDenied