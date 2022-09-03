import { homeIcon, userIcon, walletIcon, searchIcon, gridIcon, homeFillIcon, starEmptyIcon, starFillIcon, walletFillIcon } from "./icons"

const sideNav = [
    {
        title: 'Home',
        icon: homeIcon,
        fillIcon: homeFillIcon,
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
        title: 'Stocks',
        icon: searchIcon,
        fillIcon: searchIcon,
        path: '/stocks',
    },
]


export {
    sideNav
}