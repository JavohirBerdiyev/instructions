import React from "react";
import { AdaptableCard } from "components/shared";
import { t } from "i18next";


const Home = () => {
  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="mb-4 lg:mb-0">{t('Home page')}</h3>
        </div>
      </AdaptableCard>
    </>
  );
};

export default Home;
