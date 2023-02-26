import React from "react";

import { getStrPosition } from "../common/getStrPosition";
import { getStoreItem, setStoreItem } from '../common/store';
import SiteElement from "./SiteElement";
import { Site, SelectedSite } from "../interfaces/Site";


interface Props {
    sites?: Site[],
    setSelectedSite: (site: SelectedSite) => void,
    scaning: boolean,
    setScaning: React.Dispatch<React.SetStateAction<boolean>>,
}

const SitesList: React.FC<Props> = ({
    sites,
    setSelectedSite,
    scaning,
    setScaning,
}) => {
    const getCoPosition = getStrPosition('©', ['"', '<', '>', '/']);

    const checkStore = async (url: string) => {
        const storedSite: SelectedSite | undefined = await getStoreItem(url);
        if (storedSite) {
            setSelectedSite(storedSite);
            setScaning(false);
            return storedSite;
        }
        return null
    }

    const initializeСopyright = (start: number, end: number, str: string) => {
        const isRealPosition = start !== 0 && end !== 0;
        const errStr = 'Copyright does not exist';
        return isRealPosition ? str.slice(start, end) : errStr;
    }

    const handleScan = async (site: Site) => {
        let res;
        try {
            res = await fetch(site?.url);
            let resText = await res.text();
            if (!!resText) {
                const { start, end } = getCoPosition(resText);
                const copyright = initializeСopyright(start, end, resText)
                let selectedSite = { ...site, copyright };
                setSelectedSite(selectedSite);
                setStoreItem(selectedSite?.url, selectedSite)
            }
            setScaning(false);
        } catch (e) {
            setScaning(false);
            throw new Error(e);
        }
    }

    const onClick = async(site: Site) => {
        setScaning(true);
        if (scaning) {
            return;
        }
        const storedSite = await checkStore(site?.url);
        if (storedSite) {
            return;
        }
        handleScan(site)
    }

    if (!sites?.length) {
        return;
    }

    return <>
        {
            sites.map((site: Site) => {
                return <React.Fragment key={Math.random()}>
                    <SiteElement
                        site={site}
                        onClick={onClick}
                    />
                </React.Fragment>
            })
        }
    </>
}

export default SitesList;
