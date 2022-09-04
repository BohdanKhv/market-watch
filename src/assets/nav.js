import { homeIcon, userIcon, walletIcon, searchIcon, gridIcon, homeFillIcon, starEmptyIcon, starFillIcon, walletFillIcon, settingsIcon, marketIcon, marketFillIcon, settingsFillIcon } from "./icons"

const sideNav = [
    {
        title: 'Market',
        icon: marketIcon,
        fillIcon: marketFillIcon,
        path: '/',
    },
    {
        title: 'Watchlist',
        icon: starEmptyIcon,
        fillIcon: starFillIcon,
        path: '/watchlist',
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