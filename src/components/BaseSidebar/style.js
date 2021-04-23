import styled from 'styled-components';

export const SidebarArea = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 999;
    position: fixed;
    box-shadow: 0px 2px 22px 0 rgb(0 0 0 / 20%), 0px 2px 30px 0 rgb(0 0 0 / 35%);
    background-color: ${props => props.sidebarColor};
    min-height: 100vh;
    height: 100%;
    max-width: ${(props) => props.isExpanded ? "250px" : "90px"};
    min-width: ${(props) => props.isExpanded ? "250px" : "90px"};
    transition: all 0.5s;
    overflow-x: hidden;
`

export const Sidebar = styled.nav`
    max-width: ${(props) => props.isExpanded ? "250px" : "90px"};
    min-width: ${(props) => props.isExpanded ? "250px" : "90px"};
`

//#region LogoArea

export const SidebarLogoArea = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px 10px;
    padding: 15px 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
`

export const LogoAreaImage = styled.div`
    
    > * {
        width: 32px;
        height: 32px;
        border-radius: 5px;
    }
`

export const LogoAreaText = styled.span`
    color: ${(props) => props.isExpanded ? props.textColor : "transparent"};
    padding: 0 5px;
    transition: all 0.3s;
    font-size: 14px;
`

export const LogoAreafixedPin = styled.div`
    position: absolute;
    right: 10px;
    transition: all 0.3s;

    &:hover{
        > * {
            transform: scale(1.1);
            opacity: 1;
        }
    }
`

//#endregion

//#region HeaderArea

export const SidebarHeaderArea = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    margin: 10px 10px;
    padding-bottom: 10px;
`
//#endregion

//#region BodyArea

export const SidebarBodyArea = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 10px;
`

//#endregion

export const GenericArea = styled.div`

`

export const GenericAreaParent = styled.a`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px 0px 5px 15px;
    transition: all 0.3s;
    text-decoration: none !important;
    cursor: pointer;

    &:hover{
        background-color: ${(props) => props.hasMouseOverEffect ? "rgba(255, 255, 255, 0.5)" : "transparent"};
        border-radius: 25px;
        > * {
            opacity: 1;
        }
    }
`

export const GenericAreaArrow = styled.div`
    padding-left: 10px;
`

export const GenericAreaAbsolutRight = styled.div`
    width: 100%;
    opacity: 0.5;
    transition: all 0.3s;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    > * {
        transition: all 0.3s;
        fill: ${(props) => props.iconsColor};
        display: ${(props) => props.isExpanded ? "block" : "none"};
        width: 16px;
        height: 16px;
    }
`

export const GenericAreaChildren = styled.div`
    
`

export const GenericAreaChildrenUL = styled.ul`
    padding: 0px 0px 5px 15px;
    margin: 0;
`

export const GenericAreaChildrenLI = styled.li`
    padding: 5px 0 5px 15px;

    &:hover{
        background-color: ${(props) => props.hasMouseOverEffect ? "rgba(255, 255, 255, 0.5)" : "transparent"};
        border-radius: 25px;
    }
    
`

export const GenericA = styled.a`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none !important;
    cursor: pointer;

    &:hover{
        > * {
            opacity: 1;
        }
    }
`

export const GenericSpan = styled.span`
    color: ${(props) => props.textColor};
    display: ${(props) => props.isExpanded ? "block" : "none"};
    padding-left: 5px;
    font-weight: 100;
    font-size: 11px;
`

export const GenericSVG = styled.div`
    opacity: 0.5;
    transition: all 0.3s;
    
    > * {
        fill: ${(props) => props.iconsColor};
        width: 32px;
        height: 32px;
        
    }
`