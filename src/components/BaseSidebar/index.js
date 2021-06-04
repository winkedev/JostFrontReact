import React, { useState, useRef } from 'react';
import { ReactComponent as FixedPin } from './internalAssets/list.svg';
import { ReactComponent as UserSVG } from './internalAssets//user.svg';
import { ReactComponent as LogoutSVG } from './internalAssets//logout.svg';
import { ReactComponent as ArrowSVG } from './internalAssets//darrow.svg';
import { ReactComponent as LockSVG } from './internalAssets//lock.svg';

import { SidebarArea, SidebarLogoArea, LogoAreaText, LogoAreafixedPin, SidebarHeaderArea, GenericAreaParent, GenericAreaChildren, GenericAreaChildrenUL, GenericAreaChildrenLI, GenericSpan, Sidebar, GenericAreaArrow, GenericA, SidebarBodyArea, GenericSVG, GenericArea, LogoAreaImage, GenericAreaAbsolutRight } from './style';

const BaseSidebar = ({ sidebarColor, iconsColor, textColor, logoImage, logoTitle, username, itemsObject, hasMouseOverEffect,
    onLogoutEvent, onFixedEvent, onSidebarExpandedEvent, onSidebarCollapsedEvent }) => {

    const refpool = useRef([]);
    const DEFAULT_BLACK = "#000000";
    const DEFAULT_WHITE = "#FFFFFF"
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFixedSidebar, setIsFixedSidebar] = useState(false);

    const setFixedSidebar = () => {
        setIsFixedSidebar(!isFixedSidebar);

        if (typeof (onFixedEvent) == "function") {
            onFixedEvent(isFixedSidebar);
        }
    }

    const setMouseLeave = () => {
        if (isFixedSidebar) { return };

        setIsExpanded(false);

        if (typeof (onSidebarCollapsedEvent) == "function") {
            onSidebarCollapsedEvent();
        }

        Object.keys(refpool.current).map((k, v) => {
            if (refpool.current[v].ariaExpanded == "true") {
                refpool.current[v].click();
            }
        })
    }

    const setMouseOver = () => {

        setIsExpanded(true);
        if (typeof (onSidebarExpandedEvent) == "function") {
            onSidebarExpandedEvent();
        }
    }

    const setPoolRef = (e) => {
        for (var i = 0; i < 100; i++) {
            if (refpool.current[i] == null) {
                refpool.current[i] = e;
                break;
            }
        }
    }

    const MountItem = (item) => {
        return (
            item.isLocked && item.hideLocked ? "" :
                <GenericArea key={item.id}>
                    <GenericAreaParent hasMouseOverEffect={hasMouseOverEffect} href={item.isLocked ? null : item.child ? `#${item.id}` : null} onClick={item.isLocked ? null : item.onClickEvent ?? null} data-toggle="collapse" aria-expanded="false" ref={(e) => setPoolRef(e)}>
                        <GenericSVG iconsColor={iconsColor ?? DEFAULT_WHITE}>
                            {item.icon}
                        </GenericSVG>
                        <GenericSpan isExpanded={isExpanded} textColor={textColor ?? DEFAULT_WHITE}>{item.text ?? "?"}</GenericSpan>
                        {item.child &&
                            <GenericAreaArrow>
                                <ArrowSVG width="12px" height="12px" fill={isExpanded ? iconsColor ?? DEFAULT_WHITE : "transparent"} />
                            </GenericAreaArrow>
                        }
                        {item.isLocked &&
                            <GenericAreaAbsolutRight isExpanded={isExpanded} iconsColor={iconsColor ?? DEFAULT_WHITE} >
                                <LockSVG />
                            </GenericAreaAbsolutRight>
                        }
                    </GenericAreaParent>

                    {item.child &&
                        <GenericAreaChildren className="collapse" id={item.id}>
                            <GenericAreaChildrenUL className="list-unstyled sidebar-collapsed-list">
                                {Object.keys(item.child).map((k, v) => {
                                    return item.child[v].isLocked && item.child[v].hideLocked ? "" :
                                        <GenericAreaChildrenLI hasMouseOverEffect={hasMouseOverEffect} key={item.child[v].id}>
                                            <GenericA onClick={item.child[v].isLocked ? null : item.child[v].onClickEvent ?? null}>
                                                <GenericSVG iconsColor={iconsColor ?? DEFAULT_WHITE}>
                                                    {item.child[v].icon}
                                                </GenericSVG>
                                                <GenericSpan textColor={textColor ?? DEFAULT_WHITE} isExpanded={isExpanded}>{item.child[v].text}</GenericSpan>
                                                {item.child[v].isLocked &&
                                                    <GenericAreaAbsolutRight isExpanded={isExpanded} iconsColor={iconsColor ?? DEFAULT_WHITE} >
                                                        <LockSVG />
                                                    </GenericAreaAbsolutRight>
                                                }
                                            </GenericA>
                                        </GenericAreaChildrenLI>
                                })}
                            </GenericAreaChildrenUL>
                        </GenericAreaChildren>
                    }
                </GenericArea>
        )
    }

    return (
        <SidebarArea sidebarColor={sidebarColor ?? DEFAULT_BLACK} isExpanded={isExpanded} onMouseOver={setMouseOver} onMouseLeave={setMouseLeave}>
            <Sidebar isExpanded={isExpanded}>

                <SidebarLogoArea>
                    <LogoAreaImage>
                        {logoImage}
                    </LogoAreaImage>
                    <LogoAreaText isExpanded={isExpanded} textColor={textColor ?? DEFAULT_WHITE}>
                        {logoTitle}
                    </LogoAreaText>
                    <LogoAreafixedPin onClick={setFixedSidebar}>
                        <FixedPin style={{ transition: "all 0.3s" }} width="22px" height="22px" opacity={isFixedSidebar ? 1 : 0.5} fill={isExpanded ? iconsColor ?? DEFAULT_WHITE : "transparent"} />
                    </LogoAreafixedPin>
                </SidebarLogoArea>

                <SidebarHeaderArea>

                    {MountItem({
                        id: "userSubmenu",
                        text: username,
                        icon: <UserSVG />,
                        child: [
                            {
                                id: "userSubmenu0",
                                text: "Logout",
                                icon: <LogoutSVG />,
                                onClickEvent: onLogoutEvent
                            }
                        ]
                    })}

                </SidebarHeaderArea>

                <SidebarBodyArea>
                    {Object.keys(itemsObject).map((k, v) => {
                        return MountItem(itemsObject[v]);
                    })}
                </SidebarBodyArea>

            </Sidebar>
        </SidebarArea >
    )
}

export default BaseSidebar;