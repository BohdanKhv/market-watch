import { homeIcon, userIcon, walletIcon, searchIcon, gridIcon, homeFillIcon, starEmptyIcon, starFillIcon, walletFillIcon, settingsIcon, marketIcon, marketFillIcon, settingsFillIcon } from "./img/icons"

const sideNav = [
    {
        title: 'Watchlist',
        icon: marketIcon,
        fillIcon: marketFillIcon,
        path: '/',
    },
    {
        title: 'Portfolio',
        icon: walletIcon,
        fillIcon: walletFillIcon,
        path: '/portfolio',
    },
    {
        title: 'Settings',
        icon: settingsIcon,
        fillIcon: settingsFillIcon,
        path: '/settings',
    },
]


export {
    sideNav
}