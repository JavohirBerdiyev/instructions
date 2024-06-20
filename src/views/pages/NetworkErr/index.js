import React, {useEffect} from 'react'
import {Container, DoubleSidedImage} from 'components/shared'
import {useTranslation} from "react-i18next";

const NetworkErr = ({err, data, loading}) => {
	const {t} = useTranslation()

useEffect(() => {

	const interval = setInterval(() => {
		if (navigator.onLine) {
			clearInterval(interval)
			window.location = '/'
		}
	}, 5000)
},[])

	return (
		<Container className="h-full">
			<div className="h-full flex flex-col items-center justify-center">
				<DoubleSidedImage
					src="/img/others/network.png"
					darkModeSrc="/img/others/network-dark.png"
					alt="Network Error!"
				/>
				<div className="mt-6 text-center">
					<h3 className="mb-2">{t("error_page.network_title")}</h3>
					<p className="text-base">{t("error_page.network_text")}</p>
				</div>
			</div>
		</Container>
	)
}

export default NetworkErr