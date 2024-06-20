import React from 'react'
import {Container, DoubleSidedImage} from 'components/shared'
import {useTranslation} from "react-i18next";


const NoData = () => {
const {t} = useTranslation()
	return (
		<Container className="h-full">
			<div className="h-full flex flex-col items-center justify-center">
				<DoubleSidedImage
					src="/img/others/welcome.png"
					darkModeSrc="/img/others/welcome-dark.png"
					alt="No Date!"
				/>
				<div className="mt-6 text-center">
					<h3 className="mb-2">{t("error_page.no_data_title")}</h3>
					<p className="text-base">{t("error_page.no_data_text")}</p>
				</div>
			</div>
		</Container>
	)
}

export default NoData