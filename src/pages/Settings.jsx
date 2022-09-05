import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { infoIcon, moonIcon, rightArrowIcon, sunIcon } from '../assets/icons'
import { Box } from '../components'
import { setTheme } from '../features/local/localSlice'

const Settings = () => {
    const theme = useSelector(state => state.local.theme);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'STOKIN - Settings';
        window.scrollTo(0, 0);
    }, [])

    return (
        <Box title="Settings">
            <div className="py-3">
                <div className="flex flex-col">
                    <div className="flex justify-between align-center px-4 py-3 border-bottom hover"
                        onClick={() => dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))}
                    >
                        <div className="flex align-center">
                            <i className="icon">
                                {theme === 'light' ? sunIcon : moonIcon}
                            </i>
                            <h4 className="weight-500 ms-3">
                                Theme
                            </h4>
                        </div>
                        <div className="weight-500">
                            {theme === 'light' ? 'Light' : 'Dark'}
                        </div>
                    </div>
                    <div className="flex justify-between align-center px-4 py-3 border-bottom hover">
                        <div className="flex align-center">
                            <i className="icon">
                                {infoIcon}
                            </i>
                            <h4 className="weight-500 ms-3">
                                About
                            </h4>
                        </div>
                        <div>
                            <div className="icon">
                                {rightArrowIcon}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default Settings