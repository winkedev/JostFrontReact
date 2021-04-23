import React from 'react';
import BaseSidebar from '../../components/BaseSidebar';

import { ReactComponent as ListSVG } from '../../assets/list.svg';

import JostLogo from '../../assets/jost-logo1.png';

const PrivatePage = () => {
    return (
        <BaseSidebar
            logoImage={<img src={JostLogo} />}
            logoTitle="JOST"
            username="springnsoo"
            itemsObject={[
                {
                    id: "test",
                    text: "relatórioX",
                    icon: <ListSVG />,
                    child: [
                        {
                            id: "relx",
                            text: "reX",
                            icon: <ListSVG />,
                            onClickEvent: () => console.log("Clicked")
                        },
                        {
                            id: "relas",
                            text: "relas",
                            icon: <ListSVG />
                        }
                    ]
                },
                {
                    id: "teste2",
                    text: "relat",
                    icon: <ListSVG />,
                    isLocked: true,
                    hideLocked: false
                }

            ]}
            onLogoutEvent={() => alert("Logout")}
            hasMouseOverEffect={false}
        />
    )
}

export default PrivatePage;